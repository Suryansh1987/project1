export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;  
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  
  export const sortSchoolsByProximity = (schools, userLat, userLon) => {
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        userLat, 
        userLon, 
        parseFloat(school.latitude), 
        parseFloat(school.longitude)
      );
      return { ...school, distance: parseFloat(distance.toFixed(2)) };
    });
    
    return schoolsWithDistance.sort((a, b) => a.distance - b.distance);
  };
  