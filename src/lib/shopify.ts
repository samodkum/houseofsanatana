export { HOS_LOGO_URL } from './constants';
export const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN || 'houseofsanatana.myshopify.com';
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'd302d09f71a616811b082748dddf5421';
export const SHOPIFY_API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01';
export const SHOPIFY_ACCOUNT_URL = '/account';

export const openShopifyAccount = () => {
  if (typeof window !== 'undefined') {
    if (window.location.pathname === '/account' || window.location.hash === '#account') {
      return;
    }
    window.location.href = '/account';
  }
};

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
  vendor?: string;
  productType?: string;
  tags?: string[];
  availableForSale?: boolean;
  images: { url: string; altText?: string }[];
  priceRange?: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  compareAtPriceRange?: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  variants: {
    id: string;
    title: string;
    sku?: string | null;
    price: { amount: string; currencyCode: string };
    compareAtPrice?: { amount: string; currencyCode: string } | null;
    availableForSale: boolean;
    quantityAvailable?: number | null;
    selectedOptions?: { name: string; value: string }[];
    image?: { url: string; altText?: string } | null;
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
 * Fetch products from Shopify Storefront API with complete inventory & attributes
 */
export async function getShopifyProducts(first = 50): Promise<ShopifyProduct[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            vendor
            productType
            tags
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 20) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                    altText
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
            descriptionHtml?: string;
            vendor?: string;
            productType?: string;
            tags?: string[];
            availableForSale?: boolean;
            priceRange?: {
              minVariantPrice: { amount: string; currencyCode: string };
              maxVariantPrice: { amount: string; currencyCode: string };
            };
            compareAtPriceRange?: {
              minVariantPrice: { amount: string; currencyCode: string };
              maxVariantPrice: { amount: string; currencyCode: string };
            };
            images: { edges: { node: { url: string; altText?: string } }[] };
            variants: {
              edges: {
                node: {
                  id: string;
                  title: string;
                  sku?: string | null;
                  availableForSale: boolean;
                  price: { amount: string; currencyCode: string };
                  compareAtPrice?: { amount: string; currencyCode: string } | null;
                  selectedOptions?: { name: string; value: string }[];
                  image?: { url: string; altText?: string } | null;
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
      descriptionHtml: edge.node.descriptionHtml,
      vendor: edge.node.vendor,
      productType: edge.node.productType,
      tags: edge.node.tags || [],
      availableForSale: edge.node.availableForSale,
      priceRange: edge.node.priceRange,
      compareAtPriceRange: edge.node.compareAtPriceRange,
      images: edge.node.images.edges.map(img => img.node),
      variants: edge.node.variants.edges.map(v => v.node),
    }));
  } catch (error) {
    console.warn('Could not fetch Shopify products (store might have no products yet):', error);
    return [];
  }
}

/**
 * Fetch bags and potlis specifically from Shopify Storefront API with complete inventory & attributes
 */
