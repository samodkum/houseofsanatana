import dotenv from 'dotenv';

// Load environment variables (.env)
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import authRouter from './routes/auth';
import customerRouter from './routes/customer';

declare global {
  namespace Express {
    interface Request {
      cookies?: Record<string, string>;
    }
  }
}

function parseCookies(header?: string): Record<string, string> {
  if (!header) return {};
  const cookies: Record<string, string> = {};
  header.split(';').forEach(item => {
    const [name, ...rest] = item.split('=');
    if (name) {
      cookies[name.trim()] = decodeURIComponent(rest.join('=').trim());
    }
  });
  return cookies;
}

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy (required for secure cookies behind ngrok or reverse proxies)
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lightweight, zero-dependency cookie-parser middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  req.cookies = parseCookies(req.headers.cookie);
  next();
});

// Mount /auth and /api routers BEFORE any SPA / catch-all handlers
app.use('/auth', authRouter);
app.use('/api', customerRouter);

// Basic health check route
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    shopIdConfigured: !!process.env.SHOP_ID,
    clientIdConfigured: !!process.env.CUSTOMER_CLIENT_ID,
    siteUrl: process.env.SITE_URL || 'not set',
  });
});

// 404 for unhandled API/Auth routes (do not swallow with SPA catch-all)
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/auth')) {
    return res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`  House of Sanatana Customer Account API Backend`);
  console.log(`  Server listening on http://localhost:${PORT}`);
  console.log(`  Shop ID: ${process.env.SHOP_ID || '(not set in .env)'}`);
  console.log(`  Site URL: ${process.env.SITE_URL || '(not set in .env)'}`);
  console.log(`==================================================\n`);
});

export default app;
