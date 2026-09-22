import { createFileRoute } from "@tanstack/react-router";

import { sendMail } from "@/lib/mail";

type ContactPayload = {
  name?: string;
  email?: string;
  organization?: string;
  website?: string;
  service?: string;
  stage?: string;
  budget?: string;
  timeline?: string;
  details?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value: string) {
  const safe = escapeHtml(value || "—");
  return `<tr><td style="padding:10px 0;border-bottom:1px solid #e6e1d8;width:140px;font:600 12px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#6b645b;">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid #e6e1d8;font:400 15px Arial,sans-serif;color:#1c1917;">${safe}</td></tr>`;
}

async function handleContact(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const details = payload.details?.trim() ?? "";

  if (!name || !email || !details) {
    return Response.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const organization = payload.organization?.trim() ?? "";
  const website = payload.website?.trim() ?? "";
  const service = payload.service?.trim() ?? "";
  const stage = payload.stage?.trim() ?? "";
  const budget = payload.budget?.trim() ?? "";
  const timeline = payload.timeline?.trim() ?? "";

  const subject = `[GenixaLab LLC] Project inquiry — ${name}`;
  const textBody = [
    "Project inquiry",
    name,
    email,
    "",
    `Organization: ${organization || "Not provided"}`,
    `Website: ${website || "Not provided"}`,
    `Service: ${service || "Not provided"}`,
    `Stage: ${stage || "Not provided"}`,
    `Budget: ${budget || "Not provided"}`,
    `Timeline: ${timeline || "Not provided"}`,
    "",
    "Details:",
    details,
  ].join("\n");

  const html = `<div style="background:#f6f3ee;padding:24px;font-family:Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e6e1d8;">
    <div style="background:#1c1917;color:#f6f3ee;padding:20px 24px;">
      <div style="font:600 12px Arial,sans-serif;letter-spacing:.14em;">GENIXALAB LLC</div>
      <div style="margin-top:8px;font:400 12px Arial,sans-serif;letter-spacing:.08em;color:#d6d3d1;">PROJECT INQUIRY</div>
    </div>
    <div style="padding:24px;">
      <h1 style="margin:0 0 8px;font:400 22px Georgia,serif;color:#1c1917;">New project note</h1>
      <p style="margin:0 0 20px;font:400 15px Arial,sans-serif;color:#44403c;">${escapeHtml(name)} · ${escapeHtml(email)}</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Name", name)}
        ${row("Email", email)}
        ${row("Organization", organization || "Not provided")}
        ${row("Website", website || "Not provided")}
        ${row("Service", service || "Not provided")}
        ${row("Stage", stage || "Not provided")}
        ${row("Budget", budget || "Not provided")}
        ${row("Timeline", timeline || "Not provided")}
      </table>
      <p style="margin:24px 0 8px;font:600 12px Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#6b645b;">Details</p>
      <p style="margin:0;font:400 15px Arial,sans-serif;color:#1c1917;white-space:pre-wrap;">${escapeHtml(details)}</p>
    </div>
  </div>
</div>`;

  try {
    await sendMail({
      subject,
      text: textBody,
      html,
      replyTo: email,
    });
  } catch (error) {
    console.error("[contact] SMTP send failed", error);
    const message = error instanceof Error ? error.message : String(error);
    let hint = "Could not send message.";
    if (/Missing SMTP_/i.test(message)) {
      hint = `Mail is not configured on the server (${message}).`;
    } else if (/Invalid login|Authentication failed|EAUTH/i.test(message)) {
      hint = "Mailbox login failed. Check SMTP_USER / SMTP_PASS on Vercel, then redeploy.";
    } else if (/ENOTFOUND|ECONNECTION|ETIMEDOUT|ECONNREFUSED/i.test(message)) {
      hint = "Could not reach the mail server. Check SMTP_HOST / SMTP_PORT, then redeploy.";
    }
    return Response.json({ ok: false, error: hint }, { status: 502 });
  }

  return Response.json({ ok: true });
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => handleContact(request),
    },
  },
});
