import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactUsPage,
});

function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <main className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#d4f934] hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </a>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Contact Customer Support</h1>
          <p className="mt-3 text-sm text-gray-400">
            Have questions about PenduGPT AI Masterclass? We are here to help you 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column: Business & Contact Information */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl border border-[#d4f934]/30 bg-[#121212] p-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-3">
                Merchant Information
              </h2>

              <ul className="flex flex-col gap-5 text-xs text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#d4f934]/10 text-[#d4f934]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Registered Business Address</strong>
                    <span>PenduGPT (Proprietorship / Khushpreet Singh)<br />Sangrur, Punjab, India - 148001</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#d4f934]/10 text-[#d4f934]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Support Email</strong>
                    <a href="mailto:igkhushishere@gmail.com" className="text-[#d4f934] hover:underline">
                      igkhushishere@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#d4f934]/10 text-[#d4f934]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Support Hotline</strong>
                    <a href="tel:+917717526430" className="text-[#d4f934] hover:underline">
                      +91 77175 26430
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#d4f934]/10 text-[#d4f934]">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Working Hours</strong>
                    <span>Monday to Saturday: 9:00 AM – 7:00 PM IST<br />Response Time: Within 24 hours</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-gray-800 bg-[#121212] p-6 sm:p-8 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-2">Send Us a Direct Message</h2>
              <p className="text-xs text-gray-400 mb-6">
                Fill out the form below and our support manager will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="rounded-2xl border border-[#d4f934]/40 bg-[#0c0c0c] p-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#d4f934] mb-3" />
                  <h3 className="text-lg font-bold text-white">Thank You for Reaching Out!</h3>
                  <p className="mt-2 text-xs text-gray-300">
                    We have received your message. Our team will get back to you at <strong>{formData.email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amanpreet Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-700 bg-[#0a0a0a] px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-[#d4f934] focus:outline-none"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-gray-700 bg-[#0a0a0a] px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-[#d4f934] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 mb-1.5">WhatsApp / Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-gray-700 bg-[#0a0a0a] px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-[#d4f934] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1.5">Your Question / Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we help you regarding PenduGPT AI Masterclass?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-gray-700 bg-[#0a0a0a] px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-[#d4f934] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="lime-button mt-2 flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs sm:text-sm font-extrabold text-black cursor-pointer shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Query</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
