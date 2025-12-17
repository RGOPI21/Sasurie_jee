# Content Architecture Draft

Reference site: https://sasurie-engineering-0mzi.bolt.host/  
Objective: mirror the informational depth while elevating aesthetics, interactivity, and marketing impact. Real copy will be swapped in after approval.

## Dynamic Branding
- `siteSettings` document drives: college name, tagline, contact info, logo URLs (light/dark), brand colors, social links.
- Admins can update site identity in Mongo without redeploying.

## Page Structure

1. **Hero + Highlights**
   - Announcement ticker (admissions open, scholarship deadlines).
   - CTA buttons: `Apply Now`, `Download Prospectus`, `Virtual Tour`.
   - Animated stats (established year, students, recruiters, acres).

2. **Program Explorer**
   - Filters: Undergraduate, Postgraduate, Research, Diploma.
   - Cards with degree, duration, intake, accreditation badges.
   - “Compare Programs” micro-interaction queued for later.

3. **Admissions & Eligibility**
   - Timeline (application → counselling → onboarding).
   - Downloadable brochure + WhatsApp/Email CTA.
   - FAQ accordion (eligibility, scholarships, hostel, transport).

4. **Placements & Careers**
   - Hiring partners carousel (IT, Core, Product companies).
   - Highest/avg salary stats, training hours.
   - Alumni spotlight slider with quotes.

5. **Campus Life**
   - Gallery (labs, library, clubs, events) with lightbox view.
   - Quick cards for hostels, transportation, cafeteria, sports.

6. **Research & Innovation**
   - Labs/centers of excellence, patents, funded projects.
   - CTA to collaborate with industry.

7. **News & Events**
   - Tabs for News / Events / Announcements.
   - Each item: title, summary, date, CTA (“Read more”).

8. **Testimonials**
   - Students, parents, recruiters.
   - Use Swiper for auto-play with pause on hover.

9. **Contact & Visit**
   - Embedded map, contact details, workforce directory.
   - Lead form (persists + emails), WhatsApp deep link, call now button.

## Supporting Pages (to be queued)
- `about`: leadership, vision/mission, accreditations.
- `departments/:slug`: program-specific info, labs, faculty.
- `research`: publications, MoUs, innovation clubs.
- `placements`: training process, recruiter info, recruitment calendar.

## Data Entities (Draft)
```json
siteSettings: {
  name, tagline, logos, colors, heroMedia, contact, socialLinks, paymentGatewayStatus
}
programs: [{ title, degree, duration, category, highlights, brochureUrl }]
admissionSteps: [{ title, description, deadline }]
faqs: [{ question, answer, category }]
stats: [{ label, value, unit }]
placements: { highestCtc, avgCtc, recruiters: [], highlights: [] }
testimonials: [{ name, role, avatar, quote, category }]
events: [{ title, type, date, location, url, excerpt }]
gallery: [{ title, category, imageUrl }]
leads: submissions for contact/admission forms
```

## Immediate Next Actions
1. Freeze exact copy & imagery to import from reference site (requires manual scraping or CMS dump).
2. Build JSON seed files in `backend/seed/` mirroring the above schema for quick demo content.
3. Wire GET endpoints per collection + POST endpoints for leads.
4. Frontend consumes data via RTK Query / React Query with optimistic UI for forms.

