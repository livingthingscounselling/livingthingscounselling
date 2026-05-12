from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
import html
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend config (optional — email notification is skipped if not configured)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
CONTACT_NOTIFICATION_EMAIL = os.environ.get('CONTACT_NOTIFICATION_EMAIL', '').strip()
CONTACT_FROM_EMAIL = os.environ.get('CONTACT_FROM_EMAIL', 'onboarding@resend.dev').strip()
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactSubmissionCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False
    email_error: Optional[str] = None


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


def _build_notification_html(name: str, email: str, message: str) -> str:
    safe_name = html.escape(name)
    safe_email = html.escape(email)
    safe_message = html.escape(message).replace("\n", "<br />")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; color: #1f2937; background: #f6f6f4; padding: 24px;">
      <tr><td>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 32px; border: 1px solid #e5e7eb;">
          <tr><td>
            <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #0f2942;">New contact form submission</h2>
            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 14px;">Living Things Counselling website</p>
            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> {safe_name}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:{safe_email}" style="color: #0f2942;">{safe_email}</a></p>
            <p style="margin: 16px 0 8px 0;"><strong>Message:</strong></p>
            <div style="white-space: pre-wrap; background: #f9fafb; border-left: 3px solid #2f5d4f; padding: 12px 16px; border-radius: 4px; line-height: 1.5;">{safe_message}</div>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def _send_notification_email(submission: ContactSubmission) -> tuple[bool, Optional[str]]:
    """Returns (sent, error_message). If Resend isn't configured, returns (False, None)."""
    if not RESEND_API_KEY or not CONTACT_NOTIFICATION_EMAIL:
        return False, None
    try:
        params = {
            "from": CONTACT_FROM_EMAIL,
            "to": [CONTACT_NOTIFICATION_EMAIL],
            "reply_to": submission.email,
            "subject": f"New contact form message from {submission.name}",
            "html": _build_notification_html(submission.name, submission.email, submission.message),
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Resend email sent: {result.get('id') if isinstance(result, dict) else result}")
        return True, None
    except Exception as e:
        logger.exception("Failed to send notification email via Resend")
        return False, str(e)


@api_router.post("/contact", response_model=ContactSubmission, status_code=201)
async def create_contact_submission(payload: ContactSubmissionCreate):
    submission = ContactSubmission(**payload.model_dump())

    sent, err = await _send_notification_email(submission)
    submission.email_sent = sent
    submission.email_error = err

    doc = submission.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    try:
        await db.contact_submissions.insert_one(doc)
    except Exception:
        logger.exception("Failed to persist contact submission")
        raise HTTPException(status_code=500, detail="Could not save your message. Please try again.")

    return submission


@api_router.get("/contact", response_model=List[ContactSubmission])
async def list_contact_submissions():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
    for s in submissions:
        if isinstance(s.get('timestamp'), str):
            s['timestamp'] = datetime.fromisoformat(s['timestamp'])
    return submissions


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
