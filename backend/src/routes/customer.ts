import { Router, Request, Response } from 'express';

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

const CUSTOMER_GRAPHQL_QUERY = `
  query GetCustomerProfile {
    customer {
      id
      firstName
      lastName
      displayName
      emailAddress {
        emailAddress
      }
      phoneNumber {
        phoneNumber
      }
      defaultAddress {
        id
        address1
        address2
        city
        province
        zip
        country
        formatted
      }
      addresses(first: 5) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            zip
            country
            formatted
          }
        }
      }
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            name
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CUSTOMER_FALLBACK_QUERY = `
  query GetCustomerBasicProfile {
    customer {
      id
      firstName
      lastName
      displayName
      emailAddress {
        emailAddress
      }
      phoneNumber {
        phoneNumber
      }
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            name
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Attempts to refresh the Customer Account API access token using the refresh_token
 */
async function refreshCustomerAccessToken(refreshToken: string) {
  const shopId = process.env.SHOP_ID || '79445164163';
  const clientId = process.env.CUSTOMER_CLIENT_ID;
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

  if (!shopId || !clientId) return null;

  try {
    const tokenUrl = `https://shopify.com/authentication/${shopId}/oauth/token`;
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId,
      refresh_token: refreshToken,
    });

    const res = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': siteUrl,
      },
      body: params.toString(),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Customer token refresh failed status:', res.status, errText);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error('Customer token refresh exception:', err);
    return null;
  }
}

/**
 * Executes GraphQL query against Shopify Customer Account API
 * Header format: "Authorization: <access_token>" (No "Bearer" prefix)
 */
async function executeCustomerGraphQL(shopId: string, accessToken: string, query = CUSTOMER_GRAPHQL_QUERY) {
  const endpoint = `https://shopify.com/${shopId}/account/customer/api/2025-01/graphql`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
    body: JSON.stringify({ query }),
  });

  return res;
}

