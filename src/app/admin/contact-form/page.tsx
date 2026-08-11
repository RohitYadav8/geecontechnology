
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
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Contact Messages
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage messages submitted through the website contact form.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* ================= STATS ================= */}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Total */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Messages
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {contacts.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <MessageSquare size={21} />
            </div>
          </div>
        </div>

        {/* New */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                New Messages
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {newCount}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Mail size={21} />
            </div>
          </div>
        </div>

        {/* Read */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Read Messages
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {readCount}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Eye size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 md:flex-row">

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone or address..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ================= TABLE ================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <RefreshCw
                size={18}
                className="animate-spin"
              />
              Loading contact messages...
            </div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <MessageSquare size={24} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
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
                <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Source
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                {filteredContacts.map((contact) => (

                  <tr
                    key={contact.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >

                    {/* CONTACT */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
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
                        className={`rounded-full border px-3 py-1 text-xs font-semibold outline-none ${
                          contact.status === "new"
                            ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400"
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

                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
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
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
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
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-red-950/30 dark:hover:text-red-400"
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
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Showing {filteredContacts.length} of{" "}
            {contacts.length} messages
          </p>
        )}

      {/* ================= MODAL ================= */}

      {selectedContact && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">

              <div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Contact Details
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
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
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="space-y-6 p-6">

              {/* PERSON */}

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-lg font-bold text-blue-600 dark:text-blue-400">
                  {selectedContact.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedContact.name}
                  </h3>

                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      selectedContact.status === "new"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                    }`}
                  >
                    {selectedContact.status}
                  </span>

                </div>
              </div>

              {/* CONTACT INFO */}

              <div className="grid gap-3 sm:grid-cols-2">

                {/* EMAIL */}

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Mail size={15} />
                    Email
                  </div>

                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="mt-2 block break-all text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {selectedContact.email}
                  </a>

                </div>

                {/* PHONE */}

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <Phone size={15} />
                    Phone
                  </div>

                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="mt-2 block text-sm font-medium text-slate-900 dark:text-white"
                  >
                    {selectedContact.phone}
                  </a>

                </div>

                {/* ADDRESS */}

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950 sm:col-span-2">

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <MapPin size={15} />
                    Address
                  </div>

                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
                    {selectedContact.address || "—"}
                  </p>

                </div>

                {/* SOURCE */}

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <User size={15} />
                    Source
                  </div>

                  <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                    {selectedContact.source ||
                      "Not specified"}
                  </p>

                </div>

                {/* DATE */}

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <CalendarDays size={15} />
                    Submitted
                  </div>

                  <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
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
                    className="text-blue-600 dark:text-blue-400"
                  />

                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Requirements
                  </h4>

                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">

                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {selectedContact.requirements ||
                      "No requirements provided."}
                  </p>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedContact(null)
                  }
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
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

