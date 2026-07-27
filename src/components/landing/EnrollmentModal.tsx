import React, { createContext, useContext, useState } from "react";
import { ArrowRight, CheckCircle2, Lock, MessageCircle, ShieldCheck, User, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

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

export function EnrollmentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other" | "">("");
  const [errors, setErrors] = useState<{ mobile?: string; name?: string; gender?: string }>({});

  const { lang } = useI18n();
  const isPa = lang === "pa";

  const openModal = () => {
    setStep(1);
    setIsProcessing(false);
    setCountryCode("+91");
    setMobile("");
    setName("");
    setGender("");
    setErrors({});
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = mobile.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setErrors({ mobile: isPa ? "ਕਿਰਪਾ ਕਰਕੇ 10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ" : "Please enter a valid 10-digit mobile number" });
      return;
    }
    setErrors({});
    setIsProcessing(true);

    // Simulate payment gateway redirect & successful payment return
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 1200);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; gender?: string } = {};

    if (!name.trim()) {
      newErrors.name = isPa ? "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ" : "Please enter your full name";
    }
    if (!gender) {
      newErrors.gender = isPa ? "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਲਿੰਗ ਚੁਣੋ" : "Please select your gender";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save lead into localStorage & Supabase Cloud Database for Super Admin portal tracking
    try {
      const newLead = {
        id: "LEAD-" + Math.floor(1000 + Math.random() * 9000),
        name: name.trim(),
        countryCode,
        mobile: mobile.trim(),
        gender,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        amount: "₹99",
        status: "Paid",
      };
      const existing = JSON.parse(localStorage.getItem("pendugpt_leads") || "[]");
      localStorage.setItem("pendugpt_leads", JSON.stringify([newLead, ...existing]));

      // Save directly to live Supabase database table
      supabase.from("registrations").insert({
        name: name.trim(),
        country_code: countryCode,
        mobile: mobile.trim(),
        gender: gender,
      }).then(({ error }) => {
        if (error) console.log("Supabase direct insert status:", error.message);
      });
    } catch (err) {
      console.error("Failed to save lead:", err);
    }

    setErrors({});
    setStep(3);
  };

  return (
    <EnrollmentContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          
          {/* Clean & Sleek Modal Box */}
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-800 bg-[#121212] p-6 shadow-2xl text-white transition-all">
            
            {/* Top Minimal Close Ghost Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-gray-800/80 transition"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* ------------------- STEP 1: MOBILE NUMBER ENTRY ------------------- */}
            {step === 1 && (
              <div>
                {isProcessing ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="h-10 w-10 rounded-full border-3 border-[#d4f934] border-t-transparent animate-spin" />
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {isPa ? "ਪੇਮੈਂਟ ਹੋ ਰਹੀ ਹੈ..." : "Processing Payment..."}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {isPa ? "ਕਿਰਪਾ ਕਰਕੇ ਇੰਤਜ਼ਾਰ ਕਰੋ (₹99)" : "Securing your seat for ₹99..."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Header */}
                    <div className="mb-5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4f934]">
                        {isPa ? "ਲਾਈਵ ਮਾਸਟਰਕਲਾਸ · ₹99" : "Live Masterclass · ₹99"}
                      </span>
                      <h2 className="text-lg font-black text-white mt-1">
                        {isPa ? "ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ" : "Enter Mobile Number"}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">
                        {isPa
                          ? "ਭੁਗਤਾਨ ਕਰਨ ਅਤੇ WhatsApp 'ਤੇ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ:"
                          : "We will send your masterclass seat details on WhatsApp."}
                      </p>
                    </div>

                    <form onSubmit={handleMobileSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          {isPa ? "ਮੋਬਾਈਲ ਨੰਬਰ (WhatsApp)" : "Mobile Number (WhatsApp)"}
                        </label>
                        
                        {/* Sleek Worldwide Country Code Input Group */}
                        <div className="flex items-center rounded-xl border border-gray-700 bg-[#0a0a0a] focus-within:border-[#d4f934] transition overflow-hidden">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-24 shrink-0 bg-[#1a1a1a] px-2 py-3 border-r border-gray-700 text-xs font-bold text-white outline-none cursor-pointer hover:bg-gray-800 transition text-center"
                          >
                            {COUNTRY_CODES.map((c, idx) => (
                              <option key={`${c.code}-${idx}`} value={c.code} className="bg-[#141414] text-white py-1">
                                {c.flag} {c.code} ({c.name})
                              </option>
                            ))}
                          </select>

                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="9876543210"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                            className="flex-1 min-w-0 bg-transparent px-3 py-3 text-sm font-bold text-white placeholder-gray-600 focus:outline-none tracking-wide"
                            autoFocus
                          />
                        </div>
                        {errors.mobile && <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.mobile}</p>}
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-black text-black bg-[#d4f934] hover:bg-[#c2e828] transition cursor-pointer shadow-md"
                      >
                        <span>{isPa ? "ਪੇਮੈਂਟ ਲਈ ਅੱਗੇ ਵਧੋ (₹99) →" : "Proceed to Pay ₹99 →"}</span>
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                        <Lock className="h-3 w-3 text-gray-400" />
                        <span>{isPa ? "100% ਸੁਰੱਖਿਅਤ ਚੈੱਕਆਉਟ" : "100% Secure Checkout · Instant Access"}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 text-center pt-0.5">
                        By continuing, you agree to PenduGPT's <a href="/terms" target="_blank" className="underline hover:text-[#d4f934]">Terms</a>, <a href="/privacy" target="_blank" className="underline hover:text-[#d4f934]">Privacy</a> & <a href="/refund" target="_blank" className="underline hover:text-[#d4f934]">Refund Policy</a>.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ------------------- STEP 2: PROFILE DETAILS (POST-PAYMENT) ------------------- */}
            {step === 2 && (
              <div>
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-green-950/80 border border-green-500/50 px-2.5 py-0.5 text-[11px] font-bold text-green-400 mb-2">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{isPa ? "ਭੁਗਤਾਨ ਸਫਲ ਰਿਹਾ (₹99 Received)" : "Payment Successful (₹99 Received)"}</span>
                  </div>
                  <h2 className="text-lg font-black text-white">
                    {isPa ? "ਆਪਣਾ ਵੇਰਵਾ ਭਰੋ" : "Complete Your Profile"}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    {isPa ? "ਸੀਟ ਟਿਕਟ ਜਾਰੀ ਕਰਨ ਲਈ ਆਪਣਾ ਨਾਮ ਅਤੇ ਲਿੰਗ ਚੁਣੋ:" : "Enter your name and select gender to issue seat ticket:"}
                  </p>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      {isPa ? "ਤੁਹਾਡਾ ਪੂਰਾ ਨਾਮ" : "Your Full Name"}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder={isPa ? "ਜਸਪ੍ਰੀਤ ਸਿੰਘ" : "e.g. Jaspreet Singh"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-gray-700 bg-[#0a0a0a] pl-9 pr-3 py-2.5 text-sm font-bold text-white placeholder-gray-600 focus:border-[#d4f934] focus:outline-none transition"
                        autoFocus
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-400 mt-1 font-medium">{errors.name}</p>}
                  </div>

                  {/* Gender Selector */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      {isPa ? "ਲਿੰਗ (Gender)" : "Select Gender"}
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

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-black text-black bg-[#d4f934] hover:bg-[#c2e828] transition cursor-pointer shadow-md mt-2"
                  >
                    <span>{isPa ? "ਸੀਟ ਪੱਕੀ ਕਰੋ 🎉" : "Confirm Seat Booking 🎉"}</span>
                  </button>
                </form>
              </div>
            )}

            {/* ------------------- STEP 3: FINAL SEAT BOOKED CONFIRMATION ------------------- */}
            {step === 3 && (
              <div className="text-center space-y-4 py-1">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400 border border-green-500 shadow-md">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">
                    {isPa ? "ਸੀਟ ਸਫਲਤਾਪੂਰਵਕ ਬੁੱਕ ਹੋ ਗਈ! 🎉" : "Seat Booked Successfully! 🎉"}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 font-medium">
                    {isPa
                      ? `ਧੰਨਵਾਦ ${name}! ਮਾਸਟਰਕਲਾਸ ਵਿੱਚ ਤੁਹਾਡੀ ਸੀਟ ਕਨਫਰਮ ਹੋ ਗਈ ਹੈ।`
                      : `Thank you ${name}! Your seat for the masterclass is confirmed.`}
                  </p>
                </div>

                {/* Details Box */}
                <div className="rounded-xl border border-gray-800 bg-[#0a0a0a] p-3 text-left space-y-1 text-xs text-gray-300">
                  <div className="flex justify-between border-b border-gray-800 pb-1">
                    <span className="text-gray-400">Name:</span>
                    <strong className="text-white font-bold">{name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-1">
                    <span className="text-gray-400">WhatsApp:</span>
                    <strong className="text-[#d4f934] font-bold">{countryCode} {mobile}</strong>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400 font-bold uppercase">Confirmed ✔</span>
                  </div>
                </div>

                {/* WhatsApp Instruction Notice */}
                <div className="rounded-xl border border-green-500/40 bg-green-950/40 p-3 text-left">
                  <div className="flex items-center gap-1.5 text-green-400 font-bold text-xs">
                    <MessageCircle className="h-4 w-4" />
                    <span>{isPa ? "WhatsApp ਜਾਣਕਾਰੀ ਭੇਜੀ ਜਾਵੇਗੀ:" : "WhatsApp Details Will Be Sent:"}</span>
                  </div>
                  <p className="text-[11px] text-gray-300 mt-1 leading-snug">
                    {isPa ? (
                      <>ਸਾਰੀ ਜਾਣਕਾਰੀ ਅਤੇ ਮਾਸਟਰਕਲਾਸ ਲਿੰਕ ਤੁਹਾਡੇ ਮੋਬਾਈਲ <strong>{countryCode} {mobile}</strong> ਦੇ WhatsApp 'ਤੇ ਭੇਜ ਦਿੱਤੇ ਜਾਣਗੇ।</>
                    ) : (
                      <>All masterclass details & meeting link will be sent directly to <strong>{countryCode} {mobile}</strong> on WhatsApp.</>
                    )}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={closeModal}
                    className="w-full py-3 px-4 text-xs font-black text-black bg-[#d4f934] hover:bg-[#c2e828] rounded-xl transition cursor-pointer shadow-md"
                  >
                    {isPa ? "ਠੀਕ ਹੈ / ਬੰਦ ਕਰੋ" : "Done / Close Window"}
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
    throw new Error("useEnrollmentModal must be used within an EnrollmentProvider");
  }
  return context;
}
