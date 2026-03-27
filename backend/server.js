import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // Parsing JSON body
app.use(cors()); // Enable CORS

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Base route for testing
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the TrackMint API',
  });
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to Database, then start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
};

startServer();
