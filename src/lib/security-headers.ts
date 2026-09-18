const PRODUCTION_CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://*.google.com https://*.gstatic.com https://*.googleapis.com",
  "frame-src https://maps.google.com https://www.google.com",
  "connect-src 'self'",
].join("; ");

export function applySecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  if (import.meta.env.DEV) {
    headers.set("Content-Security-Policy-Report-Only", PRODUCTION_CSP);
  } else {
    headers.set("Content-Security-Policy", PRODUCTION_CSP);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
