// Shopify Storefront API configuration and client
export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || 'houseofsanatana.myshopify.com';
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'd302d09f71a616811b082748dddf5421';
export const SHOPIFY_API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01';
export const SHOPIFY_ACCOUNT_URL = 'https://shopify.com/79445164163/account';
export const SHOPIFY_LOGOUT_URL = 'https://shopify.com/79445164163/account/logout';
export const SHOPIFY_CUSTOMER_CLIENT_ID = import.meta.env.VITE_SHOPIFY_CUSTOMER_CLIENT_ID || 'e89e5f5a-bd59-4864-a90e-02521629e672';

export const SHOPIFY_AUTH_URL = 'https://shopify.com/79445164163/auth/oauth/authorize';
export const SHOPIFY_TOKEN_URL = 'https://shopify.com/79445164163/auth/oauth/token';

const SHOPIFY_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export interface ShopifyCheckoutItem {
  variantId?: string;
  quantity: number;
  customAttributes?: { key: string; value: string }[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  images: { url: string; altText?: string }[];
  variants: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    availableForSale: boolean;
  }[];
}

/**
 * Execute a GraphQL query against the Shopify Storefront API
 */
export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join(', '));
  }

  return json.data;
}

/**
 * Fetch products from Shopify
 */
export async function getShopifyProducts(first = 20): Promise<ShopifyProduct[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      products: {
        edges: {
          node: {
            id: string;
            title: string;
            handle: string;
            description: string;
            images: { edges: { node: { url: string; altText?: string } }[] };
            variants: {
              edges: {
                node: {
                  id: string;
                  title: string;
                  availableForSale: boolean;
                  price: { amount: string; currencyCode: string };
                };
              }[];
            };
          };
        }[];
      };
    }>({ query, variables: { first } });

    return data.products.edges.map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      description: edge.node.description,
      images: edge.node.images.edges.map(img => img.node),
      variants: edge.node.variants.edges.map(v => v.node),
    }));
  } catch (error) {
    console.warn('Could not fetch Shopify products (store might have no products yet):', error);
    return [];
  }
}

/**
 * Create a Shopify Cart with lines and return the direct Checkout URL.
 * If no real variant IDs exist in Shopify yet, provides a fallback to store checkout.
 */
export async function createShopifyCheckout(
  lines: { merchandiseId: string; quantity: number; attributes?: { key: string; value: string }[] }[]
): Promise<string> {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      cartCreate: {
        cart: { id: string; checkoutUrl: string } | null;
        userErrors: { code: string; field: string[]; message: string }[];
      };
    }>({
      query: mutation,
      variables: {
        input: {
          lines: lines.map(line => ({
            merchandiseId: line.merchandiseId,
            quantity: line.quantity,
            attributes: line.attributes || [],
          })),
        },
      },
    });

    if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
      throw new Error(data.cartCreate.userErrors.map(e => e.message).join(', '));
    }

    if (data.cartCreate.cart?.checkoutUrl) {
      return data.cartCreate.cart.checkoutUrl;
    }
  } catch (err) {
    console.warn('Shopify Cart creation fallback:', err);
  }

// Fallback to Shopify store URL if no live variants are registered yet
  return `https://${SHOPIFY_DOMAIN}/cart`;
}

/**
 * ============================================================================
 * SHOPIFY CUSTOMER ACCOUNT APIS (Storefront Customer Access Token)
 * ============================================================================
 */

export interface ShopifyCustomerAddress {
  id?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
}

export interface ShopifyCustomerOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: {
      node: {
        title: string;
        quantity: number;
        variant?: {
          image?: {
            url: string;
          };
          price?: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }[];
  };
}

export interface ShopifyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone?: string;
  defaultAddress?: ShopifyCustomerAddress;
  orders: {
    edges: {
      node: ShopifyCustomerOrder;
    }[];
  };
}

const CUSTOMER_TOKEN_STORAGE_KEY = 'hos_shopify_customer_token';
const CUSTOMER_INFO_STORAGE_KEY = 'hos_shopify_customer_data';

export function getStoredCustomerToken(): string | null {
  return localStorage.getItem(CUSTOMER_TOKEN_STORAGE_KEY);
}

