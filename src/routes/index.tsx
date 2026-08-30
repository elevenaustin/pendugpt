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
      { title: "PenduGPT — Build Websites 100% By Yourself (Zero Paid AI Tools Needed) ₹999" },
      {
        name: "description",
        content:
          "Learn how to create websites 100% by yourself without buying any paid AI tools or spending extra money. Master AI prompts, code customization, live deployment, and client outreach for just ₹999.",
      },
      { property: "og:title", content: "PenduGPT — Build Websites By Yourself (Zero Paid AI Tools) ₹999" },
      {
        property: "og:description",
        content: "Build unlimited production-ready AI websites by yourself with zero paid tool subscriptions and start earning from clients.",
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
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:hidden bg-[#090b0e]/95 border-t border-[#d4f934]/40 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="line-through decoration-red-500 decoration-2 text-[11px] text-gray-400 font-bold">
              ₹4,999
            </span>
            <span className="text-lg font-black text-[#d4f934]">₹999</span>
          </div>
          <span className="text-[10px] text-gray-300 font-bold block">
            {isPa ? "ਲਾਈਫਟਾਈਮ ਐਕਸੈਸ" : "Lifetime Access"}
          </span>
        </div>

        <button
          type="button"
          onClick={openModal}
          className="lime-button flex-1 py-3 px-5 rounded-full text-xs font-black text-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,249,52,0.5)] cursor-pointer tracking-wider uppercase"
        >
          <span>{isPa ? "ਐਕਸੈਸ ਲਵੋ (₹999)" : "GET FULL ACCESS →"}</span>
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
        {/* 01 — HERO (Stop watching people use AI. Start building with it.) */}
        <Hero />
        <Stats />

        {/* 02 — QUICK PROOF (Students are already learning with PenduGPT / Real WhatsApp screenshot) */}
        <HeroTestimonialProof />

        {/* 03 — THE PROBLEM (AI is everywhere. But most people still don't know what to actually DO with it.) */}
        <TheProblem />

        {/* 04 — THE TRANSFORMATION (After this Masterclass: Build → Create → Deploy → Sell → Earn) */}
        <Audience />

        {/* 06 — COMPLETE CURRICULUM (7 classes + Capstone) */}
        <Curriculum />

        {/* 08 — WHAT YOU GET (GDrive + resources + prompts + projects + Distinct Deliverables Vault) */}
        <Bonuses />

        {/* 09 — WHO IS PENDUGPT? (Khushpreet's face + story + credibility) */}
        <Instructor />

        {/* 10 — STUDENT PROOF (WhatsApp screenshots & reviews) */}
        <Testimonials />

        {/* 12 — ₹999 OFFER (Complete Masterclass — ₹999) */}
        <Offer />

        {/* 13 — FAQ */}
        <Faq />

        {/* 14 — FINAL CTA (Two Paths Comparison + Stop watching / Start building CTA) */}
        <TwoPathsComparison />
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
