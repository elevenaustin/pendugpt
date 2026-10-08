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
    badge: "SPECIAL BATCH ADMISSION",
    headlineA: "Regular Price ₹20,000",
    headlineB: "Special Admission",
    headlineC: "At ₹997!",
    description: "Complete Masterclass enrollment is open. Get instant access to all recorded sessions, Drive vault, and master AI website building!",
    timerLabel: "SPECIAL OFFER EXPIRES IN",
    originalPrice: "₹20,000",
    offerPrice: "₹997 ONLY",
    claimBtn: "Claim Your ₹997 Seat Now",
    guarantee: "100% Money-Back Satisfaction Guarantee",
  },
  nav: {
    curriculum: "Curriculum",
    demo: "Masterclass Demo",
    testimonials: "Testimonials",
    pricing: "Pricing",
    faq: "FAQ",
    contact: "Contact",
    join: "Join Now",
    menu: "Menu",
    language: "Language",
  },
  hero: {
    badge: "COMPLETE AI WEBSITE MASTERCLASS",
    titleA: "Get Instant Access to Complete Masterclass &",
    titleB: "Learn AI Website Building",
    subtitle:
      "Get instant access to the Complete Masterclass with all recorded sessions. Learn how to build professional AI-powered websites without coding, publish them online, and start getting freelance clients.",
    bullets: [
      "No Coding Required",
      "Beginner Friendly",
      "All Recorded Sessions Included",
      "Build Real Websites",
      "Learn Modern AI Tools",
    ],
    primary: "Enroll in Masterclass — Flat ₹997",
    secondary: "Watch Preview",
    videoCaption: "Preview: what you will learn in the complete masterclass",
    videoFallback: "Preview video coming soon",
  },
  limitedSpots: {
    eyebrow: "HIGH DEMAND SPECIAL BATCH",
    title: "Limited Seats Available For Masterclass",
    subtitle: "Regular price is ₹20,000 — Grab instant access now at flat ₹997 before this batch closes.",
    seatsRemaining: "Seats Remaining",
    seatsFilled: "Batch Capacity Filled",
    closingSoon: "Enrollment Closing Soon",
    cta: "Enroll in Masterclass Now — Flat ₹997",
    guarantee: "100% Satisfaction Guarantee · Instant Access to All Recorded Sessions & Google Drive Vault",
  },
  price: {
    fee: "Masterclass Admission Fee",
    only: "only",
    original: "₹20,000",
    now: "₹997",
    limited: "Special Batch Offer",
    save: "95% OFF",
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
    eyebrow: "Project showcase",
    title: "The kind of websites you will build",
    subtitle: "Real layouts, built with AI in minutes.",
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
    eyebrow: "AI Demo",
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
    note: "Demo animation. The real workflow is taught step by step in all recorded masterclass sessions.",
  },
  curriculum: {
    eyebrow: "Curriculum",
    title: "Everything covered in the complete masterclass",
    subtitle: "A clear path from your first prompt to your first client conversation.",
    items: [
      { t: "Introduction", d: "How AI website building actually works today." },
      { t: "AI Website Generation", d: "Turning a simple idea into a full website." },
      { t: "Website Editing", d: "Changing text, sections, colours and images." },
      { t: "Publishing", d: "Taking your website online worldwide." },
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
    title: "Included with your ₹997 registration",
    items: [
      { t: "Prompt Library", d: "Ready-to-use prompts for fast results." },
      { t: "Website Templates", d: "Starting points for common businesses." },
      { t: "Proposal Templates", d: "Professional client-facing documents." },
      { t: "Pricing Calculator", d: "Price your work with confidence." },
      { t: "Certificate", d: "Certificate of participation." },
      { t: "Private Community", d: "Learn together on WhatsApp." },
      { t: "Lifetime Recording", d: "All Recorded Sessions — Rewatch anytime with lifetime access." },
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
      { n: "Manpreet S.", c: "Bathinda", q: "Clear, practical and no time wasting. Worth way more than ₹997." },
      { n: "Ravneet K.", c: "Mohali", q: "The templates and prompt library saved me hours on my first project." },
    ],
  },
  offer: {
    eyebrow: "Special Batch Offer",
    title: "Enroll for Flat ₹997",
    subtitle: "Regular price is ₹20,000. Save ₹19,003 today with instant access to all recorded sessions.",
    countdown: "Offer ends in",
    days: "Days",
    hours: "Hours",
    minutes: "Min",
    seconds: "Sec",
    seatsLeft: "seats left in this batch",
    seatsFilled: "% seats filled",
    cta: "Enroll Now for Flat ₹997 — Instant Access",
    includes: "Includes all 7 HD recorded classes, capstone project, 100+ prompt templates, and Google Drive access.",
    secure: "Secure payment",
    upi: "UPI • Cards • Net Banking • GPay • PhonePe",
  },
  form: {
    eyebrow: "Enrollment",
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
    submit: "Continue to Payment — ₹997",
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
      { q: "Do I need coding knowledge?", a: "No. The entire masterclass is designed for complete beginners. You describe what you want in plain language and the AI tools build it." },
      { q: "What language is the class in?", a: "The masterclass is taught in simple Punjabi mixed with English so everyone can follow comfortably." },
      { q: "How long is the masterclass?", a: "It includes 7 comprehensive practical HD recorded classes plus a final capstone project and walkthroughs." },
      { q: "What do I need to join?", a: "A smartphone or laptop with a stable internet connection. A laptop or PC is recommended for practice." },
      { q: "Can I join from a mobile phone?", a: "Yes, you can watch all recorded sessions on mobile. For building and editing websites, a laptop or PC is much more comfortable." },
      { q: "Will I get the recorded sessions?", a: "Yes! You get instant lifetime access to all recorded sessions, templates, and the complete Google Drive folder immediately after enrollment." },
      { q: "Is ₹997 the full price?", a: "Yes, flat ₹997 is the complete admission fee (slashed from regular ₹20,000). There are zero hidden or recurring charges." },
      { q: "Will I earn money after this class?", a: "This masterclass teaches you a valuable skill and how freelancers work professionally. Income is never guaranteed and depends entirely on your effort, practice and consistency." },
      { q: "Do I get a certificate?", a: "Yes, a certificate of completion is provided after the masterclass." },
      { q: "How will I receive the course access?", a: "Instant access to the complete masterclass folder and all recorded sessions is shared on your registered WhatsApp number and screen immediately after payment." },
      { q: "Can I learn at my own pace?", a: "Yes! All 7 practical classes are pre-recorded in HD and available with lifetime access so you can watch, pause, and rewind whenever convenient." },
      { q: "Which AI tools will be used?", a: "Modern AI website building tools that are beginner friendly. Everything is demonstrated step by step." },
      { q: "Do I need to buy a domain or hosting?", a: "Not for the class. We explain how publishing, hosting and domains work so you can decide later." },
      { q: "Is there any refund?", a: "Please read our Refund Policy. Because this is a digital masterclass with instant Drive access, refunds are subject to policy." },
      { q: "Is my payment secure?", a: "Yes. Payments are processed through a PCI-DSS secure Razorpay payment gateway. We never store your card or UPI details." },
      { q: "How do I contact support?", a: "Write to our support email or message us on WhatsApp. Details are in the footer and on the Contact page." },
    ],
  },
  urgency: {
    recent: "just registered from",
    ago: "min ago",
    exitTitle: "Wait — your ₹997 seat is still open",
    exitBody: "Regular price is ₹20,000. This special batch closes soon and the price will return to regular ₹20,000. Secure your instant access to all recorded sessions now.",
    exitCta: "Claim my ₹997 Seat",
    exitDismiss: "No thanks",
    stickyCta: "Enroll for Flat ₹997",
    stickyStrike: "₹20,000",
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
    item: "Complete AI Website Masterclass (All Recorded Sessions + Drive Vault)",
    total: "Total payable",
    pay: "Pay Flat ₹997 Securely",
    processing: "Processing payment…",
    methods: "UPI • Cards • Net Banking • Google Pay • PhonePe",
    placeholder: "Payment gateway is active and secure.",
    missing: "We could not find your registration. Please fill the form again.",
    back: "Back to registration",
    failed: "Payment could not be completed. Please try again.",
  },
  thankyou: {
    title: "You're in!",
    subtitle: "Your enrollment for the Complete AI Website Masterclass (All Recorded Sessions) is confirmed.",
    step1: "Join the private WhatsApp community",
    step1d: "All updates, resources and masterclass Drive links are shared there.",
    step2: "Check your WhatsApp and email",
    step2d: "We have sent your confirmation and instant access details.",
    step3: "Start Learning Immediately",
    step3d: "Access all recorded sessions, download project starter kits, and learn at your own pace.",
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
        "PenduGPT was created for the learner who was always told that technology is 'not for people like us'. We teach modern AI skills in plain Punjabi and English, with comprehensive recorded sessions.",
      sections: [
        {
          h: "What we do",
          p: [
            "We provide practical recorded masterclasses that teach people how to build professional websites using modern AI tools — without writing code.",
            "Our sessions are recorded in HD and shared with participants, along with templates, prompts and community support.",
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
            "Business name: PenduGPT (Proprietor: Khushpreet Singh)",
            "Registered address: Sangrur, Punjab, India - 148001",
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
            "Email: igkhushishere@gmail.com",
            "Phone / WhatsApp: +91 77175 26430",
            "Instagram: @pendugpt",
          ],
        },
        {
          h: "Registered address",
          p: ["PenduGPT, Sangrur, Punjab, India - 148001"],
        },
        {
          h: "Response time",
          p: ["We usually respond within 24 working hours."],
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
            "To confirm your registration and send you instant Google Drive masterclass access, templates and session resources.",
            "To provide support and respond to your questions.",
            "To share occasional updates about future modules. You may opt out at any time.",
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
            "You may request access to, correction of, or deletion of your personal data by writing to igkhushishere@gmail.com. We act on valid requests within a reasonable time.",
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
      description: "The terms that apply when you register for and access a PenduGPT masterclass.",
      intro:
        "By registering for or accessing a PenduGPT masterclass, you agree to these Terms & Conditions. Please read them carefully.",
      sections: [
        {
          h: "Nature of service",
          p: [
            "PenduGPT provides digital educational content in the form of recorded HD video sessions, templates and downloadable resources. This is a digital service. No physical product is sold or shipped.",
          ],
        },
        {
          h: "Registration and access",
          p: [
            "Access is granted to the individual who registers. Your Google Drive access is personal and must not be shared, resold or broadcast.",
            "You are responsible for providing accurate contact details. We are not liable if access is delayed because of incorrect details.",
          ],
        },
        {
          h: "Payments",
          p: [
            "The registration fee is flat ₹997 for the current batch (slashed from regular ₹20,000). Payments are processed by Razorpay. Prices may change for future batches.",
          ],
        },
        {
          h: "Recording policy",
          p: [
            "All masterclass sessions are pre-recorded in HD and provided with lifetime access. You may not screen-capture, redistribute, resell or republish our sessions or proprietary prompt vaults.",
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
          p: ["These terms are governed by the laws of India, with jurisdiction in the courts of Sangrur, Punjab, India."],
        },
      ],
    },
    refund: {
      title: "Refund Policy",
      description: "Refund eligibility for PenduGPT digital masterclass registrations.",
      intro:
        "Because our masterclass is a digital self-paced product with instant access to all recorded sessions, templates and Google Drive vault, refunds are limited. Please read before paying.",
      sections: [
        {
          h: "Eligibility",
          p: [
            "In eligible scenarios (such as duplicate payments or technical non-delivery), approved refunds are initiated within 24 to 48 hours and credited within 5 to 7 business days.",
            "A full refund is provided if course materials cannot be delivered or accessed due to an irremediable technical failure on our platform.",
          ],
        },
        {
          h: "Not eligible",
          p: [
            "Requests made after accessing or downloading the course materials, prompt vault, or Google Drive folder.",
            "Change of mind after enrollment.",
            "Duplicate payments are always refunded in full; contact support with the transaction details.",
          ],
        },
        {
          h: "How to request",
          p: [
            "Email igkhushishere@gmail.com with your name, registered WhatsApp number and Razorpay payment reference.",
          ],
        },
        {
          h: "Processing time",
          p: [
            "Approved refunds are initiated within 24-48 hours and credited to the original payment method within 5-7 business days.",
          ],
        },
      ],
    },
    cancellation: {
      title: "Cancellation Policy",
      description: "How cancellations work for PenduGPT masterclasses.",
      intro: "This policy explains cancellation terms for our digital masterclass.",
      sections: [
        {
          h: "Cancellation by you",
          p: [
            "Because digital assets and course files are delivered immediately upon payment, order cancellations after payment completion are generally not permitted.",
          ],
        },
        {
          h: "Technical non-delivery guarantee",
          p: [
            "In the rare event that access to our course repository cannot be delivered due to technical failures that cannot be resolved within 48 hours, students will receive an immediate 100% full refund.",
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
            "After successful payment of flat ₹997, your enrollment is confirmed instantly with immediate access to all recorded sessions, templates, and Google Drive vault.",
            "Access details are delivered directly to your registered WhatsApp number and email within 0 to 5 minutes.",
          ],
        },
        {
          h: "Delivery timelines",
          p: [
            "Confirmation is immediate (0 to 5 minutes). All 7 practical recorded classes, capstone walkthroughs, and bonus prompt vaults are available instantly.",
          ],
        },
        {
          h: "Delivery issues",
          p: [
            "If you do not receive your access details, check your spam folder and contact igkhushishere@gmail.com with your payment reference.",
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
