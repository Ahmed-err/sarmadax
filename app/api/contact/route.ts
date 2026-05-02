import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getClientIp, rateLimit, sweepRateLimitBuckets } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const MAX = {
  name: 120,
  email: 254,
  projectType: 40,
  budget: 40,
  message: 5000,
};

const ALLOWED_PROJECT_TYPES = new Set([
  "saas", "webApp", "mobile", "design", "ai", "ecommerce", "other", "",
]);

const ALLOWED_BUDGETS = new Set(["small", "medium", "large", "enterprise", ""]);

// RFC-5322-ish; rejects obvious garbage without false-rejecting valid addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  // Rate limit by IP: 5 requests / 10 minutes. Generous enough for retries,
  // tight enough to throttle automated abuse.
  const ip = getClientIp(request);
  const rl = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
  sweepRateLimitBuckets();
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid JSON.");
  }
  if (!body || typeof body !== "object") return bad("Invalid payload.");

  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const projectType = typeof b.projectType === "string" ? b.projectType.trim() : "";
  const budget = typeof b.budget === "string" ? b.budget.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  // Honeypot — populated by bots, should always be empty for humans.
  const honeypot = typeof b.website === "string" ? b.website : "";

  if (honeypot) {
    // Pretend success so bots don't probe.
    return NextResponse.json({ success: true });
  }

  if (!name || !email || !message) {
    return bad("Name, email, and message are required.");
  }
  if (name.length > MAX.name) return bad("Name is too long.");
  if (email.length > MAX.email) return bad("Email is too long.");
  if (message.length > MAX.message) return bad("Message is too long.");
  if (projectType.length > MAX.projectType) return bad("Invalid project type.");
  if (budget.length > MAX.budget) return bad("Invalid budget.");
  if (!EMAIL_RE.test(email)) return bad("Invalid email address.");
  if (!ALLOWED_PROJECT_TYPES.has(projectType)) return bad("Invalid project type.");
  if (!ALLOWED_BUDGETS.has(budget)) return bad("Invalid budget.");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not configured.");
    return bad("Email service is not configured.", 500);
  }

  // Escape ALL user-controlled values before HTML interpolation.
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    projectType: escapeHtml(projectType || "Not specified"),
    budget: escapeHtml(budget || "Not specified"),
    message: escapeHtml(message).replace(/\n/g, "<br>"),
  };

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: `${SITE.name} Contact <${SITE.email}>`,
      to: [SITE.email],
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Project Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${safe.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 8px 0;">${safe.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Project Type</td><td style="padding: 8px 0;">${safe.projectType}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Budget</td><td style="padding: 8px 0;">${safe.budget}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #0ea5e9;">
            <p style="color: #64748b; font-size: 14px; margin: 0 0 8px;">Message</p>
            <p style="margin: 0; line-height: 1.6;">${safe.message}</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Contact form: Resend send failed:", error);
    return bad("Failed to send message. Please try again.", 500);
  }

  return NextResponse.json({ success: true });
}
