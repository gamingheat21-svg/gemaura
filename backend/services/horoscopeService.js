const cache = require('../utils/cache');
const astrologyApi = require('./astrologyApiService');

const getDailyHoroscope = async (userId, zodiacSign, dob) => {
  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `horoscope_${zodiacSign}_${today}`;
  
  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return { ...cachedData, cached: true };
  }
  
  // If not in cache, fetch daily prediction from API
  const horoscopeData = await astrologyApi.getDailyPrediction(zodiacSign);
  
  // Save to cache (12 hours)
  cache.set(cacheKey, horoscopeData);
  
  return { ...horoscopeData, cached: false };
};

module.exports = { getDailyHoroscope };
