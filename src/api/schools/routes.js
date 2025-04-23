import express from 'express';
import { addSchool, listSchools, getSchoolById } from './controller.js';
import { validateAddSchool, validateListSchools } from './validator.js';

const router = express.Router();

// Route to add a new school
router.post('/schools', validateAddSchool, addSchool);

// Route to get all schools with optional proximity sorting
router.get('/schools', validateListSchools, listSchools);

// Route to get a single school by ID
router.get('/schools/:id', getSchoolById);

export default router;