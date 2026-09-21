import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { FileUp, X } from "lucide-react";

import { applicationsEmail, openRoles } from "@/data/careers";

const countryCodes = [
  { code: "+1", iso: "us", name: "United States" },
  { code: "+1", iso: "ca", name: "Canada" },
  { code: "+852", iso: "hk", name: "Hong Kong" },
  { code: "+44", iso: "gb", name: "United Kingdom" },
  { code: "+61", iso: "au", name: "Australia" },
  { code: "+65", iso: "sg", name: "Singapore" },
  { code: "+81", iso: "jp", name: "Japan" },
  { code: "+82", iso: "kr", name: "South Korea" },
  { code: "+86", iso: "cn", name: "China" },
  { code: "+91", iso: "in", name: "India" },
  { code: "+49", iso: "de", name: "Germany" },
  { code: "+33", iso: "fr", name: "France" },
  { code: "+34", iso: "es", name: "Spain" },
  { code: "+39", iso: "it", name: "Italy" },
  { code: "+31", iso: "nl", name: "Netherlands" },
  { code: "+46", iso: "se", name: "Sweden" },
  { code: "+41", iso: "ch", name: "Switzerland" },
  { code: "+971", iso: "ae", name: "United Arab Emirates" },
  { code: "+966", iso: "sa", name: "Saudi Arabia" },
  { code: "+55", iso: "br", name: "Brazil" },
  { code: "+52", iso: "mx", name: "Mexico" },
  { code: "+64", iso: "nz", name: "New Zealand" },
  { code: "+353", iso: "ie", name: "Ireland" },
  { code: "+48", iso: "pl", name: "Poland" },
  { code: "+7", iso: "ru", name: "Russia" },
  { code: "+7", iso: "kz", name: "Kazakhstan" },
  { code: "+234", iso: "ng", name: "Nigeria" },
  { code: "+27", iso: "za", name: "South Africa" },
  { code: "+63", iso: "ph", name: "Philippines" },
  { code: "+66", iso: "th", name: "Thailand" },
  { code: "+62", iso: "id", name: "Indonesia" },
  { code: "+84", iso: "vn", name: "Vietnam" },
  { code: "+60", iso: "my", name: "Malaysia" },
  { code: "+886", iso: "tw", name: "Taiwan" },
] as const;

type CountryOption = (typeof countryCodes)[number];

type FieldErrors = Partial<
  Record<
    | "name"
    | "email"
    | "phone"
    | "role"
    | "linkedin"
    | "loom"
    | "resume"
    | "workAuthorized"
    | "needsSponsorship",
    string
  >
>;

