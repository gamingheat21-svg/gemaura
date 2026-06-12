import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Settings, Users, Database, Star } from 'lucide-react';

const AdminPanel = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h2>
        <p className="text-muted">Manage platform data, users, and astrology configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center cursor-pointer hover:shadow-lg">
          <Star size={40} className="text-accent mx-auto mb-4" />
          <h3 className="text-xl mb-2">Zodiac Profiles</h3>
          <p className="text-sm text-muted">Edit personalities, advice, and lucky metrics.</p>
        </div>
        
        <div className="card text-center cursor-pointer hover:shadow-lg">
          <Database size={40} className="text-primary mx-auto mb-4" />
          <h3 className="text-xl mb-2">Gemstone DB</h3>
          <p className="text-sm text-muted">Manage gemstones and zodiac mappings.</p>
        </div>
        
        <div className="card text-center cursor-pointer hover:shadow-lg">
          <Users size={40} className="text-green-400 mx-auto mb-4" />
          <h3 className="text-xl mb-2">User Management</h3>
          <p className="text-sm text-muted">View and manage registered users.</p>
        </div>
        
        <div className="card text-center cursor-pointer hover:shadow-lg">
          <Settings size={40} className="text-muted mx-auto mb-4" />
          <h3 className="text-xl mb-2">System Settings</h3>
          <p className="text-sm text-muted">Manage cache and API keys.</p>
        </div>
      </div>
      
      <div className="card mt-8">
        <h3 className="mb-4">System Overview</h3>
        <p className="text-muted">Database: MySQL<br/>Cache: Node-Cache (In-Memory)<br/>External API: AstrologyAPI (Western Horoscope)</p>
      </div>
    </div>
  );
};

export default AdminPanel;
