import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, RefreshCw } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { getZodiacProfile } from '../services/api';
import AnimatedTabs from '../components/ui/AnimatedTabs';
import { OverviewTab, PersonalityTab } from './ResultTabs/ProfileTabs';
import { GuidanceTab, CareerTab, RelationshipTab } from './ResultTabs/AdviceTabs';
import { HoroscopeTab, CompatibilityTab } from './ResultTabs/DynamicTabs';
import './Result.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://gemaura-pidc.onrender.com/api';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  
  const { recommendation, userDetails } = location.state || {};
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (recommendation?.zodiac_sign) {
      getZodiacProfile(recommendation.zodiac_sign).then(setProfile).catch(console.error);
    }
  }, [recommendation]);

  if (!recommendation) {
    return (
      <div className="container result-page">
        <div className="card text-center" style={{ padding: '4rem' }}>
          <h2>No recommendation data found.</h2>
          <button onClick={() => navigate('/recommendation')} className="btn btn-primary mt-4">
            Go to Form
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!user) return navigate('/login');
    try {
      await axios.post(`${API_URL}/recommendations/history`, 
        { 
          gemstone_id: recommendation.id,
          zodiac_sign: recommendation.zodiac_sign,
          profile: profile
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Recommendation saved successfully!');
    } catch (error) {
      alert('Could not save recommendation.');
    }
  };

  if (!profile) return <div className="container result-page text-center">Loading astrology profile...</div>;

  const tabs = [
    { id: 'overview', label: 'Overview', component: <OverviewTab recommendation={recommendation} profile={profile} /> },
    { id: 'personality', label: 'Personality', component: <PersonalityTab profile={profile} /> },
    { id: 'guidance', label: 'Guidance', component: <GuidanceTab profile={profile} /> },
    { id: 'horoscope', label: 'Live Horoscope', component: <HoroscopeTab token={token} /> },
    { id: 'career', label: 'Career', component: <CareerTab profile={profile} /> },
    { id: 'relationships', label: 'Relationships', component: <RelationshipTab profile={profile} /> },
    { id: 'compatibility', label: 'Compatibility', component: <CompatibilityTab profile={profile} /> },
  ];

  return (
    <div className="result-page container">
      <div className="result-header text-center">
        <h2>Your Premium Astrology Report</h2>
        <p>A deep dive into your cosmic blueprint.</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => navigate('/recommendation')} className="btn btn-outline">
          <RefreshCw size={18} style={{ marginRight: '0.5rem' }} /> Try Another
        </button>
        <button onClick={handleSave} className="btn btn-primary">
          <Bookmark size={18} style={{ marginRight: '0.5rem' }} /> Save Report
        </button>
      </div>

      <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Result;
