export default async function handler(req: any, res: any) {
  // Clear all auth and identity cookies
  const expiredCookies = [
    'hos_customer_token=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'hos_id_token=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'hos_code_verifier=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'hos_auth_state=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'hos_user_email=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'hos_user_name=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'hos_user_given_name=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'hos_user_family_name=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'hos_pkce_state=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
  ];
  res.setHeader('Set-Cookie', expiredCookies);

  const shopId = process.env.SHOP_ID || '79445164163';
  const frontendUrl = (process.env.FRONTEND_URL || 'https://houseofsanatana.vercel.app').replace(/\/$/, '');
  const shopifyLogoutUrl = `https://shopify.com/${shopId}/account/logout?return_url=${encodeURIComponent(frontendUrl)}`;

  if (req.headers.accept?.includes('application/json') || req.method === 'POST') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, message: 'Logged out successfully', shopifyLogoutUrl }));
  } else {
    res.writeHead(302, { Location: shopifyLogoutUrl });
    res.end();
  }
}
