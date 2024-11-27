// Import necessary modules
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Import route handlers
import MemberRouter from './controller/Member';
import BookRouter from './controller/Book';
import LoanRouter from './controller/Loan';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Base paths for different routes
app.use('/member', MemberRouter); // Member-related endpoints
app.use('/book', BookRouter);     // Book-related endpoints
app.use('/loan', LoanRouter);     // Loan-related endpoints

// Global error handler to catch unhandled errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled Error:', err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Define the port to listen on
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.info(`Backend server is running on http://localhost:${port}/`);
});
