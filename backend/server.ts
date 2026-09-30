import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { authRouter } from './routes/auth';
import { customerRouter } from './routes/customer';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging for dev & debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/auth', authRouter);
app.use('/api/customer', customerRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'House of Sanatana',
    timestamp: new Date().toISOString(),
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(` 🕉️  House of Sanatana Backend Proxy`);
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` Login route:    http://localhost:${PORT}/auth/login`);
    console.log(` Callback route: http://localhost:${PORT}/auth/callback`);
    console.log(` Customer API:   http://localhost:${PORT}/api/customer`);
    console.log(`=========================================`);
  });
}

export default app;
