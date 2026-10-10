import { Router, Request, Response } from 'express';

const router = Router();

const SHOP_ID = process.env.SHOP_ID || '79445164163';
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || '';
const REDIRECT_URI = process.env.REDIRECT_URI || '';
const isProduction = process.env.NODE_ENV === 'production';

// 1. POST /api/customer/token
router.post('/token', async (req: Request, res: Response) => {
  try {
    const { code, codeVerifier, code_verifier } = req.body;
    const verifier = codeVerifier || code_verifier;

    if (!code || !verifier) {
      return res.status(400).json({ error: 'Missing code or codeVerifier in request body' });
    }

    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: SHOPIFY_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code: String(code),
      code_verifier: String(verifier),
    });

    if (process.env.SHOPIFY_CLIENT_SECRET) {
      tokenParams.append('client_secret', process.env.SHOPIFY_CLIENT_SECRET);
    }

    // Primary token URL per task specification
    const primaryTokenUrl = `https://shopify.com/${SHOP_ID}/auth/oauth/token`;
    // Fallback discovery URL if primary returns 404
    const fallbackTokenUrl = `https://shopify.com/authentication/${SHOP_ID}/oauth/token`;

    let response = await fetch(primaryTokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams.toString(),
    });

    if (response.status === 404) {
      response = await fetch(fallbackTokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: tokenParams.toString(),
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: 'Failed to retrieve access token from Shopify',
        details: errorText,
      });
    }

    const data: any = await response.json();

    if (data.access_token) {
      res.cookie('customer_token', data.access_token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.json({ success: true });
    }

    return res.status(400).json({
      error: 'No access_token returned by Shopify',
      details: data,
    });
  } catch (error: any) {
    console.error('Error exchanging token:', error);
    return res.status(500).json({
      error: 'Internal server error during token exchange',
      message: error?.message,
    });
  }
});

// 2. POST /api/customer/graphql
router.post('/graphql', async (req: Request, res: Response) => {
  try {
    const customerToken = req.cookies?.customer_token || req.headers.authorization?.replace(/^Bearer\s+/i, '');

    if (!customerToken) {
      return res.status(401).json({ error: 'Unauthorized: No customer_token cookie found' });
    }

    const graphqlEndpoint = `https://shopify.com/${SHOP_ID}/account/customer/api/2024-07/graphql`;

    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: customerToken,
      },
      body: JSON.stringify(req.body),
    });

    const data: any = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    console.error('Error forwarding GraphQL request:', error);
    return res.status(500).json({
      error: 'Internal server error while executing GraphQL query',
      message: error?.message,
    });
  }
});

// 3. POST /api/customer/logout
router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('customer_token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
  });
  return res.json({ success: true });
});

export default router;
