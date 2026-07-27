import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { XCircle, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/cancellation")({
  component: CancellationPage,
});

function CancellationPage() {
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
            <XCircle className="h-8 w-8 text-[#d4f934]" />
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Cancellation Policy</h1>
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Sangrur, Punjab)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-white mb-2">1. Session Rescheduling & Missed Sessions</h2>
              <p>
                If you are unable to attend the live scheduled session for any reason, you do not lose access! All enrolled students automatically receive lifetime replay recording access to watch at their own convenience.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">2. Cancellation of Digital Access</h2>
              <p>
                Because enrollment triggers instant access to digital bonus packs, client scripts, and session links, order cancellations after payment completion are not accepted.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">3. Queries & Support</h2>
              <p>
                For any help regarding batch timings or recording access, please email <strong>igkhushishere@gmail.com</strong> or call <strong>+91 77175 26430</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
