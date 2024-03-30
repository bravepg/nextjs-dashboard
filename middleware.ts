// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';

// export default NextAuth(authConfig).auth;

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

import { NextResponse } from 'next/server';

// The country to block from accessing the secret page
const BLOCKED_COUNTRY = 'SE';

// Trigger this middleware to run on the `/secret-page` route
export const config = {
  matcher: '/secret-page',
};

export default function middleware(request: Request) {
  // Extract country. Default to US if not found.
  // 本地环境始终是空 https://github.com/vercel/next.js/discussions/39619
  // @ts-ignore
  const country = (request.geo && request.geo.country) || 'US';

  console.log(`Visitor from ${country}`);

  // Specify the correct route based on the requests location
  let newPathname = country === BLOCKED_COUNTRY ? '/login' : '/secret-page';

  // 使用新的URL进行重写
  const url = new URL(request.url);
  url.pathname = newPathname;

  // Rewrite to URL
  return NextResponse.rewrite(url);
}
