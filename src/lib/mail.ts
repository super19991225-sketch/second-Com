import nodemailer from "nodemailer";

type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

type OutboundMail = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
  attachments?: MailAttachment[];
};

/**
 * Read env at runtime. Use Reflect.get so Nitro/Vite cannot replace
 * process.env.SMTP_* with empty strings at build time on Vercel.
 */
function requiredEnv(name: string) {
  const raw = Reflect.get(process.env, name);
  const value = typeof raw === "string" ? raw.trim() : "";
  if (!value) {
    const present = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "SMTP_TO"].filter(
      (key) => Boolean(Reflect.get(process.env, key)),
    );
    throw new Error(
      `Missing ${name}` +
        (present.length
          ? ` (present: ${present.join(", ")})`
          : " (no SMTP_* vars on this deployment)"),
    );
  }
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function optionalEnv(name: string) {
  const raw = Reflect.get(process.env, name);
  const value = typeof raw === "string" ? raw.trim() : "";
  if (!value) return undefined;
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function isPolicyReject(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return /550\s*5\.7\.1|Reject for policy/i.test(message);
}

function transporter() {
  const port = Number(requiredEnv("SMTP_PORT"));
  return nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 30_000,
  });
}

export async function sendMail(message: OutboundMail) {
  const authUser = requiredEnv("SMTP_USER");
  const from = optionalEnv("SMTP_FROM") ?? authUser;
  const to = optionalEnv("SMTP_TO") ?? authUser;
  const transport = transporter();

  const base = {
    from: `"GenixaLab LLC" <${from}>`,
    to,
    subject: message.subject,
    text: message.text,
    html: message.html,
    envelope: { from, to },
    ...(message.attachments?.length ? { attachments: message.attachments } : {}),
  };

  try {
    await transport.sendMail({
      ...base,
      replyTo: message.replyTo,
    });
  } catch (error) {
    // Shared hosts often reject external Reply-To + attachment as phishing.
    // Retry once without Reply-To; applicant email remains in the body.
    if (isPolicyReject(error) && message.attachments?.length) {
      await transport.sendMail(base);
      return;
    }
    throw error;
  }
}
