import { Request, Response, Router } from 'express';
import crypto from 'crypto';

export const customerOrdersRouter = Router();

// Configuration from environment with Headless Customer Account API credentials
const SHOPIFY_SHOP_ID = process.env.SHOPIFY_SHOP_ID || '79445164163';
const SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID =
  process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || 'e89e5f5a-bd59-4864-a90e-02521629e672';
const SHOPIFY_CUSTOMER_API_VERSION = process.env.SHOPIFY_CUSTOMER_API_VERSION || '2024-07';

// Shopify Customer Account OAuth & GraphQL Endpoints (from OpenID Discovery)
const OAUTH_AUTHORIZE_URL = `https://shopify.com/authentication/${SHOPIFY_SHOP_ID}/oauth/authorize`;
const OAUTH_TOKEN_URL = `https://shopify.com/authentication/${SHOPIFY_SHOP_ID}/oauth/token`;
const OAUTH_LOGOUT_URL = `https://shopify.com/authentication/${SHOPIFY_SHOP_ID}/logout`;
const CUSTOMER_ACCOUNT_GRAPHQL_URL =
  process.env.SHOPIFY_CUSTOMER_API_URL ||
  `https://shopify.com/${SHOPIFY_SHOP_ID}/account/customer/api/${SHOPIFY_CUSTOMER_API_VERSION}/graphql`;