const RESUME_MAX_BYTES = 8 * 1024 * 1024;
const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function flagUrl(iso: string) {
  return `https://flagcdn.com/w40/${iso}.png`;
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isAllowedResume(file: File) {
  const name = file.name.toLowerCase();
  const byExt = name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx");
  const byType =
    file.type === "application/pdf" ||
    file.type === "application/msword" ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.type === "";
  return byExt && byType && file.size > 0 && file.size <= RESUME_MAX_BYTES;
}

export function CareerApplicationForm({
  roleId,
  onRoleChange,
}: {
  roleId: string;
  onRoleChange: (roleId: string) => void;
}) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [country, setCountry] = useState<CountryOption>(countryCodes[0]);
  const [resume, setResume] = useState<File | null>(null);
  const [workAuthorized, setWorkAuthorized] = useState<"" | "yes" | "no">("");
  const [needsSponsorship, setNeedsSponsorship] = useState<"" | "yes" | "no">("");
  const resumeInputRef = useRef<HTMLInputElement>(null);

  function validate(form: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const role = String(form.get("role") ?? "").trim();
    const linkedin = String(form.get("linkedin") ?? "").trim();
    const loom = String(form.get("loom") ?? "").trim();

    if (!name) next.name = "Enter your full name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!phone || phone.replace(/\D/g, "").length < 7) next.phone = "Enter a valid phone number.";
    if (!role) next.role = "Select a role.";
    if (!linkedin || !isValidHttpUrl(linkedin)) next.linkedin = "Enter a valid LinkedIn URL.";
    if (!loom || !isValidHttpUrl(loom)) next.loom = "Enter a valid Loom video link.";
    if (!resume) next.resume = "Upload your resume (PDF or Word).";
    else if (!isAllowedResume(resume)) next.resume = "Use a PDF or Word file up to 8 MB.";
    if (!workAuthorized) next.workAuthorized = "Select yes or no.";
    if (!needsSponsorship) next.needsSponsorship = "Select yes or no.";
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

    const dialCode = country.code;
    const localPhone = String(form.get("phone") ?? "")
      .trim()
      .replace(/^\+/, "");

    const payload = new FormData();
    payload.set("name", String(form.get("name") ?? "").trim());
    payload.set("email", String(form.get("email") ?? "").trim());
    payload.set("countryCode", dialCode);
    payload.set("country", country.name);
    payload.set("phone", `${dialCode} ${localPhone}`);
    payload.set("role", String(form.get("role") ?? "").trim());
    payload.set("linkedin", String(form.get("linkedin") ?? "").trim());
    payload.set("loom", String(form.get("loom") ?? "").trim());
    payload.set("workAuthorized", workAuthorized);
    payload.set("needsSponsorship", needsSponsorship);
    if (resume) payload.set("resume", resume, resume.name);

    setStatus("submitting");
    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: payload,
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function onResumeChange(fileList: FileList | null) {
    const file = fileList?.[0] ?? null;
    setResume(file);
    if (errors.resume) setErrors((current) => ({ ...current, resume: undefined }));
  }

  function clearResume() {
    setResume(null);
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  }

  if (status === "success") {
    return (
      <p role="status" className="font-display text-3xl text-foreground">
        Thank you. We received your application and will reply with a practical next step.
      </p>
    );
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-input/80 bg-background/90 px-3.5 py-3 text-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.35)] outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15";

  return (
    <form className="space-y-7" onSubmit={onSubmit} noValidate>
      <section className="space-y-5">
        <SectionLabel>Contact</SectionLabel>
        <Field label="Full name" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={fieldClass}
            placeholder="Jordan Chen"
          />
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
        <Field label="Phone number" name="phone" error={errors.phone}>
          <div className="mt-2 flex gap-2">
            <CountryCodeSelect value={country} onChange={setCountry} />
            <input type="hidden" name="countryCode" value={country.code} />
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel-national"
              inputMode="tel"
              className="min-w-0 flex-1 rounded-xl border border-input/80 bg-background/90 px-3.5 py-3 text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15"
              placeholder="310 555 0123"
            />
          </div>
        </Field>
      </section>

      <section className="space-y-5">
        <SectionLabel>Role & links</SectionLabel>
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
        <Field label="LinkedIn" name="linkedin" error={errors.linkedin}>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            className={fieldClass}
            placeholder="https://www.linkedin.com/in/…"
          />
        </Field>
        <Field label="Loom video link (introduction)" name="loom" error={errors.loom}>
          <input
            id="loom"
            name="loom"
            type="url"
            className={fieldClass}
            placeholder="https://www.loom.com/share/…"
          />
        </Field>
      </section>

      <section className="space-y-5">
        <SectionLabel>Resume</SectionLabel>
        <Field label="Resume upload" name="resume" error={errors.resume}>
          <input
            ref={resumeInputRef}
            id="resume"
            name="resume"
            type="file"
            accept={RESUME_ACCEPT}
            className="sr-only"
            onChange={(event) => onResumeChange(event.target.files)}
          />
          {resume ? (
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-input/80 bg-background/90 px-3.5 py-3">
              <FileUp className="size-4 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{resume.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(resume.size / 1024 / 1024).toFixed(2)} MB · PDF or Word
                </p>
              </div>
              <button
                type="button"
                onClick={clearResume}
                className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Remove resume"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => resumeInputRef.current?.click()}
              className="mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-input bg-background/70 px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-background/90"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-primary">
                <FileUp className="size-4" aria-hidden />
              </span>
              <span className="text-sm font-medium text-foreground">Upload resume</span>
              <span className="text-xs text-muted-foreground">PDF or Word · up to 8 MB</span>
            </button>
          )}
        </Field>
      </section>

      <section className="space-y-5">
        <SectionLabel>Work authorization</SectionLabel>
        <YesNoField
          name="workAuthorized"
          label="Are you legally authorized to work in the United States?"
          value={workAuthorized}
          error={errors.workAuthorized}
          onChange={(value) => {
            setWorkAuthorized(value);
            if (errors.workAuthorized) {
              setErrors((current) => ({ ...current, workAuthorized: undefined }));
            }
          }}
        />
        <YesNoField
          name="needsSponsorship"
          label="Will you now or in the future require sponsorship for employment visa status?"
          value={needsSponsorship}
          error={errors.needsSponsorship}
          onChange={(value) => {
            setNeedsSponsorship(value);
            if (errors.needsSponsorship) {
              setErrors((current) => ({ ...current, needsSponsorship: undefined }));
            }
          }}
        />
      </section>

      {status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          The application could not be sent. Email {applicationsEmail} or try again.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary">{children}</p>
  );
}

function YesNoField({
  name,
  label,
  value,
  error,
  onChange,
}: {
  name: string;
  label: string;
  value: "" | "yes" | "no";
  error?: string | undefined;
  onChange: (value: "yes" | "no") => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-foreground">{label}</legend>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {(
          [
            { id: "yes", label: "Yes" },
            { id: "no", label: "No" },
          ] as const
        ).map((option) => {
          const selected = value === option.id;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input/80 bg-background/90 text-foreground hover:border-primary/40"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={selected}
                className="sr-only"
                onChange={() => onChange(option.id)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function CountryCodeSelect({
  value,
  onChange,
}: {
  value: CountryOption;
  onChange: (country: CountryOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Country code ${value.name} ${value.code}`}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-[2.875rem] min-w-[7.5rem] items-center gap-2 rounded-xl border border-input/80 bg-background/90 px-2.5 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15"
      >
        <img
          src={flagUrl(value.iso)}
          alt=""
          width={20}
          height={15}
          className="h-[15px] w-5 rounded-[2px] object-cover"
          loading="lazy"
        />
        <span className="font-medium tabular-nums">{value.code}</span>
        <span aria-hidden className="ml-auto text-[0.65rem] text-muted-foreground">
          ▾
        </span>
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Country codes"
          className="absolute left-0 z-30 mt-1 max-h-64 w-[16.5rem] overflow-auto rounded-xl border border-input bg-background py-1 shadow-md"
        >
          {countryCodes.map((country) => {
            const selected = country.iso === value.iso && country.code === value.code;
            return (
              <li key={`${country.iso}-${country.code}`} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-muted ${
                    selected ? "bg-muted" : ""
                  }`}
                  onClick={() => {
                    onChange(country);
                    setOpen(false);
                  }}
                >
                  <img
                    src={flagUrl(country.iso)}
                    alt=""
                    width={20}
                    height={15}
                    className="h-[15px] w-5 shrink-0 rounded-[2px] object-cover"
                    loading="lazy"
                  />
                  <span className="min-w-0 flex-1 truncate text-foreground">{country.name}</span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    {country.code}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
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
  error?: string | undefined;
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
