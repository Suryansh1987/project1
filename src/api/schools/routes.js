import express from 'express';
import { addSchool, listSchools, getSchoolById } from './controller.js';
import { validateAddSchool, validateListSchools } from './validator.js';

const router = express.Router();


router.post('/schools', validateAddSchool, addSchool);


router.get('/schools', validateListSchools, listSchools);


router.get('/schools/:id', getSchoolById);

export default router;