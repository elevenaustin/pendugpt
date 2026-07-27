import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AlertCircle, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <main className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#d4f934] hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </a>

        <div className="rounded-3xl border border-[#d4f934]/30 bg-[#121212] p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-6 mb-6">
            <AlertCircle className="h-8 w-8 text-[#d4f934]" />
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Disclaimer</h1>
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Sangrur, Punjab)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-white mb-2">1. Educational Purpose Only</h2>
              <p>
                The information, techniques, and AI tools taught in the PenduGPT Masterclass are for educational and skill-building purposes. We teach zero-coding website building techniques and freelance client acquisition strategies.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">2. Earnings & Result Disclaimer</h2>
              <p>
                Any income examples or student testimonials shown on this page represent real individual student experiences. However, individual income and freelance success depend entirely on your own effort, practice, client outreach, and dedication. PenduGPT does not promise or guarantee fixed financial returns.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">3. Third-Party Tools & Services</h2>
              <p>
                PenduGPT teaches how to use accessible third-party AI tools (such as ChatGPT, v0, Midjourney, Framer, etc.). We are an independent educational entity and are not directly affiliated with or endorsed by these third-party platforms.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">4. Support Contact</h2>
              <p>
                If you have questions, please reach out to <strong>igkhushishere@gmail.com</strong> or call <strong>+91 77175 26430</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
