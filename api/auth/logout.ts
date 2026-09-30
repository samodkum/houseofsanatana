export default async function handler(req: any, res: any) {
  // Clear all auth cookies
  res.setHeader('Set-Cookie', [
    'hos_customer_token=; Path=/; Max-Age=0',
    'hos_id_token=; Path=/; Max-Age=0',
    'hos_code_verifier=; Path=/; Max-Age=0',
    'hos_auth_state=; Path=/; Max-Age=0',
  ]);

  if (req.headers.accept?.includes('application/json')) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, message: 'Logged out successfully' }));
  } else {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
}
