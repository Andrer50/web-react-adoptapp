import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Si no hay token, redirige a la página de login (/)
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Si intenta acceder a rutas de administración y no es ADMIN, redirige a /dashboard/home
  if (pathname.startsWith('/admin')) {
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
