"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Eye,
  RefreshCw,
  Search,
  Trash2,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  FileText,
} from "lucide-react";

type Candidate = {
  id: string;
  fullName: string;
  email: string;
  phone: string;

  dob: string | null;
  qualification: string | null;
  qualificationYear: string | null;
  pursuingDegree: string | null;

  position: string | null;
  totalExperience: string | null;
  relevantExperience: string | null;

  currentLocation: string | null;
  relocate: string | null;
  travelAbroad: string | null;

  passport: string | null;
  visa: string | null;

  currentlyWorking: string | null;
  reasonForChange: string | null;

  currentCtc: string | null;
  inHandSalary: string | null;
  expectedCtc: string | null;
  expectedInHand: string | null;

  noticePeriod: string | null;
  earliestJoinDate: string | null;

  dependents: string | null;
  readyOnCurrentCtc: string | null;

  resumeUrl: string | null;

  createdAt: string;
};

export default function CandidateScreeningAdminPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // =========================================================
  // FETCH CANDIDATES
  // =========================================================

  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/candidate-screening", {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();

      let data: unknown;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `API returned an invalid response. Status: ${response.status}`
        );
      }

      if (!response.ok) {
        const errorData = data as { error?: string };

        throw new Error(
          errorData.error || "Failed to fetch candidates."
        );
      }

      if (!Array.isArray(data)) {
        throw new Error("Invalid candidate data received from API.");
      }

      setCandidates(data as Candidate[]);
    } catch (error) {
      console.error("Candidates fetch error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch candidates."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredCandidates = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return candidates;
    }

    return candidates.filter((candidate) => {
      return (
        candidate.fullName?.toLowerCase().includes(query) ||
        candidate.email?.toLowerCase().includes(query) ||
        candidate.phone?.toLowerCase().includes(query) ||
        candidate.position?.toLowerCase().includes(query) ||
        candidate.currentLocation?.toLowerCase().includes(query)
      );
    });
  }, [candidates, search]);

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id: string) => {
    const candidate = candidates.find((item) => item.id === id);

    if (!candidate) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the application of ${candidate.fullName}?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/candidate-screening/${id}`,
        {
          method: "DELETE",
        }
      );

      const text = await response.text();

      let data: { error?: string } = {};

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Delete API returned an invalid response. Status: ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete candidate."
        );
      }

      setCandidates((previous) =>
        previous.filter((item) => item.id !== id)
      );

      if (selectedCandidate?.id === id) {
        setSelectedCandidate(null);
      }

      setSuccess("Candidate application deleted successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error("Delete candidate error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete candidate."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // DATE FORMATTER
  // =========================================================

  const formatDate = (date: string | null) => {
    if (!date) return "Not provided";

    try {
      return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return date;
    }
  };

  const formatSimpleDate = (date: string | null) => {
    if (!date) return "Not provided";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Candidate Screening
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage candidate applications submitted through
              the website.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchCandidates}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>

        {/* ================================================= */}
        {/* MESSAGES */}
        {/* ================================================= */}

        {error && (
          <div className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-4"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
            {success}
          </div>
        )}

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Applications
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {candidates.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <User size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Search Results
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {filteredCandidates.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400">
                <Search size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Latest Application
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                  {candidates.length > 0
                    ? formatDate(candidates[0].createdAt)
                    : "No applications"}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <Calendar size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* SEARCH */}
        {/* ================================================= */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative max-w-xl">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, phone, position..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>

        {/* ================================================= */}
        {/* APPLICATION LIST */}
        {/* ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* List Header */}

          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Applications
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {filteredCandidates.length} candidate
                  {filteredCandidates.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Loading */}

          {loading ? (
            <div className="flex min-h-60 items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <RefreshCw
                  size={18}
                  className="animate-spin"
                />

                Loading applications...
              </div>
            </div>
          ) : filteredCandidates.length === 0 ? (
            /* Empty */

            <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <User size={25} />
              </div>

              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                No applications found
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Candidate applications submitted through the
                website will appear here.
              </p>
            </div>
          ) : (
            /* Candidates */

            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="p-6 transition hover:bg-slate-50/70 dark:hover:bg-slate-800/30"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* Candidate Info */}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1a2b4a] to-blue-600 text-sm font-bold text-white">
                          {candidate.fullName
                            ?.trim()
                            .split(/\s+/)
                            .map((word) => word.charAt(0))
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() || "C"}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {candidate.fullName}
                          </h3>

                          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Mail size={13} />

                              {candidate.email}
                            </span>

                            <span className="flex items-center gap-1">
                              <Phone size={13} />

                              {candidate.phone}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {candidate.position && (
                              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                {candidate.position}
                              </span>
                            )}

                            {candidate.totalExperience && (
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {candidate.totalExperience} experience
                              </span>
                            )}

                            {candidate.currentLocation && (
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {candidate.currentLocation}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                        Applied:{" "}
                        {formatDate(candidate.createdAt)}
                      </p>
                    </div>

                    {/* Actions */}

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCandidate(candidate)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                      >
                        <Eye size={14} />

                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(candidate.id)
                        }
                        disabled={
                          deletingId === candidate.id
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
                      >
                        <Trash2 size={14} />

                        {deletingId === candidate.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* CANDIDATE DETAILS MODAL */}
      {/* ================================================= */}

      {selectedCandidate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCandidate(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Candidate Details
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {selectedCandidate.fullName}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedCandidate(null)
                }
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}

            <div className="max-h-[calc(90vh-90px)] overflow-y-auto p-6">
              {/* Personal Information */}

              <section>
                <SectionTitle
                  icon={<User size={17} />}
                  title="Personal Information"
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem
                    label="Full Name"
                    value={selectedCandidate.fullName}
                  />

                  <InfoItem
                    label="Email"
                    value={selectedCandidate.email}
                  />

                  <InfoItem
                    label="Phone"
                    value={selectedCandidate.phone}
                  />

                  <InfoItem
                    label="Date of Birth"
                    value={formatSimpleDate(
                      selectedCandidate.dob
                    )}
                  />

                  <InfoItem
                    label="Current Location"
                    value={selectedCandidate.currentLocation}
                  />

                  <InfoItem
                    label="Dependents"
                    value={selectedCandidate.dependents}
                  />
                </div>
              </section>

              {/* Education */}

              <section className="mt-8">
                <SectionTitle
                  icon={<GraduationCap size={17} />}
                  title="Education"
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem
                    label="Qualification"
                    value={selectedCandidate.qualification}
                  />

                  <InfoItem
                    label="Qualification Year"
                    value={formatSimpleDate(
                      selectedCandidate.qualificationYear
                    )}
                  />

                  <InfoItem
                    label="Pursuing Degree"
                    value={selectedCandidate.pursuingDegree}
                  />
                </div>
              </section>

              {/* Professional */}

              <section className="mt-8">
                <SectionTitle
                  icon={<Briefcase size={17} />}
                  title="Professional Information"
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem
                    label="Position"
                    value={selectedCandidate.position}
                  />

                  <InfoItem
                    label="Total Experience"
                    value={selectedCandidate.totalExperience}
                  />

                  <InfoItem
                    label="Relevant Experience"
                    value={selectedCandidate.relevantExperience}
                  />

                  <InfoItem
                    label="Currently Working"
                    value={selectedCandidate.currentlyWorking}
                  />

                  <InfoItem
                    label="Notice Period"
                    value={selectedCandidate.noticePeriod}
                  />

                  <InfoItem
                    label="Earliest Join Date"
                    value={formatSimpleDate(
                      selectedCandidate.earliestJoinDate
                    )}
                  />
                </div>
              </section>

              {/* Location & Travel */}

              <section className="mt-8">
                <SectionTitle
                  icon={<MapPin size={17} />}
                  title="Location & Travel"
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem
                    label="Relocate"
                    value={selectedCandidate.relocate}
                  />

                  <InfoItem
                    label="Travel Abroad"
                    value={selectedCandidate.travelAbroad}
                  />

                  <InfoItem
                    label="Passport"
                    value={selectedCandidate.passport}
                  />

                  <InfoItem
                    label="Visa"
                    value={selectedCandidate.visa}
                  />
                </div>
              </section>

              {/* Salary */}

              <section className="mt-8">
                <SectionTitle
                  icon={<Briefcase size={17} />}
                  title="Salary Information"
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem
                    label="Current CTC"
                    value={selectedCandidate.currentCtc}
                  />

                  <InfoItem
                    label="In-Hand Salary"
                    value={selectedCandidate.inHandSalary}
                  />

                  <InfoItem
                    label="Expected CTC"
                    value={selectedCandidate.expectedCtc}
                  />

                  <InfoItem
                    label="Expected In-Hand"
                    value={selectedCandidate.expectedInHand}
                  />

                  <InfoItem
                    label="Ready on Current CTC"
                    value={selectedCandidate.readyOnCurrentCtc}
                  />
                </div>
              </section>

              {/* Reason */}

              {selectedCandidate.reasonForChange && (
                <section className="mt-8">
                  <SectionTitle
                    icon={<FileText size={17} />}
                    title="Reason for Change"
                  />

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                    {selectedCandidate.reasonForChange}
                  </div>
                </section>
              )}

              {/* Resume */}

              <section className="mt-8">
                <SectionTitle
                  icon={<FileText size={17} />}
                  title="Resume"
                />

                {selectedCandidate.resumeUrl ? (
                  <a
                    href={selectedCandidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <FileText size={16} />
                    View Resume
                  </a>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Resume not available.
                  </p>
                )}
              </section>

              {/* Application */}

              <section className="mt-8">
                <SectionTitle
                  icon={<Calendar size={17} />}
                  title="Application"
                />

                <InfoItem
                  label="Applied On"
                  value={formatDate(
                    selectedCandidate.createdAt
                  )}
                />
              </section>

              {/* Delete From Modal */}

              <section className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() =>
                    handleDelete(selectedCandidate.id)
                  }
                  disabled={
                    deletingId === selectedCandidate.id
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={16} />

                  {deletingId === selectedCandidate.id
                    ? "Deleting..."
                    : "Delete Application"}
                </button>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================
// SECTION TITLE
// =========================================================

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        {icon}
      </div>

      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
    </div>
  );
}

// =========================================================
// INFO ITEM
// =========================================================

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-700 dark:text-slate-200">
        {value || "Not provided"}
      </p>
    </div>
  );
}