export function getStoredCustomerData(): ShopifyCustomer | null {
  try {
    const raw = localStorage.getItem(CUSTOMER_INFO_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredCustomerToken(token: string, expiresAt?: string) {
  localStorage.setItem(CUSTOMER_TOKEN_STORAGE_KEY, token);
}

export function setStoredCustomerData(customer: ShopifyCustomer) {
  localStorage.setItem(CUSTOMER_INFO_STORAGE_KEY, JSON.stringify(customer));
}

export function clearStoredCustomerAuth() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(CUSTOMER_TOKEN_STORAGE_KEY);
      localStorage.removeItem(CUSTOMER_INFO_STORAGE_KEY);
      localStorage.removeItem('shopify_token');
      localStorage.removeItem('hos_customer_token');
      localStorage.removeItem('hos_customer_data');
      localStorage.removeItem('hos_customer_token_expiry');
      localStorage.removeItem('hos_user_email');
      localStorage.removeItem('hos_user_name');
      sessionStorage.removeItem('shopify_oauth_state');
      sessionStorage.removeItem('shopify_code_verifier');
      sessionStorage.removeItem('shopify_redirect_uri');

      // Clear client-accessible cookies
      const cookieNames = [
        'hos_customer_token',
        'hos_id_token',
        'hos_user_email',
        'hos_user_name',
        'hos_user_given_name',
        'hos_user_family_name',
        'hos_code_verifier',
        'hos_auth_state',
        'hos_pkce_state',
      ];
      cookieNames.forEach((name) => {
        document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        if (window.location.hostname) {
          document.cookie = `${name}=; path=/; domain=${window.location.hostname}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      });
    } catch (e) {
      console.warn('Storage cleanup notice:', e);
    }
  }
}

/**
 * Perform complete devotee sign-out:
 * 1. Wipe local client tokens & cookies
 * 2. Wipe server session cookies via /api/auth/logout
 * 3. Redirect to Shopify's logout endpoint to terminate shopify.com session
 */
export async function performFullDevoteeLogout(redirectUri?: string): Promise<void> {
  clearStoredCustomerAuth();
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      credentials: 'include',
    });
  } catch (err) {
    console.warn('Backend logout call completed with fallback:', err);
  }

  const targetReturn = redirectUri || (typeof window !== 'undefined' ? window.location.origin : 'https://houseofsanatana.vercel.app');
  const shopifyLogoutWithReturn = `${SHOPIFY_LOGOUT_URL}?return_url=${encodeURIComponent(targetReturn)}`;

  if (typeof window !== 'undefined') {
    window.location.href = shopifyLogoutWithReturn;
  }
}

/**
 * Customer Sign In (Creates Customer Access Token)
 */
export async function customerAccessTokenCreate(
  email: string,
  password: string
): Promise<{ accessToken: string; expiresAt: string }> {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null;
      customerUserErrors: { code: string; field: string[]; message: string }[];
    };
  }>({
    query,
    variables: {
      input: { email, password },
    },
  });

  const errors = data.customerAccessTokenCreate.customerUserErrors;
  if (errors && errors.length > 0) {
    throw new Error(errors.map(e => e.message).join(', '));
  }

  const tokenInfo = data.customerAccessTokenCreate.customerAccessToken;
  if (!tokenInfo) {
    throw new Error('Unable to sign in with provided credentials.');
  }

  setStoredCustomerToken(tokenInfo.accessToken, tokenInfo.expiresAt);
  return tokenInfo;
}

/**
 * Customer Sign Up (Create account in Shopify)
 */
export async function customerCreate(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<{ id: string; email: string }> {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    customerCreate: {
      customer: { id: string; email: string; firstName: string; lastName: string } | null;
      customerUserErrors: { code: string; field: string[]; message: string }[];
    };
  }>({
    query,
    variables: { input },
  });

  const errors = data.customerCreate.customerUserErrors;
  if (errors && errors.length > 0) {
    throw new Error(errors.map(e => e.message).join(', '));
  }

  if (!data.customerCreate.customer) {
    throw new Error('Failed to create customer account.');
  }

  return data.customerCreate.customer;
}

/**
 * Customer Password Recovery
 */
export async function customerRecover(email: string): Promise<boolean> {
  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    customerRecover: {
      customerUserErrors: { code: string; field: string[]; message: string }[];
    };
  }>({
    query,
    variables: { email },
  });

  const errors = data.customerRecover.customerUserErrors;
  if (errors && errors.length > 0) {
    throw new Error(errors.map(e => e.message).join(', '));
  }

  return true;
}

/**
 * Fetch Customer Profile & Orders using Customer Access Token
 */
export async function getCustomerDetails(customerAccessToken: string): Promise<ShopifyCustomer | null> {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        displayName
        email
        phone
        defaultAddress {
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice {
                amount
                currencyCode
              }
              lineItems(first: 5) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      price {
                        amount
                        currencyCode
                      }
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{
      customer: ShopifyCustomer | null;
    }>({
      query,
      variables: { customerAccessToken },
    });

    if (data.customer) {
      setStoredCustomerData(data.customer);
      return data.customer;
    }
  } catch (err) {
    console.warn('Storefront API customer lookup note:', err);
  }

  // Fallback to stored profile if decoded from OAuth JWT
  return getStoredCustomerData();
}

/**
 * ============================================================================
 * SHOPIFY NEW CUSTOMER ACCOUNT OAUTH 2.0 HELPERS (Authorization & Token)
 * ============================================================================
 */

function generateRandomString(length = 32): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Initiates Shopify OAuth flow by redirecting to the Authorization endpoint
 */
export async function redirectToShopifyAuthorize(redirectUri?: string): Promise<void> {
  const currentRedirectUri = redirectUri || (typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : 'https://houseofsanatana.vercel.app/auth/callback');
  const state = generateRandomString(16);
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  sessionStorage.setItem('shopify_oauth_state', state);
  sessionStorage.setItem('shopify_code_verifier', codeVerifier);
  sessionStorage.setItem('shopify_redirect_uri', currentRedirectUri);

  if (typeof document !== 'undefined') {
    document.cookie = `hos_code_verifier=${encodeURIComponent(codeVerifier)}; path=/; max-age=900; SameSite=Lax`;
    document.cookie = `hos_auth_state=${encodeURIComponent(state)}; path=/; max-age=900; SameSite=Lax`;
  }

  const authUrl = new URL(SHOPIFY_AUTH_URL);
  authUrl.searchParams.set('client_id', SHOPIFY_CUSTOMER_CLIENT_ID);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', currentRedirectUri);
  authUrl.searchParams.set('scope', 'openid email customer-account-api:full');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  window.location.href = authUrl.toString();
}

/**
 * Handles OAuth callback when redirected back with ?code=...
 */
export async function handleShopifyOAuthCallback(): Promise<boolean> {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');

  if (!code) return false;

  const savedState = sessionStorage.getItem('shopify_oauth_state');
  const codeVerifier = sessionStorage.getItem('shopify_code_verifier');
  const redirectUri = sessionStorage.getItem('shopify_redirect_uri') || window.location.origin + window.location.pathname;

  if (state && savedState && state !== savedState) {
    console.error('OAuth state mismatch error');
    return false;
  }

  try {
    const bodyParams = new URLSearchParams();
    bodyParams.set('grant_type', 'authorization_code');
    bodyParams.set('client_id', SHOPIFY_CUSTOMER_CLIENT_ID);
    bodyParams.set('redirect_uri', redirectUri);
    bodyParams.set('code', code);
    if (codeVerifier) {
      bodyParams.set('code_verifier', codeVerifier);
    }

    const res = await fetch(SHOPIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams.toString(),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error_description || `Token exchange failed: ${res.status}`);
    }

    const tokenData = await res.json();
    if (tokenData.access_token) {
      setStoredCustomerToken(
        tokenData.access_token, 
        tokenData.expires_in ? String(Date.now() + tokenData.expires_in * 1000) : undefined
      );

      // If id_token JWT exists, decode devotee info directly from Shopify
      if (tokenData.id_token) {
        try {
          const payloadBase64 = tokenData.id_token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
          const decoded = JSON.parse(decodeURIComponent(escape(atob(payloadBase64))));
          const devoteeProfile: ShopifyCustomer = {
            id: decoded.sub || 'shopify-customer',
            firstName: decoded.given_name || (decoded.name ? decoded.name.split(' ')[0] : 'Sacred'),
            lastName: decoded.family_name || (decoded.name ? decoded.name.split(' ').slice(1).join(' ') : 'Devotee'),
            displayName: decoded.name || decoded.email?.split('@')[0] || 'Devotee',
            email: decoded.email || '',
            phone: decoded.phone_number,
            orders: { edges: [] },
          };
          setStoredCustomerData(devoteeProfile);
        } catch (jwtErr) {
          console.warn('Could not decode id_token JWT:', jwtErr);
        }
      }

      // Clean up URL search params cleanly
      window.history.replaceState({}, document.title, window.location.pathname);
      return true;
    }
  } catch (err) {
    console.error('Failed to exchange Shopify OAuth code:', err);
  } finally {
    sessionStorage.removeItem('shopify_oauth_state');
    sessionStorage.removeItem('shopify_code_verifier');
    sessionStorage.removeItem('shopify_redirect_uri');
  }

  return false;
}


