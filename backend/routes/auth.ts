import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { saveOAuthSession, getOAuthSession } from '../middleware/session';

export const authRouter = Router();

// Helper to base64url encode buffers
function base64URLEncode(buffer: Buffer): string {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Generate code verifier and code challenge for PKCE
function generatePKCE() {
  const codeVerifier = base64URLEncode(crypto.randomBytes(32));
  const hash = crypto.createHash('sha256').update(codeVerifier).digest();
  const codeChallenge = base64URLEncode(hash);
  return { codeVerifier, codeChallenge };
}

/**
 * GET /auth/login
 * Generates PKCE code_verifier + code_challenge, saves to session,
 * and redirects the user to Shopify's hosted OAuth authorization page.
 */
authRouter.get('/login', (req: Request, res: Response) => {
  const shopId = process.env.SHOP_ID || '79445164163';
  const clientId = process.env.CLIENT_ID || 'e89e5f5a-bd59-4864-a90e-02521629e672';
  const redirectUri = process.env.REDIRECT_URI || 'http://localhost:3000/auth/callback';

  const { codeVerifier, codeChallenge } = generatePKCE();
  const state = base64URLEncode(crypto.randomBytes(16));
  const nonce = base64URLEncode(crypto.randomBytes(16));

  // Store in memory session store tied to the unique state
  saveOAuthSession(state, {
    codeVerifier,
    state,
    nonce,
  });

  const authorizeUrl = new URL(`https://shopify.com/${shopId}/auth/oauth/authorize`);
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'openid email customer-account-api:full');
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set('nonce', nonce);
  authorizeUrl.searchParams.set('code_challenge', codeChallenge);
  authorizeUrl.searchParams.set('code_challenge_method', 'S256');

  // Also set a fallback cookie for state in case of session mismatch across processes
  res.cookie('hos_pkce_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
    path: '/',
  });

  res.redirect(authorizeUrl.toString());
});

/**
 * GET /auth/callback
 * Exchanges authorization code for an access token via PKCE on the server side.
 * Sets secure httpOnly cookie and redirects the user to /account.
 */
authRouter.get('/callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;
  const error = req.query.error as string;
  const errorDescription = req.query.error_description as string;

  if (error) {
    console.error('Shopify OAuth Error callback:', error, errorDescription);
    res.redirect(`http://localhost:3000/?auth_error=${encodeURIComponent(errorDescription || error)}`);
    return;
  }

  if (!code || !state) {
    res.status(400).send('Missing code or state in OAuth callback');
    return;
  }

  const session = getOAuthSession(state);
  if (!session || !session.codeVerifier) {
    console.error('PKCE session verification failed for state:', state);
    res.status(400).send('Invalid or expired authentication session. Please try logging in again.');
    return;
  }

  const shopId = process.env.SHOP_ID || '79445164163';
  const clientId = process.env.CLIENT_ID || 'e89e5f5a-bd59-4864-a90e-02521629e672';
  const redirectUri = process.env.REDIRECT_URI || 'http://localhost:3000/auth/callback';
  const tokenEndpoint = `https://shopify.com/${shopId}/auth/oauth/token`;

  try {
    const bodyParams = new URLSearchParams();
    bodyParams.set('grant_type', 'authorization_code');
    bodyParams.set('client_id', clientId);
    bodyParams.set('redirect_uri', redirectUri);
    bodyParams.set('code', code);
    bodyParams.set('code_verifier', session.codeVerifier);

    const tokenResponse = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams.toString(),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Failed to exchange code for token:', tokenResponse.status, errorText);
      res.status(502).send(`Authentication failed with Shopify: ${errorText}`);
      return;
    }

    const tokenData = await tokenResponse.json() as {
      access_token: string;
      token_type?: string;
      expires_in?: number;
      refresh_token?: string;
      id_token?: string;
    };

    const maxAgeSeconds = tokenData.expires_in || 7200; // default 2 hours

    // Set secure httpOnly cookie (never accessible to client-side JS)
    res.cookie('hos_customer_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: maxAgeSeconds * 1000,
      path: '/',
    });

    if (tokenData.id_token) {
      res.cookie('hos_id_token', tokenData.id_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: maxAgeSeconds * 1000,
        path: '/',
      });
    }

    // Clear temporary PKCE state cookie
    res.clearCookie('hos_pkce_state', { path: '/' });

    // Redirect to the custom React customer account view
    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');
    res.redirect(`${frontendUrl}/account`);
  } catch (err: any) {
    console.error('Error during token exchange:', err);
    res.status(500).send('Internal server error during authentication.');
  }
});

/**
 * POST /auth/logout
 * Clears the customer token cookie and redirects to home.
 */
authRouter.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('hos_customer_token', { path: '/' });
  res.clearCookie('hos_id_token', { path: '/' });
  res.clearCookie('hos_pkce_state', { path: '/' });

  // Support both JSON API response and direct form post / redirect
  if (req.headers.accept?.includes('application/json')) {
    res.json({ success: true, message: 'Logged out successfully' });
  } else {
    res.redirect('/');
  }
});

/**
 * GET /auth/status
 * Utility endpoint to check if an active session cookie exists.
 */
authRouter.get('/status', (req: Request, res: Response) => {
  const cookies = req.headers.cookie || '';
  const isAuthenticated = cookies.includes('hos_customer_token=');
  res.json({ isAuthenticated });
});
