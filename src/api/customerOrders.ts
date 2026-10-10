/**
 * GraphQL Query for fetching customer orders from Shopify Customer Account API
 * (or Storefront API / Customer Account GraphQL endpoint)
 */
export const GET_CUSTOMER_ORDERS = `
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

export interface CustomerOrderLineItem {
  title: string;
  quantity: number;
  image?: {
    url: string;
    altText?: string;
  };
  variant?: {
    title?: string;
    price?: {
      amount: string;
      currencyCode: string;
    };
    product?: {
      productType?: string;
      tags?: string[];
    };
  };
}

export interface CustomerOrder {
  id: string;
  name: string;
  processedAt: string;
  financialStatus?: string;
  fulfillmentStatus?: string;
  tags: string[];
  lineItems: {
    nodes: CustomerOrderLineItem[];
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
}

export interface CustomerOrdersResponse {
  orders: CustomerOrder[];
  customer?: {
    id?: string;
    displayName?: string;
    email?: string;
  };
  error?: string;
}
