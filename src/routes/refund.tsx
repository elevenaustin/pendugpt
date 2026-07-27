import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { RefreshCw, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/refund")({
  component: RefundPage,
});

function RefundPage() {
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
            <RefreshCw className="h-8 w-8 text-[#d4f934]" />
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Refund & Digital Product Policy</h1>
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Sangrur, Punjab)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <section className="bg-[#0c0c0c] border border-[#d4f934]/40 p-5 rounded-2xl">
              <h2 className="text-base sm:text-lg font-black text-[#d4f934] mb-2">Digital Product Non-Refundable Statement</h2>
              <p className="text-gray-200 font-medium">
                PenduGPT provides immediate digital access upon enrollment for ₹99, including live masterclass seat reservation, downloadable AI prompt vaults (50+ prompts), client proposal templates, invoice kits, launch checklists, and cheat sheets (total value ₹14,999). 
              </p>
              <p className="mt-3 text-gray-200 font-medium">
                <strong>Because all deliverables are digital, downloadable, and non-returnable upon instant access delivery, all payments for PenduGPT Masterclass are non-refundable.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">Customer Trust & Transparency Commitment</h2>
              <p>
                We believe in 100% honesty and transparency. Before enrolling, we outline the exact 120-minute live masterclass curriculum, live demo agenda, and all included digital prompt packs on our landing page so you know precisely what you receive.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">Technical Support & Assistance</h2>
              <p>
                If you experience any technical difficulty accessing your digital files, WhatsApp VIP group, or live session link after making payment, our support team will immediately resolve it. Contact support at <strong>igkhushishere@gmail.com</strong> or call <strong>+91 77175 26430</strong> with your payment receipt.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
