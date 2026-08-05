import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { RefreshCw, ArrowLeft, CheckCircle2, ShieldCheck, Mail, Phone } from "lucide-react";

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
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Refund & Return Policy</h1>
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Proprietorship / Khushpreet Singh)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            {/* Razorpay Mandatory Compliance Highlight Box */}
            <section className="bg-[#0c0c0c] border border-[#d4f934]/40 p-6 rounded-2xl shadow-inner">
              <div className="flex items-center gap-2 text-[#d4f934] font-black text-base mb-2">
                <ShieldCheck className="h-5 w-5" />
                <h2>Refund Processing Timeline & Payment Gateway Policy</h2>
              </div>
              <p className="text-gray-200 font-medium leading-relaxed">
                In eligible refund scenarios (such as duplicate payments, accidental double debits, or system transaction failures), 
                <strong> approved refunds will be initiated within 24 to 48 hours and credited back to the customer's original payment method (UPI, Debit/Credit Card, Net Banking, or Wallet) within 5 to 7 business days</strong> as per standard banking procedures and Razorpay payment gateway guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">1. Nature of Digital Products & Deliverables</h2>
              <p>
                PenduGPT provides immediate digital enrollment for ₹99, granting students instant access to live AI masterclass seat reservations, downloadable AI prompt vaults (50+ prompts), client outreach proposal templates, freelancing invoice kits, and launch checklists (valued at ₹75,000+).
              </p>
              <p className="mt-2 text-gray-300">
                Because digital downloads, proprietary templates, and live access links are non-returnable upon instant delivery, general change-of-mind refund requests after downloading materials or joining live sessions are not accepted.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">2. Valid Refund Scenarios</h2>
              <p>
                We prioritize customer satisfaction and trust. Refunds are guaranteed under the following conditions:
              </p>
              <ul className="mt-3 flex flex-col gap-2 pl-4 text-gray-300 list-disc">
                <li><strong>Duplicate Transactions:</strong> If your bank account was debited multiple times for the same order due to a network glitch.</li>
                <li><strong>Payment Debited But Access Not Granted:</strong> If payment was debited but our system failed to deliver enrollment access, and our technical support team is unable to resolve your access within 48 hours of reporting.</li>
                <li><strong>Event Cancellation by PenduGPT:</strong> In the rare event that a live session is canceled by PenduGPT without a rescheduled date or recording alternative.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">3. How to Request a Refund</h2>
              <p>
                To lodge a refund request, please email our support team with your transaction details within 7 days of payment:
              </p>
              <div className="mt-3 rounded-xl border border-gray-800 bg-[#0a0a0a] p-4 text-xs space-y-1.5">
                <p><strong>Support Email:</strong> <a href="mailto:igkhushishere@gmail.com" className="text-[#d4f934] underline">igkhushishere@gmail.com</a></p>
                <p><strong>Support Phone / WhatsApp:</strong> <a href="tel:+917717526430" className="text-[#d4f934] underline">+91 77175 26430</a></p>
                <p><strong>Required Details:</strong> Full Name, Registered Email/Phone, Razorpay Payment ID, and Bank Debit Receipt screenshot.</p>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">4. Credit Transfer & Banking Execution</h2>
              <p>
                Once approved, the refund is executed via Razorpay back to your original source account (Bank Account, Credit Card, or UPI VPA). The reflected credit timing depends on your issuing bank (typically 5-7 business days).
              </p>
            </section>

            <section className="border-t border-gray-800 pt-6 text-xs text-gray-400">
              <p><strong>Merchant Details:</strong> PenduGPT (Proprietorship / Khushpreet Singh) · Registered Address: Sangrur, Punjab, India - 148001</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
