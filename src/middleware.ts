import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

const LOGIN_PATH = "/admin/login";

/**
 * Protege las rutas del panel.
 *
 * Esta es la primera línea de defensa, no la única: las Server Actions validan
 * la sesión por su cuenta, porque el middleware no cubre invocaciones directas.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  // Con sesión activa, el login no tiene sentido: se va derecho al panel.
  if (pathname === LOGIN_PATH) {
    if (session) {
      return withNoIndex(NextResponse.redirect(new URL("/admin", request.url)));
    }
    return withNoIndex(NextResponse.next());
  }

  if (!session) {
    const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    // La cookie inválida o vencida se descarta para no reintentar con ella.
    response.cookies.delete(SESSION_COOKIE);
    return withNoIndex(response);
  }

  return withNoIndex(NextResponse.next());
}

/** El panel no debe indexarse en ningún caso. */
function withNoIndex(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
