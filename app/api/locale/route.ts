import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "ar"];

export async function POST(request: Request) {
  const { locale } = await request.json();

  if (!SUPPORTED_LOCALES.includes(locale)) {
    return NextResponse.json(
      { error: "Unsupported locale" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: false,
  });

  return response;
}
