import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseSetCookie } from 'cookie';

import { checkSession } from '@/lib/api/serverApi';

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && refreshToken) {
    try {
      const response = await checkSession();

      const setCookie = response.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie)
          ? setCookie
          : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);

          if (parsed.value) {
            cookieStore.set(parsed.name, parsed.value, parsed);
          }
        }

        accessToken = cookieStore.get('accessToken')?.value;
      }
    } catch {
      // ignore
    }
  }

  const isAuthenticated = Boolean(accessToken);

  const isPrivateRoute =
    request.nextUrl.pathname.startsWith('/notes') ||
    request.nextUrl.pathname.startsWith('/profile');

  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/sign-in') ||
    request.nextUrl.pathname.startsWith('/sign-up');

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/notes/:path*',
    '/profile/:path*',
    '/sign-in',
    '/sign-up',
  ],
};