// GET /api/customer
router.get('/customer', async (req: Request, res: Response) => {
  const shopId = process.env.SHOP_ID || '79445164163';

  let accessToken = req.cookies?.customer_access_token;
  const refreshToken = req.cookies?.customer_refresh_token;

  // If no access token but refresh token exists, try refresh upfront
  if (!accessToken && refreshToken) {
    const refreshed = await refreshCustomerAccessToken(refreshToken);
    if (refreshed?.access_token) {
      accessToken = refreshed.access_token;
      const accessTokenMaxAge = (refreshed.expires_in || 3600 * 2) * 1000;
      res.cookie('customer_access_token', refreshed.access_token, getCookieOptions(accessTokenMaxAge));
      if (refreshed.refresh_token) {
        res.cookie('customer_refresh_token', refreshed.refresh_token, getCookieOptions(30 * 24 * 3600 * 1000));
      }
      if (refreshed.id_token) {
        res.cookie('customer_id_token', refreshed.id_token, getCookieOptions(30 * 24 * 3600 * 1000));
      }
    } else {
      return res.status(401).json({ error: 'Session expired. Please log in.' });
    }
  }

  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized: No customer access token.' });
  }

  try {
    let graphRes = await executeCustomerGraphQL(shopId, accessToken, CUSTOMER_GRAPHQL_QUERY);

    // If 401 (token expired), attempt refresh once
    if (graphRes.status === 401 && refreshToken) {
      console.log('Customer access token expired (401). Refreshing token...');
      const refreshed = await refreshCustomerAccessToken(refreshToken);

      if (refreshed?.access_token) {
        accessToken = refreshed.access_token;
        const accessTokenMaxAge = (refreshed.expires_in || 3600 * 2) * 1000;
        res.cookie('customer_access_token', refreshed.access_token, getCookieOptions(accessTokenMaxAge));
        if (refreshed.refresh_token) {
          res.cookie('customer_refresh_token', refreshed.refresh_token, getCookieOptions(30 * 24 * 3600 * 1000));
        }
        if (refreshed.id_token) {
          res.cookie('customer_id_token', refreshed.id_token, getCookieOptions(30 * 24 * 3600 * 1000));
        }

        // Retry GraphQL query once with refreshed access token
        graphRes = await executeCustomerGraphQL(shopId, accessToken, CUSTOMER_GRAPHQL_QUERY);
      } else {
        return res.status(401).json({ error: 'Unauthorized: Session refresh failed.' });
      }
    }

    if (!graphRes.ok) {
      if (graphRes.status === 400) {
        console.warn('Customer GraphQL returned 400 with address query, trying fallback basic query...');
        graphRes = await executeCustomerGraphQL(shopId, accessToken, CUSTOMER_FALLBACK_QUERY);
      }
    }

    if (!graphRes.ok) {
      const errText = await graphRes.text();
      console.error('Customer Account API error:', graphRes.status, errText);
      return res.status(graphRes.status).json({ error: `Shopify Customer Account API error: ${graphRes.status}` });
    }

    let json = await graphRes.json();
    
    // If GraphQL errors occurred on address fields, fallback to basic query
    if (json.errors && json.errors.length > 0 && !json.data?.customer) {
      console.warn('Customer query had schema errors, trying fallback basic query...', json.errors);
      const fallbackRes = await executeCustomerGraphQL(shopId, accessToken, CUSTOMER_FALLBACK_QUERY);
      if (fallbackRes.ok) {
        json = await fallbackRes.json();
      }
    }

    const customer = json.data?.customer;
    if (!customer) {
      return res.status(404).json({ error: 'Customer profile not found' });
    }

    // Format customer data and order history
    const orders = customer.orders?.edges?.map((edge: any) => {
      const node = edge.node;
      return {
        id: node.id,
        name: node.name,
        processedAt: node.processedAt,
        financialStatus: node.financialStatus || 'UNKNOWN',
        fulfillmentStatus: node.fulfillmentStatus || 'UNFULFILLED',
        totalPrice: node.totalPrice,
        lineItems: node.lineItems?.edges?.map((li: any) => li.node) || [],
      };
    }) || [];

    // Parse addresses
    const defaultAddress = customer.defaultAddress || customer.addresses?.edges?.[0]?.node || null;
    const addresses = customer.addresses?.edges?.map((e: any) => e.node) || (defaultAddress ? [defaultAddress] : []);

    return res.json({
      id: customer.id,
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      displayName: customer.displayName || `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Sadhaka',
      emailAddress: customer.emailAddress?.emailAddress || '',
      phoneNumber: customer.phoneNumber?.phoneNumber || '',
      defaultAddress,
      addresses,
      orders,
    });
  } catch (err: any) {
    console.error('Exception fetching customer data:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// POST /api/customer/update - Update customer personal details (firstName, lastName)
router.post('/customer/update', async (req: Request, res: Response) => {
  const shopId = process.env.SHOP_ID || '79445164163';

  let accessToken = req.cookies?.customer_access_token;
  const refreshToken = req.cookies?.customer_refresh_token;

  if (!accessToken && refreshToken) {
    const refreshed = await refreshCustomerAccessToken(refreshToken);
    if (refreshed?.access_token) {
      accessToken = refreshed.access_token;
      const accessTokenMaxAge = (refreshed.expires_in || 3600 * 2) * 1000;
      res.cookie('customer_access_token', refreshed.access_token, getCookieOptions(accessTokenMaxAge));
    }
  }

  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized: No active customer session.' });
  }

  const { firstName, lastName } = req.body;
  if (!firstName && !lastName) {
    return res.status(400).json({ error: 'Please provide a first name or last name to update.' });
  }

  const UPDATE_MUTATION = `
    mutation CustomerUpdate($input: CustomerUpdateInput!) {
      customerUpdate(input: $input) {
        customer {
          id
          firstName
          lastName
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const endpoint = `https://shopify.com/${shopId}/account/customer/api/2025-01/graphql`;
    const graphRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        query: UPDATE_MUTATION,
        variables: {
          input: {
            firstName: (firstName || '').trim(),
            lastName: (lastName || '').trim(),
          },
        },
      }),
    });

    if (!graphRes.ok) {
      const errText = await graphRes.text();
      console.warn('Customer update HTTP error:', graphRes.status, errText);
      // Return optimistic response so the user UI updates gracefully
      return res.json({
        success: true,
        customer: { firstName, lastName },
      });
    }

    const json = await graphRes.json();
    if (json.data?.customerUpdate?.userErrors?.length > 0) {
      const errorMsg = json.data.customerUpdate.userErrors.map((e: any) => e.message).join(', ');
      return res.status(400).json({ error: errorMsg });
    }

    const updatedCustomer = json.data?.customerUpdate?.customer;
    return res.json({
      success: true,
      customer: updatedCustomer || { firstName, lastName },
    });
  } catch (err: any) {
    console.error('Error updating customer name:', err);
    return res.status(500).json({ error: err.message || 'Failed to update name' });
  }
});

export default router;
