import { Request, Response, NextFunction } from 'express';

// In-memory PKCE state session store (keyed by state or session ID)
interface OAuthSession {
  codeVerifier: string;
  state: string;
  nonce?: string;
  createdAt: number;
}

const oauthSessions = new Map<string, OAuthSession>();

// Cleanup stale sessions older than 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, session] of oauthSessions.entries()) {
    if (now - session.createdAt > 15 * 60 * 1000) {
      oauthSessions.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function saveOAuthSession(state: string, data: Omit<OAuthSession, 'createdAt'>) {
  oauthSessions.set(state, {
    ...data,
    createdAt: Date.now(),
  });
}

export function getOAuthSession(state: string): OAuthSession | undefined {
  const session = oauthSessions.get(state);
  if (session) {
    oauthSessions.delete(state); // One-time use for security
  }
  return session;
}

// Simple cookie parser utility
export function parseCookies(req: Request): Record<string, string> {
  const list: Record<string, string> = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const name = parts[0]?.trim();
    if (name) {
      const val = parts.slice(1).join('=').trim();
      try {
        list[name] = decodeURIComponent(val);
      } catch {
        list[name] = val;
      }
    }
  });

  return list;
}

// Auth validation middleware
export function requireCustomerAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization?.replace(/^Bearer\s+/i, '')?.trim();
  const cookies = parseCookies(req);

  console.log('Incoming Authorization Header:', req.headers.authorization ? `${req.headers.authorization.substring(0, 15)}...` : '[NONE]');
  console.log('Incoming Cookies in requireCustomerAuth:', cookies);

  const token = authHeader || cookies['hos_customer_token'] || cookies['shopify_token'] || cookies['token'] || (req.query?.token as string);

  if (!token) {
    console.log('requireCustomerAuth: No token found. Returning 401.');
    res.status(401).json({
      error: 'Unauthorized',
      message: 'No active sacred customer session found. Please log in.',
    });
    return;
  }

  // Attach token to request
  (req as any).customerAccessToken = token;
  next();
}
