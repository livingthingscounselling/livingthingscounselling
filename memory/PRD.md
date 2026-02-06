# Jeff's Counseling Practice Website - PRD

## Original Problem Statement
Create a calm, professional website for a private counseling practice. The site is for a Registered Social Worker providing virtual, trauma-informed, evidence-based therapy for adults and adolescents. The tone should be calm, grounded, human, and non-salesy.

## User Persona
**Target Audience**: Adults and adolescents (13+) seeking professional mental health support
- Feeling stuck, overwhelmed, or disconnected
- May be experiencing anxiety, depression, ADHD, stress, burnout
- Going through life transitions, relationship challenges, or parenting stress
- May have trauma or difficult past experiences
- Looking for accessible, professional, evidence-based therapy
- Prefer virtual sessions for convenience

## Core Requirements (Static)
1. **Design**: Calm, professional, minimal aesthetic with deep blue-green colors
2. **Tone**: Grounded, human, non-salesy, reassuring
3. **Primary CTAs**: "Book a Session" (Jane App) and Contact Form
4. **Content Sections**: Hero, Reassurance, Who I Work With, What Sessions Are Like, Fees, About, Province & Licensing, Contact Form, Final CTA
5. **Technical**: React frontend, fully responsive design
6. **Typography**: Inter font for professional warmth
7. **Design System**: Luxury minimalist with sharp rectangular buttons (0px border radius)

## What's Been Implemented

### Phase 1: Initial Frontend (Feb 6, 2026)
- Created luxury minimalist design with warm neutral colors
- Built all core content sections
- Implemented responsive design
- Integrated professional headshot

### Phase 2: Color & Typography Updates (Feb 6, 2026)
- Updated to deep blue-green color palette (#2c4f5f, #1a2d3d)
- Subtle blue-green gradient on hero (#e8f1f0 to #f0f4f5)
- Implemented Inter font throughout
- Restructured About section (text first, smaller centered headshot)
- Changed bullet points to subtle circular dots

### Phase 3: Enhanced Features (Feb 6, 2026)
- **Contact Form**: Name, Email, Message fields with success state (MOCKED - needs backend)
- **Practice Name**: Updated to "Jeff's Counseling TBD"
- **Microanimations**: Fade-in effects on hero, button hover/active states
- **Footer Enhancement**: Calgary, Alberta location + "Response within 24-48 hours"
- **Session Details**: Added "via secure video platform" mentions
- **Mobile Optimization**: Tested and optimized for iPhone/tablet

### Content Refinements (User Edits)
- Updated hero subtitle to "client-centered therapy"
- Expanded audience to "adults and adolescents"
- Added specific therapeutic approaches: "Cognitive Behavioral and Narrative Therapies"
- Updated fees section: "sliding scale rates"
- Changed Who I Work With ending: "let's talk"

## Technical Details
- **Frontend**: React 19, React Router
- **Styling**: Custom CSS with CSS variables, Inter font from Google Fonts
- **Components**: Navigation, Footer, ContactForm, Home page
- **Responsive**: Mobile-first approach with breakpoints at 640px, 1024px
- **Animations**: CSS keyframe animations for fade-in effects
- **Mock Data**: Jane App URL, contact info, practice details

## Still TODO (Backend & Final Details)

### P0 - Critical
- **Contact Form Backend**: Connect form to email service or database
- **Jane App URL**: Replace placeholder with actual booking link
- **Contact Information**: Update email and phone number
- **Final Practice Name**: Replace "Jeff's Counseling TBD" with actual name

### P1 - High Priority
- SEO meta tags and descriptions
- Open Graph tags for social sharing
- Google Analytics or analytics integration
- SSL certificate verification

### P2 - Nice to Have
- FAQ section (deferred for now)
- Testimonials section
- Blog or resources section
- Additional pages (About, Services, etc.)

## Design System Reference
- **Primary Background**: #fafbfb
- **Secondary Background**: #f0f4f5
- **Text Primary**: #1a2d3d
- **Text Secondary**: #4a5f6f
- **Interactive Base**: #2c4f5f
- **Interactive Hover**: #1a3a4a
- **Border Light**: #c8d5da
- **Font**: Inter (400, 500 weights)
- **Button Style**: Sharp rectangular (0px border radius)

## Notes
- Contact form currently MOCKED (frontend only, no backend integration)
- All CTAs link to placeholder Jane App URL
- Practice name is temporary pending final decision
- Site is fully functional as static marketing page
- Mobile-optimized and ready for launch once backend/details finalized
