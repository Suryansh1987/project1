import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import schoolRoutes from './api/schools/routes.js';
import { errorHandler } from './middleware/errorhandler.js';
import { testConnection } from './db/index.js';


const app = express();


app.use(cors());
app.use(express.json());


testConnection();


app.use('/api', schoolRoutes);


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


app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});