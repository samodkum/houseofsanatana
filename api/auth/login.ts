import type { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

function base64URLEncode(buffer: Buffer): string {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export default async function handler(req: any, res: any) {
  try {
    const shopId = process.env.SHOP_ID || '79445164163';
    const clientId = process.env.CLIENT_ID || 'e89e5f5a-bd59-4864-a90e-02521629e672';
    const redirectUri = process.env.REDIRECT_URI || 'https://houseofsanatana.vercel.app/auth/callback';

    // Generate PKCE code verifier and challenge
    const codeVerifier = base64URLEncode(crypto.randomBytes(32));
    const hash = crypto.createHash('sha256').update(codeVerifier).digest();
    const codeChallenge = base64URLEncode(hash);
    const state = base64URLEncode(crypto.randomBytes(16));
    const nonce = base64URLEncode(crypto.randomBytes(16));

    // Store PKCE verifier in a secure httpOnly cookie so it survives serverless execution
    const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
    const cookieOptions = `Path=/; HttpOnly; SameSite=Lax; Max-Age=900${isProduction ? '; Secure' : ''}`;

    res.setHeader('Set-Cookie', [
      `hos_code_verifier=${encodeURIComponent(codeVerifier)}; ${cookieOptions}`,
      `hos_auth_state=${encodeURIComponent(state)}; ${cookieOptions}`,
    ]);

    const authorizeUrl = new URL(`https://shopify.com/${shopId}/auth/oauth/authorize`);
    authorizeUrl.searchParams.set('client_id', clientId);
    authorizeUrl.searchParams.set('response_type', 'code');
    authorizeUrl.searchParams.set('redirect_uri', redirectUri);
    authorizeUrl.searchParams.set('scope', process.env.SHOPIFY_SCOPE || 'openid email');
    authorizeUrl.searchParams.set('state', state);
    authorizeUrl.searchParams.set('nonce', nonce);
    authorizeUrl.searchParams.set('code_challenge', codeChallenge);
    authorizeUrl.searchParams.set('code_challenge_method', 'S256');

    // Redirect to Shopify
    res.writeHead(302, { Location: authorizeUrl.toString() });
    res.end();
  } catch (error: any) {
    console.error('Error initiating Shopify login:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Failed to initiate authentication', message: error.message }));
  }
}
