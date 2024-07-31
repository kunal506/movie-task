import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login';
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : '';

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  if (isPublicPath && token) {
    try {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: ['/', '/login', '/create-movie', '/edit-movie/:path*'],
};
