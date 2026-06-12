import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { User, Clock, Bookmark, Calendar } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://gemaura-pidc.onrender.com/api';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      fetchHistory();
    }
  }, [user, token]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/recommendations/history/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard-page container">
      <div className="dashboard-header">
        <h2>My Profile</h2>
      </div>

      <div className="dashboard-grid">
        <div className="profile-card card">
          <div className="profile-avatar">
            <User size={48} className="text-accent" />
          </div>
          <h3>{user.name}</h3>
          <p className="user-email">{user.email}</p>
          
          <div className="user-details">
            <div className="detail-item">
              <Calendar size={18} className="detail-icon" />
              <span>{new Date(user.dob).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <span className="zodiac-badge">{user.zodiac_sign}</span>
            </div>
          </div>
        </div>

        <div className="history-section card">
          <div className="section-header">
            <h3><Clock size={20} /> Recommendation History</h3>
          </div>
          
          {loading ? (
            <p>Loading history...</p>
          ) : history.length === 0 ? (
            <div className="empty-state">
              <Bookmark size={48} className="text-muted" />
              <p>You haven't saved any recommendations yet.</p>
            </div>
          ) : (
            <div className="history-timeline">
              {history.map((item) => (
                <div key={item.rec_id} className="history-item">
                  <div className="history-date">
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                  <div className="history-content">
                    <div className="history-gem-initial">{item.name.charAt(0)}</div>
                    <div>
                      <h4>{item.name}</h4>
                      <p>For {item.zodiac_sign}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
