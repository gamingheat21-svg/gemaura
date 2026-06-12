const axios = require('axios');

const API_KEY = process.env.ASTROLOGY_API_KEY;
const BASE_URL = 'https://json.astrologyapi.com/v1';

const getDailyPrediction = async (zodiacSign) => {
  if (!API_KEY) {
    throw new Error("Missing ASTROLOGY_API_KEY in environment variables.");
  }
  
  if (!zodiacSign) {
    zodiacSign = 'aries'; // default fallback
  }

  try {
    const response = await axios.post(`${BASE_URL}/sun_sign_prediction/daily/${zodiacSign.toLowerCase()}`, {}, {
      headers: {
        'x-astrologyapi-key': API_KEY,
        'Content-Type': 'application/json'
      },
      timeout: 5000 // 5-second timeout to avoid long waits
    });
    return response.data;
  } catch (error) {
    console.error('AstrologyAPI Error or Timeout. Falling back to mock data.');
    // Return graceful mock fallback instead of crashing
    return {
      prediction: {
        personal_life: "The stars indicate a period of reflection. Take time to focus on your inner peace.",
        profession: "Your hard work is aligning with the cosmic energies. Stay patient and focused.",
        health: "Maintain a balanced routine to keep your energy levels steady.",
        travel: "A short journey might bring unexpected insights.",
        luck: "Your lucky colors are bright today. Trust your intuition.",
        emotions: "You may feel more connected to your surroundings. Embrace positivity."
      }
    };
  }
};

module.exports = { getDailyPrediction };
