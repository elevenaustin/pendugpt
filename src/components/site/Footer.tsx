import { Mail, Phone, MapPin, ShieldCheck, Lock } from "lucide-react";
import { Logo, Wordmark } from "@/components/brand/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[#d4f934]/20 bg-[#080808] px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand & About */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <Wordmark />
          </div>
          <p className="mt-4 text-xs text-gray-400 leading-relaxed">
            Empowering Punjab's youth with AI skills to build websites & earn online. Operated by Khushpreet Singh (Proprietorship).
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="mt-3 flex flex-col gap-2 text-xs text-gray-400">
            <li><a href="/" className="hover:text-[#d4f934]">Home</a></li>
            <li><a href="/#curriculum" className="hover:text-[#d4f934]">Curriculum</a></li>
            <li><a href="/#demo" className="hover:text-[#d4f934]">Live Demo</a></li>
            <li><a href="/#testimonials" className="hover:text-[#d4f934]">Reviews</a></li>
            <li><a href="/#faq" className="hover:text-[#d4f934]">FAQ</a></li>
            <li><a href="/contact" className="hover:text-[#d4f934]">Contact Us</a></li>
          </ul>
        </div>

        {/* Legal Policies */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Policies</h4>
          <ul className="mt-3 flex flex-col gap-2 text-xs text-gray-400">
            <li><a href="/privacy" className="hover:text-[#d4f934]">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-[#d4f934]">Terms & Conditions</a></li>
            <li><a href="/refund" className="hover:text-[#d4f934]">Refund Policy</a></li>
            <li><a href="/cancellation" className="hover:text-[#d4f934]">Cancellation Policy</a></li>
            <li><a href="/shipping" className="hover:text-[#d4f934]">Shipping & Digital Delivery</a></li>
            <li><a href="/disclaimer" className="hover:text-[#d4f934]">Disclaimer</a></li>
          </ul>
        </div>

        {/* Contact & Merchant Info */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Customer Support</h4>
          <ul className="mt-3 flex flex-col gap-2.5 text-xs text-gray-400">
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-[#d4f934] shrink-0" />
              <a href="mailto:igkhushishere@gmail.com" className="hover:text-[#d4f934]">igkhushishere@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#d4f934] shrink-0" />
              <a href="tel:+917717526430" className="hover:text-[#d4f934]">+91 77175 26430</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#d4f934] shrink-0 mt-0.5" />
              <span>Sangrur, Punjab, India - 148001</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Razorpay Trust & Payment Gateway Badge Bar */}
      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Razorpay Security Badge */}
        <div className="flex items-center gap-3 rounded-2xl border border-gray-800 bg-[#0d0d0d] px-4 py-2.5 shadow-md">
          <ShieldCheck className="h-5 w-5 text-[#d4f934] shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1">
              <Lock className="h-3 w-3 text-gray-400" />
              100% PCI-DSS Secure Payments
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-black text-white">Secured & Provided by</span>
              {/* Razorpay Brand Logo Badge */}
              <span className="inline-flex items-center gap-1.5 bg-[#031b33] border border-[#00c8ff]/40 px-2.5 py-0.5 rounded-md text-white shadow-inner">
                <svg className="h-3.5 w-3.5 fill-[#00c8ff]" viewBox="0 0 24 24">
                  <path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.323-2.671 9.722 8.788-17.448zM1.564 24l11.91-7.773 1.174-4.276-6.625 4.323 2.671-9.722-8.788 17.448z"/>
                </svg>
                <span className="font-extrabold text-xs tracking-wide text-white">Razorpay</span>
              </span>
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold text-gray-400">
          <span className="rounded-lg border border-gray-800 bg-[#121212] px-2.5 py-1 text-gray-300">UPI (GPay / PhonePe / Paytm)</span>
          <span className="rounded-lg border border-gray-800 bg-[#121212] px-2.5 py-1 text-gray-300">Credit & Debit Cards</span>
          <span className="rounded-lg border border-gray-800 bg-[#121212] px-2.5 py-1 text-gray-300">NetBanking</span>
          <span className="rounded-lg border border-gray-800 bg-[#121212] px-2.5 py-1 text-gray-300">Wallets</span>
        </div>
      </div>

      {/* Copyright & Admin Bar */}
      <div className="mx-auto mt-6 max-w-7xl border-t border-gray-900 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
        <p>© {year} PenduGPT (Proprietor: Khushpreet Singh). All Rights Reserved.</p>
        <a href="/admin" className="hover:text-[#d4f934] transition font-medium flex items-center gap-1">
          <span>Super Admin Portal 🛡️</span>
        </a>
      </div>
    </footer>
  );
}
