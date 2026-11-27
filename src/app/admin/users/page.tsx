"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Trash2,
  Shield,
  UserCheck,
  UserX,
  X,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface ApiResponse {
  users?: AdminUser[];
  user?: AdminUser;
  message?: string;
  error?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  /**
   * Safely read API response.
   * This prevents:
   * Unexpected end of JSON input
   */
  async function readApiResponse(
    response: Response
  ): Promise<ApiResponse> {
    const text = await response.text();

    if (!text.trim()) {
      return {};
    }

    try {
      return JSON.parse(text) as ApiResponse;
    } catch {
      throw new Error(
        `Server returned an invalid response. HTTP ${response.status}`
      );
    }
  }

  /**
   * Fetch all admin users
   */
  async function fetchUsers() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/users", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Unauthorized. Please login to the admin panel again."
          );
        }

        throw new Error(
          data.error ||
            `Failed to fetch users. HTTP ${response.status}`
        );
      }

      setUsers(
        Array.isArray(data.users)
          ? data.users
          : []
      );
    } catch (err) {
      console.error("fetchUsers error:", err);

      setUsers([]);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load admin users."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Open create user modal
   */
  function openCreateModal() {
    setForm({
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
    });

    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowModal(true);
  }

  /**
   * Close modal
   */
  function closeModal() {
    if (saving) {
      return;
    }

    setShowModal(false);
    setShowPassword(false);
  }

  /**
   * Create new admin user
   */
  async function handleCreateUser(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          role: form.role,
        }),
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Unauthorized. Please login again."
          );
        }

        throw new Error(
          data.error ||
            `Failed to create user. HTTP ${response.status}`
        );
      }

      setSuccess(
        data.message ||
          "User created successfully."
      );

      setShowModal(false);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "ADMIN",
      });

      await fetchUsers();
    } catch (err) {
      console.error("create user error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create user."
      );
    } finally {
      setSaving(false);
    }
  }

  /**
   * Activate / deactivate user
   */
  async function toggleUserStatus(
    user: AdminUser
  ) {
    try {
      setActionLoading(user.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/users/${user.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !user.isActive,
          }),
        }
      );

      const data = await readApiResponse(response);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Unauthorized. Please login again."
          );
        }

        throw new Error(
          data.error ||
            `Failed to update user. HTTP ${response.status}`
        );
      }

      setSuccess(
        user.isActive
          ? "User deactivated successfully."
          : "User activated successfully."
      );

      await fetchUsers();
    } catch (err) {
      console.error(
        "toggle user error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update user."
      );
    } finally {
      setActionLoading(null);
    }
  }

  /**
   * Delete user
   */
  async function deleteUser(
    user: AdminUser
  ) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.email}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(user.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/users/${user.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await readApiResponse(response);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Unauthorized. Please login again."
          );
        }

        throw new Error(
          data.error ||
            `Failed to delete user. HTTP ${response.status}`
        );
      }

      setSuccess(
        data.message ||
          "User deleted successfully."
      );

      await fetchUsers();
    } catch (err) {
      console.error(
        "delete user error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete user."
      );
    } finally {
      setActionLoading(null);
    }
  }

  const activeUsers = users.filter(
    (user) => user.isActive
  ).length;

  const inactiveUsers = users.filter(
    (user) => !user.isActive
  ).length;

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="brand-grad relative overflow-hidden rounded-[28px] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.07]" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-white/30 bg-white/[0.16] text-white backdrop-blur-xl">
              <Users size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                Users
              </h1>

              <p className="mt-1 text-sm text-indigo-50/90">
                Manage administrators who can access
                the admin panel.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh */}
          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            title="Refresh users"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/[0.14] text-white backdrop-blur-xl transition hover:bg-white/25 p-3 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />
          </button>

          {/* Add User */}
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg shadow-violet-900/20 transition hover:-translate-y-0.5"
          >
            <Plus size={17} />
            Add User
          </button>
        </div>
      </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 text-red-500 hover:text-red-700 dark:text-red-300"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
          <span>{success}</span>

          <button
            type="button"
            onClick={() => setSuccess("")}
            className="shrink-0 text-emerald-500 hover:text-emerald-700 dark:text-emerald-300"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {/* Total */}
        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Total Users
              </p>

              <p className="mt-3 text-3xl font-extrabold tracking-tight brand-text">
                {users.length}
              </p>
            </div>

            <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <Users size={19} />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Active Users
              </p>

              <p className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-600">
                {activeUsers}
              </p>
            </div>

            <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <UserCheck size={19} />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="group rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 dark:border-white/[0.07] dark:bg-[#0b1220] dark:hover:border-violet-400/25">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                Inactive Users
              </p>

              <p className="mt-3 text-3xl font-extrabold tracking-tight text-red-500">
                {inactiveUsers}
              </p>
            </div>

            <div className="brand-grad flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:-rotate-6">
              <UserX size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,.45)] dark:border-white/[0.07] dark:bg-[#0b1220]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="border-b border-slate-100 bg-slate-50/80 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  User
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Last Login
                </th>

                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {/* Loading */}
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-14 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <RefreshCw
                        size={28}
                        className="animate-spin text-violet-500"
                      />

                      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                        Loading users...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                /* Empty */
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-14 text-center"
                  >
                    <Users
                      size={38}
                      className="mx-auto text-slate-300 dark:text-slate-600"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      No users found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Add your first admin user.
                    </p>

                    <button
                      type="button"
                      onClick={openCreateModal}
                      className="mt-4 inline-flex items-center gap-2 brand-grad rounded-xl text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 hover:shadow-violet-500/40 px-5 py-2.5"
                    >
                      <Plus size={14} />
                      Add User
                    </button>
                  </td>
                </tr>
              ) : (
                /* Users */
                users.map((user) => {
                  const isActionLoading =
                    actionLoading === user.id;

                  return (
                    <tr
                      key={user.id}
                      className="transition hover:bg-violet-50/40 dark:hover:bg-white/[0.03]"
                    >
                      {/* User */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] brand-grad text-sm font-bold text-white shadow-md shadow-violet-500/25">
                            {(user.name ||
                              user.email)
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                              {user.name ||
                                "Unnamed User"}
                            </p>

                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                          <Shield size={12} />
                          {user.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {user.isActive ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                            <UserCheck size={12} />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 dark:bg-red-500/10 dark:text-red-300">
                            <UserX size={12} />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Last Login */}
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {user.lastLoginAt
                          ? new Date(
                              user.lastLoginAt
                            ).toLocaleString()
                          : "Never"}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {/* Activate / Deactivate */}
                          <button
                            type="button"
                            disabled={
                              isActionLoading
                            }
                            onClick={() =>
                              toggleUserStatus(
                                user
                              )
                            }
                            title={
                              user.isActive
                                ? "Deactivate"
                                : "Activate"
                            }
                            className="rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300 p-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {user.isActive ? (
                              <UserX size={15} />
                            ) : (
                              <UserCheck
                                size={15}
                              />
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            disabled={
                              isActionLoading
                            }
                            title="Delete"
                            onClick={() =>
                              deleteUser(user)
                            }
                            className="rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20 p-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_40px_100px_-30px_rgba(15,23,42,.5)] dark:border-white/[0.07] dark:bg-[#0b1220]">
            <div className="brand-grad absolute left-0 top-0 h-1 w-full" />
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/[0.06]">
              <div>
                <h2 className="text-lg font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white">
                  Add Admin User
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Create another user who can access
                  the admin panel.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleCreateUser}
              className="space-y-5 p-6"
            >
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((previous) => ({
                      ...previous,
                      name: e.target.value,
                    }))
                  }
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((previous) => ({
                      ...previous,
                      email: e.target.value,
                    }))
                  }
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.06]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) =>
                      setForm((previous) => ({
                        ...previous,
                        password:
                          e.target.value,
                      }))
                    }
                    placeholder="Minimum 6 characters"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-4 pr-10 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.06]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>

                <p className="mt-1.5 text-xs text-slate-400">
                  Password must contain at least
                  6 characters.
                </p>
              </div>

              {/* Role */}
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                  Role
                </label>

                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm((previous) => ({
                      ...previous,
                      role: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-white/[0.06]"
                >
                  <option value="ADMIN">
                    ADMIN
                  </option>

                  <option value="EDITOR">
                    EDITOR
                  </option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-400/40 dark:hover:text-violet-300 px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="brand-grad rounded-xl text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 hover:shadow-violet-500/40 px-5 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Creating..."
                    : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}