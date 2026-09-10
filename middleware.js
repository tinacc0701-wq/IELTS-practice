export const config = {
  matcher: '/((?!_vercel/).*)',
};

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASS;

  if (user && pass) {
    const expected = 'Basic ' + btoa(`${user}:${pass}`);
    if (authHeader === expected) {
      return;
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="IELTS Practice"' },
  });
}
