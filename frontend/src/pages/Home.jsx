import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Gem } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section container">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your <span className="gradient-text">Perfect Gemstone</span>
          </h1>
          <p className="hero-description">
            Unlock the power of the stars. GemAura uses ancient astrological wisdom to recommend the perfect gemstone tailored to your unique cosmic blueprint.
          </p>
          <Link to="/recommendation" className="btn btn-primary hero-btn">
            Get Recommendation
          </Link>
        </div>
        <div className="hero-image">
          {/* We will use CSS to create a glowing gem effect instead of an image for now */}
          <div className="gem-placeholder">
            <Gem size={100} className="text-accent" />
            <div className="glow"></div>
          </div>
        </div>
      </section>

      <section className="features-section container">
        <div className="feature-card card">
          <div className="feature-icon-wrapper">
            <Star className="feature-icon text-accent" />
          </div>
          <h3>Personalized Suggestions</h3>
          <p>Get gemstone recommendations based specifically on your exact date of birth and astrological profile.</p>
        </div>
        <div className="feature-card card">
          <div className="feature-icon-wrapper">
            <Sparkles className="feature-icon text-accent" />
          </div>
          <h3>Zodiac Matching</h3>
          <p>Find the stones that resonate with your sun sign to enhance your natural strengths and balance weaknesses.</p>
        </div>
        <div className="feature-card card">
          <div className="feature-icon-wrapper">
            <Gem className="feature-icon text-accent" />
          </div>
          <h3>Astrological Insights</h3>
          <p>Learn about the ruling planets, metaphysical benefits, and historical significance of each precious stone.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
