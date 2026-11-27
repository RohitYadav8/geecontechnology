"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

  const [openingResumeId, setOpeningResumeId] =
    useState<string | null>(null);

  // =========================================================
  // FETCH CANDIDATES
  // =========================================================

  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/candidate-screening",
        {
          method: "GET",
          cache: "no-store",
        }
      );

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
        const errorData = data as {
          error?: string;
        };

        throw new Error(
          errorData.error || "Failed to fetch candidates."
        );
      }

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid candidate data received from API."
        );
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
        candidate.fullName
          ?.toLowerCase()
          .includes(query) ||
        candidate.email
          ?.toLowerCase()
          .includes(query) ||
        candidate.phone
          ?.toLowerCase()
          .includes(query) ||
        candidate.position
          ?.toLowerCase()
          .includes(query) ||
        candidate.currentLocation
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [candidates, search]);

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = async (id: string) => {
    const candidate = candidates.find(
      (item) => item.id === id
    );

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

      let data: {
        error?: string;
      } = {};

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
        previous.filter(
          (item) => item.id !== id
        )
      );

      if (selectedCandidate?.id === id) {
        setSelectedCandidate(null);
      }

      setSuccess(
        "Candidate application deleted successfully."
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error(
        "Delete candidate error:",
        error
      );

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
  // VIEW RESUME
  // =========================================================

  const handleViewResume = async (
    candidate: Candidate
  ) => {
    if (!candidate.resumeUrl) {
      setError("Resume not available.");
      return;
    }

    try {
      setOpeningResumeId(candidate.id);
      setError("");

      const response = await fetch(
        `/api/admin/candidate-screening/${candidate.id}/resume`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data =
        (await response.json()) as {
          url?: string;
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to open resume."
        );
      }

      if (!data.url) {
        throw new Error(
          "Resume URL was not returned."
        );
      }

      window.open(
        data.url,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      console.error(
        "View resume error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to open resume."
      );
    } finally {
      setOpeningResumeId(null);
    }
  };

  // =========================================================
  // DATE FORMATTER
  // =========================================================

  const formatDate = (
    date: string | null
  ) => {
    if (!date) {
      return "Not provided";
    }

    try {
      return new Date(date).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return date;
    }
  };

  const formatSimpleDate = (
    date: string | null
  ) => {
    if (!date) {
      return "Not provided";
    }

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="w-full min-w-0">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="brand-grad relative mb-6 overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
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
            Candidate Screening
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-50/90">
            Manage candidate applications submitted
            through the website.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchCandidates}
          disabled={loading}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <RefreshCw
            size={16}
            className={
              loading ? "animate-spin" : ""
            }
          />

          Refresh
        </button>
        </div>
      </div>

      {/* ================================================= */}
      {/* MESSAGES */}
      {/* ================================================= */}

      {error && (
        <div className="mb-5 flex min-w-0 items-start justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-medium text-red-700 sm:px-4 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          <span className="min-w-0 break-words">
            {error}
          </span>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 rounded-lg p-1 transition hover:bg-red-100 dark:hover:bg-red-500/20"
            aria-label="Close error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-5 break-words rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm font-medium text-emerald-700 sm:px-4 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
          {success}
        </div>
      )}

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {/* Total Applications */}

        <div className="group rounded-[22px] border border-slate-100 bg-white p-4 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 sm:p-5 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Total Applications
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {candidates.length}
              </p>
            </div>

            <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6 sm:h-12 sm:w-12">
              <User size={22} />
            </div>
          </div>
        </div>

        {/* Search Results */}

        <div className="group rounded-[22px] border border-slate-100 bg-white p-4 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 sm:p-5 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Search Results
              </p>

              <p className="brand-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {filteredCandidates.length}
              </p>
            </div>

            <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6 sm:h-12 sm:w-12">
              <Search size={22} />
            </div>
          </div>
        </div>

        {/* Latest Application */}

        <div className="group rounded-[22px] border border-slate-100 bg-white p-4 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 sm:p-5 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Latest Application
              </p>

              <p className="mt-3 break-words text-sm font-bold text-slate-900 dark:text-white">
                {candidates.length > 0
                  ? formatDate(
                      candidates[0].createdAt
                    )
                  : "No applications"}
              </p>
            </div>

            <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6 sm:h-12 sm:w-12">
              <Calendar size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <div className="mb-5 p-3 sm:p-4 rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
        <div className="relative w-full sm:max-w-xl">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by name, email, phone, position..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-xs placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10 sm:placeholder:text-sm dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* APPLICATION LIST */}
      {/* ================================================= */}

      <div className="min-w-0 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
        {/* List Header */}

        <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-4 sm:px-5 lg:px-6 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Applications
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {filteredCandidates.length}{" "}
                candidate
                {filteredCandidates.length !== 1
                  ? "s"
                  : ""}
              </p>
            </div>
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex min-h-60 items-center justify-center px-4 text-center">
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <RefreshCw
                size={18}
                className="animate-spin"
              />

              Loading applications...
            </div>
          </div>
        ) : filteredCandidates.length ===
          0 ? (
          /* EMPTY */

          <div className="flex min-h-60 flex-col items-center justify-center px-4 text-center sm:px-6">
            <div className="brand-grad mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg shadow-violet-500/25">
              <User size={25} />
            </div>

            <h3 className="text-base font-extrabold text-slate-950 dark:text-white">
              No applications found
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Candidate applications submitted
              through the website will appear here.
            </p>
          </div>
        ) : (
          /* CANDIDATES */

          <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
            {filteredCandidates.map(
              (candidate) => (
                <div
                  key={candidate.id}
                  className="min-w-0 p-4 transition hover:bg-violet-50/40 sm:p-5 lg:p-6 dark:hover:bg-white/[0.03]"
                >
                  <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                    {/* Candidate Info */}

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                        {/* Avatar */}

                        <div className="brand-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] text-xs font-extrabold text-white shadow-lg shadow-violet-500/25 sm:h-12 sm:w-12 sm:text-sm">
                          {candidate.fullName
                            ?.trim()
                            .split(/\s+/)
                            .map((word) =>
                              word.charAt(0)
                            )
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() || "C"}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="break-words text-sm font-bold text-slate-950 sm:text-base dark:text-white">
                            {candidate.fullName}
                          </h3>

                          {/* Email / Phone */}

                          <div className="mt-2 flex min-w-0 flex-col gap-1.5 text-xs text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1 dark:text-slate-400">
                            <span className="flex min-w-0 items-start gap-1.5">
                              <Mail
                                size={13}
                                className="mt-0.5 shrink-0"
                              />

                              <span className="min-w-0 break-all">
                                {candidate.email}
                              </span>
                            </span>

                            <span className="flex min-w-0 items-center gap-1.5">
                              <Phone
                                size={13}
                                className="shrink-0"
                              />

                              <span className="break-words">
                                {candidate.phone}
                              </span>
                            </span>
                          </div>

                          {/* Badges */}

                          <div className="mt-3 flex min-w-0 flex-wrap gap-2">
                            {candidate.position && (
                              <span className="max-w-full break-words rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                                {
                                  candidate.position
                                }
                              </span>
                            )}

                            {candidate.totalExperience && (
                              <span className="max-w-full break-words rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                                {
                                  candidate.totalExperience
                                }{" "}
                                experience
                              </span>
                            )}

                            {candidate.currentLocation && (
                              <span className="max-w-full break-words rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
                                {
                                  candidate.currentLocation
                                }
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 break-words text-xs text-slate-400 dark:text-slate-500">
                        Applied:{" "}
                        {formatDate(
                          candidate.createdAt
                        )}
                      </p>
                    </div>

                    {/* ACTIONS */}

                    <div className="grid w-full shrink-0 grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCandidate(
                            candidate
                          )
                        }
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 sm:w-auto sm:py-2 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
                      >
                        <Eye size={14} />

                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            candidate.id
                          )
                        }
                        disabled={
                          deletingId ===
                          candidate.id
                        }
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                      >
                        <Trash2 size={14} />

                        {deletingId ===
                        candidate.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* CANDIDATE DETAILS MODAL */}
      {/* ================================================= */}

      {selectedCandidate && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedCandidate(null);
            }
          }}
        >
          <div className="flex max-h-[95dvh] w-full min-w-0 flex-col overflow-hidden rounded-t-[24px] border border-slate-200/80 bg-white shadow-2xl sm:max-h-[90dvh] sm:max-w-4xl sm:rounded-[24px] dark:border-white/[0.07] dark:bg-[#0b1220]">
            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5 dark:border-white/[0.06]">
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-950 sm:text-xl dark:text-white">
                  Candidate Details
                </h2>

                <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                  {
                    selectedCandidate.fullName
                  }
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedCandidate(null)
                }
                className="shrink-0 rounded-xl p-2 text-slate-500 transition hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-white/[0.06] dark:hover:text-white"
                aria-label="Close candidate details"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
              {/* PERSONAL INFORMATION */}

              <section>
                <SectionTitle
                  icon={<User size={17} />}
                  title="Personal Information"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  <InfoItem
                    label="Full Name"
                    value={
                      selectedCandidate.fullName
                    }
                  />

                  <InfoItem
                    label="Email"
                    value={
                      selectedCandidate.email
                    }
                  />

                  <InfoItem
                    label="Phone"
                    value={
                      selectedCandidate.phone
                    }
                  />

                  <InfoItem
                    label="Date of Birth"
                    value={formatSimpleDate(
                      selectedCandidate.dob
                    )}
                  />

                  <InfoItem
                    label="Current Location"
                    value={
                      selectedCandidate.currentLocation
                    }
                  />

                  <InfoItem
                    label="Dependents"
                    value={
                      selectedCandidate.dependents
                    }
                  />
                </div>
              </section>

              {/* EDUCATION */}

              <section className="mt-7 sm:mt-8">
                <SectionTitle
                  icon={
                    <GraduationCap
                      size={17}
                    />
                  }
                  title="Education"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  <InfoItem
                    label="Qualification"
                    value={
                      selectedCandidate.qualification
                    }
                  />

                  <InfoItem
                    label="Qualification Year"
                    value={formatSimpleDate(
                      selectedCandidate.qualificationYear
                    )}
                  />

                  <InfoItem
                    label="Pursuing Degree"
                    value={
                      selectedCandidate.pursuingDegree
                    }
                  />
                </div>
              </section>

              {/* PROFESSIONAL */}

              <section className="mt-7 sm:mt-8">
                <SectionTitle
                  icon={
                    <Briefcase size={17} />
                  }
                  title="Professional Information"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  <InfoItem
                    label="Position"
                    value={
                      selectedCandidate.position
                    }
                  />

                  <InfoItem
                    label="Total Experience"
                    value={
                      selectedCandidate.totalExperience
                    }
                  />

                  <InfoItem
                    label="Relevant Experience"
                    value={
                      selectedCandidate.relevantExperience
                    }
                  />

                  <InfoItem
                    label="Currently Working"
                    value={
                      selectedCandidate.currentlyWorking
                    }
                  />

                  <InfoItem
                    label="Notice Period"
                    value={
                      selectedCandidate.noticePeriod
                    }
                  />

                  <InfoItem
                    label="Earliest Join Date"
                    value={formatSimpleDate(
                      selectedCandidate.earliestJoinDate
                    )}
                  />
                </div>
              </section>

              {/* LOCATION & TRAVEL */}

              <section className="mt-7 sm:mt-8">
                <SectionTitle
                  icon={<MapPin size={17} />}
                  title="Location & Travel"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  <InfoItem
                    label="Relocate"
                    value={
                      selectedCandidate.relocate
                    }
                  />

                  <InfoItem
                    label="Travel Abroad"
                    value={
                      selectedCandidate.travelAbroad
                    }
                  />

                  <InfoItem
                    label="Passport"
                    value={
                      selectedCandidate.passport
                    }
                  />

                  <InfoItem
                    label="Visa"
                    value={
                      selectedCandidate.visa
                    }
                  />
                </div>
              </section>

              {/* SALARY */}

              <section className="mt-7 sm:mt-8">
                <SectionTitle
                  icon={
                    <Briefcase size={17} />
                  }
                  title="Salary Information"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  <InfoItem
                    label="Current CTC"
                    value={
                      selectedCandidate.currentCtc
                    }
                  />

                  <InfoItem
                    label="In-Hand Salary"
                    value={
                      selectedCandidate.inHandSalary
                    }
                  />

                  <InfoItem
                    label="Expected CTC"
                    value={
                      selectedCandidate.expectedCtc
                    }
                  />

                  <InfoItem
                    label="Expected In-Hand"
                    value={
                      selectedCandidate.expectedInHand
                    }
                  />

                  <InfoItem
                    label="Ready on Current CTC"
                    value={
                      selectedCandidate.readyOnCurrentCtc
                    }
                  />
                </div>
              </section>

              {/* REASON */}

              {selectedCandidate.reasonForChange && (
                <section className="mt-7 sm:mt-8">
                  <SectionTitle
                    icon={
                      <FileText size={17} />
                    }
                    title="Reason for Change"
                  />

                  <div className="break-words rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-sm leading-6 text-slate-600 sm:p-4 sm:leading-7 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-slate-300">
                    {
                      selectedCandidate.reasonForChange
                    }
                  </div>
                </section>
              )}

              {/* RESUME */}

              <section className="mt-7 sm:mt-8">
                <SectionTitle
                  icon={
                    <FileText size={17} />
                  }
                  title="Resume"
                />

                {selectedCandidate.resumeUrl ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleViewResume(
                        selectedCandidate
                      )
                    }
                    disabled={
                      openingResumeId ===
                      selectedCandidate.id
                    }
                    className="brand-grad inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {openingResumeId ===
                    selectedCandidate.id ? (
                      <>
                        <RefreshCw
                          size={16}
                          className="animate-spin"
                        />

                        Opening...
                      </>
                    ) : (
                      <>
                        <FileText
                          size={16}
                        />

                        View Resume
                      </>
                    )}
                  </button>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Resume not available.
                  </p>
                )}
              </section>

              {/* APPLICATION */}

              <section className="mt-7 sm:mt-8">
                <SectionTitle
                  icon={
                    <Calendar size={17} />
                  }
                  title="Application"
                />

                <div className="max-w-md">
                  <InfoItem
                    label="Applied On"
                    value={formatDate(
                      selectedCandidate.createdAt
                    )}
                  />
                </div>
              </section>

              {/* DELETE FROM MODAL */}

              <section className="mt-7 border-t border-slate-100 pt-5 sm:mt-8 sm:pt-6 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      selectedCandidate.id
                    )
                  }
                  disabled={
                    deletingId ===
                    selectedCandidate.id
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                >
                  <Trash2 size={16} />

                  {deletingId ===
                  selectedCandidate.id
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
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2 sm:mb-4">
      <div className="brand-grad flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-white shadow-md shadow-violet-500/25">
        {icon}
      </div>

      <h3 className="min-w-0 break-words text-sm font-extrabold tracking-[-0.01em] text-slate-950 dark:text-white">
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
  value:
    | string
    | null
    | undefined;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 sm:p-3.5 dark:border-white/[0.07] dark:bg-white/[0.03]">
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
        {label}
      </p>

      <p className="mt-1 min-w-0 break-words text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value || "Not provided"}
      </p>
    </div>
  );
}