"use client";

import {
  ChangeEvent,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  RefreshCw,
  Upload,
} from "lucide-react";

export function MediaUploadButton() {
  const router = useRouter();

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const handleFileSelect = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await fetch(
          "/api/admin/media",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Upload failed. Please try again."
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Media upload error:",
        error
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value =
          "";
      }
    }
  };

  const openFilePicker = () => {
    if (uploading) return;

    inputRef.current?.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        type="button"
        onClick={openFilePicker}
        disabled={uploading}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 shadow-lg shadow-violet-900/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {uploading ? (
          <RefreshCw
            size={16}
            className="animate-spin"
          />
        ) : (
          <Upload size={16} />
        )}

        {uploading
          ? "Uploading..."
          : "Upload New File"}
      </button>
    </>
  );
}