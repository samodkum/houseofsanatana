import express from 'express';
import dotenv from 'dotenv';
import { customerOrdersRouter } from './routes/customerOrders';

dotenv.config();

export const app = express();

app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount customer routes
app.use('/api/customer', customerOrdersRouter);

export default app;
