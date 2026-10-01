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
      const token = localStorage.getItem('shopify_token');
      if (!token) {
        throw new Error('No authentication token found. Please sign in to access your sacred account.');
      }

      const res = await fetch('/api/customer', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || errorData?.error || `Failed to fetch customer data (${res.status})`);
      }

      const json = await res.json();
      const customerData = json?.data?.customer;

      if (!customerData) {
        throw new Error(json?.error || 'Customer data returned null.');
      }

      setCustomer(customerData);
      setIsAuthenticated(true);
      setError(null);
    } catch (err: any) {
      console.warn('useCustomer error:', err.message);
      setCustomer(null);
      setIsAuthenticated(false);
      setError(err.message || 'Failed to fetch customer data');
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
      localStorage.removeItem('shopify_token');
      localStorage.removeItem('hos_shopify_customer_token');
      localStorage.removeItem('hos_shopify_customer_data');
      await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      }).catch(() => null);
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
