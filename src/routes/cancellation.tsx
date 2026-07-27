import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { XCircle, ArrowLeft, RefreshCw, Calendar, AlertCircle } from "lucide-react";

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
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Proprietorship / Khushpreet Singh)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <section className="bg-[#0c0c0c] border border-gray-800 p-5 rounded-2xl">
              <h2 className="text-base font-bold text-[#d4f934] mb-2">Order & Registration Cancellation</h2>
              <p className="text-gray-200">
                PenduGPT provides instant electronic delivery of digital educational resources and masterclass seat reservation upon successful payment completion. 
                Because digital bonus packs are delivered automatically within minutes of payment, order cancellations after payment completion are generally not permitted.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">1. Rescheduling & Missed Session Guarantee</h2>
              <p>
                We understand that unexpected schedule conflicts occur. If you are unable to attend the live masterclass session on your registered date:
              </p>
              <ul className="mt-2 pl-4 list-disc space-y-1 text-gray-300">
                <li><strong>Free Batch Transfer:</strong> You may request a free transfer to the next available live batch by notifying support at least 4 hours prior to session start.</li>
                <li><strong>Lifetime Recording Access:</strong> All registered participants receive full recording access and replay video links to watch at their convenience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">2. Event Cancellation by Organizers</h2>
              <p>
                In the rare event that a masterclass session is canceled or postponed by PenduGPT due to technical emergencies or force majeure:
              </p>
              <p className="mt-2">
                Participants will be offered an immediate option of attending a rescheduled session or receiving a <strong>100% full refund</strong>. Refunds will be credited back to your original payment method within 5 to 7 business days as outlined in our <a href="/refund" className="text-[#d4f934] underline font-semibold">Refund Policy</a>.
              </p>
            </section>

            <section className="border-t border-gray-800 pt-6">
              <h2 className="text-base font-bold text-white mb-2">3. How to Contact Support for Cancellation Queries</h2>
              <p className="text-xs text-gray-400">
                For batch transfer requests or cancellation assistance, contact:
              </p>
              <div className="mt-2 text-xs text-gray-300 space-y-1">
                <p><strong>Merchant Name:</strong> PenduGPT (Proprietorship / Khushpreet Singh)</p>
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
