import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except Next.js internals, static files, and API routes.
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|opengraph-image|sitemap.xml|robots.txt|images).*)",
  ],
};
