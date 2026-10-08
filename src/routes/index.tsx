import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CursorGlow, WebsiteSkeleton } from "@/components/fx";
import { PurchaseToast } from "@/components/landing/PurchaseToast";
import { EnrollmentProvider, useEnrollmentModal } from "@/components/landing/EnrollmentModal";
import { AutoUrgencyPopup } from "@/components/landing/AutoUrgencyPopup";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import {
  Audience,
  Bonuses,
  Curriculum,
  Faq,
  Hero,
  HeroTestimonialProof,
  Instructor,
  Offer,
  Showcase,
  Stats,
  Testimonials,
  TheProblem,
  TwoPathsComparison,
} from "@/components/landing/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PenduGPT — Create Websites with AI, Sell to Clients and Earn in Dollars | Flat ₹997" },
      {
        name: "description",
        content:
          "Learn how to build premium client websites with AI, close international clients on Upwork and Fiverr, and earn in Dollars. Zero coding required. Complete Masterclass with all recorded sessions — Special launch offer flat ₹997 (Slashed from ₹20,000).",
      },
      { property: "og:title", content: "PenduGPT — Create Websites with AI and Earn in Dollars | Flat ₹997" },
      {
        property: "og:description",
        content: "Build high-converting websites with AI, sell to global clients, and earn in Dollars. Complete Masterclass with all recorded sessions — Special launch offer flat ₹997 (Slashed from ₹20,000).",
      },
      { property: "og:url", content: "https://pendugpt.shop" },
    ],
    links: [{ rel: "canonical", href: "https://pendugpt.shop" }],
  }),
  component: Landing,
});

function StickyMobileDock() {
  const { lang } = useI18n();
  const isPa = lang === "pa";
  const { openModal } = useEnrollmentModal();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-2.5 sm:hidden bg-[#090b0e]/95 border-t border-[#d4f934]/40 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between gap-2.5 max-w-md mx-auto">
        <div className="text-left shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="line-through decoration-red-500 decoration-2 text-[10px] text-gray-400 font-bold">
              ₹20,000
            </span>
            <span className="text-base font-black text-[#d4f934]">₹997</span>
          </div>
          <span className="text-[9px] text-green-400 font-extrabold block">
            {isPa ? "🔴 ਸਪੈਸ਼ਲ ਬੈਚ (95% ਛੋਟ)" : "🔴 Save ₹19,003 (95% OFF)"}
          </span>
        </div>

        <button
          type="button"
          onClick={openModal}
          className="lime-button flex-1 py-3 px-3 rounded-full text-[11px] font-black text-black flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(212,249,52,0.5)] cursor-pointer tracking-wide uppercase"
        >
          <span>{isPa ? "ਦਾਖਲਾ ਲਵੋ (₹997) →" : "GET INSTANT ACCESS (₹997) →"}</span>
        </button>
      </div>
    </div>
  );
}

function LandingPageInner() {
  const { openModal } = useEnrollmentModal();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080808] text-white selection:bg-[#d4f934] selection:text-black">
      <CursorGlow />
      <Navbar />
      <main>
        {/* 01 — HERO (Main Text & Start Learning Now Button) */}
        <Hero />

        {/* 02 — QUICK STUDENT PROOF ("ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਸਾਡੇ ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਗੱਲ ਸੁਣੋ / ਦੇਖੋ" + 2 WhatsApp Screenshots) */}
        <HeroTestimonialProof />

        {/* 03 — WHAT YOU WILL LEARN (7-Class Step-by-Step Curriculum) */}
        <Curriculum />

        {/* 04 — THE ZERO-EXPENSE AI FORMULA (2x2 Stats Dashboard) */}
        <Stats />

        {/* 05 — THE REAL PROBLEM (Tutorial & Subscription Traps) */}
        <TheProblem />

        {/* 06 — THE TRANSFORMATION (Build → Create → Deploy → Sell → Earn) */}
        <Audience />

        {/* 07 — THE COMPLETE SYSTEM (Google Drive Vault + 6 Bonus Deliverables) */}
        <Bonuses />

        {/* 08 — EXTENDED STUDENT TESTIMONIALS (Akash & Student Reviews) */}
        <Testimonials />

        {/* 09 — THE COMPARISON SECTION (Path A: Reels vs Path B: Build & Earn) */}
        <TwoPathsComparison />

        {/* 10 — ABOUT US / INSTRUCTOR CREDIBILITY (Khushpreet Singh) */}
        <Instructor />

        {/* 11 — FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <Faq />

        {/* 12 — FLAT ₹997 OFFER & FINAL POWER CTA BUTTONS */}
        <Offer />
        <Showcase />
      </main>
      <Footer />

      {/* Floating Notifications & Urgency */}
      <PurchaseToast />
      <AutoUrgencyPopup onClaim={() => openModal()} />

      {/* Mobile Sticky Bar */}
      <StickyMobileDock />
    </div>
  );
}

function Landing() {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    // Show full-page shimmer skeleton briefly on initial page load so user experiences instant visual feedback
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <EnrollmentProvider>
      {/* Background/Live Website: Mounted immediately so Video Iframe pre-buffers at t=0 */}
      <div className={showSkeleton ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        <LandingPageInner />
      </div>

      {/* Full-Website Animated Skeleton Screen Overlay on Initial Load */}
      <AnimatePresence>
        {showSkeleton && (
          <motion.div
            key="full-website-skeleton-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[999] overflow-y-auto bg-[#080808] pointer-events-none"
          >
            <WebsiteSkeleton />
          </motion.div>
        )}
      </AnimatePresence>
    </EnrollmentProvider>
  );
}
