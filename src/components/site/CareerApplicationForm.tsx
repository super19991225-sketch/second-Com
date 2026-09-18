import { useState, type FormEvent, type ReactNode } from "react";

import { openRoles } from "@/data/careers";
import { company } from "@/data/site";

type FieldErrors = Partial<
  Record<"name" | "email" | "role" | "portfolio" | "experience" | "note", string>
>;

export function CareerApplicationForm({
  roleId,
  onRoleChange,
}: {
  roleId: string;
  onRoleChange: (roleId: string) => void;
}) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(form: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const role = String(form.get("role") ?? "").trim();
    const experience = String(form.get("experience") ?? "").trim();
    const note = String(form.get("note") ?? "").trim();

    if (!name) next.name = "Enter your full name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!role) next.role = "Select a role.";
    if (!experience) next.experience = "Share a brief overview of your experience.";
    if (!note) next.note = "Tell us what you want to work on next.";
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
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          role: form.get("role"),
          portfolio: form.get("portfolio"),
          linkedin: form.get("linkedin"),
          experience: form.get("experience"),
          note: form.get("note"),
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
      <p role="status" className="font-display text-3xl text-foreground">
        Thank you. We received your application and will reply with a practical next step.
      </p>
    );
  }

  const fieldClass =
    "mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground outline-none focus-visible:border-primary";

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <Field label="Full name" name="name" error={errors.name}>
        <input id="name" name="name" autoComplete="name" className={fieldClass} placeholder="Jordan Chen" />
      </Field>
      <Field label="Email" name="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          placeholder="you@email.com"
        />
      </Field>
      <Field label="Role" name="role" error={errors.role}>
        <select
          id="role"
          name="role"
          value={roleId}
          onChange={(event) => onRoleChange(event.target.value)}
          className={fieldClass}
        >
          <option value="" disabled>
            Select a role
          </option>
          {openRoles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Portfolio or GitHub (optional)" name="portfolio">
        <input
          id="portfolio"
          name="portfolio"
          type="url"
          className={fieldClass}
          placeholder="https://"
        />
      </Field>
      <Field label="LinkedIn (optional)" name="linkedin">
        <input
          id="linkedin"
          name="linkedin"
          type="url"
          className={fieldClass}
          placeholder="https://www.linkedin.com/in/…"
        />
      </Field>
      <Field label="Experience overview" name="experience" error={errors.experience}>
        <textarea
          id="experience"
          name="experience"
          rows={4}
          className={fieldClass}
          placeholder="A short overview of the work you have shipped"
        />
      </Field>
      <Field label="What you want to work on next" name="note" error={errors.note}>
        <textarea
          id="note"
          name="note"
          rows={4}
          className={fieldClass}
          placeholder="The problems and craft you want to take on here"
        />
      </Field>
      {status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          The application could not be sent. Email {company.email} or try again.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Submit application"}
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
      <label htmlFor={name} className="text-sm font-medium text-foreground">
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
