
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  X,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  MessageSquare,
  User,
  RefreshCw,
} from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  source: string | null;
  requirements: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // =========================
  // FETCH CONTACTS
  // =========================

  const fetchContacts = async () => {
    try {
      setError("");

      const response = await fetch("/api/contact", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch contacts");
      }

      setContacts(Array.isArray(data) ? data : data.contacts || []);
    } catch (err) {
      console.error("Fetch contacts error:", err);
      setError("Unable to load contact messages.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // =========================
  // REFRESH
  // =========================

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchContacts();
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact message?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete contact");
      }

      setContacts((prev) =>
        prev.filter((contact) => contact.id !== id)
      );

      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    } catch (err) {
      console.error("Delete contact error:", err);
      alert("Unable to delete contact message.");
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // STATUS UPDATE
  // =========================

  const handleStatusChange = async (
    id: string,
    status: string
  ) => {
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to update status"
        );
      }

      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === id
            ? {
                ...contact,
                status,
              }
            : contact
        )
      );

      if (selectedContact?.id === id) {
        setSelectedContact((prev) =>
          prev
            ? {
                ...prev,
                status,
              }
            : null
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Unable to update contact status.");
    }
  };

  // =========================
  // FILTER
  // =========================

  const filteredContacts = useMemo(() => {
    const query = search.toLowerCase().trim();

    return contacts.filter((contact) => {
      const matchesSearch =
        !query ||
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query) ||
        contact.address.toLowerCase().includes(query) ||
        (contact.source ?? "").toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        contact.status.toLowerCase() ===
          statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [contacts, search, statusFilter]);

  // =========================
  // COUNTS
  // =========================

  const newCount = contacts.filter(
    (contact) => contact.status.toLowerCase() === "new"
  ).length;

  const readCount = contacts.filter(
    (contact) => contact.status.toLowerCase() === "read"
  ).length;

  // =========================
  // DATE
  // =========================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full min-w-0">

      {/* ================= HEADER ================= */}

      <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 pb-20 pt-7 text-white sm:px-8 sm:pb-24 sm:pt-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              Contact Messages
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-50/90">
              Manage messages submitted through the website contact form.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg shadow-violet-950/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="relative z-10 -mt-12 mb-6 grid gap-4 px-3 sm:-mt-14 sm:grid-cols-2 sm:px-5 lg:grid-cols-3">

        {/* Total */}

        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Total Messages
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {contacts.length}
              </p>
            </div>

            <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <MessageSquare size={19} />
            </div>
          </div>
        </div>

        {/* New */}

        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                New Messages
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {newCount}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <Mail size={19} />
            </div>
          </div>
        </div>

        {/* Read */}

        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Read Messages
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {readCount}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <Eye size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="mb-6 rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
        <div className="flex flex-col gap-3 md:flex-row">

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone or address..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:focus:bg-white/[0.06]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-semibold text-slate-700 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ================= TABLE ================= */}

      <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
              <RefreshCw
                size={18}
                className="animate-spin text-violet-500"
              />
              Loading contact messages...
            </div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

            <div className="brand-grad flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
              <MessageSquare size={24} />
            </div>

            <h3 className="mt-4 text-base font-extrabold tracking-[-0.01em] text-slate-900 dark:text-white">
              No contact messages found
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Contact form submissions will appear here once visitors submit the form.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-400">

                  <th className="px-5 py-4 text-left">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-left">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-left">
                    Source
                  </th>

                  <th className="px-5 py-4 text-left">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">

                {filteredContacts.map((contact) => (

                  <tr
                    key={contact.id}
                    className="transition hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                  >

                    {/* CONTACT */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-sm font-bold text-white shadow-md shadow-violet-500/20">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                            {contact.name}
                          </p>

                          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                            {contact.email}
                          </p>

                        </div>
                      </div>
                    </td>

                    {/* PHONE */}

                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {contact.phone}
                    </td>

                    {/* SOURCE */}

                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {contact.source || "—"}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <select
                        value={contact.status}
                        onChange={(e) =>
                          handleStatusChange(
                            contact.id,
                            e.target.value
                          )
                        }
                        className={`cursor-pointer rounded-full border px-3 py-1 text-[11px] font-bold outline-none transition focus:ring-4 focus:ring-violet-500/10 ${
                          contact.status === "new"
                            ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                        }`}
                      >
                        <option value="new">
                          New
                        </option>

                        <option value="read">
                          Read
                        </option>
                      </select>

                    </td>

                    {/* DATE */}

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(contact.createdAt)}
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedContact(contact);

                            if (contact.status === "new") {
                              handleStatusChange(
                                contact.id,
                                "read"
                              );
                            }
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-violet-400/30 dark:hover:bg-violet-500/10 dark:hover:text-violet-300"
                          title="View contact"
                        >
                          <Eye size={16} />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(contact.id)
                          }
                          disabled={
                            deletingId === contact.id
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                          title="Delete contact"
                        >
                          {deletingId === contact.id ? (
                            <RefreshCw
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= RESULTS ================= */}

      {!loading &&
        filteredContacts.length > 0 && (
          <p className="mt-4 px-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Showing {filteredContacts.length} of{" "}
            {contacts.length} messages
          </p>
        )}

      {/* ================= MODAL ================= */}

      {selectedContact && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[24px] border border-slate-200/80 bg-white shadow-[0_40px_100px_-40px_rgba(15,23,42,.6)] dark:border-white/[0.07] dark:bg-[#0b1220]">

            {/* MODAL HEADER */}

            <div className="brand-grad sticky top-0 z-10 flex items-center justify-between overflow-hidden px-6 py-5 text-white">

              <div className="relative">

                <h2 className="text-lg font-extrabold tracking-[-0.02em]">
                  Contact Details
                </h2>

                <p className="mt-1 text-xs text-indigo-50/90">
                  Submitted{" "}
                  {formatDate(
                    selectedContact.createdAt
                  )}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedContact(null)
                }
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-white/[0.14] text-white backdrop-blur-xl transition hover:bg-white/25"
              >
                <X size={20} />
              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="space-y-6 p-6">

              {/* PERSON */}

              <div className="flex items-center gap-4">

                <div className="brand-grad flex h-14 w-14 items-center justify-center rounded-[16px] text-lg font-extrabold text-white shadow-lg shadow-violet-500/25">
                  {selectedContact.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h3 className="text-xl font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white">
                    {selectedContact.name}
                  </h3>

                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      selectedContact.status === "new"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    }`}
                  >
                    {selectedContact.status}
                  </span>

                </div>
              </div>

              {/* CONTACT INFO */}

              <div className="grid gap-3 sm:grid-cols-2">

                {/* EMAIL */}

                <div className="rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/[0.07] dark:bg-white/[0.03]">

                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    <Mail size={15} className="text-violet-500" />
                    Email
                  </div>

                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="mt-2 block break-all text-sm font-semibold text-violet-600 hover:underline dark:text-violet-300"
                  >
                    {selectedContact.email}
                  </a>

                </div>

                {/* PHONE */}

                <div className="rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/[0.07] dark:bg-white/[0.03]">

                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    <Phone size={15} className="text-violet-500" />
                    Phone
                  </div>

                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="mt-2 block text-sm font-semibold text-slate-900 dark:text-white"
                  >
                    {selectedContact.phone}
                  </a>

                </div>

                {/* ADDRESS */}

                <div className="rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-4 sm:col-span-2 dark:border-white/[0.07] dark:bg-white/[0.03]">

                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    <MapPin size={15} className="text-violet-500" />
                    Address
                  </div>

                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
                    {selectedContact.address || "—"}
                  </p>

                </div>

                {/* SOURCE */}

                <div className="rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/[0.07] dark:bg-white/[0.03]">

                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    <User size={15} className="text-violet-500" />
                    Source
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                    {selectedContact.source ||
                      "Not specified"}
                  </p>

                </div>

                {/* DATE */}

                <div className="rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/[0.07] dark:bg-white/[0.03]">

                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    <CalendarDays size={15} className="text-violet-500" />
                    Submitted
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                    {formatDate(
                      selectedContact.createdAt
                    )}
                  </p>

                </div>

              </div>

              {/* REQUIREMENTS */}

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <MessageSquare
                    size={17}
                    className="text-violet-600 dark:text-violet-400"
                  />

                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Requirements
                  </h4>

                </div>

                <div className="rounded-[16px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/[0.07] dark:bg-white/[0.03]">

                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {selectedContact.requirements ||
                      "No requirements provided."}
                  </p>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end dark:border-white/[0.06]">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedContact(null)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      selectedContact.id
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                >
                  <Trash2 size={16} />
                  Delete Message
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
