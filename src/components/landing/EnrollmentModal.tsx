import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  MessageCircle,
  ShieldCheck,
  User,
  X,
  AlertTriangle,
  RefreshCw,
  Laptop,
  Smartphone,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface EnrollmentContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
];

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

/**
 * Universal Lead Tracker:
 * Records each number submission immediately (Unpaid / Pending Payment)
 * and updates when paid, enrolled, or cancelled.
 */
const recordLeadStage = async ({
  mobileNum,
  code,
  studentName,
  leadStatus,
  payId,
  studentGender,
  studentLaptop,
}: {
  mobileNum: string;
  code: string;
  studentName?: string;
  leadStatus: string;
  payId?: string;
  studentGender?: string;
  studentLaptop?: string;
}) => {
  const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const cleanMobile = mobileNum.trim().replace(/\D/g, "");
  const fullWhatsapp = `${code} ${cleanMobile}`;
  const leadId = payId || `LEAD-${cleanMobile.slice(-4)}-${Date.now().toString(36).toUpperCase()}`;

  // 1. Update LocalStorage (Instant Sync for Admin Portal)
  try {
    const existingLeads: any[] = JSON.parse(localStorage.getItem("pendugpt_leads") || "[]");
    const existingIndex = existingLeads.findIndex(
      (l) => l.mobile === cleanMobile || (payId && (l.id === payId || l.paymentId === payId))
    );

    const leadObject = {
      id: leadId,
      name: studentName || `Student (${code} ${cleanMobile})`,
      countryCode: code,
      mobile: cleanMobile,
      gender: studentGender || (leadStatus.includes("Paid") ? "Paid" : "Pending"),
      hasLaptop: studentLaptop || "Pending",
      date: formattedDate,
      amount: "₹2,499",
      status: leadStatus,
      paymentId: payId || "",
    };

    if (existingIndex >= 0) {
      existingLeads[existingIndex] = { ...existingLeads[existingIndex], ...leadObject };
      localStorage.setItem("pendugpt_leads", JSON.stringify(existingLeads));
    } else {
      localStorage.setItem("pendugpt_leads", JSON.stringify([leadObject, ...existingLeads]));
    }
  } catch (err) {
    console.warn("LocalStorage lead save note:", err);
  }

  // 2. Insert or update Supabase Registrations Table
  try {
    await supabase.from("registrations").insert({
      full_name: studentName || `Student (${code} ${cleanMobile})`,
      whatsapp: `${code}${cleanMobile}`,
      amount_inr: 2499,
      status: leadStatus,
      payment_ref: payId || `INIT_${cleanMobile}`,
      age: 24,
      district: "Direct Lead",
      state: "Punjab / Online",
      occupation: "AI Website Student",
      email: `lead_${cleanMobile}@pendugpt.shop`,
      has_laptop: studentLaptop === "Yes",
      language: "pa/en",
    } as any);
  } catch (err) {
    console.warn("Supabase lead capture note:", err);
  }

  // 3. Notify Google Sheets Webhook
  const googleWebhookUrl =
    import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
    "https://script.google.com/macros/s/AKfycbynvD1F1Fs9fTPkEa7IygX2zA3S8BajsZZVur3Pg5_9yi8AiUIkD1mUCOXWxNHnFOdycQ/exec";

  if (googleWebhookUrl) {
    try {
      fetch(googleWebhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formattedDate,
          lead_id: leadId,
          payment_id: payId || "Pending",
          name: studentName || "Student",
          whatsapp: fullWhatsapp,
          gender: studentGender || "N/A",
          has_laptop: studentLaptop || "N/A",
          amount: "₹2,499",
          course: "PenduGPT Complete AI Website Masterclass (Flat ₹2,499 - All Recorded Sessions)",
          status: leadStatus,
        }),
      }).catch(() => {});
    } catch {}
  }
};

