import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

export default function AccountCallbackPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function processCallback() {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (!code) {
        setError('No authorization code found in URL');
        return;
      }

      const codeVerifier = sessionStorage.getItem('shopify_code_verifier');
      const savedState = sessionStorage.getItem('shopify_oauth_state');

      if (state && savedState && state !== savedState) {
        setError('Security state mismatch. Please try signing in again.');
        return;
      }

      if (!codeVerifier) {
        setError('Missing code verifier in session. Please try signing in again.');
        return;
      }

      try {
        const response = await fetch(
          'https://houseofsanatana-production.up.railway.app/api/customer/token',
          {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, codeVerifier }),
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Token exchange failed: ${errText}`);
        }

        // Clean up sessionStorage
        sessionStorage.removeItem('shopify_code_verifier');
        sessionStorage.removeItem('shopify_oauth_state');

        // After success, clean URL and navigate to /#orders
        window.location.href = '/#orders';
      } catch (err: any) {
        console.error('Callback error:', err);
        setError(err.message || 'Failed to authenticate');
      }
    }

    processCallback();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex flex-col items-center justify-center p-6 text-[#26201B] font-dm">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl border border-[#DECDB8] shadow-sm text-center">
        {error ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="font-cormorant text-2xl font-bold mb-2 text-[#58111A]">
              Authentication Error
            </h2>
            <p className="text-xs text-[#8F6E5B] mb-6 leading-relaxed">{error}</p>
            <a
              href="/#orders"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#58111A] text-white text-xs font-bold"
            >
              Return to Orders
            </a>
          </div>
        ) : (
          <div>
            <Loader2 className="w-10 h-10 text-[#C7833D] animate-spin mx-auto mb-4" />
            <h2 className="font-cormorant text-2xl font-bold mb-2">Authenticating Sadhaka...</h2>
            <p className="text-xs text-[#8F6E5B]">
              Completing secure login with Shopify. Redirecting to your orders...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export { AccountCallbackPage };
