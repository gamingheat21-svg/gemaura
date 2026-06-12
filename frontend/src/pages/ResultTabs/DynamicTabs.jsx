import React, { useState, useEffect } from 'react';
import { getHoroscope } from '../../services/api';

export const HoroscopeTab = ({ token }) => {
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHoro = async () => {
      try {
        const data = await getHoroscope(token);
        setHoroscope(data);
      } catch (err) {
        setError('Could not load live horoscope data. Please check API key or login status.');
      } finally {
        setLoading(false);
      }
    };
    
    if (token) fetchHoro();
    else {
      setError('You must be logged in to fetch your personalized horoscope.');
      setLoading(false);
    }
  }, [token]);

  if (loading) return <div className="card text-center py-8">Consulting the stars...</div>;
  if (error) return <div className="card text-center py-8 text-red-400">{error}</div>;
  if (!horoscope) return null;

  return (
    <div className="card">
      <h3 className="mb-4">Your Live Horoscope</h3>
      {horoscope.prediction && (
        <div className="space-y-6">
          <div>
            <h4 className="text-primary mb-2">Personal Life</h4>
            <p className="text-muted leading-relaxed">{horoscope.prediction.personal_life}</p>
          </div>
          <div>
            <h4 className="text-primary mb-2">Profession</h4>
            <p className="text-muted leading-relaxed">{horoscope.prediction.profession}</p>
          </div>
          <div>
            <h4 className="text-primary mb-2">Health</h4>
            <p className="text-muted leading-relaxed">{horoscope.prediction.health}</p>
          </div>
          <div>
            <h4 className="text-primary mb-2">Travel</h4>
            <p className="text-muted leading-relaxed">{horoscope.prediction.travel}</p>
          </div>
          <div>
            <h4 className="text-primary mb-2">Luck</h4>
            <p className="text-muted leading-relaxed">{horoscope.prediction.luck}</p>
          </div>
          <div>
            <h4 className="text-primary mb-2">Emotions</h4>
            <p className="text-muted leading-relaxed">{horoscope.prediction.emotions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const CompatibilityTab = ({ profile }) => {
  // We mock the sign2 here or assume a search feature could be added later
  // For the sake of the result page, we just show a static message or a list of top matches
  return (
    <div className="card text-center py-8">
      <h3 className="mb-4">Compatibility Analysis</h3>
      <p className="text-muted">You are a {profile.sign}. In the future, you will be able to select another sign to see your precise friendship, love, and communication scores based on our database!</p>
    </div>
  );
};
