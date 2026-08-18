import { MessageCircle } from "lucide-react";

export function FloatingSupport() {
  const supportWhatsapp = import.meta.env.VITE_SUPPORT_WHATSAPP || "917717526430";
  const whatsappUrl = `https://wa.me/${supportWhatsapp}?text=${encodeURIComponent(
    "Hi PenduGPT Team! I have a question regarding the Demo Class / Full Class / 1-on-1 Call."
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] text-black px-4 py-3 text-xs font-black shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:scale-105 transition-all cursor-pointer group"
    >
      <MessageCircle className="h-5 w-5 fill-black text-black shrink-0 group-hover:rotate-12 transition-transform" />
      <span className="font-extrabold tracking-tight">Need Help? Chat With Team</span>
    </a>
  );
}
