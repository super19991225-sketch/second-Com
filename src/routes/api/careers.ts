import { createFileRoute } from "@tanstack/react-router";

type CareerPayload = {
  name?: string;
  email?: string;
  role?: string;
  portfolio?: string;
  linkedin?: string;
  experience?: string;
  note?: string;
};

async function handleCareer(request: Request) {
  const payload = (await request.json()) as CareerPayload;
  if (!payload.name || !payload.email || !payload.role || !payload.experience || !payload.note) {
    return Response.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  // Integration point: send email via your provider (Resend, Postmark, SES).
  console.info("[careers]", {
    name: payload.name,
    email: payload.email,
    role: payload.role,
  });

  return Response.json({ ok: true });
}

export const Route = createFileRoute("/api/careers")({
  server: {
    handlers: {
      POST: async ({ request }) => handleCareer(request),
    },
  },
});
