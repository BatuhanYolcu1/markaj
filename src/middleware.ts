import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('markaj_admin_auth');
    
    // Allow API routes through
    if (request.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.next();
    }

    // If not authenticated, redirect to login
    if (!authCookie || authCookie.value !== 'authenticated') {
      const loginUrl = new URL('/admin-login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