// GraphQL Query for Customer Orders
const GET_CUSTOMER_ORDERS_QUERY = `
  query GetCustomerOrders {
    customer {
      orders(first: 50) {
        nodes {
          id
          name
          processedAt
          financialStatus
          fulfillmentStatus
          tags
          lineItems(first: 10) {
            nodes {
              title
              quantity
              image {
                url
                altText
              }
              variant {
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  productType
                  tags
                }
              }
            }
          }
          totalPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

// Utility: parse cookies from cookie header
function getCookie(req: Request, name: string): string | null {
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

// Utility: base64url encoding
function base64UrlEncode(buffer: Buffer): string {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * 1. GET /api/customer/login
 * Starts the Headless Customer Account OAuth PKCE Flow
 */
customerOrdersRouter.get('/login', (req: Request, res: Response) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const redirectUri = process.env.SHOPIFY_REDIRECT_URI || `${protocol}://${host}/api/customer/callback`;

  // Generate PKCE code verifier (43-128 chars) & challenge
  const codeVerifier = base64UrlEncode(crypto.randomBytes(32));
  const codeChallenge = base64UrlEncode(crypto.createHash('sha256').update(codeVerifier).digest());
  const state = base64UrlEncode(crypto.randomBytes(16));

  // Store verifier and state in httpOnly cookies (valid for 10 minutes)
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=600${isProduction ? '; Secure' : ''}`;
  res.setHeader('Set-Cookie', [
    `hos_pkce_verifier=${encodeURIComponent(codeVerifier)}; ${cookieFlags}`,
    `hos_oauth_state=${encodeURIComponent(state)}; ${cookieFlags}`,
  ]);

  const authUrl = new URL(OAUTH_AUTHORIZE_URL);
  authUrl.searchParams.set('client_id', SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'openid email customer-account-api:full');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  return res.redirect(authUrl.toString());
});

/**
 * 2. GET /api/customer/callback
 * Handles OAuth code exchange with Shopify using the Client ID
 */
customerOrdersRouter.get('/callback', async (req: Request, res: Response) => {
  const { code, state, error, error_description } = req.query;

  if (error) {
    console.error('Shopify OAuth Error:', error, error_description);
    return res.redirect(`/#orders?auth_error=${encodeURIComponent(String(error_description || error))}`);
  }

  const savedState = getCookie(req, 'hos_oauth_state');
  const codeVerifier = getCookie(req, 'hos_pkce_verifier');

  if (!state || state !== savedState || !codeVerifier) {
    console.error('Invalid OAuth state or missing code verifier');
    return res.redirect('/#orders?auth_error=State+mismatch+or+expired+session');
  }

  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const redirectUri = process.env.SHOPIFY_REDIRECT_URI || `${protocol}://${host}/api/customer/callback`;

  try {
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID,
      redirect_uri: redirectUri,
      code: String(code),
      code_verifier: codeVerifier,
    });

    const tokenRes = await fetch(OAUTH_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams.toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('Token exchange failed:', tokenRes.status, errText);
      return res.redirect(`/#orders?auth_error=Token+exchange+failed`);
    }

    const tokenData: any = await tokenRes.json();
    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in || 7200;

    const isProduction = process.env.NODE_ENV === 'production';
    const authCookieFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=${expiresIn}${isProduction ? '; Secure' : ''}`;

    // Clear PKCE cookies and set customer access token cookie
    res.setHeader('Set-Cookie', [
      `shopify_customer_token=${encodeURIComponent(accessToken)}; ${authCookieFlags}`,
      `hos_pkce_verifier=; Path=/; Max-Age=0`,
      `hos_oauth_state=; Path=/; Max-Age=0`,
    ]);

    return res.redirect('/#orders');
  } catch (err: any) {
    console.error('Callback processing error:', err);
    return res.redirect('/#orders?auth_error=Internal+Authentication+Error');
  }
});

/**
 * 3. GET /api/customer/status
 * Returns current customer authentication status
 */
customerOrdersRouter.get('/status', (req: Request, res: Response) => {
  const token = getCookie(req, 'shopify_customer_token') || req.headers.authorization?.replace(/^Bearer\s+/i, '');
  return res.json({
    isAuthenticated: Boolean(token),
    clientId: SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID,
    shopId: SHOPIFY_SHOP_ID,
  });
});

/**
 * 4. GET /api/customer/logout
 * Clears customer session cookie
 */
customerOrdersRouter.get('/logout', (_req: Request, res: Response) => {
  res.setHeader('Set-Cookie', `shopify_customer_token=; Path=/; Max-Age=0`);
  return res.redirect('/#home');
});

/**
 * 5. GET /api/customer/orders
 * Proxies request to Shopify Customer Account GraphQL API
 */
customerOrdersRouter.get('/orders', async (req: Request, res: Response) => {
  try {
    // Read customer token from httpOnly cookie or Authorization header
    const tokenFromCookie = getCookie(req, 'shopify_customer_token') || getCookie(req, 'customer_access_token');
    const tokenFromAuthHeader = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    const customerToken = tokenFromCookie || tokenFromAuthHeader;

    if (!customerToken) {
      return res.status(401).json({
        error: 'Unauthorized: No customer session token found. Please log in.',
        loginUrl: '/api/customer/login',
        clientId: SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID,
        orders: [],
      });
    }

    // Query Shopify Customer Account API with customer access token (direct token without Bearer prefix per Shopify Customer API docs)
    const rawToken = customerToken.replace(/^Bearer\s+/i, '');
    const shopifyResponse = await fetch(CUSTOMER_ACCOUNT_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: rawToken,
      },
      body: JSON.stringify({
        query: GET_CUSTOMER_ORDERS_QUERY,
      }),
    });

    if (!shopifyResponse.ok) {
      const errText = await shopifyResponse.text();
      console.error('Shopify Customer API error:', shopifyResponse.status, errText);
      return res.status(shopifyResponse.status).json({
        error: `Shopify Customer API error: ${shopifyResponse.statusText}`,
        details: errText,
      });
    }

    const json: any = await shopifyResponse.json();

    if (json.errors && json.errors.length > 0) {
      return res.status(400).json({
        error: 'GraphQL error in Shopify response',
        details: json.errors,
      });
    }

    const orderNodes = json.data?.customer?.orders?.nodes || [];

    return res.json({
      orders: orderNodes,
      customer: {
        id: json.data?.customer?.id,
      },
    });
  } catch (error: any) {
    console.error('Failed to proxy customer orders:', error);
    return res.status(500).json({
      error: 'Internal server error while fetching customer orders',
      message: error?.message,
    });
  }
});
