import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FileText, ArrowLeft, ShieldCheck, Scale, CreditCard } from "lucide-react";

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
              <p className="text-xs text-gray-400 mt-1">Last Updated: July 2026 · PenduGPT (Proprietorship / Khushpreet Singh)</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs sm:text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-white mb-2">1. Agreement to Terms</h2>
              <p>
                Welcome to PenduGPT ("Platform", "We", "Us", or "Our"), operated by <strong>Khushpreet Singh</strong> (Sole Proprietor, located in Sangrur, Punjab, India - 148001). By enrolling in, purchasing, or accessing the PenduGPT Live AI Masterclass and associated digital bundles ("Services"), you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not access or use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">2. Services & Digital Deliverables</h2>
              <p>
                PenduGPT provides digital educational training in AI-assisted website development, prompt engineering, and online freelancing strategies. Enrollment includes access to live online sessions, downloadable prompt repositories, client proposal scripts, invoice templates, and community discussion groups.
              </p>
            </section>

            <section className="bg-[#0c0c0c] border border-gray-800 p-5 rounded-2xl">
              <h2 className="text-base font-bold text-[#d4f934] mb-2">3. Pricing, Payments & Currency</h2>
              <p className="text-gray-200">
                All prices for our courses and digital bundles are displayed in <strong>Indian Rupees (INR - ₹)</strong>. Enrollment fees (e.g. ₹99 special offer) are inclusive of applicable taxes. Payments are processed securely using PCI-DSS compliant third-party payment gateways (Razorpay). You agree to provide current, complete, and accurate purchase information.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">4. Digital Product Non-Refundable & Refund Policy</h2>
              <p>
                Because enrollment triggers instant electronic access to downloadable digital assets worth ₹75,000+ and live event seat allocation, digital purchases are generally non-refundable once delivered.
              </p>
              <p className="mt-2">
                In eligible refund scenarios (duplicate payment or technical non-delivery), approved refunds will be processed within 5-7 business days back to the original payment method as detailed in our <a href="/refund" className="text-[#d4f934] underline font-semibold">Refund Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">5. Intellectual Property Rights</h2>
              <p>
                All course content, prompt structures, frameworks, logos, designs, audio-visual materials, and website assets remain the exclusive intellectual property of PenduGPT and Khushpreet Singh. Materials are licensed for individual educational use only and may not be resold, copied, distributed, or repurposed commercially without explicit written consent.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">6. Limitation of Income Guarantees</h2>
              <p>
                PenduGPT teaches practical digital skills, freelancing workflows, and AI tools. Earnings, client acquisition, and financial results depend entirely on individual practice, dedication, market conditions, and execution. We do not promise or guarantee specific financial returns.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-white mb-2">7. Governing Law & Jurisdiction</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any legal disputes or claims arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the Courts located in <strong>Sangrur, Punjab, India</strong>.
              </p>
            </section>

            <section className="border-t border-gray-800 pt-6">
              <h2 className="text-base font-bold text-white mb-2">8. Contact Information</h2>
              <p className="text-xs text-gray-400">
                For questions regarding these Terms & Conditions, please contact us:
              </p>
              <div className="mt-2 text-xs text-gray-300 space-y-1">
                <p><strong>Business Name:</strong> PenduGPT (Proprietor: Khushpreet Singh)</p>
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
