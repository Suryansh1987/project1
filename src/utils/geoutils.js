/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param {number} lat1 - Latitude of the first point
 * @param {number} lon1 - Longitude of the first point
 * @param {number} lat2 - Latitude of the second point
 * @param {number} lon2 - Longitude of the second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Earth's radius in kilometers
    const R = 6371;
    
    // Convert latitude and longitude from degrees to radians
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    
    // Haversine formula
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
  };
  
  /**
   * Convert degrees to radians
   * @param {number} degrees - Angle in degrees
   * @returns {number} Angle in radians
   */
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };
  
  /**
   * Sort schools by distance from a given location
   * @param {Array} schools - Array of school objects with latitude and longitude
   * @param {number} userLat - User's latitude
   * @param {number} userLon - User's longitude
   * @returns {Array} Sorted array of schools with distance added
   */
  export const sortSchoolsByProximity = (schools, userLat, userLon) => {
    // Add distance to each school
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        userLat, 
        userLon, 
        parseFloat(school.latitude), 
        parseFloat(school.longitude)
      );
      
      return {
        ...school,
        distance: parseFloat(distance.toFixed(2)) // Round to 2 decimal places
      };
    });
    
    // Sort by distance (ascending)
    return schoolsWithDistance.sort((a, b) => a.distance - b.distance);
  };