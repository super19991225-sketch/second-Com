import { useState, type FormEvent, type ReactNode } from "react";

import { serviceOptions, stageOptions } from "@/data/site";

type FieldErrors = Partial<Record<"name" | "email" | "organization" | "service" | "stage" | "details", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(form: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const organization = String(form.get("organization") ?? "").trim();
    const service = String(form.get("service") ?? "").trim();
    const stage = String(form.get("stage") ?? "").trim();
    const details = String(form.get("details") ?? "").trim();

    if (!name) next.name = "Enter your full name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid work email.";
    if (!organization) next.organization = "Enter your company or organization.";
    if (!service) next.service = "Select a service.";
    if (!stage) next.stage = "Select a project stage.";
    if (!details) next.details = "Describe the project.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          organization: form.get("organization"),
          website: form.get("website"),
          service: form.get("service"),
          stage: form.get("stage"),
          budget: form.get("budget"),
          timeline: form.get("timeline"),
          details: form.get("details"),
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="font-display text-3xl">
        Thank you. We received your note and will reply with a practical next step.
      </p>
    );
  }

  const fieldClass =
    "mt-2 w-full rounded-lg border border-input bg-background/95 px-3 py-2.5 outline-none focus-visible:border-primary";

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <Field label="Full name" name="name" error={errors.name}>
        <input id="name" name="name" autoComplete="name" className={fieldClass} placeholder="Jordan Chen" />
      </Field>
      <Field label="Work email" name="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          placeholder="you@company.com"
        />
      </Field>
      <Field label="Company or organization" name="organization" error={errors.organization}>
        <input
          id="organization"
          name="organization"
          autoComplete="organization"
          className={fieldClass}
          placeholder="Organization name"
        />
      </Field>
      <Field label="Website (optional)" name="website">
        <input id="website" name="website" type="url" className={fieldClass} placeholder="https://" />
      </Field>
      <Field label="Service needed" name="service" error={errors.service}>
        <select id="service" name="service" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Project stage" name="stage" error={errors.stage}>
        <select id="stage" name="stage" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Select a stage
          </option>
          {stageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Budget range (optional)" name="budget">
        <input id="budget" name="budget" className={fieldClass} placeholder="If known" />
      </Field>
      <Field label="Timeline (optional)" name="timeline">
        <input id="timeline" name="timeline" className={fieldClass} placeholder="If known" />
      </Field>
      <Field label="Project details" name="details" error={errors.details}>
        <textarea
          id="details"
          name="details"
          rows={5}
          className={fieldClass}
          placeholder="Challenge, users, available data, and desired outcome"
        />
      </Field>
      {status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          The form could not be sent. Email hello@geniusxlab.com or try again. The /api/contact
          handler is the integration point for a mail provider.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Start the conversation"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
