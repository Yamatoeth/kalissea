import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - files with extensions (e.g. favicon.ico, robots.txt)
    // - _next internal paths
    // - api routes
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
