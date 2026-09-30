export default async function handler(req: any, res: any) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const code = req.query?.code || url.searchParams.get('code');
    const state = req.query?.state || url.searchParams.get('state');
    const error = req.query?.error || url.searchParams.get('error');
    const errorDescription = req.query?.error_description || url.searchParams.get('error_description');

    if (error) {
      console.error('Shopify OAuth Error in callback:', error, errorDescription);
      res.writeHead(302, { Location: `/?auth_error=${encodeURIComponent(errorDescription || error)}` });
      res.end();
      return;
    }

    if (!code) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end('<h3>Missing authorization code from Shopify callback. Please try again.</h3>');
      return;
    }

    // Parse cookies from headers
    const cookieHeader = req.headers.cookie || '';
    const cookies: Record<string, string> = {};
    cookieHeader.split(';').forEach((c: string) => {
      const parts = c.split('=');
      const name = parts[0]?.trim();
      if (name) {
        cookies[name] = decodeURIComponent(parts.slice(1).join('=').trim());
      }
    });

    const codeVerifier = cookies['hos_code_verifier'];
    if (!codeVerifier) {
      console.error('Missing code_verifier cookie in request headers');
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end('<h3>Session expired or cookie blocked. Please ensure third-party cookies are enabled and try logging in again.</h3>');
      return;
    }

    const shopId = process.env.SHOP_ID || '79445164163';
    const clientId = process.env.CLIENT_ID || 'e89e5f5a-bd59-4864-a90e-02521629e672';
    const redirectUri = process.env.REDIRECT_URI || 'https://houseofsanatana.vercel.app/auth/callback';
    const tokenEndpoint = `https://shopify.com/${shopId}/auth/oauth/token`;

    const bodyParams = new URLSearchParams();
    bodyParams.set('grant_type', 'authorization_code');
    bodyParams.set('client_id', clientId);
    bodyParams.set('redirect_uri', redirectUri);
    bodyParams.set('code', code as string);
    bodyParams.set('code_verifier', codeVerifier);

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
      res.statusCode = 502;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(`<h3>Authentication failed with Shopify:</h3><pre>${errorText}</pre>`);
      return;
    }

    const tokenData = await tokenResponse.json() as {
      access_token: string;
      token_type?: string;
      expires_in?: number;
      id_token?: string;
    };

    const maxAge = tokenData.expires_in || 7200;
    const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
    const cookieOptions = `Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${isProduction ? '; Secure' : ''}`;

    // Set auth cookies and clear temporary PKCE cookies
    res.setHeader('Set-Cookie', [
      `hos_customer_token=${encodeURIComponent(tokenData.access_token)}; ${cookieOptions}`,
      tokenData.id_token ? `hos_id_token=${encodeURIComponent(tokenData.id_token)}; ${cookieOptions}` : '',
      `hos_code_verifier=; Path=/; Max-Age=0`,
      `hos_auth_state=; Path=/; Max-Age=0`,
    ].filter(Boolean));

    // Redirect to custom frontend customer dashboard
    const frontendUrl = (process.env.FRONTEND_URL || 'https://houseofsanatana.vercel.app').replace(/\/$/, '');
    res.writeHead(302, { Location: `${frontendUrl}/account` });
    res.end();
  } catch (err: any) {
    console.error('Callback error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`<h3>Internal server error during authentication:</h3><p>${err.message}</p>`);
  }
}
