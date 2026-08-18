import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, User, Video, Calendar, Sparkles, Clock, RefreshCw, MessageCircle } from "lucide-react";
import { Logo, Wordmark } from "@/components/brand/Logo";
import { FloatingSupport } from "@/components/site/FloatingSupport";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Route = createFileRoute("/book-call")({
  component: BookCallPage,
});

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
];

const CALENDLY_URL = "https://cal.com/khushpreet-singh-9nry5f/30min/";
const SUPPORT_WHATSAPP = import.meta.env.VITE_SUPPORT_WHATSAPP || "917717526430";

const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function BookCallPage() {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [topic, setTopic] = useState("AI Website Guidance & Building");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});
  const [step, setStep] = useState<"form" | "processing" | "success" | "failed">("form");
  const [paymentId, setPaymentId] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const whatsappSuccessUrl = `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(
    `Sir I have paid ₹499 for 45-Min 1-on-1 Call.\nName: ${name}\nPayment ID: ${paymentId}`
  )}`;

  // Countdown auto-redirect on payment success to Cal.com & WhatsApp
  useEffect(() => {
    let timer: any;
    let interval: any;
    if (step === "success") {
      setCountdown(3);
      interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      timer = setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = CALENDLY_URL;
        }
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [step]);

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; mobile?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name";
    }

    const cleanedMobile = mobile.replace(/\D/g, "");
    if (cleanedMobile.length !== 10) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);
    setStep("processing");

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setIsProcessing(false);
      setStep("form");
      setErrors({ mobile: "Payment gateway failed to load. Please try again." });
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_TIZdNUBnkz3PoA";

    const options = {
      key: razorpayKey,
      amount: 49900, // ₹499 in paise
      currency: "INR",
      name: "PenduGPT 1-on-1 Strategy Call",
      description: "45-Min Private Strategy Call Reservation with Khushpreet (₹499)",
      image: "/favicon.svg",
      prefill: {
        name: name.trim(),
        contact: `${countryCode}${cleanedMobile}`,
      },
      theme: {
        color: "#d4f934",
      },
      handler: async function (response: any) {
        const rzpPaymentId = response.razorpay_payment_id || `pay_call_${Math.random().toString(36).substr(2, 9)}`;
        setPaymentId(rzpPaymentId);

        const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const fullMobile = `${countryCode} ${cleanedMobile}`;

        // Save lead locally
        try {
          const newCallLead = {
            id: rzpPaymentId,
            name: name.trim(),
            whatsapp: fullMobile,
            topic,
            amount: "₹499",
            date: formattedDate,
            type: "45-Min Private Call",
          };
          const existing = JSON.parse(localStorage.getItem("pendugpt_call_leads") || "[]");
          localStorage.setItem("pendugpt_call_leads", JSON.stringify([newCallLead, ...existing]));
        } catch (err) {}

        // Save lead to Supabase
        try {
          await supabase.from("registrations").insert({
            name: `45-Min Call: ${name.trim()} (${topic})`,
            country_code: countryCode,
            mobile: cleanedMobile,
            gender: "Paid ₹499",
          });
        } catch (err) {}

        // Send to Webhook
        const googleWebhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbynvD1F1Fs9fTPkEa7IygX2zA3S8BajsZZVur3Pg5_9yi8AiUIkD1mUCOXWxNHnFOdycQ/exec";
        if (googleWebhookUrl) {
          try {
            fetch(googleWebhookUrl, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                date: formattedDate,
                payment_id: rzpPaymentId,
                name: name.trim(),
                whatsapp: fullMobile,
                topic,
                amount: "₹499",
                status: "45-Min Private Call Booked & Paid",
              }),
            });
          } catch (e) {}
        }

        setIsProcessing(false);
        setStep("success");
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
          setStep("form");
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        setIsProcessing(false);
        setStep("failed");
      });
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      setIsProcessing(false);
      setStep("success");
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      {/* Ambient Lighting Effects */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[500px] rounded-full bg-[#d4f934]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-purple-600/10 blur-[120px]" />

      {/* Top Header (Standalone Branding - NO Back to Main Site link) */}
      <header className="mx-auto max-w-xl w-full flex items-center justify-between z-10 py-1">
        <div className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <Wordmark />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4f934]/40 bg-[#121808] px-3 py-1 text-[11px] font-black text-[#d4f934]">
          <Clock className="h-3 w-3" />
          <span>45-Min Private Session</span>
        </span>
      </header>

      {/* Main Center Form Card */}
      <main className="mx-auto max-w-md w-full my-auto py-3 z-10">
        {step === "success" ? (
          <div className="rounded-3xl border-2 border-[#d4f934]/60 bg-[#101507] p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(212,249,52,0.25)] animate-fadeIn space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d4f934] text-black shadow-[0_0_25px_rgba(212,249,52,0.6)]">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-[#d4f934]/20 border border-[#d4f934]/50 px-3 py-1 text-xs font-extrabold text-[#d4f934] uppercase tracking-wider">
              ✓ Payment Confirmed (₹499)
            </span>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              45-Min Strategy Call Booked!
            </h2>
            
            <p className="text-xs text-gray-300 leading-relaxed">
              Redirecting to Cal.com in <strong className="text-[#d4f934] text-sm font-black">{countdown}s</strong> to pick your time slot.
            </p>

            {/* Countdown notice pill */}
            <div className="rounded-xl bg-green-950/40 border border-green-500/40 p-2.5 text-xs text-green-400 font-bold flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-[#d4f934]" />
              <span>Redirecting automatically in {countdown}s...</span>
            </div>

            <a
              href={CALENDLY_URL}
              className="lime-button inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 px-6 text-sm font-black text-black shadow-lg cursor-pointer hover:scale-105 transition-all"
            >
              <span>Pick Your Date & Time Slot Now</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href={whatsappSuccessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3 px-6 text-xs font-extrabold text-white bg-[#25D366] hover:bg-[#20bd5a] transition cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>Send Confirmation on WhatsApp</span>
            </a>

            <p className="text-[11px] text-gray-400 font-semibold">
              Transaction ID: {paymentId || "Confirmed"}
            </p>
          </div>
        ) : step === "failed" ? (
          <div className="rounded-3xl border border-red-500/50 bg-[#1a0c0c] p-6 sm:p-8 text-center shadow-xl">
            <h2 className="text-lg font-black text-red-400">Payment Unsuccessful</h2>
            <p className="text-xs text-gray-300 mt-2">
              Your payment could not be completed. Please try again to reserve your 45-min call.
            </p>
            <button
              onClick={() => setStep("form")}
              className="mt-5 w-full rounded-full bg-red-600 py-3 text-xs font-extrabold text-white hover:bg-red-500 transition cursor-pointer"
            >
              Try Again →
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-[#d4f934]/40 bg-gradient-to-b from-[#12141a] via-[#0d0e12] to-[#0a0b0e] p-5 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-left backdrop-blur-md relative overflow-hidden">
            
            {/* Header Badge & Title */}
            <div className="mb-4 border-b border-gray-800/80 pb-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d4f934]/15 border border-[#d4f934]/40 px-3 py-1 text-[10px] font-black uppercase text-[#d4f934] tracking-wider">
                  <Clock className="h-3.5 w-3.5" />
                  45 Mins Private Call
                </span>
                
                {/* Price Tag */}
                <div className="flex items-baseline gap-1.5">
                  <span className="line-through decoration-red-600 decoration-2 text-gray-400 font-extrabold text-xs sm:text-sm">₹2,999</span>
                  <span className="text-xl sm:text-2xl font-black text-[#d4f934] font-sans">₹499 ONLY</span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                Book 45-Min Call with Khushpreet
              </h1>
              <p className="text-xs text-gray-400 mt-1 font-medium leading-relaxed">
                45-minute private 1-on-1 strategy session for personal guidance, roadmap & Q&A.
              </p>

              {/* 3 Value Bullet Pills */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 text-[10px] font-extrabold text-gray-300">
                <div className="flex items-center gap-1 rounded-lg bg-black/40 border border-gray-800 p-1.5 justify-center">
                  <Sparkles className="h-3 w-3 text-[#d4f934]" />
                  <span>1-on-1 Direct</span>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-black/40 border border-gray-800 p-1.5 justify-center">
                  <Video className="h-3 w-3 text-[#d4f934]" />
                  <span>45 Mins Live</span>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-black/40 border border-gray-800 p-1.5 justify-center">
                  <ShieldCheck className="h-3 w-3 text-[#d4f934]" />
                  <span>Custom Plan</span>
                </div>
              </div>
            </div>

            {/* Step 1 Form */}
            <form onSubmit={handleStartPayment} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-300 mb-1">
                  Your Full Name
                </label>
                <div className="flex items-center rounded-xl border border-gray-800 bg-[#080808] focus-within:border-[#d4f934] transition px-3 py-2.5">
                  <User className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-bold text-white placeholder-gray-600 outline-none"
                  />
                </div>
                {errors.name && <p className="text-[11px] text-red-400 mt-1 font-medium">{errors.name}</p>}
              </div>

              {/* WhatsApp Number with Country Code */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-300 mb-1">
                  WhatsApp Number
                </label>
                <div className="flex items-center rounded-xl border border-gray-800 bg-[#080808] focus-within:border-[#d4f934] transition overflow-hidden">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-24 shrink-0 bg-[#141414] px-2 py-2.5 border-r border-gray-800 text-xs font-bold text-white outline-none cursor-pointer text-center"
                  >
                    {COUNTRY_CODES.map((c, idx) => (
                      <option key={`${c.code}-${idx}`} value={c.code} className="bg-[#141414] text-white">
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-xs sm:text-sm font-bold text-white placeholder-gray-600 outline-none"
                  />
                </div>
                {errors.mobile && <p className="text-[11px] text-red-400 mt-1 font-medium">{errors.mobile}</p>}
              </div>

              {/* Discussion Topic */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-300 mb-1">
                  Primary Topic for 45-Min Call
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-gray-800 bg-[#080808] px-3 py-2.5 text-xs font-bold text-white outline-none focus:border-[#d4f934] transition cursor-pointer"
                >
                  <option value="AI Website Guidance & Building">AI Website Building & Guidance</option>
                  <option value="Freelance & Agency Scaling">Freelancing & Agency Scaling</option>
                  <option value="Portfolio Review & Design">Portfolio Review & Design Feedback</option>
                  <option value="General Technical / Career Q&A">General Technical / Career Q&A</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="lime-button w-full flex items-center justify-center gap-2 rounded-full py-3.5 px-4 text-xs sm:text-sm font-black text-black shadow-[0_0_25px_rgba(212,249,52,0.4)] cursor-pointer mt-2 hover:scale-[1.02] transition-all"
              >
                {isProcessing ? (
                  <span>Opening Razorpay Checkout...</span>
                ) : (
                  <>
                    <span>Proceed to Pay ₹499 & Select Time Slot</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Trust Bar */}
            <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-[10px] font-bold text-gray-400">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3 text-[#d4f934]" /> 100% Secure PCI-DSS
              </span>
              <span className="flex items-center gap-1 text-[#d4f934]">
                <Calendar className="h-3 w-3" /> Auto Redirect
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Minimal Footer Row */}
      <footer className="mx-auto max-w-xl w-full text-center text-[11px] text-gray-500 z-10 py-1">
        © {new Date().getFullYear()} PenduGPT • 45-Min Private Strategy Session
      </footer>

      {/* Floating WhatsApp Support Button */}
      <FloatingSupport />
    </div>
  );
}
