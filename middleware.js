// middleware.js — Next.js Middleware (roda na borda, antes de qualquer rota)
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Rotas que exigem autenticação
const ROTAS_PROTEGIDAS = [
  '/conta/pedidos',
  '/conta/dados',
  '/conta/enderecos',
  '/checkout',
];

// Rotas de API que exigem autenticação
const API_PROTEGIDAS = [
  '/api/pedidos',
  '/api/conta',
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin') || '';

  // ── CORS para App Mobile e outros clientes ───────────────────
  const origensPermitidas = [
    'http://localhost:3000',
    'http://localhost:8081',   // Expo dev
    'http://localhost:19006',  // Expo web
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.APP_URL,
  ].filter(Boolean);

  const headers = new Headers();
  if (origensPermitidas.includes(origin) || process.env.NODE_ENV === 'development') {
    headers.set('Access-Control-Allow-Origin', origin || '*');
  }
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  headers.set('Access-Control-Allow-Credentials', 'true');

  // Preflight OPTIONS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers });
  }

  // ── Verificar autenticação para rotas protegidas ─────────────
  const precisaAuth =
    ROTAS_PROTEGIDAS.some(r => pathname.startsWith(r)) ||
    API_PROTEGIDAS.some(r => pathname.startsWith(r));

  if (precisaAuth) {
    const token =
      request.headers.get('authorization')?.replace('Bearer ', '') ||
      request.cookies.get('token')?.value;

    if (!token) {
      // API → retorna 401 JSON
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { erro: 'Autenticação necessária' },
          { status: 401, headers }
        );
      }
      // Página → redireciona para login
      const url = request.nextUrl.clone();
      url.pathname = '/conta/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'dev-secret-mude-em-producao-123'
      );
      const { payload } = await jwtVerify(token, secret);

      // Injeta dados do usuário no header para as rotas usarem
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', String(payload.id));
      requestHeaders.set('x-user-email', String(payload.email));
      requestHeaders.set('x-user-role', String(payload.role || 'cliente'));

      const response = NextResponse.next({ request: { headers: requestHeaders } });
      // Propaga CORS
      headers.forEach((v, k) => response.headers.set(k, v));
      return response;
    } catch {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { erro: 'Token inválido ou expirado' },
          { status: 401, headers }
        );
      }
      const url = request.nextUrl.clone();
      url.pathname = '/conta/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Adiciona CORS em todas as respostas de API
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    headers.forEach((v, k) => response.headers.set(k, v));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/conta/pedidos',
    '/conta/dados',
    '/conta/enderecos',
    '/checkout',
  ],
};
