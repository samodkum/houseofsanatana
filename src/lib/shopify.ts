// Shopify Storefront API configuration and client
export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || 'houseofsanatana.myshopify.com';
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'd302d09f71a616811b082748dddf5421';
export const SHOPIFY_API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01';

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
