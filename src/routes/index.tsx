import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CursorGlow } from "@/components/fx";
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
      { title: "PenduGPT — Build Websites 100% By Yourself (Zero Paid AI Tools) | 50% OFF" },
      {
        name: "description",
        content:
          "Learn how to create websites 100% by yourself without buying any paid AI tools or spending extra money. Master AI prompts, code customization, live deployment, and client outreach. ₹999 slots full — Enroll with 50% OFF (₹2,499).",
      },
      { property: "og:title", content: "PenduGPT — Build Websites By Yourself (Zero Paid AI Tools) | 50% OFF" },
      {
        property: "og:description",
        content: "Build unlimited production-ready AI websites by yourself with zero paid tool subscriptions. ₹999 early bird full — enroll with 50% OFF now.",
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
              ₹4,999
            </span>
            <span className="text-base font-black text-[#d4f934]">₹2,499</span>
          </div>
          <span className="text-[9px] text-red-400 font-extrabold block">
            {isPa ? "🔴 ₹999 ਸੀਟਾਂ ਫੁੱਲ (50% ਛੋਟ)" : "🔴 ₹999 Full (50% OFF)"}
          </span>
        </div>

        <button
          type="button"
          onClick={openModal}
          className="lime-button flex-1 py-3 px-3 rounded-full text-[11px] font-black text-black flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(212,249,52,0.5)] cursor-pointer tracking-wide uppercase"
        >
          <span>{isPa ? "ਦਾਖਲਾ ਲਵੋ (₹2,499) →" : "ENROLL (50% OFF) →"}</span>
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

        {/* 12 — ₹999 OFFER & FINAL POWER CTA BUTTONS */}
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
  return (
    <EnrollmentProvider>
      <LandingPageInner />
    </EnrollmentProvider>
  );
}
