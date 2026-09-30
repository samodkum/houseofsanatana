import { useState, useEffect, useCallback } from 'react';
import { redirectToShopifyAuthorize } from '../lib/shopify';

export interface CustomerOrderNode {
  id: string;
  name: string;
  processedAt: string;
  financialStatus?: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  fulfillments: Array<{
    displayStatus?: string;
  }>;
  lineItems?: {
    nodes: Array<{
      title: string;
      quantity: number;
    }>;
  };
}

export interface CustomerData {
  id?: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: {
    emailAddress: string;
  };
  phoneNumber?: {
    phoneNumber: string;
  };
  orders?: {
    nodes: CustomerOrderNode[];
  };
}

export function useCustomer() {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchCustomer = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/customer', {
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include', // sends httpOnly hos_customer_token cookie
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        setCustomer(null);
        setIsLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to load customer details (${res.status})`);
      }

      const json = await res.json();
      if (json.customer) {
        setCustomer(json.customer);
        setIsAuthenticated(true);
      } else {
        setCustomer(null);
        setIsAuthenticated(false);
      }
    } catch (err: any) {
      console.warn('Customer fetch error or unauthenticated:', err.message);
      setError(err.message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const updateProfile = async (firstName: string, lastName: string) => {
    try {
      const res = await fetch('/api/customer/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ firstName, lastName }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      // Re-fetch customer to reflect updated profile
      await fetchCustomer();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setCustomer(null);
      setIsAuthenticated(false);
      window.location.href = '/';
    }
  };

  const login = () => {
    redirectToShopifyAuthorize();
  };

  return {
    customer,
    isLoading,
    error,
    isAuthenticated,
    refetch: fetchCustomer,
    updateProfile,
    logout,
    login,
  };
}