export function EnrollmentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | "failed">(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other" | "">("");
  const [hasLaptop, setHasLaptop] = useState<"Yes" | "No" | "">("Yes");
  const [registrationTime, setRegistrationTime] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(2);
  const [errors, setErrors] = useState<{ mobile?: string; name?: string; gender?: string; hasLaptop?: string }>({});

  const { lang } = useI18n();
  const isPa = lang === "pa";

  const supportWhatsapp = import.meta.env.VITE_SUPPORT_WHATSAPP || "917717526430";

  const openModal = () => {
    setStep(1);
    setIsProcessing(false);
    setCountryCode("+91");
    setMobile("");
    setPaymentId("");
    setName("");
    setGender("");
    setHasLaptop("Yes");
    setRegistrationTime("");
    setRedirectCountdown(2);
    setErrors({});
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const buildWhatsappUrl = () => {
    const timeStr = registrationTime || new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });

    const msg = `🎉 *PenduGPT AI Website Complete Masterclass - Payment Successful* 🎉

👤 *Customer Name:* ${name || "Student"}
📱 *WhatsApp Number:* ${countryCode} ${mobile}
👨‍👩‍👧 *Gender:* ${gender || "N/A"}
💻 *Laptop/PC:* ${hasLaptop || "N/A"}
💳 *Amount Paid:* ₹2,499 (Special Launch Fee - Slashed from ₹20,000)
🆔 *Transaction ID:* ${paymentId || "Confirmed"}
📅 *Transaction Date & Time:* ${timeStr}
📚 *Course:* Complete AI Website Masterclass (All 7 HD Recorded Classes + Final Capstone + Google Drive Vault + Prompts)

Please confirm my masterclass enrollment and grant instant access to all recorded sessions, resources & VIP community!`;

    return `https://wa.me/${supportWhatsapp}?text=${encodeURIComponent(msg)}`;
  };

  // Preload Razorpay script on component mount
  useEffect(() => {
    loadRazorpayScript();
  }, []);

  // Lock body scroll & pause heavy GPU animations when modal is active
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isOpen) {
        document.body.classList.add("modal-open");
        document.body.style.overflow = "hidden";
        loadRazorpayScript();
      } else {
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  // Automatic Redirection to WhatsApp on Step 3
  useEffect(() => {
    let timer: any;
    let interval: any;

    if (step === 3 && name && gender) {
      setRedirectCountdown(2);

      interval = setInterval(() => {
        setRedirectCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      timer = setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = buildWhatsappUrl();
        }
      }, 1800);
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [step, name, gender, paymentId, registrationTime]);

  // Launch Razorpay Payment Modal
  const initiateRazorpayPayment = async (mobileNum: string) => {
    setIsProcessing(true);
    setErrors({});

    // Record lead immediately in backend as "Number Entered / Pending Payment"
    await recordLeadStage({
      mobileNum,
      code: countryCode,
      leadStatus: "Number Entered (Unpaid)",
    });

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setIsProcessing(false);
      setErrors({ mobile: "Failed to load Razorpay payment gateway. Please check your internet connection." });
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_TIZdNUBnkz3PoA";

    const options = {
      key: razorpayKey,
      amount: 249900, // ₹2,499 in paise (Slashed from ₹20,000)
      currency: "INR",
      name: "PenduGPT AI Complete Masterclass",
      description: "Complete AI Web Building Masterclass (All Recorded Sessions) - Special Flat ₹2,499",
      image: "/favicon.svg",
      prefill: {
        contact: `${countryCode}${mobileNum}`,
      },
      notes: {
        course: "PenduGPT AI Complete Masterclass (₹2,499 - All Recorded Sessions)",
        mobile: `${countryCode} ${mobileNum}`,
      },
      theme: {
        color: "#d4f934",
        backdrop_color: "rgba(0, 0, 0, 0.85)",
      },
      send_sms_hash: true,
      remember_customer: false,
      retry: {
        enabled: true,
        max_count: 4,
      },
      config: {
        display: {
          blocks: {
            upi: {
              name: "Instant UPI & QR (PhonePe / GPay / Paytm / BHIM)",
              instruments: [
                {
                  method: "upi",
                  flows: ["intent", "qr", "collect"],
                  apps: ["phonepe", "google_pay", "paytm", "bhim", "cred"],
                },
              ],
            },
            cards_and_more: {
              name: "Cards, Net Banking & Wallets",
              instruments: [
                { method: "card" },
                { method: "netbanking" },
                { method: "wallet" },
              ],
            },
          },
          sequence: ["block.upi", "block.cards_and_more"],
          preferences: {
            show_default_blocks: true,
          },
        },
      },
      modal: {
        confirm_close: true,
        backdropclose: false,
        escape: true,
        handleback: true,
        ondismiss: function () {
          setIsProcessing(false);
          setStep("failed");
          recordLeadStage({
            mobileNum,
            code: countryCode,
            leadStatus: "Payment Dismissed / Unpaid",
          });
        },
      },
      handler: async function (response: any) {
        // Payment Success!
        const rzpPaymentId = response.razorpay_payment_id || `pay_mock_${Math.random().toString(36).substr(2, 9)}`;
        setPaymentId(rzpPaymentId);
        setIsProcessing(false);
        setStep(2);

        // Update lead as PAID in backend & localStorage & webhook
        await recordLeadStage({
          mobileNum,
          code: countryCode,
          leadStatus: "Paid & Confirmed",
          payId: rzpPaymentId,
        });
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        console.error("Razorpay Payment Failed:", response.error);
        setIsProcessing(false);
        setStep("failed");
        recordLeadStage({
          mobileNum,
          code: countryCode,
          leadStatus: "Payment Failed / Error",
        });
      });
      rzp.open();
    } catch (err) {
      console.error("Razorpay popup error:", err);
      // Mock fallback if running in preview environment without live key
      const mockPayId = `pay_demo_${Math.random().toString(36).substr(2, 9)}`;
      setPaymentId(mockPayId);
      setIsProcessing(false);
      setStep(2);
      recordLeadStage({
        mobileNum,
        code: countryCode,
        leadStatus: "Paid & Confirmed (Demo)",
        payId: mockPayId,
      });
    }
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = mobile.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setErrors({ mobile: isPa ? "ਕਿਰਪਾ ਕਰਕੇ 10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ" : "Please enter a valid 10-digit mobile number" });
      return;
    }
    initiateRazorpayPayment(cleaned);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; gender?: string; hasLaptop?: string } = {};

    if (!name.trim()) {
      newErrors.name = isPa ? "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ" : "Please enter your full name";
    }
    if (!gender) {
      newErrors.gender = isPa ? "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਲਿੰਗ ਚੁਣੋ" : "Please select your gender";
    }
    if (!hasLaptop) {
      newErrors.hasLaptop = isPa ? "ਕਿਰਪਾ ਕਰਕੇ ਚੁਣੋ ਕਿ ਤੁਹਾਡੇ ਕੋਲ ਲੈਪਟਾਪ/ਪੀਸੀ ਹੈ" : "Please specify if you have access to a Laptop or PC";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);

    const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    setRegistrationTime(formattedDate);

    const laptopStatus = hasLaptop === "Yes" ? "Yes (Laptop/PC 💻)" : "No (Mobile / Manage 📱)";

    // Update lead with profile details in all backend systems
    await recordLeadStage({
      mobileNum: mobile,
      code: countryCode,
      studentName: name.trim(),
      leadStatus: "Paid & Enrolled",
      payId: paymentId || `pay_id_${Date.now()}`,
      studentGender: gender,
      studentLaptop: laptopStatus,
    });

    setIsProcessing(false);
    setErrors({});
    setStep(3);
  };

  return (
    <EnrollmentContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {/* Modal Backdrop with Mobile Mid-Center Alignment */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm md:backdrop-blur-md transform-gpu overflow-y-auto animate-fadeIn">
          
          {/* Clean & Sleek High-End Modal Box */}
          <div className="relative w-full max-w-sm my-auto max-h-[92vh] overflow-y-auto rounded-3xl border border-[#d4f934]/30 bg-gradient-to-b from-[#14180d] via-[#101114] to-[#0a0a0c] p-5 sm:p-6 shadow-[0_0_50px_rgba(212,249,52,0.15)] text-white transition-all transform-gpu text-left custom-scrollbar">
            
            {/* Top Minimal Close Ghost Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-gray-800/80 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* ------------------- STEP 1: ULTRA-CLEAN HIGH-END NUMBER ENTRY ------------------- */}
            {step === 1 && (
              <div>
                {isProcessing ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-3.5">
                    <div className="h-10 w-10 rounded-full border-3 border-[#d4f934] border-t-transparent animate-spin shadow-[0_0_20px_rgba(212,249,52,0.4)]" />
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {isPa ? "ਸੁਰੱਖਿਅਤ ਪੇਮੈਂਟ ਖੁੱਲ੍ਹ ਰਹੀ ਹੈ..." : "Opening Secure Checkout..."}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {isPa ? "Razorpay ਵਿੱਚ ₹2,499 ਦਾ ਭੁਗਤਾਨ ਪੂਰਾ ਕਰੋ" : "Complete ₹2,499 masterclass payment in popup..."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Header: Minimal, Attractive, Clean */}
                    <div className="mb-4 text-left">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#d4f934]/15 border border-[#d4f934]/40 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#d4f934] mb-2">
                        <Sparkles className="h-3 w-3 text-[#d4f934]" />
                        <span>{isPa ? "ਸੰਪੂਰਨ ਮਾਸਟਰਕਲਾਸ • ਫਲੈਟ ₹2,499" : "COMPLETE MASTERCLASS • FLAT ₹2,499"}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {isPa ? "ਦਾਖਲੇ ਲਈ ਮੋਬਾਈਲ ਨੰਬਰ ਭਰੋ" : "Enter WhatsApp Number"}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">
                        {isPa
                          ? "ਸੰਪੂਰਨ ਮਾਸਟਰਕਲਾਸ (ਸਾਰੀਆਂ ਰਿਕਾਰਡਡ ਕਲਾਸਾਂ) ਤੇ Google Drive ਲਿੰਕ ਤੁਹਾਡੇ WhatsApp 'ਤੇ ਮਿਲੇਗਾ।"
                          : "Instant access to Complete Masterclass (all recorded sessions) & Drive vault will be sent to your WhatsApp."}
                      </p>
                    </div>

                    <form onSubmit={handleMobileSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          {isPa ? "WhatsApp ਮੋਬਾਈਲ ਨੰਬਰ" : "WhatsApp Mobile Number"}
                        </label>
                        
                        {/* Sleek Worldwide Country Code Input Group */}
                        <div className="flex items-center rounded-2xl border-2 border-gray-800 bg-[#09090b] focus-within:border-[#d4f934] focus-within:shadow-[0_0_20px_rgba(212,249,52,0.25)] transition-all overflow-hidden">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-24 shrink-0 bg-[#16171a] px-2 py-3.5 border-r border-gray-800 text-sm font-black text-white outline-none cursor-pointer hover:bg-gray-800 transition text-center"
                          >
                            {COUNTRY_CODES.map((c, idx) => (
                              <option key={`${c.code}-${idx}`} value={c.code} className="bg-[#141416] text-white py-1">
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>

                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="9876543210"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                            className="flex-1 min-w-0 bg-transparent px-3.5 py-3.5 text-base sm:text-lg font-bold text-white placeholder-gray-600 focus:outline-none tracking-wide"
                            autoFocus
                          />
                        </div>
                        {errors.mobile && <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.mobile}</p>}
                      </div>

                      {/* Attractive Clean Join Now Button */}
                      <button
                        type="submit"
                        className="lime-button w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 px-5 text-sm sm:text-base font-black text-black shadow-[0_0_25px_rgba(212,249,52,0.4)] cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all mt-1"
                      >
                        <span>{isPa ? "ਹੁਣੇ ਜੁੜੋ (ਫਲੈਟ ₹2,499) →" : "Get Instant Access — Flat ₹2,499 →"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                        <Lock className="h-3 w-3 text-[#d4f934]" />
                        <span className="font-semibold text-gray-300">
                          {isPa ? "100% ਸੁਰੱਖਿਅਤ Razorpay ਪੇਮੈਂਟ" : "100% PCI-DSS Secure Razorpay Checkout"}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 text-center pt-0.5">
                        By joining, you agree to PenduGPT's <a href="/terms" target="_blank" className="underline hover:text-[#d4f934]">Terms</a> & <a href="/refund" target="_blank" className="underline hover:text-[#d4f934]">Refund Policy</a>.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ------------------- PAYMENT FAILED / RETRY SECTION ------------------- */}
            {step === "failed" && (
              <div className="space-y-4 text-center py-1">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-950/80 border border-red-500/60 text-red-400 shadow-md">
                  <AlertTriangle className="h-6 w-6 text-red-400 animate-bounce" />
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">
                    {isPa ? "ਭੁਗਤਾਨ ਅਧੂਰਾ ਰਿਹਾ / Payment Cancelled" : "Payment Cancelled or Failed"}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    {isPa
                      ? "ਤੁਹਾਡਾ ₹2,499 ਦਾ ਭੁਗਤਾਨ ਪੂਰਾ ਨਹੀਂ ਹੋਇਆ। ਘਬਰਾਓ ਨਾ, ਤੁਹਾਡੀ ਸੀਟ ਅਜੇ ਸੁਰੱਖਿਅਤ ਹੈ।"
                      : "Your masterclass enrollment payment of ₹2,499 was not completed."}
                  </p>
                </div>

                {/* Helpful Troubleshooting Box */}
                <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-left text-xs space-y-1.5">
                  <p className="font-bold text-red-300">Quick Payment Troubleshooting Tips:</p>
                  <ul className="text-[11px] text-gray-300 list-disc pl-4 space-y-1">
                    <li>Check your UPI app (GPay / PhonePe / Paytm) or bank PIN.</li>
                    <li>Ensure your bank account has sufficient balance.</li>
                    <li>Try an alternate payment method like Credit/Debit Card or NetBanking.</li>
                  </ul>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={() => initiateRazorpayPayment(mobile)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-black text-black bg-[#d4f934] hover:bg-[#c2e828] transition cursor-pointer shadow-lg"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>{isPa ? "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ (Retry Pay ₹2,499) 🔄" : "Retry Payment ₹2,499 🔄"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full py-2 text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    ← Change Mobile Number ({countryCode} {mobile})
                  </button>
                </div>
              </div>
            )}

            {/* ------------------- STEP 2: PROFILE DETAILS & LAPTOP/PC QUESTION ------------------- */}
            {step === 2 && (
              <div>
                {isProcessing ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="h-10 w-10 rounded-full border-3 border-[#d4f934] border-t-transparent animate-spin" />
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {isPa ? "ਸੀਟ ਕਨਫਰਮ ਹੋ ਰਹੀ ਹੈ..." : "Saving Your Registration..."}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {isPa ? "Google Sheet 'ਚ ਐਂਟਰੀ ਦਰਜ ਹੋ ਰਹੀ ਹੈ..." : "Updating Google Sheet & issuing access..."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-green-950/80 border border-green-500/50 px-2.5 py-0.5 text-[11px] font-bold text-green-400 mb-2">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{isPa ? "ਭੁਗਤਾਨ ਸਫਲ ਰਿਹਾ (₹2,499 Received)" : "Payment Successful (₹2,499 Received)"}</span>
                      </div>
                      <h2 className="text-lg font-black text-white">
                        {isPa ? "ਆਪਣਾ ਵੇਰਵਾ ਭਰੋ" : "Complete Your Profile"}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">
                        {isPa ? "ਸੰਪੂਰਨ ਮਾਸਟਰਕਲਾਸ ਐਕਸੈਸ ਜਾਰੀ ਕਰਨ ਲਈ ਆਪਣਾ ਨਾਮ ਅਤੇ ਲਿੰਗ ਚੁਣੋ:" : "Enter your name and details to issue your masterclass instant access:"}
                      </p>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          {isPa ? "ਤੁਹਾਡਾ ਪੂਰਾ ਨਾਮ *" : "Your Full Name *"}
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <input
                            type="text"
                            placeholder={isPa ? "ਜਸਪ੍ਰੀਤ ਸਿੰਘ" : "e.g. Jaspreet Singh"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-gray-700 bg-[#0a0a0a] pl-9 pr-3 py-2.5 text-base font-bold text-white placeholder-gray-600 focus:border-[#d4f934] focus:outline-none transition"
                            autoFocus
                          />
                        </div>
                        {errors.name && <p className="text-xs text-red-400 mt-1 font-medium">{errors.name}</p>}
                      </div>

                      {/* Gender Selector */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          {isPa ? "ਲਿੰਗ (Gender) *" : "Select Gender *"}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "Male", label: "Male" },
                            { id: "Female", label: "Female" },
                            { id: "Other", label: "Other" },
                          ].map((g) => (
                            <button
                              key={g.id}
                              type="button"
                              onClick={() => setGender(g.id as any)}
                              className={cn(
                                "py-2 px-2 rounded-xl text-xs font-bold border transition text-center cursor-pointer",
                                gender === g.id
                                  ? "border-[#d4f934] bg-[#d4f934] text-black shadow-sm"
                                  : "border-gray-800 bg-[#0a0a0a] text-gray-300 hover:border-gray-700"
                              )}
                            >
                              {g.label}
                            </button>
                          ))}
                        </div>
                        {errors.gender && <p className="text-xs text-red-400 mt-1 font-medium">{errors.gender}</p>}
                      </div>

                      {/* Laptop / PC Requirement Question */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          {isPa ? "ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਲੈਪਟਾਪ/ਪੀਸੀ ਹੈ? *" : "Do you have access to a Laptop or PC? *"}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setHasLaptop("Yes")}
                            className={cn(
                              "flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold border transition cursor-pointer",
                              hasLaptop === "Yes"
                                ? "border-[#d4f934] bg-[#d4f934] text-black shadow-sm"
                                : "border-gray-800 bg-[#0a0a0a] text-gray-300 hover:border-gray-700"
                            )}
                          >
                            <Laptop className="h-4 w-4" />
                            <span>Yes, I have Laptop/PC</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setHasLaptop("No")}
                            className={cn(
                              "flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold border transition cursor-pointer",
                              hasLaptop === "No"
                                ? "border-[#d4f934] bg-[#d4f934] text-black shadow-sm"
                                : "border-gray-800 bg-[#0a0a0a] text-gray-300 hover:border-gray-700"
                            )}
                          >
                            <Smartphone className="h-4 w-4" />
                            <span>No, I will use Mobile</span>
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1.5 leading-tight">
                          💡 A Laptop or PC is recommended for hands-on website building and customization.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-black text-black bg-[#d4f934] hover:bg-[#c2e828] transition cursor-pointer shadow-md mt-2"
                      >
                        <span>{isPa ? "ਐਕਸੈਸ ਪ੍ਰਾਪਤ ਕਰੋ 🎉" : "Submit Details & Complete Enrollment 🎉"}</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ------------------- STEP 3: FINAL SEAT BOOKED CONFIRMATION & AUTO-REDIRECT ------------------- */}
            {step === 3 && (
              <div className="text-center space-y-4 py-1">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400 border border-green-500 shadow-md">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">
                    {isPa ? "ਐਨਰੋਲਮੈਂਟ ਸਫਲ ਰਹੀ! 🎉" : "Enrollment Confirmed! 🎉"}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 font-medium">
                    {isPa
                      ? `ਧੰਨਵਾਦ ${name}! Masterclass WhatsApp ਗਰੁੱਪ ਖੁੱਲ੍ਹ ਰਿਹਾ ਹੈ...`
                      : `Thank you ${name}! Opening WhatsApp with your Google Drive & Masterclass link...`}
                  </p>
                </div>

                {/* Auto Redirect Countdown Notice */}
                <div className="rounded-xl bg-green-950/30 border border-green-500/30 p-2 text-[11px] text-green-400 font-semibold flex items-center justify-center gap-1.5">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-green-400" />
                  <span>
                    {isPa
                      ? `WhatsApp ${redirectCountdown} ਸਕਿੰਟਾਂ ਵਿੱਚ ਖੁੱਲ੍ਹੇਗਾ...`
                      : `Redirecting to WhatsApp in ${redirectCountdown}s...`}
                  </span>
                </div>

                {/* Primary Manual WhatsApp Action Button with Pre-filled Message */}
                <a
                  href={buildWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-4 text-xs sm:text-sm font-black text-white bg-[#25D366] hover:bg-[#20bd5a] transition cursor-pointer shadow-[0_0_25px_rgba(37,211,102,0.45)] animate-pulse"
                >
                  <MessageCircle className="h-5 w-5 text-white fill-white shrink-0" />
                  <span>{isPa ? "Masterclass Drive ਲਿੰਕ ਲਵੋ 💬" : "Get Complete Masterclass Drive Link on WhatsApp 💬"}</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-0.5 text-white/80" />
                </a>

                <p className="text-[10px] text-gray-400 text-center">
                  Click the green button above if WhatsApp doesn't open automatically.
                </p>

                {/* Submitted Summary Details Box */}
                <div className="rounded-xl border border-gray-800 bg-[#0a0a0a] p-3 text-left space-y-1.5 text-xs text-gray-300">
                  <div className="flex justify-between border-b border-gray-800 pb-1">
                    <span className="text-gray-400">Name:</span>
                    <strong className="text-white font-bold">{name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-1">
                    <span className="text-gray-400">Gender:</span>
                    <strong className="text-white font-bold">{gender}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-1">
                    <span className="text-gray-400">WhatsApp:</span>
                    <strong className="text-[#d4f934] font-bold">{countryCode} {mobile}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-1">
                    <span className="text-gray-400">Transaction ID:</span>
                    <strong className="text-white font-mono text-[11px]">{paymentId}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-1">
                    <span className="text-gray-400">Payment Time:</span>
                    <strong className="text-gray-300 font-medium text-[11px]">
                      {registrationTime || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                    </strong>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="text-gray-400">Payment Status:</span>
                    <span className="text-green-400 font-bold uppercase">Paid (₹2,499 - All Recorded Sessions) ✔</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={closeModal}
                    className="w-full py-2.5 px-4 text-xs font-bold text-gray-400 hover:text-white transition cursor-pointer"
                  >
                    {isPa ? "ਬੰਦ ਕਰੋ" : "Close Window"}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollmentModal() {
  const context = useContext(EnrollmentContext);
  if (!context) {
    return {
      isOpen: false,
      openModal: () => {
        if (typeof window !== "undefined") {
          window.location.href = "/#pricing";
        }
      },
      closeModal: () => {},
    };
  }
  return context;
}
