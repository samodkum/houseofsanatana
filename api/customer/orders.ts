export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const SHOPIFY_SHOP_ID = process.env.SHOPIFY_SHOP_ID || '79445164163';
  const SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID =
    process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || 'e89e5f5a-bd59-4864-a90e-02521629e672';
  const SHOPIFY_CUSTOMER_API_VERSION = process.env.SHOPIFY_CUSTOMER_API_VERSION || '2024-07';
  const CUSTOMER_ACCOUNT_GRAPHQL_URL =
    process.env.SHOPIFY_CUSTOMER_API_URL ||
    `https://shopify.com/${SHOPIFY_SHOP_ID}/account/customer/api/${SHOPIFY_CUSTOMER_API_VERSION}/graphql`;

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

  try {
    const cookieHeader = req.headers?.cookie || '';
    const cookieMatch = cookieHeader.match(/(?:shopify_customer_token|customer_access_token)=([^;]+)/);
    const tokenFromCookie = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
    const tokenFromAuthHeader = req.headers?.authorization?.replace(/^Bearer\s+/i, '');

    const customerToken = tokenFromCookie || tokenFromAuthHeader;

    if (!customerToken) {
      return res.status(401).json({
        error: 'Unauthorized: No customer session token found. Please log in.',
        orders: [],
      });
    }

    const shopifyResponse = await fetch(CUSTOMER_ACCOUNT_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${customerToken}`,
      },
      body: JSON.stringify({
        query: GET_CUSTOMER_ORDERS_QUERY,
      }),
    });

    if (!shopifyResponse.ok) {
      const errText = await shopifyResponse.text();
      return res.status(shopifyResponse.status).json({
        error: `Shopify Customer API error: ${shopifyResponse.statusText}`,
        details: errText,
      });
    }

    const json = await shopifyResponse.json();

    if (json.errors && json.errors.length > 0) {
      return res.status(400).json({
        error: 'GraphQL error in Shopify response',
        details: json.errors,
      });
    }

    const orderNodes = json.data?.customer?.orders?.nodes || [];

    return res.status(200).json({
      orders: orderNodes,
      customer: {
        id: json.data?.customer?.id,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      error: 'Internal server error while fetching customer orders',
      message: error?.message,
    });
  }
}
