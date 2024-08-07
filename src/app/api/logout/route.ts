import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const refreshToken = cookies().get('__shc_refresh_token')?.value;

    if (!refreshToken) {
      console.error('Refresh token not found');
      return NextResponse.json({ error: 'Refresh token not found' }, { status: 400 });
    }

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
      console.error('Failed to logout from backend', await res.text());
      return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
    }

    cookies().delete('__shc_access_token');
    cookies().delete('__shc_refresh_token');

    // Use an absolute URL for the redirect
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL('/auth/login', baseUrl);
    return NextResponse.redirect(url.toString());
  } catch (error) {
    console.error('Unexpected error during logout:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}