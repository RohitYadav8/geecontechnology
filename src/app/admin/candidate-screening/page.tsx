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

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl dark:text-white">
            Candidate Screening
          </h1>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
            Manage candidate applications submitted
            through the website.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchCandidates}
          disabled={loading}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
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

      {/* ================================================= */}
      {/* MESSAGES */}
      {/* ================================================= */}

      {error && (
        <div className="mb-5 flex min-w-0 items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700 sm:px-4 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          <span className="min-w-0 break-words">
            {error}
          </span>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 rounded-md p-1 transition hover:bg-red-100 dark:hover:bg-red-950"
            aria-label="Close error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-5 break-words rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm text-emerald-700 sm:px-4 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
          {success}
        </div>
      )}

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {/* Total Applications */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                Total Applications
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                {candidates.length}
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12 dark:bg-blue-950/40 dark:text-blue-400">
              <User size={22} />
            </div>
          </div>
        </div>

        {/* Search Results */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                Search Results
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                {filteredCandidates.length}
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 sm:h-12 sm:w-12 dark:bg-cyan-950/40 dark:text-cyan-400">
              <Search size={22} />
            </div>
          </div>
        </div>

        {/* Latest Application */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-2 sm:p-5 lg:col-span-1 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                Latest Application
              </p>

              <p className="mt-2 break-words text-sm font-semibold text-slate-900 dark:text-white">
                {candidates.length > 0
                  ? formatDate(
                      candidates[0].createdAt
                    )
                  : "No applications"}
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 sm:h-12 sm:w-12 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Calendar size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* SEARCH */}
      {/* ================================================= */}

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 dark:border-slate-800 dark:bg-slate-900">
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
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:placeholder:text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* APPLICATION LIST */}
      {/* ================================================= */}

      <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* List Header */}

        <div className="border-b border-slate-200 px-4 py-4 sm:px-5 lg:px-6 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
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
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <User size={25} />
            </div>

            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              No applications found
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Candidate applications submitted
              through the website will appear here.
            </p>
          </div>
        ) : (
          /* CANDIDATES */

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredCandidates.map(
              (candidate) => (
                <div
                  key={candidate.id}
                  className="min-w-0 p-4 transition hover:bg-slate-50/70 sm:p-5 lg:p-6 dark:hover:bg-slate-800/30"
                >
                  <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                    {/* Candidate Info */}

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                        {/* Avatar */}

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1a2b4a] to-blue-600 text-xs font-bold text-white sm:h-12 sm:w-12 sm:text-sm">
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
                          <h3 className="break-words text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
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
                              <span className="max-w-full break-words rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                {
                                  candidate.position
                                }
                              </span>
                            )}

                            {candidate.totalExperience && (
                              <span className="max-w-full break-words rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {
                                  candidate.totalExperience
                                }{" "}
                                experience
                              </span>
                            )}

                            {candidate.currentLocation && (
                              <span className="max-w-full break-words rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
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
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 sm:w-auto sm:py-2 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
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
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2.5 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2 dark:border-red-900/50 dark:hover:bg-red-950/30"
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
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedCandidate(null);
            }
          }}
        >
          <div className="flex max-h-[95dvh] w-full min-w-0 flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[90dvh] sm:max-w-4xl sm:rounded-2xl dark:border-slate-800 dark:bg-slate-900">
            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5 dark:border-slate-800">
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
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
                className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
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

                  <div className="break-words rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm leading-6 text-slate-600 sm:p-4 sm:leading-7 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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

              <section className="mt-7 border-t border-slate-200 pt-5 sm:mt-8 sm:pt-6 dark:border-slate-800">
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        {icon}
      </div>

      <h3 className="min-w-0 break-words text-sm font-semibold text-slate-900 dark:text-white">
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
    <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
        {label}
      </p>

      <p className="mt-1 min-w-0 break-words text-sm font-medium text-slate-700 dark:text-slate-200">
        {value || "Not provided"}
      </p>
    </div>
  );
}