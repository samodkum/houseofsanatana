// src/lib/customerAuth.ts

const SHOP_ID = '63911682135';
const CLIENT_ID = 'e89e5f5a-bd59-4864-a90e-02521629e672';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://houseofsanatana-production.up.railway.app';

export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/**
 * Initiates the Shopify Customer Account OAuth flow
 */
export async function loginCustomer(returnDestination = '/#orders'): Promise<void> {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateCodeVerifier().slice(0, 16);

  sessionStorage.setItem('shopify_code_verifier', codeVerifier);
  sessionStorage.setItem('shopify_oauth_state', state);
  sessionStorage.setItem('shopify_auth_destination', returnDestination);

  const redirectUri = `https://houseofsanatana.vercel.app/account/callback`;

  const authorizeUrl = new URL(`https://shopify.com/${SHOP_ID}/auth/oauth/authorize`);
  authorizeUrl.searchParams.set('client_id', CLIENT_ID);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'openid email customer-account-api:full');
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set('code_challenge', codeChallenge);
  authorizeUrl.searchParams.set('code_challenge_method', 'S256');

  window.location.href = authorizeUrl.toString();
}

/**
 * Handles OAuth callback when redirected back from Shopify
 */
export async function handleCustomerAuthCallback(): Promise<boolean> {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) return false;

  const savedState = sessionStorage.getItem('shopify_oauth_state');
  const codeVerifier = sessionStorage.getItem('shopify_code_verifier');

  if (state && savedState && state !== savedState) {
    console.error('State mismatch in OAuth callback');
    return false;
  }

  if (!codeVerifier) {
    console.error('Missing code_verifier in sessionStorage');
    return false;
  }

  try {
    const res = await fetch(
      'https://houseofsanatana-production.up.railway.app/api/customer/token',
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, codeVerifier }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Token exchange failed: ${err}`);
    }

    sessionStorage.removeItem('shopify_code_verifier');
    sessionStorage.removeItem('shopify_oauth_state');

    const destination = sessionStorage.getItem('shopify_auth_destination') || '/#orders';
    sessionStorage.removeItem('shopify_auth_destination');

    window.location.href = destination;
    return true;
  } catch (error) {
    console.error('Customer callback error:', error);
    return false;
  }
}

/**
 * Logs out the customer by clearing the backend session cookie
 */
export async function logoutCustomer(): Promise<boolean> {
  try {
    const res = await fetch(
      'https://houseofsanatana-production.up.railway.app/api/customer/logout',
      {
        method: 'POST',
        credentials: 'include',
      }
    );
    return res.ok;
  } catch (error) {
    console.error('Customer logout error:', error);
    return false;
  }
}

/**
 * Proxies GraphQL requests to Shopify Customer Account API via Railway backend
 */
export async function queryCustomerGraphQL<T>(query: string, variables = {}): Promise<T> {
  const res = await fetch(
    'https://houseofsanatana-production.up.railway.app/api/customer/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ query, variables }),
    }
  );

  if (res.status === 401) {
    throw new Error('UNAUTHORIZED');
  }

  const data = await res.json();
  if (data.errors) {
    throw new Error(data.errors.map((e: any) => e.message).join(', '));
  }

  return data.data;
}
