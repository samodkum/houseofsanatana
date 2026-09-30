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
  const token = getCookie(cookieHeader, 'hos_customer_token') || req.headers.authorization?.replace(/^Bearer\s+/i, '');

  if (!token) {
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
          'Authorization': token,
        },
        body: JSON.stringify({
          query: CUSTOMER_UPDATE_MUTATION,
          variables: {
            customer: { firstName, lastName },
          },
        }),
      });

      const json = await shopifyRes.json() as any;
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
        'Authorization': token,
      },
      body: JSON.stringify({
        query: CUSTOMER_DATA_QUERY,
      }),
    });

    const json = await shopifyRes.json() as any;
    res.statusCode = shopifyRes.status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(json.data || json));
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
  }
}
