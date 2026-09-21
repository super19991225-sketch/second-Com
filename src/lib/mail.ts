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

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function transporter() {
  const port = Number(requiredEnv("SMTP_PORT"));
  return nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    },
  });
}

export async function sendMail(message: OutboundMail) {
  const mailbox = requiredEnv("SMTP_USER");

  await transporter().sendMail({
    from: mailbox,
    to: mailbox,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
    attachments: message.attachments,
  });
}
