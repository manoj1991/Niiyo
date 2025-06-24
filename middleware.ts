import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isLoggedIn = Boolean(token)

  const url = request.nextUrl.clone()

  const protectedPaths = ['/edit-profile', '/profile']

  if (!isLoggedIn && protectedPaths.includes(url.pathname)) {
    url.pathname = '/login' // or '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/edit-profile', '/profile'],
}
