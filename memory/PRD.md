# Living Things Counselling — Practice Website PRD

## Original Problem Statement
Create a calm, professional website for a private counseling practice. The site is for a Registered Social Worker (Calgary, AB) providing virtual, trauma-informed, evidence-based therapy for adults and adolescents. The tone should be calm, grounded, human, and non-salesy.

## User Persona
**Target Audience**: Adults and adolescents (13+) seeking professional mental health support
- Feeling stuck, overwhelmed, or disconnected
- May be experiencing anxiety, depression, ADHD, stress, burnout
- Going through life transitions, relationship challenges, or parenting stress
- Looking for accessible, professional, evidence-based therapy
- Prefer virtual sessions

## Core Requirements
1. **Design**: Calm, professional, minimal aesthetic with deep blue-green colors
2. **Tone**: Grounded, human, non-salesy
3. **Primary CTAs**: "Book a Session" (Jane App) and Contact Form
4. **Content Sections**: Hero, Reassurance, Who I Work With, What Sessions Are Like, Fees, About, Province & Licensing, Contact Form, Final CTA
5. **Tech**: React frontend + FastAPI backend + MongoDB
6. **Typography**: Inter font
7. **Design System**: Luxury minimalist; sharp rectangular buttons

## Implementation Status

### Phase 1–3 (prior sessions, Feb 2026)
- Built full luxury minimalist frontend with deep blue-green palette, Inter font, micro-animations
- All content sections complete (Hero, Reassurance, Audience, Sessions, Fees, About, Licensing, Contact, CTA)
- Responsive across mobile/tablet/desktop

### Phase 4 — Backend + Rename (Feb 12, 2026)
- Renamed practice to **Living Things Counselling** (nav, footer, page title, meta description, copyright)
- Wired real **Jane App booking URL**: `https://livingthingscounselling.janeapp.com` on all 4 CTAs (nav, hero, footer, final CTA)
- Built **POST /api/contact** and **GET /api/contact** with Pydantic validation (`EmailStr`, length bounds), MongoDB persistence in `contact_submissions`
- Integrated **Resend** for email notifications (graceful no-op when `RESEND_API_KEY` / `CONTACT_NOTIFICATION_EMAIL` not yet set — submissions still persist, `email_sent: false`)
- Frontend `ContactForm` calls real backend via `axios`, with loading state ("Sending…"), inline 422 error parsing, success state, and "Send another message" reset
- All form elements have `data-testid` attributes
- Cleaned up unused mock fields (`contact.email`, `contact.phone`) and rewrote Footer accordingly
- E2E tested: backend 9/9 pytest pass, frontend Playwright 100% pass (`/app/test_reports/iteration_1.json`)

## Pending / Backlog

### P0
- **Email notification activation** — user needs to provide:
  - Resend API key (free at https://resend.com → API Keys) → set `RESEND_API_KEY` in `/app/backend/.env`
  - Notification recipient email → set `CONTACT_NOTIFICATION_EMAIL`
  - Optional: verified custom from-domain → set `CONTACT_FROM_EMAIL` (defaults to `onboarding@resend.dev`)

### P1
- SEO: Open Graph image, Twitter card meta tags
- Favicon update to match Living Things branding
- Lightweight admin view to read submissions (currently accessible only via `GET /api/contact`)

### P2
- FAQ section (deferred unless requested)
- Honeypot / rate-limit on `/api/contact` to deter spam
- Custom domain (e.g., livingthingscounselling.com) — note: Emergent preview subdomain cannot be changed via code

## Tech Stack
- **Frontend**: React 19, React Router, axios, custom CSS w/ Inter
- **Backend**: FastAPI, Motor (Mongo async), Pydantic v2, Resend SDK (async via `asyncio.to_thread`)
- **Database**: MongoDB — collections: `status_checks`, `contact_submissions`

## Key Files
- `/app/frontend/src/pages/Home.jsx` — page composition
- `/app/frontend/src/components/{Navigation,Footer,ContactForm}.jsx`
- `/app/frontend/src/mockData.js` — Jane URL + practice info
- `/app/backend/server.py` — `/api/contact` POST/GET, Resend wrapper
- `/app/backend/tests/test_contact_api.py` — pytest coverage
- `/app/frontend/public/index.html` — title & meta

## API
| Method | Route | Description |
|---|---|---|
| POST | `/api/contact` | Create contact submission (201). Optional email notify. |
| GET | `/api/contact` | List submissions, desc by timestamp. |
| POST/GET | `/api/status` | Pre-existing status check (regression baseline). |

## Data Models
**ContactSubmission**: `id` (uuid str), `name`, `email` (EmailStr), `message`, `timestamp` (ISO str in Mongo), `email_sent` (bool), `email_error` (str|null).

## Design System
- Backgrounds: `#fafbfb`, `#f0f4f5`
- Text: `#1a2d3d` / `#4a5f6f`
- Interactive: `#2c4f5f` (hover `#1a3a4a`)
- Border: `#c8d5da`
- Font: Inter 400/500
- Buttons: rectangular (0px radius)

## Notes / Constraints
- Emergent-generated preview subdomain cannot be changed via code — requires a custom domain
- Resend "testing mode" only delivers to verified email addresses; verify a domain in Resend to send freely
