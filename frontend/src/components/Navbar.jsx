import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Diamond } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, theme, toggleTheme, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Diamond className="logo-icon" />
          <span className="logo-text">GemAura</span>
        </Link>
        <div className="navbar-links">
          <Link to="/catalog">Catalog</Link>
          <Link to="/recommendation" className="btn btn-primary btn-sm">Get Recommendation</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout} className="btn-link">Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
