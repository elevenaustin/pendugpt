import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AlertTriangle, ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";

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
            <AlertTriangle className="h-8 w-8 text-[#d4f934]" />
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Disclaimer</h1>
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Proprietorship / Khushpreet Singh)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-white mb-2">1. Educational & Informational Purpose Only</h2>
              <p>
                All information, tutorials, AI prompt guides, website templates, and live masterclass sessions provided by PenduGPT are intended strictly for educational, skill-development, and informational purposes. Nothing contained on our platform constitutes financial, legal, or professional business advice.
              </p>
            </section>

            <section className="bg-[#0c0c0c] border border-gray-800 p-5 rounded-2xl">
              <h2 className="text-base font-bold text-[#d4f934] mb-2">2. No Guarantee of Financial Earnings</h2>
              <p className="text-gray-200">
                PenduGPT teaches practical digital skills, AI tools, website building frameworks, and online freelancing client outreach workflows. Earnings, income generation, and client acquisition depend entirely on individual effort, personal practice, technical skills, market demand, and business execution. 
                <strong> We make no promises, guarantees, or representations regarding specific financial earnings or results.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">3. Third-Party Tools & Services</h2>
              <p>
                During the masterclass, reference may be made to third-party AI software, web hosting services, domain registrars, or freelancing platforms. PenduGPT is an independent educational provider and is not affiliated with, endorsed by, or sponsored by third-party brand names unless explicitly stated.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">4. Testimonials & Student Examples</h2>
              <p>
                Testimonials and case studies featured on our website represent exceptional student experiences. Individual results may vary depending on dedication, existing technical background, and market dynamics.
              </p>
            </section>

            <section className="border-t border-gray-800 pt-6">
              <h2 className="text-base font-bold text-white mb-2">Merchant Contact Information</h2>
              <p className="text-xs text-gray-400">
                For questions regarding this Disclaimer, please reach out to:
              </p>
              <div className="mt-2 text-xs text-gray-300 space-y-1">
                <p><strong>Merchant Entity:</strong> PenduGPT (Proprietorship / Khushpreet Singh)</p>
                <p><strong>Registered Address:</strong> Sangrur, Punjab, India - 148001</p>
                <p><strong>Support Email:</strong> <a href="mailto:igkhushishere@gmail.com" className="text-[#d4f934] underline">igkhushishere@gmail.com</a></p>
                <p><strong>Support Phone:</strong> <a href="tel:+917717526430" className="text-[#d4f934] underline">+91 77175 26430</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
