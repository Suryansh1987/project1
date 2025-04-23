
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Check if we have a specific status code
  const statusCode = err.statusCode || 500;
  
  // Prepare the error response
  const errorResponse = {
    success: false,
    message: err.message || 'Internal Server Error',
    // Include stack trace in development environment
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Send the error response
  res.status(statusCode).json(errorResponse);
};

/**
 * Custom error class with status code
 */
export class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request') {
    return new ApiError(message, 400);
  }

  static notFound(message = 'Resource Not Found') {
    return new ApiError(message, 404);
  }

  static internal(message = 'Internal Server Error') {
    return new ApiError(message, 500);
  }
}