export async function getShopifyPotlis(first = 50): Promise<ShopifyProduct[]> {
  const query = `
    query GetPotlis($first: Int!) {
      products(first: $first, query: "title:potli* OR title:bag* OR product_type:potli* OR tag:potli*") {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            vendor
            productType
            tags
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 20) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                    altText
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
            descriptionHtml?: string;
            vendor?: string;
            productType?: string;
            tags?: string[];
            availableForSale?: boolean;
            priceRange?: {
              minVariantPrice: { amount: string; currencyCode: string };
              maxVariantPrice: { amount: string; currencyCode: string };
            };
            compareAtPriceRange?: {
              minVariantPrice: { amount: string; currencyCode: string };
              maxVariantPrice: { amount: string; currencyCode: string };
            };
            images: { edges: { node: { url: string; altText?: string } }[] };
            variants: {
              edges: {
                node: {
                  id: string;
                  title: string;
                  sku?: string | null;
                  availableForSale: boolean;
                  price: { amount: string; currencyCode: string };
                  compareAtPrice?: { amount: string; currencyCode: string } | null;
                  selectedOptions?: { name: string; value: string }[];
                  image?: { url: string; altText?: string } | null;
                };
              }[];
            };
          };
        }[];
      };
    }>({ query, variables: { first } });

    let prods: ShopifyProduct[] = data.products.edges.map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      description: edge.node.description,
      descriptionHtml: edge.node.descriptionHtml,
      vendor: edge.node.vendor,
      productType: edge.node.productType,
      tags: edge.node.tags || [],
      availableForSale: edge.node.availableForSale,
      priceRange: edge.node.priceRange,
      compareAtPriceRange: edge.node.compareAtPriceRange,
      images: edge.node.images.edges.map(img => img.node),
      variants: edge.node.variants.edges.map(v => v.node),
    }));

    // If query filter is too narrow, fallback to all fetched products that contain potli or bag in title/handle
    if (prods.length === 0) {
      const allProds = await getShopifyProducts(first);
      prods = allProds.filter(p => {
        const t = p.title.toLowerCase();
        const h = p.handle.toLowerCase();
        return t.includes('potli') || t.includes('bag') || h.includes('potli') || h.includes('bag');
      });
    }

    return prods;
  } catch (error) {
    console.warn('Could not fetch Shopify potlis:', error);
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

export interface TravelBookingDetails {
  packageTitle: string;
  packageId: string;
  variantId?: string;
  departureDate: string;
  pilgrimCount: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  specialRequests?: string;
  pricePerPerson: number;
  circuit?: string;
}

/**
 * Creates a Shopify Cart for a Travel Package booking with all details 
 * stored as line item properties (and cart notes) before redirecting to checkout.
 */
export async function createTravelShopifyCheckout(booking: TravelBookingDetails): Promise<string> {
  const lineAttributes: { key: string; value: string }[] = [
    { key: 'Travel Package', value: booking.packageTitle },
    { key: 'Departure Date', value: booking.departureDate },
    { key: 'Total Pilgrims', value: `${booking.pilgrimCount} Devotee(s)` },
    { key: 'Lead Pilgrim Name', value: booking.contactName },
    { key: 'Contact Phone / WhatsApp', value: booking.contactPhone },
    { key: 'Contact Email', value: booking.contactEmail },
  ];

  if (booking.circuit) {
    lineAttributes.push({ key: 'Circuit', value: booking.circuit });
  }

  if (booking.specialRequests?.trim()) {
    lineAttributes.push({ key: 'Special Inquiries / Senior Care', value: booking.specialRequests.trim() });
  }

  // Cart-level custom attributes
  const cartAttributes: { key: string; value: string }[] = [
    { key: 'Booking Type', value: 'Spiritual Yatra Expedition' },
    { key: 'Lead Contact', value: `${booking.contactName} (${booking.contactPhone})` },
    { key: 'Travel Date', value: booking.departureDate },
  ];

  const note = `[YATRA BOOKING] Package: ${booking.packageTitle} | Date: ${booking.departureDate} | Pilgrims: ${booking.pilgrimCount} | Contact: ${booking.contactName} - ${booking.contactPhone} (${booking.contactEmail})${booking.specialRequests ? ` | Special Requests: ${booking.specialRequests}` : ''}`;

  // Use package variant ID if defined, or fallback to default store variant so Storefront Checkout creates successfully
  const targetVariantId =
    booking.variantId && booking.variantId.startsWith('gid://shopify/ProductVariant/')
      ? booking.variantId
      : 'gid://shopify/ProductVariant/68204532072579';

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
          lines: [
            {
              merchandiseId: targetVariantId,
              quantity: Math.max(1, booking.pilgrimCount || 1),
              attributes: lineAttributes,
            },
          ],
          attributes: cartAttributes,
          note,
        },
      },
    });

    if (data.cartCreate.cart?.checkoutUrl) {
      return data.cartCreate.cart.checkoutUrl;
    }
  } catch (err) {
    console.warn('Shopify Cart creation with variant failed, using direct cart permalink:', err);
  }

  // Fallback to Shopify cart permalink / direct cart URL with note
  const encodedNote = encodeURIComponent(note);
  return `https://${SHOPIFY_DOMAIN}/cart?note=${encodedNote}`;
}

