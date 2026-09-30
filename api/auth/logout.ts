export default async function handler(req: any, res: any) {
  const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
  const cookieOptions = `Path=/; Max-Age=0; SameSite=Lax${isProduction ? '; Secure' : ''}`;

  // Clear all auth and user profile cookies
  res.setHeader('Set-Cookie', [
    `hos_customer_token=; ${cookieOptions}; HttpOnly`,
    `hos_id_token=; ${cookieOptions}; HttpOnly`,
    `hos_code_verifier=; ${cookieOptions}; HttpOnly`,
    `hos_auth_state=; ${cookieOptions}; HttpOnly`,
    `hos_user_email=; ${cookieOptions}`,
    `hos_user_name=; ${cookieOptions}`,
    `hos_user_given_name=; ${cookieOptions}`,
    `hos_user_family_name=; ${cookieOptions}`,
  ]);

  const shopId = process.env.SHOP_ID || '79445164163';
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const redirectShopify = req.query?.shopify === 'true' || url.searchParams.get('shopify') === 'true';

  if (redirectShopify) {
    res.writeHead(302, { Location: `https://shopify.com/${shopId}/account/logout` });
    res.end();
    return;
  }

  if (req.headers.accept?.includes('application/json')) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, message: 'Logged out successfully' }));
  } else {
    res.writeHead(302, { Location: '/account' });
    res.end();
  }
}
