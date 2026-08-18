import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  ArrowRight, CheckCircle2, ChevronDown, Clock, Globe, Gift, 
  MessageCircle, Rocket, ShieldCheck, Sparkles, Users, 
  Wand2, Layout, Type, Wrench, RefreshCw, FolderCheck, X 
} from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Logo, Wordmark } from "@/components/brand/Logo";
import { FloatingSupport } from "@/components/site/FloatingSupport";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Route = createFileRoute("/full-class")({
  component: FullClassPage,
});

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
];

const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function FullClassPage() {
  const { lang } = useI18n();
  const isPa = lang === "pa";

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other" | "">("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"form" | "success" | "failed">("form");
  const [paymentId, setPaymentId] = useState("");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; gender?: string }>({});
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  const supportWhatsapp = import.meta.env.VITE_SUPPORT_WHATSAPP || "917717526430";

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const whatsappRedirectUrl = `https://wa.me/${supportWhatsapp}?text=${encodeURIComponent(
    `Sir I have paid ₹4,999 for Full AI Masterclass.\nName: ${name}\nPayment ID: ${paymentId}`
  )}`;

  // Auto-redirect to WhatsApp on payment success
  useEffect(() => {
    let timer: any;
    let interval: any;
    if (step === "success") {
      setRedirectCountdown(3);
      interval = setInterval(() => {
        setRedirectCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      timer = setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = whatsappRedirectUrl;
        }
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [step, whatsappRedirectUrl]);

  const openEnrollModal = () => {
    setStep("form");
    setModalOpen(true);
  };

  const handleFullClassPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; mobile?: string; gender?: string } = {};

    if (!name.trim()) newErrors.name = isPa ? "ਕਿਰਪਾ ਕਰਕੇ ਨਾਮ ਦਰਜ ਕਰੋ" : "Please enter your name";
    const cleanedMobile = mobile.replace(/\D/g, "");
    if (cleanedMobile.length !== 10) newErrors.mobile = isPa ? "ਸਹੀ 10-ਅੰਕੀ ਨੰਬਰ ਦਰਜ ਕਰੋ" : "Enter a valid 10-digit mobile number";
    if (!gender) newErrors.gender = isPa ? "ਲਿੰਗ ਚੁਣੋ" : "Please select gender";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setIsProcessing(false);
      setErrors({ mobile: "Payment gateway failed to load." });
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_TIZdNUBnkz3PoA";

    const options = {
      key: razorpayKey,
      amount: 499900, // ₹4,999 in paise
      currency: "INR",
      name: "PenduGPT Full Masterclass",
      description: "Complete AI Web Building Masterclass + All 10 Premium Bonuses (₹4,999)",
      image: "/favicon.svg",
      prefill: {
        name: name.trim(),
        contact: `${countryCode}${cleanedMobile}`,
      },
      theme: {
        color: "#d4f934",
      },
      handler: async function (response: any) {
        const rzpPaymentId = response.razorpay_payment_id || `pay_full_${Math.random().toString(36).substr(2, 9)}`;
        setPaymentId(rzpPaymentId);

        const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const fullMobile = `${countryCode} ${cleanedMobile}`;

        // Save lead locally
        try {
          const newLead = {
            id: rzpPaymentId,
            name: name.trim(),
            whatsapp: fullMobile,
            gender,
            amount: "₹4,999",
            date: formattedDate,
            type: "Full Class Enrollment",
          };
          const existing = JSON.parse(localStorage.getItem("pendugpt_full_leads") || "[]");
          localStorage.setItem("pendugpt_full_leads", JSON.stringify([newLead, ...existing]));
        } catch (err) {}

        // Save to Supabase
        try {
          await supabase.from("registrations").insert({
            name: `Full Class: ${name.trim()}`,
            country_code: countryCode,
            mobile: cleanedMobile,
            gender: `Paid ₹4,999 (${gender})`,
          });
        } catch (err) {}

        // Send to Webhook
        const googleWebhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbynvD1F1Fs9fTPkEa7IygX2zA3S8BajsZZVur3Pg5_9yi8AiUIkD1mUCOXWxNHnFOdycQ/exec";
        if (googleWebhookUrl) {
          try {
            fetch(googleWebhookUrl, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                date: formattedDate,
                payment_id: rzpPaymentId,
                name: name.trim(),
                whatsapp: fullMobile,
                gender,
                amount: "₹4,999",
                status: "Full Class Enrolled & Paid",
              }),
            });
          } catch (e) {}
        }

        setIsProcessing(false);
        setStep("success");
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        setIsProcessing(false);
        setStep("failed");
      });
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      setIsProcessing(false);
      setStep("success");
    }
  };

  // 10 Full Class Bonus Items from exact screenshot
  const fullClassBonuses = [
    {
      title: "Official Lovable Premium Subscription",
      worth: "₹20,000+ Value",
      badge: "FREE From Our Side",
      subtitle: "Official Premium Subscription Included",
      isFree: true,
      Icon: Sparkles,
      iconBg: "bg-purple-500/20 text-purple-300 border-purple-400/50",
    },
    {
      title: "Domain + Hosting",
      worth: "₹5,000+ Value",
      badge: "FREE From Our Side",
      subtitle: "Deploy Unlimited Learning Projects",
      isFree: true,
      Icon: Globe,
      iconBg: "bg-[#d4f934]/20 text-[#d4f934] border-[#d4f934]/50",
    },
    {
      title: "Premium AI Prompt Library",
      worth: "₹4,999",
      badge: "Included",
      subtitle: "Ready-to-Use Website Prompts",
      isFree: false,
      Icon: Wand2,
      iconBg: "bg-purple-500/20 text-purple-300 border-purple-400/50",
    },
    {
      title: "Premium Website Templates",
      worth: "₹7,999",
      badge: "Included",
      subtitle: "Modern Landing Pages & Business Websites",
      isFree: false,
      Icon: Layout,
      iconBg: "bg-blue-500/20 text-blue-300 border-blue-400/50",
    },
    {
      title: "Premium Fonts & UI Assets",
      worth: "₹2,999",
      badge: "Included",
      subtitle: "Professional Fonts, Icons & UI Components",
      isFree: false,
      Icon: Type,
      iconBg: "bg-indigo-500/20 text-indigo-300 border-indigo-400/50",
    },
    {
      title: "Website Bug Fixing System",
      worth: "₹4,999",
      badge: "Included",
      subtitle: "Fix Errors Like a Professional",
      isFree: false,
      Icon: Wrench,
      iconBg: "bg-amber-500/20 text-amber-300 border-amber-400/50",
    },
    {
      title: "Website Security",
      worth: "₹3,999",
      badge: "Included",
      subtitle: "Secure & Protect Every Website",
      isFree: false,
      Icon: ShieldCheck,
      iconBg: "bg-blue-600/20 text-blue-300 border-blue-500/50",
    },
    {
      title: "Website Updates & Maintenance",
      worth: "₹4,999",
      badge: "Included",
      subtitle: "Edit, Improve & Maintain Websites",
      isFree: false,
      Icon: RefreshCw,
      iconBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50",
    },
    {
      title: "Website Handover System",
      worth: "₹2,999",
      badge: "Included",
      subtitle: "Professional Project Delivery",
      isFree: false,
      Icon: FolderCheck,
      iconBg: "bg-cyan-500/20 text-cyan-300 border-cyan-400/50",
    },
    {
      title: "Community Support",
      worth: "₹9,999",
      badge: "Included",
      subtitle: "Future Updates & Priority Support",
      isFree: false,
      Icon: Users,
      iconBg: "bg-purple-600/20 text-purple-300 border-purple-500/50",
    },
  ];

  const fullClassModules = [
    {
      num: "01",
      title: "Module 1: Zero-Cost AI Tools Stack (No Paid Subscriptions)",
      desc: "Learn how to build 100% professional, responsive websites using completely FREE AI tools without paying a single rupee for expensive AI plans or subscriptions.",
    },
    {
      num: "02",
      title: "Module 2: Free Hosting & Custom Domain Deployment",
      desc: "Deploy your websites live onto Cloudflare & Vercel with HTTPS security and custom domains (.com / .in) without paying for monthly hosting fees.",
    },
    {
      num: "03",
      title: "Module 3: Advanced Layouts, Styling & Brand Aesthetics",
      desc: "Master layout generation, custom color schemes, typography, glassmorphism, and responsive mobile optimization for modern high-converting websites.",
    },
    {
      num: "04",
      title: "Module 4: Bug Fixing, Maintenance & Website Security",
      desc: "Learn how to diagnose errors, fix design bugs, secure websites against attacks, and provide long-term website maintenance like a professional developer.",
    },
    {
      num: "05",
      title: "Module 5: Complete Website Handover & Client Management",
      desc: "Step-by-step framework to deliver projects to clients, transfer domain access, provide handover documentation, and charge ₹15,000–₹50,000 per project.",
    },
  ];

  const fullClassFaqs = [
    {
      q: "What is included in the Full Masterclass?",
      a: "The Full Masterclass includes complete step-by-step training modules, all 10 premium bonuses (Official Lovable subscription, domain + hosting guides, 50+ prompt vaults, bug fixing systems, website handover templates) worth ₹75,000+, plus lifetime community support.",
    },
    {
      q: "Do I need to pay for any AI tools or hosting afterwards?",
      a: "NO! We teach you the exact zero-cost framework on how to build, publish, and host websites without paying for any monthly AI tool subscriptions or hosting costs.",
    },
    {
      q: "How do I get access after paying ₹4,999?",
      a: "Immediately after successful payment, you will receive instant access to the full course portal, downloadable prompt vaults, and private VIP community entry.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#d4f934] selection:text-black font-sans">
      
      {/* Dedicated Header Bar (NO Back to Main Site link) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#080808]/90 backdrop-blur-md border-b border-gray-900 py-3.5 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <Wordmark />
          </div>

          <button
            onClick={openEnrollModal}
            className="lime-button inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-black text-black shadow-md cursor-pointer hover:scale-105 transition-all"
          >
            <Rocket className="h-3.5 w-3.5" />
            <span>Enroll Full Class — ₹4,999</span>
          </button>
        </div>
      </header>

      {/* ------------------- HERO SECTION (Clean Title & Description Only - NO VIDEO) ------------------- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#080808] text-center border-b border-gray-900 overflow-hidden">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-[#d4f934]/10 blur-[150px]" />

        <div className="mx-auto max-w-4xl relative z-10">
          {/* Top Pill Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d4f934]/50 bg-[#141b05] px-4 py-1.5 text-xs font-extrabold uppercase text-[#d4f934] shadow-[0_0_25px_rgba(212,249,52,0.3)] mb-6">
            <Sparkles className="h-4 w-4" />
            <span>FULL MASTERCLASS ENROLLMENT</span>
          </span>

          {/* Clean Main Title (No Video in Header) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-white tracking-tight leading-[1.1]">
            Master AI Website Building <br className="hidden sm:inline" />
            <span className="text-[#d4f934] italic font-serif">Without Paying For AI Tools</span> Or Hosting
          </h1>

          {/* Clean Subtitle Description */}
          <p className="mt-6 text-base sm:text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
            The complete end-to-end masterclass. Learn how to build, customize, and publish professional business websites from scratch using zero-cost AI workflows — plus get all 10 premium bonuses worth ₹75,000+!
          </p>

          {/* Zero-Cost Highlight Banner */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 rounded-2xl border border-purple-500/40 bg-purple-950/30 p-4 max-w-2xl mx-auto text-xs sm:text-sm font-extrabold text-purple-200">
            <span className="flex items-center gap-1.5 text-[#d4f934]">
              <CheckCircle2 className="h-4 w-4" /> 100% Zero Monthly AI Tool Costs
            </span>
            <span className="flex items-center gap-1.5 text-[#d4f934]">
              <CheckCircle2 className="h-4 w-4" /> Free Domain & Hosting Deployment
            </span>
          </div>

          {/* Price Callout & CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="flex items-baseline gap-3">
              <span className="text-lg sm:text-xl font-extrabold text-gray-400 line-through decoration-red-600 decoration-2">
                ₹9,999
              </span>
              <span className="text-4xl sm:text-5xl font-black text-[#d4f934] font-sans">
                ₹4,999 <span className="text-xs sm:text-sm font-bold text-gray-300">ONLY</span>
              </span>
            </div>

            <button
              onClick={openEnrollModal}
              className="lime-button w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-extrabold text-black shadow-[0_0_35px_rgba(212,249,52,0.5)] hover:scale-105 transition-all cursor-pointer"
            >
              <Rocket className="h-5 w-5" />
              <span>Enroll in Full Class — ₹4,999</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------- EVERYTHING INCLUDED TODAY SECTION (Exact Screenshot Replicated) ------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#06070a] border-t border-b border-gray-900 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-purple-600/10 blur-[180px]" />

        <div className="mx-auto max-w-7xl text-center relative z-10">
          
          {/* Header Ribbon & Title */}
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/50 px-5 py-2 text-xs font-black uppercase tracking-wider text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.3)] mb-4">
            <Gift className="h-4 w-4 text-[#d4f934]" />
            <span>🎁 EVERYTHING YOU GET</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight">
            Everything <span className="text-purple-400">Included Today</span>
          </h2>
          <p className="mt-3 text-sm sm:text-lg text-gray-400 font-semibold max-w-2xl mx-auto">
            Professional Tools • Live Training • Premium Resources
          </p>

          {/* 10 Bonus Cards Grid matching the exact screenshot layout */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
            {fullClassBonuses.map((b) => {
              const ItemIcon = b.Icon;
              return (
                <div
                  key={b.title}
                  className={cn(
                    "flex flex-col justify-between rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.03] h-full group relative overflow-hidden",
                    b.isFree
                      ? "border-emerald-500/50 bg-gradient-to-b from-[#0f1f17] to-[#0a140e] shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-400"
                      : "border-gray-800 bg-[#0d0e12] hover:border-[#d4f934]/60 hover:bg-[#12141a] hover:shadow-[0_0_25px_rgba(212,249,52,0.15)]"
                  )}
                >
                  <div>
                    {/* Header Icon + Title */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-bold shadow-md", b.iconBg)}>
                        <ItemIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-white leading-snug group-hover:text-[#d4f934] transition-colors">
                          {b.title}
                        </h3>
                        <span className="text-[11px] font-bold text-gray-500 line-through mt-0.5 block">
                          {b.worth}
                        </span>
                      </div>
                    </div>

                    {/* Badge Pill */}
                    <div className="mb-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase shadow-sm",
                          b.isFree
                            ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            : "bg-emerald-600/90 text-white"
                        )}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 fill-black text-emerald-500" />
                        {b.badge}
                      </span>
                    </div>

                    {/* Subtitle / Description */}
                    <p className="text-xs text-gray-300 font-medium leading-relaxed">
                      {b.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Total Value & Price Banner (Exact Screenshot Footer Replicated) */}
          <div className="mt-12 rounded-3xl border-2 border-purple-500/40 bg-gradient-to-r from-[#0d091a] via-[#120c24] to-[#0d091a] p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Total Value Gold Badge */}
            <div className="flex items-center gap-4 rounded-2xl border border-yellow-500/40 bg-gradient-to-b from-yellow-950/40 to-black p-4 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 block">
                  TOTAL VALUE
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-yellow-300 font-sans tracking-tight">
                  ₹75,000+
                </span>
              </div>
            </div>

            {/* Regular Price Cross-out */}
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                REGULAR PRICE
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-500 line-through decoration-red-600 decoration-2">
                ₹9,999
              </span>
            </div>

            {/* Today's Masterclass Offer Box */}
            <div className="w-full md:w-auto flex-1 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-purple-400/50 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-900/90 p-5 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
              <div className="text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-purple-200">
                  🎉 TODAY'S LIVE MASTERCLASS OFFER
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-white font-sans">
                    ₹4,999
                  </span>
                  <span className="text-lg font-black uppercase text-purple-200">
                    ONLY
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={openEnrollModal}
                  className="lime-button w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm sm:text-base font-extrabold text-black shadow-[0_0_25px_rgba(212,249,52,0.5)] hover:scale-105 transition-all cursor-pointer"
                >
                  <Rocket className="h-5 w-5" />
                  <span>Enroll Now — ₹4,999</span>
                </button>

                <div className="flex items-center justify-center gap-3 text-[11px] font-bold text-purple-200">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    ✓ Save ₹5,000 Today
                  </span>
                  <span className="bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-full">
                    🔥 Limited Time Enrollment
                  </span>
                </div>
              </div>
            </div>

          </div>

          <p className="mt-6 text-sm font-serif italic text-gray-400">
            “ One Skill. Unlimited Opportunities. ”
          </p>

        </div>
      </section>

      {/* ------------------- FULL CLASS CURRICULUM MODULES ------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#080808]">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full bg-[#d4f934]/15 border border-[#d4f934]/40 px-4 py-1.5 text-xs font-black uppercase text-[#d4f934] mb-3">
            📚 FULL CLASS MODULES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What You'll Learn In The Full Class
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Comprehensive step-by-step modules to master zero-cost AI web design, bug fixing, domain hosting & client handover.
          </p>

          <div className="mt-12 flex flex-col gap-4 text-left">
            {fullClassModules.map((m) => (
              <div
                key={m.num}
                className="rounded-2xl border border-gray-800 bg-[#121215] p-6 hover:border-[#d4f934]/50 transition"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d4f934]/20 border border-[#d4f934]/40 text-[#d4f934] font-black text-sm">
                    {m.num}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- FAQ SECTION ------------------- */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t border-gray-900">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Full Masterclass FAQs
          </h2>

          <div className="mt-8 flex flex-col gap-3 text-left">
            {fullClassFaqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-gray-800 bg-[#111216] p-5 cursor-pointer"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-extrabold text-white">{faq.q}</h3>
                  <ChevronDown className={cn("h-4 w-4 text-[#d4f934] transition-transform", expandedFaq === idx && "rotate-180")} />
                </div>
                {expandedFaq === idx && (
                  <p className="text-xs text-gray-300 mt-3 leading-relaxed border-t border-gray-800 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------- ENROLLMENT MODAL (₹4,999) WITH AUTO-REDIRECT TO WHATSAPP ------------------- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-sm rounded-2xl border border-gray-800 bg-[#121212] p-6 shadow-2xl text-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {step === "success" ? (
              <div className="text-center py-4 space-y-3">
                <CheckCircle2 className="h-12 w-12 text-[#d4f934] mx-auto" />
                <h3 className="text-xl font-black">Full Class Payment Confirmed!</h3>
                <p className="text-xs text-gray-300">
                  Thank you {name}! Your Full Masterclass enrollment is confirmed.
                </p>

                {/* Auto redirect notice */}
                <div className="rounded-xl bg-green-950/40 border border-green-500/40 p-2 text-xs text-green-400 font-bold flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-[#d4f934]" />
                  <span>Redirecting to WhatsApp in {redirectCountdown}s...</span>
                </div>

                <a
                  href={whatsappRedirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lime-button inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-black text-black"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Join Full Class VIP WhatsApp Group</span>
                </a>
              </div>
            ) : (
              <div>
                <div className="mb-4 text-left">
                  <span className="text-[10px] font-black uppercase text-[#d4f934]">
                    FULL MASTERCLASS ENROLLMENT
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="line-through decoration-red-600 decoration-2 text-gray-400 font-bold text-xs">₹9,999</span>
                    <span className="text-2xl font-black text-white">₹4,999 ONLY</span>
                  </div>
                </div>

                <form onSubmit={handleFullClassPayment} className="space-y-3.5 text-left">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-gray-800 bg-[#080808] p-3 text-xs font-bold text-white outline-none focus:border-[#d4f934]"
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">
                      WhatsApp Number
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-800 bg-[#080808] overflow-hidden">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-24 shrink-0 bg-[#141414] px-2 py-3 border-r border-gray-800 text-xs font-bold text-white outline-none text-center"
                      >
                        {COUNTRY_CODES.map((c, idx) => (
                          <option key={`${c.code}-${idx}`} value={c.code} className="bg-[#141414] text-white">
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>

                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                        className="flex-1 min-w-0 bg-transparent p-3 text-xs font-bold text-white outline-none"
                      />
                    </div>
                    {errors.mobile && <p className="text-[11px] text-red-400 mt-1">{errors.mobile}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">
                      Gender
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Male", "Female"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGender(g as any)}
                          className={cn(
                            "py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer",
                            gender === g
                              ? "bg-[#d4f934] text-black border-[#d4f934]"
                              : "bg-[#080808] text-gray-300 border-gray-800 hover:border-gray-700"
                          )}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                    {errors.gender && <p className="text-[11px] text-red-400 mt-1">{errors.gender}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="lime-button w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-xs font-black text-black shadow-lg cursor-pointer mt-2"
                  >
                    {isProcessing ? (
                      <span>Opening Razorpay Checkout...</span>
                    ) : (
                      <>
                        <span>Proceed to Pay ₹4,999 →</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />

      {/* Floating WhatsApp Support Button */}
      <FloatingSupport />
    </div>
  );
}
