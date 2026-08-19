export type LegalSection = { h: string; p: string[] };
export type LegalDoc = { title: string; description: string; intro: string; sections: LegalSection[] };

export const en = {
  meta: {
    langLabel: "English",
    dir: "ltr",
  },
  gate: {
    title: "Choose Your Language",
    subtitle: "Please select your preferred language.",
    punjabi: "Punjabi + English",
    english: "English",
    hint: "You can change this anytime from the menu.",
  },
  urgencyPopup: {
    badge: "LIMITED SPOTS ALERT",
    headlineA: "Only",
    headlineB: "7 Seats Left",
    headlineC: "At ₹99!",
    description: "Special Demo Class enrollment is closing soon. Don't miss out on learning how to build AI websites!",
    timerLabel: "OFFER EXPIRES IN",
    originalPrice: "₹1,000",
    offerPrice: "₹99 ONLY",
    claimBtn: "Claim Your ₹99 Seat Now",
    guarantee: "100% Money-Back Satisfaction Guarantee",
  },
  nav: {
    curriculum: "Curriculum",
    demo: "Live Demo",
    testimonials: "Testimonials",
    pricing: "Pricing",
    faq: "FAQ",
    contact: "Contact",
    join: "Join Now",
    menu: "Menu",
    language: "Language",
  },
  hero: {
    badge: "UPCOMING LIVE DEMO CLASS",
    titleA: "Join The Live Demo Class &",
    titleB: "Learn AI Website Building",
    subtitle:
      "Join our live demo class and learn how to build professional AI-powered websites without coding, publish them online, and start getting freelance clients.",
    bullets: [
      "No Coding Required",
      "Beginner Friendly",
      "Live Practical Session",
      "Build Real Websites",
      "Learn Modern AI Tools",
    ],
    primary: "Join Live Demo Class — ₹99",
    secondary: "Watch Preview",
    videoCaption: "Preview: what you will learn in the live class",
    videoFallback: "Preview video coming soon",
  },
  limitedSpots: {
    eyebrow: "HIGH DEMAND BATCH",
    title: "Limited Spots Available For Next Live Demo Class",
    subtitle: "Seats fill fast for every batch. Reserve your spot before registration closes.",
    seatsRemaining: "Spots Remaining",
    seatsFilled: "Batch Capacity Filled",
    closingSoon: "Registration Closing Soon",
    cta: "Join Demo Class Now — ₹99",
    guarantee: "100% Satisfaction Guarantee · Instant Access to Class Link & Bonuses",
  },
  price: {
    fee: "Registration Fee",
    only: "only",
    original: "₹999",
    now: "₹99",
    limited: "Limited Time Offer",
    save: "90% OFF",
  },
  stats: {
    title: "A fast-growing community",
    items: [
      { value: 1000, suffix: "+", label: "Interested Learners" },
      { value: 500, suffix: "+", label: "AI Websites Built" },
      { value: 5, suffix: "★", label: "Student Satisfaction" },
      { value: 24, suffix: "/7", label: "Growing Community" },
    ],
  },
  audience: {
    eyebrow: "Who is this for",
    title: "Made for people starting from zero",
    subtitle: "If you can use a smartphone, you can follow this class.",
    items: [
      { t: "Students", d: "Build a skill alongside your studies." },
      { t: "Freelancers", d: "Add website building to your services." },
      { t: "Business Owners", d: "Put your shop or brand online." },
      { t: "Creators", d: "Turn your audience into a portfolio." },
      { t: "Job Seekers", d: "Learn a practical, in-demand skill." },
      { t: "Beginners", d: "Zero technical background needed." },
      { t: "Professionals", d: "Build side projects after work hours." },
    ],
  },
  showcase: {
    eyebrow: "Live showcase",
    title: "The kind of websites you will build",
    subtitle: "Real layouts, built live with AI in minutes.",
    items: [
      "Restaurant Website",
      "Gym Website",
      "Salon Website",
      "Photography Website",
      "Agency Website",
      "Portfolio",
      "Clinic",
      "School",
      "Real Estate",
    ],
  },
  demo: {
    eyebrow: "Live demo",
    title: "From one prompt to a real website",
    subtitle: "Type an idea. Watch it become a professional page.",
    promptLabel: "Your prompt",
    resultLabel: "Generated website",
    prompts: [
      "A modern website for my dhaba in Ludhiana with menu and photos",
      "A gym landing page with membership plans and a contact form",
      "A photographer portfolio with a gallery and booking section",
    ],
    generate: "Generate",
    generating: "Building your website…",
    before: "Before",
    after: "After",
    note: "Demo animation. The real workflow is taught step by step in the live class.",
  },
  curriculum: {
    eyebrow: "Curriculum",
    title: "Everything covered in the live session",
    subtitle: "A clear path from your first prompt to your first client conversation.",
    items: [
      { t: "Introduction", d: "How AI website building actually works today." },
      { t: "AI Website Generation", d: "Turning a simple idea into a full website." },
      { t: "Website Editing", d: "Changing text, sections, colours and images." },
      { t: "Publishing", d: "Taking your website live on the internet." },
      { t: "Hosting", d: "Understanding where your website lives." },
      { t: "Domain", d: "Connecting a professional custom domain." },
      { t: "Client Acquisition", d: "How freelancers professionally approach clients." },
      { t: "Pricing", d: "How to structure and present your pricing." },
      { t: "Project Delivery", d: "Handing over work cleanly and confidently." },
      { t: "Portfolio", d: "Building proof of your skill from day one." },
      { t: "Scaling", d: "Systems, templates and repeatable workflows." },
    ],
  },
  why: {
    eyebrow: "Why this skill",
    title: "A practical skill for the AI era",
    items: [
      { t: "No Coding", d: "Describe what you want in plain language." },
      { t: "AI Powered", d: "Modern tools do the heavy lifting for you." },
      { t: "Future Skill", d: "Stay relevant as AI reshapes the web." },
      { t: "Freelancing", d: "Understand how freelance work is delivered." },
      { t: "Remote Work", d: "Work from anywhere with just a laptop." },
      { t: "High Demand", d: "Every local business needs an online presence." },
      { t: "Business Growth", d: "Build and manage your own brand online." },
    ],
  },
  roadmap: {
    eyebrow: "Roadmap",
    title: "Your path after the masterclass",
    steps: ["Learn", "Practice", "Portfolio", "Find Clients", "Deliver Projects", "Earn", "Scale"],
    note: "Results depend on your effort and consistency. This is a skill, not a shortcut.",
  },
  bonuses: {
    eyebrow: "Bonuses",
    title: "Included with your ₹99 registration",
    items: [
      { t: "Prompt Library", d: "Ready-to-use prompts for fast results." },
      { t: "Website Templates", d: "Starting points for common businesses." },
      { t: "Proposal Templates", d: "Professional client-facing documents." },
      { t: "Pricing Calculator", d: "Price your work with confidence." },
      { t: "Certificate", d: "Certificate of participation." },
      { t: "Private Community", d: "Learn together on WhatsApp." },
      { t: "Lifetime Recording", d: "Rewatch the session anytime." },
    ],
  },
  instructor: {
    eyebrow: "Your instructor",
    title: "Built for Punjab. Taught in your language.",
    name: "Team PenduGPT",
    role: "AI Educators & Website Builders",
    mission:
      "Our mission is simple: make modern AI skills understandable for every person in Punjab, in the language they think in.",
    experience:
      "Years of hands-on experience building websites, digital products and content for local businesses and creators.",
    projects: "Hundreds of AI-built pages, landing pages and portfolios shipped and published.",
    vision:
      "A generation of learners from small towns who can build professional websites and work with clients anywhere.",
    labels: { mission: "Mission", experience: "Experience", projects: "Projects", vision: "Vision" },
    photoAlt: "PenduGPT instructor portrait",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What early learners say",
    subtitle: "Real messages from our community.",
    items: [
      { n: "Harpreet S.", c: "Ludhiana", q: "I built my first website the same evening. The Punjabi explanation made everything simple." },
      { n: "Simran K.", c: "Amritsar", q: "I always thought websites need coding. Turns out I just needed the right tools and guidance." },
      { n: "Gurjot S.", c: "Patiala", q: "Made a page for my father's shop. Customers now find us online." },
      { n: "Navdeep K.", c: "Jalandhar", q: "The client approach part was the most valuable for me as a beginner freelancer." },
      { n: "Manpreet S.", c: "Bathinda", q: "Clear, practical and no time wasting. Worth much more than ₹99." },
      { n: "Ravneet K.", c: "Mohali", q: "The templates and prompt library saved me hours on my first project." },
    ],
  },
  offer: {
    eyebrow: "Limited offer",
    title: "Register for ₹99",
    subtitle: "Price goes back to ₹999 after this batch closes.",
    countdown: "Offer ends in",
    days: "Days",
    hours: "Hours",
    minutes: "Min",
    seconds: "Sec",
    seatsLeft: "seats left in this batch",
    seatsFilled: "% seats filled",
    cta: "Register Now for ₹99",
    includes: "Includes live session, recording, templates and community access.",
    secure: "Secure payment",
    upi: "UPI • Cards • Net Banking • GPay • PhonePe",
  },
  form: {
    eyebrow: "Registration",
    title: "Reserve your seat",
    subtitle: "Takes less than a minute.",
    fullName: "Full Name",
    whatsapp: "WhatsApp Number",
    email: "Email Address",
    age: "Age",
    occupation: "Occupation",
    district: "District",
    state: "State",
    laptop: "Do you have a Laptop or PC?",
    yes: "Yes",
    no: "No",
    consentA: "I agree to the",
    privacy: "Privacy Policy",
    and: "and",
    terms: "Terms & Conditions",
    consentB: ".",
    submit: "Continue to Payment — ₹99",
    submitting: "Saving your details…",
    placeholders: {
      fullName: "Jaspreet Singh",
      whatsapp: "10-digit WhatsApp number",
      email: "you@example.com",
      age: "22",
      occupation: "Student / Shop Owner / Freelancer",
      district: "Ludhiana",
      state: "Punjab",
    },
    errors: {
      fullName: "Please enter your full name (at least 2 characters).",
      whatsapp: "Enter a valid 10-digit Indian mobile number.",
      email: "Enter a valid email address.",
      age: "Age must be between 13 and 90.",
      occupation: "Please tell us what you do.",
      district: "Please enter your district.",
      state: "Please enter your state.",
      consent: "Please accept the Privacy Policy and Terms & Conditions.",
      generic: "Something went wrong. Please try again.",
    },
    success: "Details saved. Taking you to payment…",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered",
    items: [
      { q: "Do I need coding knowledge?", a: "No. The entire class is designed for complete beginners. You describe what you want in plain language and the AI tools build it." },
      { q: "What language is the class in?", a: "The class is taught in simple Punjabi mixed with English so everyone can follow comfortably." },
      { q: "How long is the masterclass?", a: "It is a live practical session of approximately 2 hours, including a live Q&A at the end." },
      { q: "What do I need to join?", a: "A smartphone or laptop with a stable internet connection. A laptop or PC is recommended for practice." },
      { q: "Can I join from a mobile phone?", a: "Yes, you can attend from mobile. For building and editing websites, a laptop or PC is much more comfortable." },
      { q: "Will I get the recording?", a: "Yes. Registered participants get lifetime access to the session recording." },
      { q: "Is ₹99 the full price?", a: "Yes, ₹99 is the complete registration fee for this batch. There are no hidden charges." },
      { q: "Will I earn money after this class?", a: "This class teaches you a valuable skill and how freelancers work professionally. Income is never guaranteed and depends entirely on your effort, practice and consistency." },
      { q: "Do I get a certificate?", a: "Yes, a certificate of participation is provided after the session." },
      { q: "How will I receive the class link?", a: "The joining link is shared on your registered WhatsApp number and email before the session." },
      { q: "What if I miss the live session?", a: "You can watch the full recording, which stays available to you." },
      { q: "Which AI tools will be used?", a: "Modern AI website building tools that are beginner friendly. Everything is demonstrated live, step by step." },
      { q: "Do I need to buy a domain or hosting?", a: "Not for the class. We explain how publishing, hosting and domains work so you can decide later." },
      { q: "Is there any refund?", a: "Please read our Refund Policy. Because this is a digital live event with instant access, refunds are limited." },
      { q: "Is my payment secure?", a: "Yes. Payments are processed through a secure payment gateway. We never store your card or UPI details." },
      { q: "How do I contact support?", a: "Write to our support email or message us on WhatsApp. Details are in the footer and on the Contact page." },
    ],
  },
  urgency: {
    recent: "just registered from",
    ago: "min ago",
    exitTitle: "Wait — your ₹99 seat is still open",
    exitBody: "This batch closes soon and the price returns to ₹999. Reserve your seat now.",
    exitCta: "Claim my ₹99 seat",
    exitDismiss: "No thanks",
    stickyCta: "Join for ₹99",
    stickyStrike: "₹999",
  },
  trust: {
    secure: "Secure Payment",
    razorpay: "Powered by Razorpay",
    gst: "GST Compliant",
    support: "Human Support",
  },
  checkout: {
    title: "Complete your registration",
    subtitle: "You are one step away from your seat.",
    summary: "Order summary",
    item: "Live AI Website Building Demo Class",
    total: "Total payable",
    pay: "Pay ₹99 securely",
    processing: "Processing payment…",
    methods: "UPI • Cards • Net Banking • Google Pay • PhonePe",
    placeholder: "Payment gateway is in test mode. No real money will be charged.",
    missing: "We could not find your registration. Please fill the form again.",
    back: "Back to registration",
    failed: "Payment could not be completed. Please try again.",
  },
  thankyou: {
    title: "You're in!",
    subtitle: "Your seat for the live AI Website Building Demo Class is confirmed.",
    step1: "Join the private WhatsApp community",
    step1d: "All updates, resources and the joining link are shared there.",
    step2: "Check your WhatsApp and email",
    step2d: "We have sent your confirmation and details.",
    step3: "Come prepared",
    step3d: "Keep a laptop or PC ready if you have one, and join on time.",
    cta: "Join WhatsApp Community",
    home: "Back to home",
  },
  footer: {
    tagline: "Learn AI website building in your own language.",
    company: "Company",
    legal: "Legal",
    support: "Support",
    connect: "Connect",
    about: "About Us",
    contact: "Contact Us",
    faq: "FAQ",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    refund: "Refund Policy",
    cancellation: "Cancellation Policy",
    shipping: "Shipping & Delivery Policy",
    cookie: "Cookie Policy",
    disclaimer: "Disclaimer",
    instagram: "Instagram",
    youtube: "YouTube",
    whatsapp: "WhatsApp",
    email: "Email",
    rights: "All rights reserved.",
    disclaimerShort:
      "PenduGPT is an independent digital education brand. We teach skills; we never guarantee income.",
  },
  common: {
    backHome: "Back to home",
    updated: "Last updated",
    readMore: "Read more",
    close: "Close",
  },
  legal: {
    about: {
      title: "About Us",
      description: "PenduGPT is a digital education brand teaching AI website building in Punjabi and English.",
      intro:
        "PenduGPT was created for the learner who was always told that technology is 'not for people like us'. We teach modern AI skills in plain Punjabi and English, with practical live sessions.",
      sections: [
        {
          h: "What we do",
          p: [
            "We run live, practical masterclasses that teach people how to build professional websites using modern AI tools — without writing code.",
            "Our sessions are recorded and shared with participants, along with templates, prompts and community support.",
          ],
        },
        {
          h: "Who we serve",
          p: [
            "Students, beginners, freelancers, working professionals, shop owners, creators and small business owners across Punjab and India.",
          ],
        },
        {
          h: "Our promise",
          p: [
            "We teach practical skills honestly. We do not promise guaranteed income, jobs or overnight results. What you gain depends on your practice and consistency.",
          ],
        },
        {
          h: "Business details",
          p: [
            "Business name: PenduGPT (placeholder)",
            "Registered address: [Business Address Placeholder], Punjab, India",
            "GSTIN: [GST Placeholder]",
          ],
        },
      ],
    },
    contact: {
      title: "Contact Us",
      description: "Reach the PenduGPT support team by email, phone or WhatsApp.",
      intro: "We reply to every genuine message. Support hours are 10:00 AM to 7:00 PM IST, Monday to Saturday.",
      sections: [
        {
          h: "Support channels",
          p: [
            "Email: [Support Email Placeholder]",
            "Phone / WhatsApp: [Support Phone Placeholder]",
            "Instagram: @pendugpt",
          ],
        },
        {
          h: "Registered address",
          p: ["PenduGPT, [Business Address Placeholder], Punjab, India"],
        },
        {
          h: "Response time",
          p: ["We usually respond within 24 working hours. During live batch weeks, replies may take slightly longer."],
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      description: "How PenduGPT collects, uses and protects your personal information.",
      intro:
        "This Privacy Policy explains what information we collect when you register for a PenduGPT masterclass and how we use it.",
      sections: [
        {
          h: "Information we collect",
          p: [
            "Registration details you provide: full name, WhatsApp number, email address, age, occupation, district and state, and whether you have a laptop or PC.",
            "Payment status information from our payment gateway. We never receive or store your card, UPI PIN or banking credentials.",
            "Basic technical information such as browser type and pages visited, used only to improve the website.",
          ],
        },
        {
          h: "How we use your information",
          p: [
            "To confirm your registration and send you the joining link, reminders and session resources.",
            "To provide support and respond to your questions.",
            "To share occasional updates about future classes. You may opt out at any time.",
          ],
        },
        {
          h: "Data sharing",
          p: [
            "We do not sell your personal data. We share limited information only with service providers who help us operate — the payment gateway, communication tools and hosting providers — strictly for these purposes.",
          ],
        },
        {
          h: "Data security and retention",
          p: [
            "Your data is stored on secured servers with restricted access. We retain registration records only as long as needed for support, accounting and legal obligations.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "You may request access to, correction of, or deletion of your personal data by writing to [Support Email Placeholder]. We act on valid requests within a reasonable time.",
          ],
        },
        {
          h: "Children",
          p: ["Our services are intended for users aged 13 and above. Minors should register with parental consent."],
        },
      ],
    },
    terms: {
      title: "Terms & Conditions",
      description: "The terms that apply when you register for and attend a PenduGPT masterclass.",
      intro:
        "By registering for or attending a PenduGPT masterclass, you agree to these Terms & Conditions. Please read them carefully.",
      sections: [
        {
          h: "Nature of service",
          p: [
            "PenduGPT provides digital educational content in the form of live online sessions, recordings and downloadable resources. This is a digital service. No physical product is sold or shipped.",
          ],
        },
        {
          h: "Registration and access",
          p: [
            "Access is granted to the individual who registers. Your joining link is personal and must not be shared, resold or broadcast.",
            "You are responsible for providing accurate contact details. We are not liable if you miss a session because of incorrect details.",
          ],
        },
        {
          h: "Payments",
          p: [
            "The registration fee is ₹99 for the current batch. Payments are processed by Razorpay. Prices may change for future batches.",
          ],
        },
        {
          h: "Recording policy",
          p: [
            "Sessions may be recorded by us. By attending, you consent to your questions or chat messages appearing in a recording. You may not record, screen-capture, redistribute or republish our sessions.",
          ],
        },
        {
          h: "Intellectual property",
          p: [
            "All content, materials, templates, prompts and recordings remain the intellectual property of PenduGPT and are licensed to you for personal learning use only.",
          ],
        },
        {
          h: "User responsibilities",
          p: [
            "You agree to use the content lawfully, to behave respectfully in the community, and not to misuse AI tools to create harmful, misleading or infringing websites.",
          ],
        },
        {
          h: "No income guarantee",
          p: [
            "We teach a skill and explain how freelancers work professionally. We do not promise employment, clients, income or any specific outcome.",
          ],
        },
        {
          h: "Limitation of liability",
          p: [
            "To the maximum extent permitted by law, our total liability for any claim connected to the service is limited to the amount you paid us. We are not liable for indirect or consequential losses, or for interruptions caused by third-party platforms or your internet connection.",
          ],
        },
        {
          h: "Governing law",
          p: ["These terms are governed by the laws of India, with jurisdiction in the courts of Punjab, India."],
        },
      ],
    },
    refund: {
      title: "Refund Policy",
      description: "Refund eligibility for PenduGPT digital masterclass registrations.",
      intro:
        "Because our masterclass is a digital live event with immediate access to resources and a community, refunds are limited. Please read before paying.",
      sections: [
        {
          h: "Eligibility",
          p: [
            "A full refund is available if you request it at least 24 hours before the scheduled start of the live session and you have not accessed the bonus resources or recording.",
            "A full refund is provided if the session is cancelled by us and not rescheduled.",
          ],
        },
        {
          h: "Not eligible",
          p: [
            "Requests made after the live session has started or after the recording or resources have been accessed.",
            "Failure to attend, poor internet connectivity on your side, or a change of mind after attending.",
            "Duplicate payments are always refunded in full; contact support with the transaction details.",
          ],
        },
        {
          h: "How to request",
          p: [
            "Email [Support Email Placeholder] from your registered email with your name, WhatsApp number and payment reference.",
          ],
        },
        {
          h: "Processing time",
          p: [
            "Approved refunds are initiated within 5-7 working days and credited to the original payment method. Bank processing may take additional time.",
          ],
        },
      ],
    },
    cancellation: {
      title: "Cancellation Policy",
      description: "How cancellations and rescheduling work for PenduGPT masterclasses.",
      intro: "This policy explains cancellation by you and by us.",
      sections: [
        {
          h: "Cancellation by you",
          p: [
            "You may cancel your registration up to 24 hours before the session start time by writing to [Support Email Placeholder]. Refunds follow our Refund Policy.",
          ],
        },
        {
          h: "Cancellation or rescheduling by us",
          p: [
            "In rare cases such as technical failure or an emergency, we may reschedule the session. Registered participants are informed on WhatsApp and email and automatically moved to the new date.",
            "If you cannot attend the new date, you may request a full refund.",
          ],
        },
        {
          h: "Removal from the community",
          p: [
            "We may cancel access without refund if a participant abuses the community, shares paid content publicly, or behaves inappropriately.",
          ],
        },
      ],
    },
    shipping: {
      title: "Shipping & Delivery Policy",
      description: "PenduGPT sells digital services only — nothing is physically shipped.",
      intro: "PenduGPT provides a digital service. There is no physical shipping of any kind.",
      sections: [
        {
          h: "Digital delivery",
          p: [
            "After successful payment, your registration is confirmed instantly on the Thank You page and via WhatsApp and email.",
            "The live session joining link is delivered to your registered WhatsApp number and email before the session.",
          ],
        },
        {
          h: "Delivery timelines",
          p: [
            "Confirmation is immediate. Session links are shared at least a few hours before the class. The recording and bonus resources are shared within 48 hours after the session.",
          ],
        },
        {
          h: "Delivery issues",
          p: [
            "If you do not receive your access details, check your spam folder and then contact [Support Email Placeholder] with your payment reference.",
          ],
        },
      ],
    },
    cookie: {
      title: "Cookie Policy",
      description: "How PenduGPT uses cookies and local storage on this website.",
      intro: "We keep our use of cookies minimal and functional.",
      sections: [
        {
          h: "What we store",
          p: [
            "Local storage: your selected language preference, so the site opens in your language next time.",
            "Essential cookies: needed for the payment gateway and basic site security.",
            "Analytics: aggregated, anonymised page-view information to understand what content is helpful.",
          ],
        },
        {
          h: "Third parties",
          p: [
            "Our payment gateway and any embedded video or social content may set their own cookies, governed by their own policies.",
          ],
        },
        {
          h: "Managing cookies",
          p: [
            "You can clear or block cookies and local storage in your browser settings. Blocking essential cookies may prevent payment from working.",
          ],
        },
      ],
    },
    disclaimer: {
      title: "Disclaimer",
      description: "Important information about outcomes, affiliations and third-party tools.",
      intro: "Please read this disclaimer carefully before registering.",
      sections: [
        {
          h: "Educational purpose only",
          p: [
            "All content is provided for educational purposes. It is not professional, legal, financial or career advice.",
          ],
        },
        {
          h: "No income or results guarantee",
          p: [
            "We do not promise or guarantee income, clients, jobs or any specific result. Any examples shown are illustrative, not typical outcomes. Your results depend on your effort, practice and market conditions.",
          ],
        },
        {
          h: "Third-party tools",
          p: [
            "We demonstrate third-party AI tools and platforms. We are not affiliated with, endorsed by, or responsible for those platforms, their pricing, availability or policies, which may change at any time.",
          ],
        },
        {
          h: "Accuracy",
          p: [
            "AI tools evolve quickly. While we keep our content current, we do not warrant that every detail remains accurate at all times.",
          ],
        },
        {
          h: "External links",
          p: ["Our website may link to external sites. We are not responsible for their content or practices."],
        },
      ],
    },
  },
};

export type Dict = typeof en;
