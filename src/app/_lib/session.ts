"use server"
import 'server-only';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers'

// Temporary Secret for TESTING ONLY
const secretKey = "123323232";
const encodedKey = new TextEncoder().encode(secretKey);
 
export async function encrypt(userId:string, expiration:number) {
    const payload: JWTPayload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: expiration
    }
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}
 
export async function createSession(userId: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
  const session = await encrypt(userId, expiresAt)
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: '/',
  })
}