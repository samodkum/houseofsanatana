import { Router, Request, Response } from 'express';
import { requireCustomerAuth } from '../middleware/session';

export const customerRouter = Router();

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

/**
 * GET /api/customer
 * Protected route that queries Shopify Customer Account API with customer's Bearer token.
 */
customerRouter.get('/', requireCustomerAuth, async (req: Request, res: Response) => {
  const rawToken = (req as any).customerAccessToken;
  const token = rawToken?.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;
  const shopId = process.env.SHOP_ID || '79445164163';
  const apiEndpoint = `https://shopify.com/${shopId}/account/customer/api/2024-07/graphql`;

  console.log('Token being sent:', token ? token.substring(0, 20) + '...' : '[NONE]');

  try {
    const shopifyRes = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token, // Must be exactly Bearer ${token}
      },
      body: JSON.stringify({
        query: CUSTOMER_DATA_QUERY,
      }),
    });

    if (!shopifyRes.ok) {
      const errText = await shopifyRes.text();
      console.error('Shopify Customer Account API Error:', shopifyRes.status, errText);
      res.status(shopifyRes.status).json({
        error: 'Shopify API Error',
        details: errText,
      });
      return;
    }

    const json = await shopifyRes.json() as any;
    console.log('API response:', json);

    if (json.errors && json.errors.length > 0) {
      console.error('Shopify GraphQL errors:', json.errors);
      res.status(400).json({ errors: json.errors });
      return;
    }

    res.json(json.data || {});
  } catch (err: any) {
    console.error('Network error fetching customer data from Shopify:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
});

/**
 * POST /api/customer/update
 * Protected route to update customer details (firstName, lastName, etc.)
 */
customerRouter.post('/update', requireCustomerAuth, async (req: Request, res: Response) => {
  const rawToken = (req as any).customerAccessToken;
  const token = rawToken?.startsWith('Bearer ') ? rawToken : `Bearer ${rawToken}`;
  const shopId = process.env.SHOP_ID || '79445164163';
  const apiEndpoint = `https://shopify.com/${shopId}/account/customer/api/2024-07/graphql`;

  const { firstName, lastName } = req.body;

  try {
    const shopifyRes = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        query: CUSTOMER_UPDATE_MUTATION,
        variables: {
          customer: {
            firstName,
            lastName,
          },
        },
      }),
    });

    if (!shopifyRes.ok) {
      const errText = await shopifyRes.text();
      res.status(shopifyRes.status).json({ error: errText });
      return;
    }

    const json = await shopifyRes.json() as any;
    res.json(json.data?.customerUpdate || json);
  } catch (err: any) {
    console.error('Error updating customer profile:', err);
    res.status(500).json({ error: err.message });
  }
});
