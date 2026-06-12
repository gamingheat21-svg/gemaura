import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getZodiacProfile = async (sign) => {
  const res = await axios.get(`${API_URL}/zodiac/${sign}`);
  return res.data;
};

export const getHoroscope = async (token) => {
  const res = await axios.get(`${API_URL}/horoscope/daily`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getCompatibility = async (sign1, sign2) => {
  const res = await axios.get(`${API_URL}/compatibility?sign1=${sign1}&sign2=${sign2}`);
  return res.data;
};
