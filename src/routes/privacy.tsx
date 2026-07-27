import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ShieldCheck, ArrowLeft, Lock, Eye, Database } from "lucide-react";

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
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Proprietorship / Khushpreet Singh)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-white mb-2">1. Overview & Commitment</h2>
              <p>
                PenduGPT ("We", "Us", or "Our"), operated by <strong>Khushpreet Singh</strong> (Sangrur, Punjab, India - 148001), values your privacy and is committed to protecting your personal data in accordance with the Information Technology Act, 2000 and Digital Personal Data Protection (DPDP) Act of India.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">2. Information We Collect</h2>
              <p>
                We collect personal information that you voluntarily provide when enrolling in our masterclass, submitting inquiry forms, or contacting customer support:
              </p>
              <ul className="mt-2 pl-4 list-disc space-y-1 text-gray-300">
                <li><strong>Contact Details:</strong> Full Name, Email Address, WhatsApp/Mobile Phone Number.</li>
                <li><strong>Transaction Records:</strong> Payment receipt confirmation, Order ID, and batch selection.</li>
                <li><strong>Technical Logs:</strong> IP address, browser type, and device information for security audits.</li>
              </ul>
            </section>

            <section className="bg-[#0c0c0c] border border-gray-800 p-5 rounded-2xl">
              <h2 className="text-base font-bold text-[#d4f934] mb-2">3. Payment Security & PCI-DSS Compliance</h2>
              <p className="text-gray-200">
                Financial transactions for course enrollment are processed through encrypted, PCI-DSS compliant payment gateways (Razorpay). <strong>PenduGPT does not store, process, or hold sensitive credit card, debit card numbers, CVVs, or Net Banking credentials on our servers.</strong> All payment data handling is managed directly by Razorpay's secure servers.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">4. Purpose of Data Usage</h2>
              <p>Your personal data is strictly used for the following legitimate business purposes:</p>
              <ul className="mt-2 pl-4 list-disc space-y-1 text-gray-300">
                <li>Delivering masterclass access links, calendar invites, and VIP WhatsApp group access.</li>
                <li>Sending downloadable prompt vaults, invoice kits, and session recordings.</li>
                <li>Providing customer support and resolving technical queries.</li>
                <li>Issuing transaction receipts and tax compliance invoices.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">5. Data Sharing & Non-Disclosure</h2>
              <p>
                We maintain a strict non-sharing commitment. We do not sell, rent, trade, or distribute your personal contact information to third-party marketing companies or unauthorized external vendors.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">6. Your Rights & Data Deletion</h2>
              <p>
                You have the right to request access to, correction of, or deletion of your personal data stored in our student database. To exercise your data rights, please contact our Data Grievance Officer.
              </p>
            </section>

            <section className="border-t border-gray-800 pt-6">
              <h2 className="text-base font-bold text-white mb-2">7. Grievance Officer Contact Details</h2>
              <p className="text-xs text-gray-400">
                For privacy inquiries or grievance redressal, contact:
              </p>
              <div className="mt-2 text-xs text-gray-300 space-y-1">
                <p><strong>Grievance Officer:</strong> Khushpreet Singh (Proprietor, PenduGPT)</p>
                <p><strong>Registered Address:</strong> Sangrur, Punjab, India - 148001</p>
                <p><strong>Email:</strong> <a href="mailto:igkhushishere@gmail.com" className="text-[#d4f934] underline">igkhushishere@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+917717526430" className="text-[#d4f934] underline">+91 77175 26430</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
