import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FileText, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
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
            <FileText className="h-8 w-8 text-[#d4f934]" />
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Terms & Conditions</h1>
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Sangrur, Punjab)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-white mb-2">1. Agreement to Terms</h2>
              <p>
                By enrolling in or purchasing the PenduGPT Live AI Masterclass ("Service"), operated by Khushpreet Singh (Sangrur, Punjab, India), you agree to be bound by these Terms and Conditions. If you do not agree, please do not access or use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">2. Educational Masterclass & Digital Assets</h2>
              <p>
                PenduGPT provides digital educational training in AI-assisted website building and freelancing strategies, along with digital bonus materials including AI prompt vaults, proposal templates, invoice kits, and resource directories.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">3. Digital Product & Non-Refundable Sale Policy</h2>
              <p className="bg-[#0c0c0c] border border-[#d4f934]/30 p-4 rounded-xl text-gray-200">
                <strong>Important Notice on Digital Deliverables:</strong> Upon payment of ₹99, you receive immediate access to proprietary digital resources worth ₹14,999 and live event seat allocation. Because digital assets and downloadable resources cannot be returned once access is granted, <strong>all purchases are final and non-refundable</strong>. We outline all curriculum details transparently prior to enrollment.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">4. Intellectual Property</h2>
              <p>
                All course contents, prompts, guides, logos, and materials provided during the session remain the sole intellectual property of PenduGPT. Materials are licensed for your individual personal and professional freelancing use only and may not be resold or redistributed publicly.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">5. Disclaimer of Financial Guarantees</h2>
              <p>
                PenduGPT teaches practical digital skills and freelancing workflows. Earnings or client income depend entirely on individual effort, market execution, and practice. We do not guarantee specific income results.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">6. Contact Information</h2>
              <p>
                For any questions regarding these Terms, contact us at <strong>igkhushishere@gmail.com</strong> or call <strong>+91 77175 26430</strong> (Sangrur, Punjab, India).
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
