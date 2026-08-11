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
    <div className="min-h-full bg-slate-50 p-6 dark:bg-[#0a0e1a]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
              <Users size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Users
              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400">
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
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
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
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
          >
            <Plus size={17} />
            Add User
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
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
        <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
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
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {/* Total */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#111827]">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Users
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {users.length}
          </p>
        </div>

        {/* Active */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#111827]">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Active Users
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {activeUsers}
          </p>
        </div>

        {/* Inactive */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#111827]">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Inactive Users
          </p>

          <p className="mt-2 text-2xl font-bold text-red-500">
            {inactiveUsers}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  User
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Last Login
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
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
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-700"
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
                      className="transition hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                    >
                      {/* User */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-sm font-bold text-white">
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
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                          <Shield size={12} />
                          {user.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {user.isActive ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                            <UserCheck size={12} />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300">
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
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
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
                            className="rounded-lg border border-red-200 p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#111827]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-white/10">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
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
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/5 dark:hover:text-white"
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
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
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
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
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
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
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