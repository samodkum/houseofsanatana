import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

interface VercelRequest extends IncomingMessage {
  query?: Record<string, string>;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (body: any) => void;
  redirect: (statusOrUrl: string | number, url?: string) => void;
}

function base64UrlEncode(buffer: Buffer): string {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status ? res.status(405).json({ error: 'Method Not Allowed' }) : res.writeHead(405).end();
  }

  const SHOPIFY_SHOP_ID = process.env.SHOPIFY_SHOP_ID || '79445164163';
  const SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID =
    process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || 'e89e5f5a-bd59-4864-a90e-02521629e672';

  // Determine host and protocol on Vercel
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
  const proto = req.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
  const redirectUri = process.env.SHOPIFY_REDIRECT_URI || `${proto}://${host}/api/customer/callback`;

  // Generate PKCE code verifier and challenge
  const codeVerifier = base64UrlEncode(crypto.randomBytes(32));
  const codeChallenge = base64UrlEncode(crypto.createHash('sha256').update(codeVerifier).digest());
  const state = base64UrlEncode(crypto.randomBytes(16));

  const isSecure = proto === 'https';
  const cookieFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=600${isSecure ? '; Secure' : ''}`;

  // Set PKCE cookies
  res.setHeader('Set-Cookie', [
    `hos_pkce_verifier=${encodeURIComponent(codeVerifier)}; ${cookieFlags}`,
    `hos_oauth_state=${encodeURIComponent(state)}; ${cookieFlags}`,
  ]);

  const authUrl = new URL(`https://shopify.com/authentication/${SHOPIFY_SHOP_ID}/oauth/authorize`);
  authUrl.searchParams.set('client_id', SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'openid email customer-account-api:full');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  // Redirect to Shopify authentication
  res.writeHead(302, { Location: authUrl.toString() });
  return res.end();
}
