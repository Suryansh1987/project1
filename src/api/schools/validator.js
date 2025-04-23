import { body, query, validationResult } from 'express-validator';
import { ApiError } from '../../middleware/errorhandler.js';


export const validateAddSchool = [
  body('name')
    .trim()
    .notEmpty().withMessage('School name is required')
    .isLength({ max: 100 }).withMessage('School name cannot exceed 100 characters'),
  
  body('address')
    .trim()
    .notEmpty().withMessage('School address is required')
    .isLength({ max: 255 }).withMessage('School address cannot exceed 255 characters'),
  
  body('latitude')
    .notEmpty().withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  
  body('longitude')
    .notEmpty().withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
  

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return next(ApiError.badRequest(errorMessages.join(', ')));
    }
    next();
  }
];


export const validateListSchools = [
  query('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  
  query('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
  
 
  (req, res, next) => {
    const { latitude, longitude } = req.query;
    
    if ((latitude && !longitude) || (!latitude && longitude)) {
      return next(ApiError.badRequest('Both latitude and longitude must be provided together'));
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return next(ApiError.badRequest(errorMessages.join(', ')));
    }
    
    next();
  }
];