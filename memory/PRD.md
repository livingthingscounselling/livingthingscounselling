# Private Counseling Practice Website - PRD

## Original Problem Statement
Create a calm, professional website for a private counseling practice. The site is for a Registered Social Worker providing virtual, trauma-informed, evidence-based therapy for adults. The tone should be calm, grounded, human, and non-salesy. The primary call to action is "Book a Session."

## User Persona
**Target Audience**: Adults (18+) seeking professional mental health support
- Feeling stuck, overwhelmed, or disconnected
- May be experiencing anxiety, depression, ADHD, stress, burnout
- Going through life transitions, relationship challenges, or parenting stress
- May have trauma or difficult past experiences
- Looking for accessible, professional, evidence-based therapy
- Prefer virtual sessions for convenience

## Core Requirements (Static)
1. **Design**: Calm, professional, minimal aesthetic with warm neutral colors
2. **Tone**: Grounded, human, non-salesy, reassuring
3. **Primary CTA**: "Book a Session" linking to Jane App
4. **Content Sections**:
   - Hero section with headline
   - Reassurance for people unsure about starting therapy
   - Who I Work With section
   - What Sessions Are Like section
   - Fees & Accessibility section
   - About My Background with headshot
   - Province & Licensing section
   - Final CTA section
5. **Technical**: React frontend, fully responsive design
6. **Design System**: Luxury minimalist with sharp rectangular buttons (0px border radius)

## Architecture & Design Decisions
- **Frontend**: React with functional components
- **Design System**: Luxury Minimalist (premium-commerce playbook)
  - Warm neutral palette: #fffef2 (primary bg), #f6f5e8 (secondary bg)
  - Text hierarchy: #333333 (primary), #666666 (secondary)
  - Sharp rectangular buttons (0px border radius)
  - Suisse font family with system fallbacks
  - Generous spacing (2-3x normal)
- **Components**:
  - Navigation component with sticky header
  - Footer component with contact info and CTA
  - Home page with all content sections
- **Mock Data**: Jane App booking URL, contact placeholders

## What's Been Implemented
**Date**: February 6, 2026

### Phase 1: Frontend Development ✅
- Created luxury minimalist design system with warm neutral colors
- Implemented sharp rectangular buttons (0px border radius) per design guidelines
- Built Navigation component with sticky header
- Built Footer component with contact information
- Created comprehensive Home page with all content sections:
  - Hero section with main headline and CTA
  - Reassurance section
  - Who I Work With section (8 common reasons listed)
  - What Sessions Are Like section
  - Fees & Accessibility section
  - About My Background section with professional headshot
  - Province & Licensing section
  - Final CTA section
- Implemented fully responsive design (mobile, tablet, desktop)
- Used user-provided exact content throughout
- Integrated professional headshot image
- Set up mock data file for Jane App booking link and contact info

## Prioritized Backlog

### P0 Features (Critical - Not Started)
- Backend not yet implemented (static site only)

### P1 Features (High Priority - Future)
- Update Jane App booking URL with actual link
- Replace placeholder contact information (email, phone)
- Add analytics tracking (Google Analytics or similar)
- Implement contact form for inquiries
- Add SEO meta tags and descriptions

### P2 Features (Nice to Have)
- Add subtle animations on scroll
- Implement smooth scroll navigation
- Add testimonials section (if appropriate)
- Create additional pages (FAQ, Resources, etc.)
- Add blog or resources section

## Next Tasks
1. Share with user for review and feedback
2. Update Jane App booking URL when provided
3. Update contact information when provided
4. Consider adding contact form for inquiries
5. Implement SEO optimization (meta tags, descriptions)
6. Consider analytics integration

## Notes
- Design follows luxury minimalist system with restraint principle
- No backend needed for this static informational site
- All CTAs link to external Jane App booking system
- Content provided by user is used exactly as written
- Professional headshot successfully integrated
- Site is mobile-responsive and ready for use
