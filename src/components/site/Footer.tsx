import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
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
            Empowering Punjab's youth with AI skills to build websites & earn online.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="mt-3 flex flex-col gap-2 text-xs text-gray-400">
            <li><a href="#home" className="hover:text-[#d4f934]">Home</a></li>
            <li><a href="#curriculum" className="hover:text-[#d4f934]">Curriculum</a></li>
            <li><a href="#demo" className="hover:text-[#d4f934]">Live Demo</a></li>
            <li><a href="#testimonials" className="hover:text-[#d4f934]">Reviews</a></li>
            <li><a href="#faq" className="hover:text-[#d4f934]">FAQ</a></li>
            <li><a href="#pricing" className="hover:text-[#d4f934]">Contact</a></li>
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
            <li><a href="/disclaimer" className="hover:text-[#d4f934]">Disclaimer</a></li>
          </ul>
        </div>

        {/* Contact & Community */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact Us</h4>
          <ul className="mt-3 flex flex-col gap-2 text-xs text-gray-400">
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-[#d4f934]" />
              <a href="mailto:igkhushishere@gmail.com" className="hover:text-[#d4f934]">igkhushishere@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#d4f934]" />
              <a href="tel:+917717526430" className="hover:text-[#d4f934]">+91 77175 26430</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#d4f934]" />
              <span>Sangrur, Punjab, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
        <p>© {year} PenduGPT. All Rights Reserved.</p>
        <a href="/admin" className="hover:text-[#d4f934] transition font-medium flex items-center gap-1">
          <span>Super Admin Portal 🛡️</span>
        </a>
      </div>
    </footer>
  );
}

