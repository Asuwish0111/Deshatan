import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE = 'deshatan_admin';
const secret = () => new TextEncoder().encode(process.env.SESSION_SECRET || 'dev-only-secret-change-me');

export async function createSession(email) {
  const token = await new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret());
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true, sameSite: 'lax', path: '/',
    secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 8
  });
}

export async function readSession() {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret());
    return payload;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function checkCredentials(email, password) {
  const okEmail = (process.env.ADMIN_EMAIL || 'admin@deshatan.in').toLowerCase();
  const okPass = process.env.ADMIN_PASSWORD || 'deshatan123';
  return String(email).toLowerCase() === okEmail && String(password) === okPass;
}
