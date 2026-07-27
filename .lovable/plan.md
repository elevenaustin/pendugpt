## PenduGPT — Premium AI Masterclass Landing Page

A single-brand, bilingual (Punjabi+English / English), conversion-focused site for a ₹99 live AI website-building masterclass.

### First experience
- Full-screen language gate renders before any site content: aurora gradient, floating blurred blobs, glass card, animated logo, "🌍 Choose Your Language" + two large buttons.
- Choice saved to localStorage; gate fades out with no reload/redirect. Returning visitors skip it.
- i18n via a React context + two typed dictionary files (`en.ts`, `pa.ts`) covering every string — nav, hero, forms, pricing, FAQ, footer, legal pages, validation, toasts, thank-you. Language switcher in the nav swaps instantly.

### Design language
- Dark-first premium AI palette: royal/electric blue → indigo → purple → cyan/teal, with orange/amber/pink accents. All values as oklch tokens in `src/styles.css` — no hardcoded colors in components.
- Aurora + mesh gradients, glass cards, gradient borders, soft glow, subtle noise, floating soft-3D shapes. Each section gets its own gradient lighting from the same token set.
- Large display typography (Satoshi/General Sans-style via a Fontshare/Google `<link>` in `__root.tsx`), generous spacing, very little text.
- Motion: scroll reveal, hover micro-interactions, counters, cursor glow, page transitions, confetti on success.

### Pages
- `/` — landing (all sections below)
- `/checkout`, `/thank-you`
- Legal: `/about`, `/contact`, `/privacy-policy`, `/terms`, `/refund-policy`, `/cancellation-policy`, `/shipping-policy`, `/cookie-policy`, `/disclaimer` — full Indian digital-education wording with placeholders for address, GST, support email/phone.

### Landing sections
Sticky glass nav → Hero (split: badge, gradient headline, bullets, dual CTA / glass video player) → price strip (₹999 struck → ₹99) → animated social-proof counters → Who Should Join → Website Showcase carousel in device mockups → Interactive Prompt→Website live demo → Curriculum timeline (11 steps) → Why This Skill → Success Roadmap → Bonuses → Instructor → Testimonials carousel (video + WhatsApp/Instagram screenshots) → Limited Offer pricing card with countdown + seats progress bar → Registration form → 15+ FAQ accordion → multi-column footer.

Conversion extras: sticky mobile CTA, exit-intent popup, recent-registration toasts, trust/secure-payment badges.

### Registration + payment
- Lovable Cloud enabled; a `registrations` table (name, WhatsApp, email, age, occupation, district, state, has_laptop, language, status, created_at) with RLS: public insert allowed, reads restricted to service role only — no public read of personal data.
- Zod validation client-side and inside the server function that writes the row.
- Payment is a **placeholder**: after the form saves, a simulated Razorpay-style checkout step marks the registration `paid` and routes to the Thank You page (confetti + WhatsApp community CTA button). Code isolated in one payment module so real Razorpay keys can be dropped in later.

### SEO / quality
Per-route `head()` with unique titles, descriptions, og/twitter tags; Event + FAQPage + Organization JSON-LD; semantic HTML, single H1 per page, alt text, lazy media, responsive from 360px up, reduced-motion support.

### Technical notes
Stack stays TanStack Start + React 19 + TypeScript + Tailwind v4 + shadcn/ui + Lucide + Framer Motion (Next.js is not available here; everything requested is achievable on this stack). Components split per section under `src/components/landing/*`, shared primitives (GlassCard, AuroraBackground, GradientText, SectionShell, Reveal) under `src/components/ui-x/*`.

### Needs from you later
- Logo file upload (placeholder wordmark + animated mark until then).
- Masterclass date/time, WhatsApp community link, support email/phone, business address, GST — placeholders used for now.
