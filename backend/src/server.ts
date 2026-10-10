import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import customerRoutes from './routes/customerOrder';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'https://houseofsanatana.vercel.app',
      'https://houseofsanatana.vercel.app',
      'http://localhost:3000',
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/', (_req, res) => {
  res.json({ status: 'Backend is live ✅' });
});

// Customer routes
app.use('/api/customer', customerRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export default app;
