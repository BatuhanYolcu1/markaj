import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  // Admin password - should be set via environment variable in production
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'markaj2024';

  if (password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('markaj_admin_auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });
    return response;
  }

  return NextResponse.json({ success: false, error: 'Yanlış şifre' }, { status: 401 });
}
