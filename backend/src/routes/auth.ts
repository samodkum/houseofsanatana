import { Router } from 'express';
import crypto from 'crypto';

declare global {
  namespace Express {
    interface Request {
      cookies?: Record<string, string>;
    }
  }
}

const router = Router();

function getCookieOptions(maxAgeMs?: number) {
  const isSecure = process.env.NODE_ENV === 'production' || !!process.env.SITE_URL?.startsWith('https');
  return {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax' as const,
    path: '/',
    ...(maxAgeMs ? { maxAge: maxAgeMs } : {}),
  };
}

// 1. GET /auth/login
router.get('/login', (req, res) => {
  // If user is already authenticated with customer token, redirect straight to /account
  if (req.cookies?.customer_access_token) {
    return res.redirect('/account');
  }

  // If error=1, show an error message instead of redirecting again to avoid redirect loops
  if (req.query.error === '1') {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Authentication Error - House of Sanatana</title>
          <style>
            body {
              font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
              background: #FEFBF2;
              color: #221508;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 1.5rem;
              box-sizing: border-box;
            }
            .card {
              background: white;
              padding: 2.5rem;
              border-radius: 1.5rem;
              border: 1px solid rgba(197, 146, 57, 0.25);
              max-width: 520px;
              width: 100%;
              text-align: center;
              box-shadow: 0 20px 45px rgba(34,21,8,0.08);
            }
            .symbol {
              font-size: 2rem;
              color: #C59239;
              margin-bottom: 0.5rem;
            }
            h1 {
              color: #51000F;
              font-size: 1.6rem;
              margin: 0.5rem 0 1rem;
              font-weight: 700;
            }
            p {
              font-size: 0.95rem;
              line-height: 1.6;
              color: #554538;
              margin-bottom: 1.5rem;
            }
            .info-box {
              background: #FDF9F0;
              border: 1px dashed rgba(197, 146, 57, 0.4);
              border-radius: 0.75rem;
              padding: 1rem;
              margin-bottom: 1.75rem;
              text-align: left;
              font-size: 0.85rem;
              font-family: monospace;
              color: #3D2619;
            }
            .btn {
              display: inline-block;
              padding: 0.75rem 1.75rem;
              background: #C59239;
              color: #221508;
              text-decoration: none;
              border-radius: 9999px;
              font-weight: 600;
              font-size: 0.95rem;
              transition: background 0.2s;
            }
            .btn:hover {
              background: #A67624;
            }
            .home-link {
              display: block;
              margin-top: 1rem;
              font-size: 0.85rem;
              color: #7A604D;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="symbol">॥ ॐ ॥</div>
            <h1>Authentication Failed</h1>
            <p>
              Could not complete authentication with Shopify Customer Account API.
              Please verify that your Shopify Customer Account API Client ID and Allowed Callback URIs are configured correctly.
            </p>
            <div class="info-box">
              Check terminal logs for the full Shopify response body.<br/>
              Callback URI required in Shopify: <strong>${process.env.SITE_URL || ''}/auth/callback</strong>
            </div>
            <a href="/auth/login" class="btn">Try Again</a>
            <a href="/" class="home-link">Return to Home</a>
          </div>
        </body>
      </html>
    `);
  }

  try {
    const shopId = process.env.SHOP_ID || '79445164163';
    const clientId = process.env.CUSTOMER_CLIENT_ID;
    const detectedProto = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : 'http');
    const siteUrl = (process.env.SITE_URL || `${detectedProto}://${req.headers.host}`).replace(/\/$/, '');

    // Check if Client ID has not been provided yet
    if (!clientId || clientId === 'YOUR_CUSTOMER_ACCOUNT_CLIENT_ID') {
      console.warn('[AUTH] CUSTOMER_CLIENT_ID is not configured in .env');
      return res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Configuration Required - House of Sanatana</title>
            <style>
              body {
                font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                background: #FAF6EE;
                color: #26201B;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 1.5rem;
                box-sizing: border-box;
              }
              .card {
                background: white;
                padding: 2.5rem;
                border-radius: 1.5rem;
                border: 1px solid #DECDB8;
                max-width: 580px;
                width: 100%;
                text-align: left;
                box-shadow: 0 20px 45px rgba(38,32,27,0.08);
              }
              h1 { color: #58111A; font-size: 1.5rem; margin-top: 0; }
              p { font-size: 0.95rem; line-height: 1.6; color: #5E4B3E; }
              ol { font-size: 0.9rem; line-height: 1.7; color: #3E3024; padding-left: 1.3rem; }
              code { background: #FAF0E6; color: #8C4E1D; padding: 2px 6px; border-radius: 4px; font-weight: bold; }
              .box { background: #FDF9F3; border: 1px solid #D9C6A8; border-radius: 8px; padding: 12px; margin: 15px 0; font-size: 0.85rem; }
              .btn { display: inline-block; margin-top: 1rem; padding: 10px 22px; background: #C7833D; color: white; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 0.9rem; }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>Action Required: Set Customer Account Client ID</h1>
              <p>Your server is running, but <code>CUSTOMER_CLIENT_ID</code> is still set to placeholder in <code>.env</code>.</p>
              <ol>
                <li>Open <strong>Shopify Admin</strong> &rarr; <strong>Settings</strong> &rarr; <strong>Customer accounts</strong>.</li>
                <li>Under <strong>Customer Account API</strong> (or your Headless channel credentials), copy your <strong>Client ID</strong>.</li>
                <li>Make sure your Shopify Allowed Callback URI is set to:<br/>
                  <div class="box"><code>${siteUrl}/auth/callback</code></div>
                </li>
                <li>Open <code>.env</code> in your project and update:
                  <div class="box"><code>CUSTOMER_CLIENT_ID=your_real_client_id_here</code></div>
                </li>
                <li>Restart your Express server (<code>npm run server</code>) and click the button below:</li>
              </ol>
              <a href="/auth/login" class="btn">Reload Login Flow</a>
            </div>
          </body>
        </html>
      `);
    }

    // 1. Generate PKCE code_verifier (32 random bytes -> 43 base64url chars)
    const codeVerifier = crypto.randomBytes(32).toString('base64url');
    // 2. Generate code_challenge (S256 of code_verifier)
    const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
    // 3. Generate random state and nonce
    const state = crypto.randomBytes(16).toString('base64url');
    const nonce = crypto.randomBytes(16).toString('base64url');

    // Store code_verifier and state in httpOnly cookies (maxAge 10 min)
    const cookieOpts = getCookieOptions(10 * 60 * 1000);
    res.cookie('shopify_verifier', codeVerifier, cookieOpts);
    res.cookie('shopify_state', state, cookieOpts);

    // Construct Shopify Customer Account authorize URL
    const redirectUri = `${siteUrl}/auth/callback`;
    const authUrl = new URL(`https://shopify.com/authentication/${shopId}/oauth/authorize`);
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', 'openid email customer-account-api:full');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('nonce', nonce);
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    return res.redirect(authUrl.toString());
  } catch (err: any) {
    console.error('[AUTH ERROR] Exception in GET /auth/login:', err);
    return res.status(500).send(`Authentication initialization failed: ${err?.message || err}`);
  }
});

// 2. GET /auth/callback
router.get('/callback', async (req, res) => {
  const shopId = process.env.SHOP_ID;
  const clientId = process.env.CUSTOMER_CLIENT_ID;
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  const code = req.query.code ? String(req.query.code) : null;
  const state = req.query.state ? String(req.query.state) : null;
  const savedState = req.cookies?.shopify_state;
  const codeVerifier = req.cookies?.shopify_verifier;

  // Validate state against cookie and ensure code + verifier exist
  if (!code || !state || !savedState || state !== savedState || !codeVerifier) {
    console.error('State mismatch or missing PKCE verifier/code in callback:', {
      receivedState: state,
      savedState,
      hasCode: !!code,
      hasVerifier: !!codeVerifier,
    });
    return res.redirect('/auth/login?error=1');
  }

  const redirectUri = `${siteUrl}/auth/callback`;

  try {
    const tokenUrl = `https://shopify.com/authentication/${shopId}/oauth/token`;
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId || '',
      redirect_uri: redirectUri,
      code,
      code_verifier: codeVerifier,
    });

    const tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': siteUrl,
      },
      body: params.toString(),
    });

    if (!tokenRes.ok) {
      const errorBody = await tokenRes.text();
      console.error('Shopify oauth/token exchange failed status:', tokenRes.status);
      console.error('Shopify oauth/token response body:', errorBody);
      return res.redirect('/auth/login?error=1');
    }

    const tokenData = await tokenRes.json();

    // Clear PKCE and state cookies
    const clearOpts = { path: '/' };
    res.clearCookie('shopify_verifier', clearOpts);
    res.clearCookie('shopify_state', clearOpts);

    // Save access_token, refresh_token, id_token in httpOnly, secure, sameSite=lax cookies
    const accessTokenMaxAge = (tokenData.expires_in || 3600 * 2) * 1000;
    const refreshTokenMaxAge = 30 * 24 * 3600 * 1000; // 30 days

    res.cookie('customer_access_token', tokenData.access_token, getCookieOptions(accessTokenMaxAge));
    if (tokenData.refresh_token) {
      res.cookie('customer_refresh_token', tokenData.refresh_token, getCookieOptions(refreshTokenMaxAge));
    }
    if (tokenData.id_token) {
      res.cookie('customer_id_token', tokenData.id_token, getCookieOptions(refreshTokenMaxAge));
    }

    // Redirect to custom React account page
    return res.redirect('/account');
  } catch (err) {
    console.error('Error during Shopify oauth/token exchange:', err);
    return res.redirect('/auth/login?error=1');
  }
});

// 3. GET /auth/logout
router.get('/logout', (req, res) => {
  const shopId = process.env.SHOP_ID;
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const idToken = req.cookies?.customer_id_token;

  // Clear all auth cookies
  const clearOpts = { path: '/' };
  res.clearCookie('customer_access_token', clearOpts);
  res.clearCookie('customer_refresh_token', clearOpts);
  res.clearCookie('customer_id_token', clearOpts);
  res.clearCookie('shopify_verifier', clearOpts);
  res.clearCookie('shopify_state', clearOpts);

  const postLogoutRedirectUri = `${siteUrl}/?logged_out=1`;
  const logoutUrl = new URL(`https://shopify.com/authentication/${shopId}/logout`);
  if (idToken) {
    logoutUrl.searchParams.set('id_token_hint', idToken);
  }
  logoutUrl.searchParams.set('post_logout_redirect_uri', postLogoutRedirectUri);

  return res.redirect(logoutUrl.toString());
});

export default router;
