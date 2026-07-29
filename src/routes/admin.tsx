import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Globe,
  Lock,
  LogOut,
  MessageSquare,
  Printer,
  RefreshCw,
  Search,
  ShieldCheck,
  TrendingUp,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { Logo, Wordmark } from "@/components/brand/Logo";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

// Dedicated Central Cloud Storage Endpoint for Multi-Device Admin Sync
const CLOUD_SYNC_URL = "https://api.restful-api.dev/objects/ff8081819f7e10ae019fa980576c3cdf";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "PenduGPT — Super Admin Portal" },
      { name: "description", content: "Super Admin portal to manage student leads and exports." },
    ],
  }),
  component: AdminPage,
});

interface Lead {
  id: string;
  rawId?: string;
  name: string;
  countryCode: string;
  mobile: string;
  gender: string;
  date: string;
  amount: string;
  status: string;
  followedUp?: boolean;
}

// Pre-seeded sample leads for demonstration fallback
const SAMPLE_LEADS: Lead[] = [
  { id: "LEAD-9481", name: "Jaspreet Singh", countryCode: "+91", mobile: "9876543210", gender: "Male", date: "2026-07-27 01:45", amount: "₹99", status: "Paid" },
  { id: "LEAD-9482", name: "Harpreet Kaur", countryCode: "+91", mobile: "9812345678", gender: "Female", date: "2026-07-27 01:52", amount: "₹99", status: "Paid" },
  { id: "LEAD-9483", name: "Gurwinder Singh", countryCode: "+1", mobile: "6045550199", gender: "Male", date: "2026-07-27 02:01", amount: "₹99", status: "Paid" },
  { id: "LEAD-9484", name: "Simranjit Kaur", countryCode: "+44", mobile: "7911123456", gender: "Female", date: "2026-07-27 02:10", amount: "₹99", status: "Paid" },
  { id: "LEAD-9485", name: "Amanpreet Dhillon", countryCode: "+91", mobile: "9780011223", gender: "Male", date: "2026-07-27 02:14", amount: "₹99", status: "Paid" },
];

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [followedUpMap, setFollowedUpMap] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [followupFilter, setFollowupFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Load stored leads + follow-up map across all devices
  useEffect(() => {
    const authSession = sessionStorage.getItem("pendugpt_admin_auth");
    if (authSession === "true") {
      setIsAuthenticated(true);
    }

    loadLeads();
  }, []);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      // 1. Read local storage cache first for instant feedback
      let localFollowups: Record<string, boolean> = {};
      try {
        localFollowups = JSON.parse(localStorage.getItem("pendugpt_followed_up_leads") || "{}");
      } catch {
        localFollowups = {};
      }

      // 2. Fetch central cloud storage for multi-device sync
      let remoteFollowups: Record<string, boolean> = {};
      try {
        const res = await fetch(CLOUD_SYNC_URL);
        if (res.ok) {
          const json = await res.json();
          if (json && json.data && typeof json.data === "object") {
            remoteFollowups = json.data;
          }
        }
      } catch (e) {
        console.warn("Cloud sync fetch notice:", e);
      }

      // Merge remote followups over local cache
      const mergedFollowups = { ...localFollowups, ...remoteFollowups };
      setFollowedUpMap(mergedFollowups);
      localStorage.setItem("pendugpt_followed_up_leads", JSON.stringify(mergedFollowups));

      // 3. Read local leads from localStorage
      let storedLocalLeads: Lead[] = [];
      try {
        storedLocalLeads = JSON.parse(localStorage.getItem("pendugpt_leads") || "[]");
      } catch {}

      // 4. Query all registrations directly from Supabase
      const { data: dbData, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase select error:", error);
      }

      let supabaseLeads: Lead[] = [];
      if (dbData && dbData.length > 0) {
        supabaseLeads = dbData.map((item: any, idx: number) => {
          const leadName = (item.name || item.full_name || "Student").toString().trim();
          const leadMobile = (item.mobile || item.whatsapp || "").toString().trim();
          const leadId = item.id
            ? (item.id.length > 12 ? `LEAD-${item.id.substring(0, 6).toUpperCase()}` : item.id)
            : `SUPA-${1000 + idx}`;

          return {
            id: leadId,
            rawId: item.id,
            name: leadName,
            countryCode: item.country_code || item.countryCode || "+91",
            mobile: leadMobile,
            gender: item.gender || "Other",
            date: item.created_at
              ? new Date(item.created_at).toISOString().replace("T", " ").substring(0, 16)
              : new Date().toISOString().substring(0, 16),
            amount: "₹99",
            status: item.status || "Paid",
          };
        });
      }

      // Merge all leads: Supabase live DB + LocalStorage + Sample Leads
      const allCombined = [...supabaseLeads, ...storedLocalLeads, ...SAMPLE_LEADS];

      // Remove duplicates by mobile or ID
      const uniqueLeads = allCombined.filter(
        (v, i, a) =>
          a.findIndex(
            (t) =>
              (v.mobile && t.mobile === v.mobile) ||
              (v.id && t.id === v.id) ||
              (v.rawId && t.rawId === v.rawId)
          ) === i
      );

      // Attach followedUp boolean to each lead
      const mappedLeads = uniqueLeads.map((l) => {
        const isFollowedUp =
          !!mergedFollowups[l.id] ||
          (l.mobile && !!mergedFollowups[l.mobile]) ||
          (l.rawId && !!mergedFollowups[l.rawId]);

        return {
          ...l,
          followedUp: isFollowedUp,
        };
      });

      setLeads(mappedLeads);
    } catch (err) {
      console.error("Failed to load admin leads:", err);
      setLeads(SAMPLE_LEADS);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle follow up state for a lead and sync to Central Cloud Storage
  const toggleFollowUp = async (lead: Lead) => {
    const newStatus = !lead.followedUp;
    const leadMobile = lead.mobile;
    const leadId = lead.id;
    const rawId = lead.rawId;

    const updatedMap: Record<string, boolean> = {
      ...followedUpMap,
      [leadId]: newStatus,
    };

    if (leadMobile) updatedMap[leadMobile] = newStatus;
    if (rawId) updatedMap[rawId] = newStatus;

    setFollowedUpMap(updatedMap);
    localStorage.setItem("pendugpt_followed_up_leads", JSON.stringify(updatedMap));

    // Update UI state immediately
    setLeads((prev) =>
      prev.map((item) =>
        item.id === lead.id || (lead.mobile && item.mobile === lead.mobile)
          ? { ...item, followedUp: newStatus }
          : item
      )
    );

    // Save centrally to Cloud Storage for instant sync across all devices
    try {
      await fetch(CLOUD_SYNC_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "pendugpt_followups_store",
          data: updatedMap,
        }),
      });
    } catch (err) {
      console.warn("Cloud sync update error:", err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUser = import.meta.env.VITE_ADMIN_USER || "Eleven";
    const validPass = import.meta.env.VITE_ADMIN_PASS || "ElevenPassword2026!";

    if (
      username.trim().toLowerCase() === validUser.toLowerCase() &&
      password === validPass
    ) {
      sessionStorage.setItem("pendugpt_admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Access denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("pendugpt_admin_auth");
    setIsAuthenticated(false);
  };

  // Filtered Leads with safe string handling
  const filteredLeads = leads.filter((lead) => {
    const nameStr = (lead.name || "").toLowerCase();
    const mobileStr = (lead.mobile || "").toString();
    const idStr = (lead.id || "").toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      nameStr.includes(query) || mobileStr.includes(query) || idStr.includes(query);

    const matchesGender = genderFilter === "All" || lead.gender === genderFilter;

    const matchesFollowup =
      followupFilter === "All" ||
      (followupFilter === "FollowedUp" && lead.followedUp) ||
      (followupFilter === "Pending" && !lead.followedUp);

    return matchesSearch && matchesGender && matchesFollowup;
  });

  // Calculate Metrics
  const totalLeads = leads.length;
  const totalRevenue = totalLeads * 99;
  const maleCount = leads.filter((l) => l.gender === "Male").length;
  const femaleCount = leads.filter((l) => l.gender === "Female").length;
  const followedUpCount = leads.filter((l) => l.followedUp).length;
  const pendingFollowupCount = totalLeads - followedUpCount;

  // Export to CSV
  const exportCSV = () => {
    const headers = [
      "Lead ID",
      "Student Name",
      "Country Code",
      "Mobile Number",
      "Gender",
      "Registration Date",
      "Amount Paid",
      "Status",
      "Followed Up",
    ];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name}"`,
      l.countryCode,
      l.mobile,
      l.gender,
      l.date,
      l.amount,
      l.status,
      l.followedUp ? "Yes" : "No",
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `PenduGPT_Leads_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to Excel Compatible (CSV with UTF-8 BOM)
  const exportXLSX = () => {
    const headers = [
      "Lead ID\tStudent Name\tCountry Code\tMobile Number\tGender\tRegistration Date\tAmount Paid\tStatus\tFollowed Up",
    ];
    const rows = filteredLeads.map(
      (l) =>
        `${l.id}\t${l.name}\t${l.countryCode}\t${l.mobile}\t${l.gender}\t${l.date}\t${l.amount}\t${l.status}\t${
          l.followedUp ? "Yes" : "No"
        }`
    );
    const content = "\uFEFF" + [headers, ...rows].join("\n");
    const blob = new Blob([content], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `PenduGPT_Leads_${new Date().toISOString().slice(0, 10)}.xls`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export / Print PDF
  const exportPDF = () => {
    window.print();
  };

  // ---------------- LOGIN SCREEN ----------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#121212] p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Logo className="h-10 w-10" />
              <Wordmark />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#d4f934]/15 border border-[#d4f934]/40 px-3 py-1 text-[11px] font-black uppercase text-[#d4f934] tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Super Admin Portal</span>
            </span>
            <h1 className="text-xl font-extrabold text-white mt-3">Super Admin Login</h1>
            <p className="text-xs text-gray-400 mt-1">
              Enter your admin credentials to access user leads & reports.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-[#0a0a0a] px-3.5 py-3 text-sm font-bold text-white placeholder-gray-600 focus:border-[#d4f934] focus:outline-none transition"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-[#0a0a0a] px-3.5 py-3 text-sm font-bold text-white placeholder-gray-600 focus:border-[#d4f934] focus:outline-none transition"
              />
            </div>

            {loginError && <p className="text-xs text-red-400 font-semibold">{loginError}</p>}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-black text-black bg-[#d4f934] hover:bg-[#c2e828] transition cursor-pointer shadow-md"
            >
              <Lock className="h-4 w-4" />
              <span>Login as Super Admin</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------- DASHBOARD VIEW ----------------
  return (
    <div className="min-h-screen bg-[#080808] text-white print:bg-white print:text-black">
      {/* Top Navbar Header */}
      <header className="border-b border-gray-800 bg-[#0d0d0d] px-4 sm:px-8 py-4 print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <Wordmark />
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#d4f934]/20 border border-[#d4f934]/40 px-2.5 py-0.5 text-[10px] font-black uppercase text-[#d4f934] ml-2">
              Super Admin: Eleven
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadLeads}
              className="flex items-center gap-1.5 rounded-lg border border-gray-800 bg-[#161616] px-3 py-1.5 text-xs font-bold text-gray-300 hover:text-white transition cursor-pointer"
              title="Refresh Leads Data"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-900/40 transition cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="mx-auto max-w-7xl p-4 sm:p-8">
        {/* Printable Header (Visible only when printing PDF) */}
        <div className="hidden print:block mb-6">
          <h1 className="text-2xl font-bold text-black">
            PenduGPT — Student Leads & Enrollment Report
          </h1>
          <p className="text-xs text-gray-600">
            Generated on {new Date().toLocaleString()} · Total Leads: {leads.length}
          </p>
        </div>

        {/* Stats Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 print:hidden">
          <div className="rounded-2xl border border-gray-800 bg-[#121212] p-5">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
              <Users className="h-5 w-5 text-[#d4f934]" />
            </div>
            <div className="text-3xl font-black text-white">{totalLeads}</div>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">Registered Students</p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#121212] p-5">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Revenue Collected</span>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-3xl font-black text-[#d4f934]">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">₹99 per enrollment</p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#121212] p-5">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Community Follow-up
              </span>
              <UserCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">
              {followedUpCount}{" "}
              <span className="text-xs font-semibold text-gray-400">Messaged</span>
              <span className="text-xs font-normal text-gray-500 ml-2">
                ({pendingFollowupCount} pending)
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">
              {totalLeads > 0 ? Math.round((followedUpCount / totalLeads) * 100) : 0}% Outreach
              Completed
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#121212] p-5">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Gender Demographics
              </span>
              <User className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {maleCount} <span className="text-xs font-normal text-gray-400">Male</span> /{" "}
              {femaleCount} <span className="text-xs font-normal text-gray-400">Female</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">Verified Profiles</p>
          </div>
        </div>

        {/* Toolbar & Filters Bar */}
        <div className="rounded-2xl border border-gray-800 bg-[#121212] p-4 mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          {/* Left: Search & Filters */}
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by student name or mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-800 bg-[#0a0a0a] pl-9 pr-3.5 py-2.5 text-xs font-bold text-white placeholder-gray-500 focus:border-[#d4f934] focus:outline-none transition"
              />
            </div>

            {/* Follow-up Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={followupFilter}
                onChange={(e) => setFollowupFilter(e.target.value)}
                className="rounded-xl border border-gray-800 bg-[#0a0a0a] px-3 py-2.5 text-xs font-bold text-white outline-none cursor-pointer focus:border-[#d4f934]"
              >
                <option value="All">All Follow-up Status</option>
                <option value="FollowedUp">✅ Messaged / Followed Up</option>
                <option value="Pending">⏳ Pending Follow-up</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div className="flex items-center gap-2">
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="rounded-xl border border-gray-800 bg-[#0a0a0a] px-3 py-2.5 text-xs font-bold text-white outline-none cursor-pointer focus:border-[#d4f934]"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Right: Export Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 rounded-xl border border-gray-700 bg-[#181818] px-3.5 py-2.5 text-xs font-bold text-white hover:border-[#d4f934] transition cursor-pointer"
              title="Export as CSV file"
            >
              <FileText className="h-4 w-4 text-[#d4f934]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={exportXLSX}
              className="flex items-center gap-1.5 rounded-xl border border-gray-700 bg-[#181818] px-3.5 py-2.5 text-xs font-bold text-white hover:border-green-400 transition cursor-pointer"
              title="Export as Excel Spreadsheet"
            >
              <FileSpreadsheet className="h-4 w-4 text-green-400" />
              <span>Export XLSX</span>
            </button>

            <button
              onClick={exportPDF}
              className="flex items-center gap-1.5 rounded-xl bg-[#d4f934] px-4 py-2.5 text-xs font-black text-black hover:bg-[#c2e828] transition cursor-pointer shadow-md"
              title="Print / Save PDF Report"
            >
              <Printer className="h-4 w-4 text-black" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Lead Data Table */}
        <div className="rounded-2xl border border-gray-800 bg-[#121212] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#0a0a0a] border-b border-gray-800 text-[11px] font-bold uppercase text-gray-400 tracking-wider">
                <tr>
                  <th className="p-4">Lead ID</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Mobile Number (WhatsApp)</th>
                  <th className="p-4">Gender</th>
                  <th className="p-4">Registration Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4 text-right print:hidden">Actions & Community Followup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium">
                {isLoading ? (
                  [1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td className="p-4">
                        <div className="h-4 w-16 rounded skeleton-shimmer" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-32 rounded skeleton-shimmer" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-28 rounded skeleton-shimmer" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-12 rounded skeleton-shimmer" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-24 rounded skeleton-shimmer" />
                      </td>
                      <td className="p-4">
                        <div className="h-4 w-10 rounded skeleton-shimmer" />
                      </td>
                      <td className="p-4">
                        <div className="h-5 w-16 rounded-full skeleton-shimmer" />
                      </td>
                      <td className="p-4 text-right">
                        <div className="h-7 w-36 rounded-xl skeleton-shimmer ml-auto" />
                      </td>
                    </tr>
                  ))
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-500 text-sm">
                      No leads match your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={cn(
                        "transition-all duration-150 border-l-4",
                        lead.followedUp
                          ? "bg-emerald-950/15 border-l-emerald-500 hover:bg-emerald-950/25"
                          : "border-l-transparent hover:bg-gray-800/30"
                      )}
                    >
                      <td className="p-4 font-mono text-[#d4f934] font-bold">{lead.id}</td>
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <span>{lead.name}</span>
                          {lead.followedUp && (
                            <span
                              className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-400"
                              title="Community Followed Up"
                            >
                              <CheckCircle2 className="h-2.5 w-2.5" />
                              <span>Done</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 font-bold text-gray-200">
                          <span className="text-gray-400">{lead.countryCode}</span> {lead.mobile}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-800 text-gray-300">
                          {lead.gender}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{lead.date}</td>
                      <td className="p-4 font-bold text-white">{lead.amount}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-950/80 border border-green-500/40 px-2.5 py-0.5 text-[10px] font-extrabold text-green-400">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{lead.status}</span>
                        </span>
                      </td>
                      <td className="p-4 text-right print:hidden">
                        <div className="inline-flex items-center justify-end gap-2">
                          {/* Follow-up Mark Toggle Button (Left of WhatsApp button) */}
                          <button
                            type="button"
                            onClick={() => toggleFollowUp(lead)}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all duration-200 cursor-pointer border shadow-sm",
                              lead.followedUp
                                ? "bg-emerald-950/90 text-emerald-400 border-emerald-500/50 hover:bg-emerald-900/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                                : "bg-amber-950/40 text-amber-300/90 border-amber-500/30 hover:bg-amber-900/50 hover:text-amber-200"
                            )}
                            title={
                              lead.followedUp
                                ? "Click to toggle OFF (Mark as Pending)"
                                : "Click to toggle ON (Mark as Messaged / Followed Up)"
                            }
                          >
                            {lead.followedUp ? (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                <span>Messaged</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                <span>Mark Followed Up</span>
                              </>
                            )}
                          </button>

                          {/* WhatsApp Direct Chat Link */}
                          <a
                            href={`https://wa.me/${lead.countryCode.replace(
                              "+",
                              ""
                            )}${lead.mobile}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              if (!lead.followedUp) toggleFollowUp(lead);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-green-600/40 bg-green-950/40 px-2.5 py-1 text-[11px] font-bold text-green-400 hover:bg-green-600 hover:text-white transition"
                            title="Open WhatsApp chat and auto-mark as Followed Up"
                          >
                            <MessageSquare className="h-3 w-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
