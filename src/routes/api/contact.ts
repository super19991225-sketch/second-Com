import { createFileRoute } from "@tanstack/react-router";

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

async function handleContact(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  if (!payload.name || !payload.email || !payload.details) {
    return Response.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  // Integration point: send email via your provider (Resend, Postmark, SES).
  // This handler acknowledges the payload only. It does not send mail yet.
  console.info("[contact]", {
    name: payload.name,
    email: payload.email,
    organization: payload.organization,
    service: payload.service,
    stage: payload.stage,
  });

  return Response.json({ ok: true });
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => handleContact(request),
    },
  },
});
