import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Truck, ArrowLeft, CheckCircle2, Mail, Phone, Clock } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  component: ShippingPolicyPage,
});

function ShippingPolicyPage() {
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
            <Truck className="h-8 w-8 text-[#d4f934]" />
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Shipping & Digital Access Delivery Policy</h1>
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Proprietorship / Khushpreet Singh)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            {/* Quick Summary Card */}
            <section className="bg-[#0c0c0c] border border-[#d4f934]/40 p-5 rounded-2xl">
              <h2 className="text-base sm:text-lg font-black text-[#d4f934] mb-2">Instant Digital Access Overview</h2>
              <p className="text-gray-200 font-medium">
                PenduGPT provides 100% digital educational training masterclasses and downloadable digital resource bundles. 
                <strong> No physical items or parcel shipments are involved.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">1. Delivery Mode & Process</h2>
              <p>
                Upon completing payment of ₹99 via our payment gateway (Razorpay), your digital products and live session access are delivered electronically:
              </p>
              <ul className="mt-3 flex flex-col gap-2 pl-4 text-gray-300 list-disc">
                <li><strong>Instant Screen Confirmation:</strong> Immediate redirection to the Enrollment Confirmation page with VIP group access links.</li>
                <li><strong>Email Confirmation:</strong> Course onboarding instructions, invoice receipt, and downloadable prompt packs sent to your registered email address.</li>
                <li><strong>WhatsApp / SMS Notification:</strong> Live session link and WhatsApp VIP community invite sent directly to your registered mobile number.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">2. Delivery Timeline</h2>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div className="rounded-xl border border-gray-800 bg-[#0a0a0a] p-4">
                  <div className="flex items-center gap-2 text-[#d4f934] font-bold mb-1">
                    <Clock className="h-4 w-4" />
                    <span>Instant Digital Access</span>
                  </div>
                  <p className="text-xs text-gray-400">Digital downloads & bonus vault links are delivered immediately (0 to 5 minutes) post-payment.</p>
                </div>
                <div className="rounded-xl border border-gray-800 bg-[#0a0a0a] p-4">
                  <div className="flex items-center gap-2 text-[#d4f934] font-bold mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Live Class Access</span>
                  </div>
                  <p className="text-xs text-gray-400">Live Masterclass webinar coordinates & calendar invites dispatched within 0 to 24 hours prior to session commencement.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">3. Shipping Charges & Fees</h2>
              <p>
                Because all services and materials are delivered digitally online, <strong>Shipping Charges are ₹0 (Free)</strong> for all orders worldwide.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">4. Support for Missing Delivery</h2>
              <p>
                If you do not receive your access email or WhatsApp invitation within 15 minutes of payment completion:
              </p>
              <ol className="mt-2 pl-4 list-decimal text-gray-300 space-y-1">
                <li>Check your Email Spam / Junk / Promotions folder.</li>
                <li>Verify that your registered phone number is active on WhatsApp.</li>
                <li>Contact our Customer Support Team immediately with your transaction ID.</li>
              </ol>
            </section>

            <section className="border-t border-gray-800 pt-6">
              <h2 className="text-base font-bold text-white mb-2">Merchant Contact Information</h2>
              <p className="text-xs text-gray-400">
                For any access or delivery queries, please reach out to:
              </p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-gray-300">
                <p><strong>Entity Name:</strong> PenduGPT (Proprietorship / Khushpreet Singh)</p>
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
