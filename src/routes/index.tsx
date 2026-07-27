import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CursorGlow } from "@/components/fx";
import { PurchaseToast } from "@/components/landing/PurchaseToast";
import { EnrollmentProvider } from "@/components/landing/EnrollmentModal";
import {
  Audience,
  Bonuses,
  ChoiceMotivator,
  Curriculum,
  Faq,
  Hero,
  Instructor,
  Offer,
  Showcase,
  Stats,
  Testimonials,
} from "@/components/landing/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PenduGPT — Learn AI Website Building & Freelancing" },
      {
        name: "description",
        content:
          "Learn AI website building without coding and start your freelancing journey. Live masterclass for ₹99.",
      },
      { property: "og:title", content: "PenduGPT — Learn AI Website Building" },
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

function Landing() {
  return (
    <EnrollmentProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-[#080808] text-white">
        <CursorGlow />
        <Navbar />
        <main>
          <Hero />
          <Stats />
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
      </div>
    </EnrollmentProvider>
  );
}
