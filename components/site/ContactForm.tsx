"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BUDGET_RANGES, SERVICE_INTERESTS } from "@/lib/content";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { ArrowRight, Check } from "./Icons";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

type Props = {
  /** Shown above the submit button; differs between /contact and /audit. */
  submitLabel?: string;
  /** Pre-tick a service when arriving from a service page. */
  defaultService?: string;
};

export function ContactForm({
  submitLabel = "Send enquiry",
  defaultService,
}: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      website: "",
      phone: "",
      message: "",
      services: defaultService ? [defaultService] : [],
      referralSource: "",
    },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !body.ok) {
        setStatus({
          kind: "error",
          message: body.error ?? "Something went wrong. Please email us instead.",
        });
        return;
      }
      setStatus({ kind: "sent" });
      reset();
    } catch {
      setStatus({
        kind: "error",
        message: "We could not reach the server. Please email us instead.",
      });
    }
  };

  if (status.kind === "sent") {
    return (
      <div
        className="u-card p-8 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "rgba(43,213,118,.14)" }}
        >
          <Check size={20} />
        </span>
        <h2 className="t-h3 mt-6 text-2xl">Message received.</h2>
        <p className="t-lead mt-4 max-w-[46ch]">
          Thanks — we read every enquiry ourselves and reply within one working day.
          If it is urgent, call us and mention you have just submitted the form.
        </p>
        <button
          type="button"
          className="u-btn u-btn-ghost mt-8 h-12 px-6 text-[15px]"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="u-card p-7 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name?.message} required>
          <input
            {...register("name")}
            className="u-field"
            placeholder="Ada Lovelace"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
        </Field>

        <Field label="Work email" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            className="u-field"
            placeholder="ada@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field label="Company" error={errors.company?.message}>
          <input
            {...register("company")}
            className="u-field"
            placeholder="Company name"
            autoComplete="organization"
          />
        </Field>

        <Field label="Website" error={errors.website?.message}>
          <input
            {...register("website")}
            className="u-field"
            placeholder="company.com"
            autoComplete="url"
            aria-invalid={!!errors.website}
          />
        </Field>

        <Field label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            className="u-field"
            placeholder="Optional"
            autoComplete="tel"
          />
        </Field>

        <Field label="Monthly ad budget" error={errors.budget?.message}>
          <select {...register("budget")} className="u-field" defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="mt-8 border-0 p-0">
        <legend className="u-label">WHAT DO YOU NEED HELP WITH?</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICE_INTERESTS.map((s) => (
            <label key={s} className="u-chip cursor-pointer select-none">
              <input
                type="checkbox"
                value={s}
                {...register("services")}
                className="accent-[var(--color-yellow)]"
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <Field label="What are you trying to achieve?" error={errors.message?.message} required>
          <textarea
            {...register("message")}
            rows={6}
            className="u-field resize-y"
            placeholder="Where you are now, where you want to get to, and anything you have already tried."
            aria-invalid={!!errors.message}
          />
        </Field>
      </div>

      {/* Honeypot. Hidden from people and from assistive technology. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Referral source
          <input {...register("referralSource")} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-7 flex items-start gap-3 text-sm" style={{ color: "var(--soft)" }}>
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1 accent-[var(--color-yellow)]"
          aria-invalid={!!errors.consent}
        />
        <span>
          I agree that {""}
          <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Newton Infotech</strong> may
          store these details and contact me about my enquiry.
        </span>
      </label>
      {errors.consent?.message && (
        <p className="mt-2 text-sm" style={{ color: "#ff5c5c" }}>
          {errors.consent.message}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="u-btn u-btn-primary h-14 px-7 text-base"
          disabled={sending}
        >
          {sending ? "Sending…" : submitLabel}
          {!sending && <ArrowRight />}
        </button>
        <p className="t-mono text-[10px]" style={{ color: "var(--muted)" }}>
          WE REPLY WITHIN ONE WORKING DAY
        </p>
      </div>

      {status.kind === "error" && (
        <p className="mt-5 text-sm" role="alert" style={{ color: "#ff5c5c" }}>
          {status.message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="u-label">
        {label.toUpperCase()}
        {required && <span style={{ color: "var(--color-yellow)" }}> *</span>}
      </span>
      {children}
      {error && (
        <span className="mt-2 block text-sm" style={{ color: "#ff5c5c" }}>
          {error}
        </span>
      )}
    </label>
  );
}
