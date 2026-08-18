export const SITE = {
  name: "PenduGPT",
  tagline: "AI Website Building Demo Class",
  priceNow: 99,
  priceOriginal: 1000,
  totalSeats: 300,
  seatsTaken: 247,
  /** Placeholder — replace with the real class date/time. */
  classDateISO: nextBatchDate(),
  whatsappCommunity: "https://chat.whatsapp.com/",
  instagram: "https://instagram.com/",
  youtube: "https://youtube.com/",
  supportEmail: "[Support Email Placeholder]",
  supportPhone: "[Support Phone Placeholder]",
  address: "[Business Address Placeholder], Punjab, India",
  gstin: "[GST Placeholder]",
  legalUpdated: "27 July 2026",
} as const;

/** Rolling deadline so the countdown never shows a dead offer before the real date is set. */
function nextBatchDate(): string {
  const base = new Date();
  base.setDate(base.getDate() + 3);
  base.setHours(20, 0, 0, 0);
  return base.toISOString();
}

export const RECENT_SIGNUPS = [
  { name: "Harpreet", city: "Ludhiana" },
  { name: "Simran", city: "Amritsar" },
  { name: "Gurjot", city: "Patiala" },
  { name: "Navdeep", city: "Jalandhar" },
  { name: "Manpreet", city: "Bathinda" },
  { name: "Ravneet", city: "Mohali" },
  { name: "Arshdeep", city: "Moga" },
  { name: "Kirandeep", city: "Hoshiarpur" },
];
