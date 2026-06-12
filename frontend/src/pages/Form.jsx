import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getZodiacSign } from '../utils/zodiac';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://gemaura-pidc.onrender.com/api';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    zodiac: '',
    gender: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.dob) {
      const calculatedZodiac = getZodiacSign(formData.dob);
      setFormData(prev => ({ ...prev, zodiac: calculatedZodiac }));
    }
  }, [formData.dob]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/recommendations/${formData.zodiac}`);
      navigate('/result', { state: { recommendation: res.data, userDetails: formData } });
    } catch (error) {
      console.error(error);
      alert('Could not fetch recommendation. Please ensure the backend is running and the database is seeded.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', dob: '', zodiac: '', gender: '' });
  };

  return (
    <div className="form-page container">
      <div className="form-card card">
        <div className="form-header">
          <h2>Find Your Gemstone</h2>
          <p>Enter your details below to discover the gemstone that aligns with your astrological energy.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="recommendation-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="label">Full Name</label>
              <input 
                type="text" 
                name="name" 
                className="input-field" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Aryan"
              />
            </div>
            
            <div className="form-group">
              <label className="label">Date of Birth</label>
              <input 
                type="date" 
                name="dob" 
                className="input-field" 
                value={formData.dob} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="label">Zodiac Sign</label>
              <select 
                name="zodiac" 
                className="input-field" 
                value={formData.zodiac} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Zodiac (or calculated)</option>
                <option value="Aries">Aries</option>
                <option value="Taurus">Taurus</option>
                <option value="Gemini">Gemini</option>
                <option value="Cancer">Cancer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Sagittarius">Sagittarius</option>
                <option value="Capricorn">Capricorn</option>
                <option value="Aquarius">Aquarius</option>
                <option value="Pisces">Pisces</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="label">Gender (Optional)</label>
              <select 
                name="gender" 
                className="input-field" 
                value={formData.gender} 
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={handleReset} className="btn btn-outline">
              Reset
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading || !formData.zodiac}>
              {loading ? 'Discovering...' : 'Get Recommendation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
