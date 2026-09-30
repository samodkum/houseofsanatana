const CUSTOMER_DATA_QUERY = `
query CustomerData {
  customer {
    id
    displayName
    firstName
    lastName
    emailAddress { 
      emailAddress 
    }
    phoneNumber {
      phoneNumber
    }
    orders(first: 10) {
      nodes {
        id
        name
        processedAt
        financialStatus
        totalPrice { 
          amount 
          currencyCode 
        }
        fulfillments { 
          displayStatus 
        }
        lineItems(first: 5) {
          nodes {
            title
            quantity
          }
        }
      }
    }
  }
}
`;

const CUSTOMER_UPDATE_MUTATION = `
mutation customerUpdate($customer: CustomerUpdateInput!) {
  customerUpdate(input: $customer) {
    customer {
      id
      displayName
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

function getCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match && match[3] ? decodeURIComponent(match[3]) : null;
}

export default async function handler(req: any, res: any) {
  // CORS & Methods
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  const cookieHeader = req.headers.cookie || '';
  const token = getCookie(cookieHeader, 'hos_customer_token') || getCookie(cookieHeader, 'token') || req.headers.authorization?.replace(/^Bearer\s+/i, '');

  const userEmail = getCookie(cookieHeader, 'hos_user_email');
  const userName = getCookie(cookieHeader, 'hos_user_name');
  const userGiven = getCookie(cookieHeader, 'hos_user_given_name');
  const userFamily = getCookie(cookieHeader, 'hos_user_family_name');

  if (!token) {
    if (userEmail) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        customer: {
          id: 'shopify-oauth-devotee',
          displayName: userName || `${userGiven || ''} ${userFamily || ''}`.trim() || userEmail.split('@')[0],
          firstName: userGiven || '',
          lastName: userFamily || '',
          emailAddress: { emailAddress: userEmail },
          orders: { nodes: [] }
        }
      }));
      return;
    }

    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Unauthorized',
      message: 'No active sacred customer session found. Please log in.',
    }));
    return;
  }

  const shopId = process.env.SHOP_ID || '79445164163';
  const apiEndpoint = `https://shopify.com/${shopId}/account/customer/api/2024-07/graphql`;
  const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

  console.log('Token being sent:', authHeader.substring(0, 20) + '...');

  if (req.method === 'POST') {
    // Handle profile update
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch {}
      }

      const { firstName, lastName } = body || {};

      const shopifyRes = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify({
          query: CUSTOMER_UPDATE_MUTATION,
          variables: {
            customer: { firstName, lastName },
          },
        }),
      });

      const json = await shopifyRes.json() as any;
      console.log('Profile update API response status:', shopifyRes.status, json);
      res.statusCode = shopifyRes.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(json.data?.customerUpdate || json));
    } catch (err: any) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Default: GET Customer Data
  try {
    const shopifyRes = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        query: CUSTOMER_DATA_QUERY,
      }),
    });

    const json = await shopifyRes.json() as any;
    console.log('API response status:', shopifyRes.status, 'data:', json);

    if (!shopifyRes.ok) {
      console.error('Shopify Customer Account API Error:', shopifyRes.status, json);
      // Graceful fallback if user has email cookie
      if (userEmail) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          customer: {
            id: 'shopify-customer',
            displayName: userName || `${userGiven || ''} ${userFamily || ''}`.trim() || userEmail.split('@')[0],
            firstName: userGiven || '',
            lastName: userFamily || '',
            emailAddress: { emailAddress: userEmail },
            orders: { nodes: [] }
          }
        }));
        return;
      }
      res.statusCode = shopifyRes.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Shopify API Error', details: json }));
      return;
    }

    res.statusCode = shopifyRes.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(json.data || json));
  } catch (err: any) {
    console.error('Fetch customer error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
  }
}
