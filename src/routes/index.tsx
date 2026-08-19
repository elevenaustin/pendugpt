import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CursorGlow } from "@/components/fx";
import { PurchaseToast } from "@/components/landing/PurchaseToast";
import { EnrollmentProvider, useEnrollmentModal } from "@/components/landing/EnrollmentModal";
import { AutoUrgencyPopup } from "@/components/landing/AutoUrgencyPopup";
import {
  Audience,
  Bonuses,
  ChoiceMotivator,
  Curriculum,
  Faq,
  Hero,
  Instructor,
  LimitedSpots,
  Offer,
  Showcase,
  Stats,
  Testimonials,
} from "@/components/landing/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PenduGPT — Join Live Demo Class & Learn AI Website Building" },
      {
        name: "description",
        content:
          "Join our live demo class and learn AI website building without coding. Limited spots available for ₹99.",
      },
      { property: "og:title", content: "PenduGPT — Join Live Demo Class" },
      {
        property: "og:description",
        content: "Build beautiful AI-powered websites without coding and start getting clients.",
      },
      { property: "og:url", content: "https://pendugpt.shop" },
    ],
    links: [{ rel: "canonical", href: "https://pendugpt.shop" }],
  }),
  component: Landing,
});

function LandingPageInner() {
  const { openModal } = useEnrollmentModal();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080808] text-white">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <LimitedSpots />
        <Audience />
        <Curriculum />
        <Bonuses />
        <Showcase />
        <Testimonials />
        <Instructor />
        <ChoiceMotivator />
        <Offer />
        <Faq />
      </main>
      <Footer />
      <PurchaseToast />
      
      {/* Auto Urgency Popup triggered after 6s */}
      <AutoUrgencyPopup onClaim={() => openModal()} />
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
