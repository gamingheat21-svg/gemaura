import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Form.css'; // Reusing Form CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="form-page container">
      <div className="form-card card" style={{ maxWidth: '500px' }}>
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p>Login to access your astrological profile and saved recommendations.</p>
        </div>
        
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} className="recommendation-form">
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="label">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p>Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
