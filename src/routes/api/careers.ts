import { createFileRoute } from "@tanstack/react-router";

import { getOpenRole } from "@/data/careers";
import { sendMail } from "@/lib/mail";

const RESUME_MAX_BYTES = 8 * 1024 * 1024;

function isAllowedResume(file: File) {
  const name = file.name.toLowerCase();
  const byExt = name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx");
  return byExt && file.size > 0 && file.size <= RESUME_MAX_BYTES;
}

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value: string) {
  const safe = escapeHtml(value);
  return `<tr><td style="padding:10px 0;border-bottom:1px solid #e6e1d8;width:140px;font:600 12px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#6b645b;">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid #e6e1d8;font:400 15px Arial,sans-serif;color:#1c1917;">${safe}</td></tr>`;
}

function linkRow(label: string, href: string) {
  const safeHref = escapeHtml(href);
  return `<tr><td style="padding:10px 0;border-bottom:1px solid #e6e1d8;width:140px;font:600 12px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#6b645b;">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid #e6e1d8;font:400 15px Arial,sans-serif;"><a href="${safeHref}" style="color:#1d4e89;">${safeHref}</a></td></tr>`;
}

async function handleCareer(request: Request) {
  const form = await request.formData();

  const name = text(form, "name");
  const email = text(form, "email");
  const phone = text(form, "phone");
  const role = text(form, "role");
  const linkedin = text(form, "linkedin");
  const loom = text(form, "loom");
  const workAuthorized = text(form, "workAuthorized");
  const needsSponsorship = text(form, "needsSponsorship");
  const country = text(form, "country");
  const resume = form.get("resume");

  if (
    !name ||
    !email ||
    !phone ||
    !role ||
    !linkedin ||
    !loom ||
    !workAuthorized ||
    !needsSponsorship ||
    !(resume instanceof File) ||
    !isAllowedResume(resume)
  ) {
    return Response.json({ ok: false, error: "Missing or invalid fields." }, { status: 400 });
  }

  const roleTitle = getOpenRole(role)?.title ?? role;
  const subject = `[GenixaLab LLC] Application — ${roleTitle} — ${name}`;
  const textBody = [
    `Application — ${roleTitle}`,
    name,
    email,
    "",
    `Position: ${roleTitle}`,
    `Applicant: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `LinkedIn: ${linkedin}`,
    `Loom: ${loom}`,
    `Location: ${country || "Not provided"}`,
    `Work authorized: ${workAuthorized}`,
    `Needs sponsorship: ${needsSponsorship}`,
    `Resume: ${resume.name}`,
  ].join("\n");

  const html = `<div style="background:#f6f3ee;padding:24px;font-family:Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e6e1d8;">
    <div style="background:#1c1917;color:#f6f3ee;padding:20px 24px;">
      <div style="font:600 12px Arial,sans-serif;letter-spacing:.14em;">GENIXALAB LLC</div>
      <div style="margin-top:8px;font:400 12px Arial,sans-serif;letter-spacing:.08em;color:#d6d3d1;">JOB APPLICATION</div>
    </div>
    <div style="padding:24px;">
      <h1 style="margin:0 0 8px;font:400 22px Georgia,serif;color:#1c1917;">Application — ${escapeHtml(roleTitle)}</h1>
      <p style="margin:0 0 20px;font:400 15px Arial,sans-serif;color:#44403c;">${escapeHtml(name)} · ${escapeHtml(email)}</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Position", roleTitle)}
        ${row("Applicant", name)}
        ${row("Email", email)}
        ${row("Phone", phone)}
        ${linkRow("LinkedIn", linkedin)}
        ${linkRow("Loom", loom)}
        ${row("Location", country || "Not provided")}
        ${row("Work authorized", workAuthorized)}
        ${row("Sponsorship", needsSponsorship)}
        ${row("Resume", `Attached: ${resume.name}`)}
      </table>
    </div>
  </div>
</div>`;

  try {
    await sendMail({
      subject,
      text: textBody,
      html,
      replyTo: email,
      attachments: [
        {
          filename: resume.name,
          content: Buffer.from(await resume.arrayBuffer()),
          contentType: resume.type || undefined,
        },
      ],
    });
  } catch (error) {
    console.error("[careers] SMTP send failed", error);
    const detail =
      import.meta.env.DEV && error instanceof Error
        ? ` Could not reach mailbox (${error.message}).`
        : "";
    return Response.json(
      { ok: false, error: `Could not send application.${detail}` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

export const Route = createFileRoute("/api/careers")({
  server: {
    handlers: {
      POST: async ({ request }) => handleCareer(request),
    },
  },
});
