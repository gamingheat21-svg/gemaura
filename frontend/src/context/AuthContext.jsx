import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'https://gemaura-pidc.onrender.com/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchProfile();
      // Silently pre-warm the horoscope cache in the background
      import('../services/api').then(({ getHoroscope }) => {
        getHoroscope(token).catch(() => {});
      });
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/profile`);
      setUser(res.data);
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/users/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data);
  };

  const register = async (userData) => {
    const res = await axios.post(`${API_URL}/users/register`, userData);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, theme, toggleTheme, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
