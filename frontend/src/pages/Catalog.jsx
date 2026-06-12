import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Catalog.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Catalog = () => {
  const [gemstones, setGemstones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [zodiacFilter, setZodiacFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useContext(AuthContext);
  const [astrologyProfile, setAstrologyProfile] = useState(null);

  const fetchGemstones = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/gemstones?search=${search}&zodiac=${zodiacFilter}&page=${page}&limit=6`);
      setGemstones(res.data.gemstones);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGemstones();
  }, [page, zodiacFilter]);

  useEffect(() => {
    const zodiacToFetch = zodiacFilter || (user ? user.zodiac_sign : null);
    if (zodiacToFetch) {
      import('../services/api').then(({ getZodiacProfile }) => {
        getZodiacProfile(zodiacToFetch)
          .then(setAstrologyProfile)
          .catch(console.error);
      });
    } else {
      setAstrologyProfile(null);
    }
  }, [zodiacFilter, user]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchGemstones();
  };

  return (
    <div className="catalog-page container">
      <div className="catalog-header">
        <h2>Gemstone Catalog</h2>
        <p>Explore our curated collection of astrological gemstones.</p>
      </div>

      <div className="catalog-controls">
        <form onSubmit={handleSearch} className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search gemstones..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className="filter-dropdown">
          <Filter size={20} className="filter-icon" />
          <select 
            value={zodiacFilter} 
            onChange={(e) => { setZodiacFilter(e.target.value); setPage(1); }}
            className="input-field"
          >
            <option value="">All Zodiacs</option>
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
      </div>

      {loading ? (
        <div className="text-center py-4">Loading gemstones...</div>
      ) : (
        <div className="catalog-content-layout">
          <div className="catalog-main">
            <div className="gemstone-grid">
              {gemstones.map((gem) => (
                <div key={gem.id} className="gem-card card">
                  <div className="gem-card-img">
                    <span className="gem-initial">{gem.name.charAt(0)}</span>
                  </div>
                  <div className="gem-card-content">
                    <h3>{gem.name}</h3>
                    <div className="gem-tags">
                      <span className="tag zodiac-tag">{gem.zodiac_sign}</span>
                      <span className="tag color-tag" style={{ borderLeftColor: gem.color.toLowerCase() }}>{gem.color}</span>
                    </div>
                    <p className="gem-benefits">{gem.benefits}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {gemstones.length === 0 && (
              <div className="text-center py-4">No gemstones found matching your criteria.</div>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1}
                  className="btn btn-outline btn-icon"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="page-info">Page {page} of {totalPages}</span>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                  disabled={page === totalPages}
                  className="btn btn-outline btn-icon"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="catalog-sidebar">
            {astrologyProfile ? (
              <div className="astrology-sidebar-card card">
                <h3>{astrologyProfile.sign} Insights</h3>
                <p className="text-muted mb-4">Discover the cosmic energy aligned with {astrologyProfile.sign}.</p>
                <div className="astro-detail">
                  <span className="astro-label">Ruling Planet:</span>
                  <span className="astro-value">{astrologyProfile.ruling_planet}</span>
                </div>
                <div className="astro-detail">
                  <span className="astro-label">Element:</span>
                  <span className="astro-value">{astrologyProfile.element}</span>
                </div>
                <div className="astro-detail">
                  <span className="astro-label">Lucky Colors:</span>
                  <span className="astro-value">{astrologyProfile.lucky_colors}</span>
                </div>
                <div className="astro-detail">
                  <span className="astro-label">Lucky Gems:</span>
                  <span className="astro-value">{astrologyProfile.lucky_gems}</span>
                </div>
                <div className="astro-traits mt-4">
                  <h4>Traits</h4>
                  <p>{astrologyProfile.traits}</p>
                </div>
              </div>
            ) : (
              <div className="astrology-sidebar-card card text-center">
                <p className="text-muted">Select a zodiac sign filter or login to see personalized astrology insights alongside the gemstones.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
