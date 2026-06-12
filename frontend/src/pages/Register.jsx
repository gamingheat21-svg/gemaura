import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getZodiacSign } from '../utils/zodiac';
import './Form.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    zodiac_sign: ''
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'dob') {
      setFormData(prev => ({ ...prev, zodiac_sign: getZodiacSign(e.target.value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="form-page container">
      <div className="form-card card" style={{ maxWidth: '600px' }}>
        <div className="form-header">
          <h2>Create Account</h2>
          <p>Join GemAura to get personalized astrological insights.</p>
        </div>
        
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} className="recommendation-form">
          <div className="form-grid">
            <div className="form-group">
              <label className="label">Full Name</label>
              <input type="text" name="name" className="input-field" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="label">Email Address</label>
              <input type="email" name="email" className="input-field" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="label">Password</label>
              <input type="password" name="password" className="input-field" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="label">Date of Birth</label>
              <input type="date" name="dob" className="input-field" onChange={handleChange} required />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
            Register
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
