import { useState, useEffect, useCallback } from 'react';
import { redirectToShopifyAuthorize, getStoredCustomerData, setStoredCustomerData, clearStoredCustomerAuth, performFullDevoteeLogout } from '../lib/shopify';

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match && match[3] ? decodeURIComponent(match[3]) : null;
}

export function useCustomer() {
  const [customer, setCustomer] = useState<CustomerData | null>(() => {
    // 1. Check local storage
    const stored = getStoredCustomerData();
    if (stored && stored.email) {
      return {
        id: stored.id,
        displayName: stored.displayName || `${stored.firstName || ''} ${stored.lastName || ''}`.trim() || stored.email,
        firstName: stored.firstName,
        lastName: stored.lastName,
        emailAddress: { emailAddress: stored.email },
        phoneNumber: stored.phone ? { phoneNumber: stored.phone } : undefined,
        orders: { nodes: [] },
      };
    }

    // 2. Check client-side cookies set by OAuth callback
    const cookieEmail = getCookieValue('hos_user_email');
    const cookieName = getCookieValue('hos_user_name');
    const cookieGiven = getCookieValue('hos_user_given_name');
    const cookieFamily = getCookieValue('hos_user_family_name');

    if (cookieEmail) {
      return {
        id: 'shopify-oauth-devotee',
        displayName: cookieName || cookieGiven ? `${cookieGiven || ''} ${cookieFamily || ''}`.trim() : cookieEmail.split('@')[0],
        firstName: cookieGiven || '',
        lastName: cookieFamily || '',
        emailAddress: { emailAddress: cookieEmail },
        orders: { nodes: [] },
      };
    }

    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!(getStoredCustomerData()?.email || getCookieValue('hos_user_email'));
  });

  const fetchCustomer = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const localToken = typeof window !== 'undefined' ? localStorage.getItem('hos_customer_token') : null;
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      if (localToken) {
        headers['Authorization'] = `Bearer ${localToken}`;
      }

      const res = await fetch('/api/customer', {
        headers,
        credentials: 'include', // sends httpOnly hos_customer_token cookie
      });

      if (res.status === 401) {
        // Only clear if no client-side stored session exists
        const stored = getStoredCustomerData();
        const cookieEmail = getCookieValue('hos_user_email');
        if (!stored?.email && !cookieEmail) {
          setIsAuthenticated(false);
          setCustomer(null);
        }
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
        if (json.customer.emailAddress?.emailAddress) {
          setStoredCustomerData({
            id: json.customer.id || 'shopify-customer',
            email: json.customer.emailAddress.emailAddress,
            firstName: json.customer.firstName || '',
            lastName: json.customer.lastName || '',
            displayName: json.customer.displayName || `${json.customer.firstName || ''} ${json.customer.lastName || ''}`.trim() || json.customer.emailAddress.emailAddress,
            phone: json.customer.phoneNumber?.phoneNumber,
            orders: { edges: [] }
          });
        }
      }
    } catch (err: any) {
      console.warn('Customer fetch note:', err.message);
      setError(err.message);
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
    setCustomer(null);
    setIsAuthenticated(false);
    await performFullDevoteeLogout();
  };

  const login = () => {
    window.location.href = '/auth/login';
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
