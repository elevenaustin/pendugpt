import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
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
            <ShieldCheck className="h-8 w-8 text-[#d4f934]" />
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Sangrur, Punjab)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-white mb-2">1. Data Collection & Purpose</h2>
              <p>
                PenduGPT respects your privacy. We collect minimal personal information such as your Name, Phone/WhatsApp Number, and Email Address strictly for course access delivery, enrollment confirmation, and WhatsApp VIP group access.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">2. Payment Security</h2>
              <p>
                All financial payments for ₹99 enrollment are processed through encrypted, PCI-DSS compliant Indian payment gateways (e.g. Razorpay). PenduGPT never stores or processes sensitive credit card or bank credentials on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">3. Non-Sharing Commitment</h2>
              <p>
                We do not sell, rent, trade, or leak your personal contact information to third-party marketing companies. Your data is strictly used for PenduGPT masterclass updates and support.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">4. Support & Data Queries</h2>
              <p>
                If you wish to update or delete your contact information from our masterclass registry, please reach out to us at <strong>igkhushishere@gmail.com</strong> or call <strong>+91 77175 26430</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
