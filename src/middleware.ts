import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getMe } from "./server-actions/get-me.action";
import { refreshToken } from "./server-actions/refresh-token.action";
//NOT DONE

const ACCESS_TOKEN = "__shc_access_token";
const REFRESH_TOKEN = "__shc_refresh_token";
const LOGIN_PATH = "/auth/login";

function hasValidCookies(request: NextRequest): boolean {
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  return !!accessToken && !!refreshToken;
}

function redirectToLogin(origin: string): NextResponse {
  return NextResponse.redirect(new URL(LOGIN_PATH, origin));
}

function redirectToHome(origin: string): NextResponse {
  return NextResponse.redirect(new URL("/", origin));
}

async function handleUserAuthentication(
  request: NextRequest,
  origin: string
): Promise<NextResponse> {
  try {
    const user = await getMe();
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user", JSON.stringify(user));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return handleRefreshToken(origin);
  }
}

async function handleRefreshToken(origin: string): Promise<NextResponse> {
  try {
    const refreshTokenResponse = await refreshToken();
    const response = NextResponse.next({
      request: {
        headers: new Headers({
          "x-user": JSON.stringify(refreshTokenResponse.user),
        }),
      },
    });
    response.cookies.set({
      name: ACCESS_TOKEN,
      value: refreshTokenResponse.access_token,
      path: "/",
      httpOnly: true,
    });
    response.cookies.set({
      name: REFRESH_TOKEN,
      value: refreshTokenResponse.refresh_token,
      path: "/",
      httpOnly: true,
    });
    return response;
  } catch (error) {
    const response = NextResponse.rewrite(new URL(LOGIN_PATH, origin));
    response.cookies.delete(ACCESS_TOKEN);
    response.cookies.delete(REFRESH_TOKEN);
    return response;
  }
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname, origin } = request.nextUrl;

  if (!hasValidCookies(request)) {
    return pathname !== LOGIN_PATH
      ? redirectToLogin(origin)
      : NextResponse.next();
  }

  return pathname === LOGIN_PATH
    ? redirectToHome(origin)
    : handleUserAuthentication(request, origin);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /share/... (shared files)
     * - /install.sh (installation script)
     */
    "/((?!install.sh|share|_next/static|_next/image|favicon.ico|files/.+).*)",
  ],
};
