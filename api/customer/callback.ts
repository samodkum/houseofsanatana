function getCookie(cookieHeader: string | undefined, name: string): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status ? res.status(405).json({ error: 'Method Not Allowed' }) : res.writeHead(405).end();
  }

  // Parse query params (Vercel provides req.query, or parse from req.url)
  const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const code = req.query?.code || urlObj.searchParams.get('code');
  const state = req.query?.state || urlObj.searchParams.get('state');
  const error = req.query?.error || urlObj.searchParams.get('error');

  if (error) {
    console.error('Shopify OAuth Error:', error);
    res.writeHead(302, { Location: `/#orders?auth_error=${encodeURIComponent(String(error))}` });
    return res.end();
  }

  const cookieHeader = req.headers?.cookie || '';
  const savedState = getCookie(cookieHeader, 'hos_oauth_state');
  const codeVerifier = getCookie(cookieHeader, 'hos_pkce_verifier');

  if (!state || state !== savedState || !codeVerifier) {
    console.error('State mismatch or missing verifier');
    res.writeHead(302, { Location: `/#orders?auth_error=State+mismatch+or+expired+session` });
    return res.end();
  }

  const SHOPIFY_SHOP_ID = process.env.SHOPIFY_SHOP_ID || '79445164163';
  const SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID =
    process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || 'e89e5f5a-bd59-4864-a90e-02521629e672';

  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
  const proto = req.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
  const redirectUri = process.env.SHOPIFY_REDIRECT_URI || `${proto}://${host}/api/customer/callback`;

  try {
    const tokenUrl = `https://shopify.com/authentication/${SHOPIFY_SHOP_ID}/oauth/token`;
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID,
      redirect_uri: redirectUri,
      code: String(code),
      code_verifier: codeVerifier,
    });

    const tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams.toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('Vercel Token exchange failed:', tokenRes.status, errText);
      res.writeHead(302, { Location: `/#orders?auth_error=Token+exchange+failed` });
      return res.end();
    }

    const tokenData: any = await tokenRes.json();
    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in || 7200;

    const isSecure = proto === 'https';
    const authCookieFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=${expiresIn}${isSecure ? '; Secure' : ''}`;

    res.setHeader('Set-Cookie', [
      `shopify_customer_token=${encodeURIComponent(accessToken)}; ${authCookieFlags}`,
      `hos_pkce_verifier=; Path=/; Max-Age=0`,
      `hos_oauth_state=; Path=/; Max-Age=0`,
    ]);

    res.writeHead(302, { Location: `/#orders` });
    return res.end();
  } catch (err: any) {
    console.error('Vercel Callback processing error:', err);
    res.writeHead(302, { Location: `/#orders?auth_error=Internal+Authentication+Error` });
    return res.end();
  }
}
