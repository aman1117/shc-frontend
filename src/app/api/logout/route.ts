import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const refreshToken = cookies().get('__shc_refresh_token')?.value;

  const res = await fetch(
    `${process.env.SHC_BACKEND_API_BASE_URL}/auth/logout`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      method: 'DELETE',
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }

  cookies().delete('__shc_access_token');
  cookies().delete('__shc_refresh_token');

  // Use an absolute URL for the redirect
  const url = new URL('/auth/login', process.env.NEXT_PUBLIC_BASE_URL);
  return NextResponse.redirect(url.toString());
}