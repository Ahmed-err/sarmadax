import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, email, projectType, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Sarmadax Contact <hello@sarmadax.com>",
      to: ["hello@sarmadax.com"],
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Project Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Project Type</td><td style="padding: 8px 0;">${projectType || "Not specified"}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Budget</td><td style="padding: 8px 0;">${budget || "Not specified"}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #0ea5e9;">
            <p style="color: #64748b; font-size: 14px; margin: 0 0 8px;">Message</p>
            <p style="margin: 0; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
