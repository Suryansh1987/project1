import { db } from '../../db/index.js';
import { schools } from '../../db/schema.js';
import { sortSchoolsByProximity } from '../../utils/geoutils.js';
import { ApiError } from '../../middleware/errorhandler.js';
import { eq } from 'drizzle-orm';

/**
 * Add a new school
 * @route POST /api/schools
 */
export const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    
    // Insert the new school into the database
    const [result] = await db.insert(schools).values({
      name,
      address,
      latitude,
      longitude
    }).returning();
    
    res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all schools, optionally sorted by proximity
 * @route GET /api/schools
 */
export const listSchools = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    
    // Get all schools from the database
    const allSchools = await db.select().from(schools);
    
    // If latitude and longitude are provided, sort schools by proximity
    if (latitude && longitude) {
      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);
      
      // Sort schools by distance
      const sortedSchools = sortSchoolsByProximity(allSchools, userLat, userLon);
      
      return res.status(200).json({
        success: true,
        message: 'Schools retrieved and sorted by proximity',
        count: sortedSchools.length,
        data: sortedSchools
      });
    }
    
    // Return all schools unsorted
    res.status(200).json({
      success: true,
      message: 'Schools retrieved successfully',
      count: allSchools.length,
      data: allSchools
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a school by ID
 * @route GET /api/schools/:id
 */
export const getSchoolById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Get school by ID
    const school = await db.select().from(schools).where(eq(schools.id, id));
    
    if (school.length === 0) {
      return next(ApiError.notFound(`School with ID ${id} not found`));
    }
    
    res.status(200).json({
      success: true,
      data: school[0]
    });
  } catch (error) {
    next(error);
  }
};