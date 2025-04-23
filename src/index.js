import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import schoolRoutes from './api/schools/routes.js';
import { errorHandler } from './middleware/errorhandler.js';
import { testConnection } from './db/index.js';

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
testConnection();

// Routes
app.use('/api', schoolRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to School Management API',
    version: '1.0.0',
    endpoints: {
      addSchool: 'POST /api/schools',
      listSchools: 'GET /api/schools',
      getSchoolById: 'GET /api/schools/:id'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});