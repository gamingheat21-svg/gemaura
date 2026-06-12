import React from 'react';
import { CheckCircle2, Sun } from 'lucide-react';

export const OverviewTab = ({ recommendation, profile }) => {
  const benefitsList = recommendation.benefits.split(',').map(b => b.trim());

  return (
    <div className="tab-grid">
      <div className="card">
        <h3>Gemstone: {recommendation.name}</h3>
        <p className="text-muted mt-2">Color: {recommendation.color} | Planet: {recommendation.planet}</p>
        <h4 className="mt-4 mb-2">Key Benefits</h4>
        <ul className="benefits-list">
          {benefitsList.map((b, i) => (
            <li key={i}><CheckCircle2 size={16} className="text-primary mr-2" />{b}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Zodiac Overview: {profile.sign}</h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <span className="text-muted block text-sm">Ruling Planet</span>
            <strong>{profile.ruling_planet}</strong>
          </div>
          <div>
            <span className="text-muted block text-sm">Element</span>
            <strong>{profile.element}</strong>
          </div>
          <div>
            <span className="text-muted block text-sm">Lucky Color</span>
            <strong>{profile.lucky_color}</strong>
          </div>
          <div>
            <span className="text-muted block text-sm">Lucky Number</span>
            <strong>{profile.lucky_number}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PersonalityTab = ({ profile }) => {
  return (
    <div className="card">
      <h3 className="mb-4">Personality Analysis</h3>
      <p className="mb-4 text-muted leading-relaxed">{profile.personality_description}</p>
      
      <div className="mb-4">
        <h4 className="text-primary mb-2">Core Nature</h4>
        <p className="text-muted">{profile.core_nature}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-surface p-4 rounded-lg border border-border">
          <h4 className="text-accent mb-2">Strengths</h4>
          <p className="text-muted">{profile.strengths}</p>
        </div>
        <div className="bg-surface p-4 rounded-lg border border-border">
          <h4 className="text-red-400 mb-2">Weaknesses</h4>
          <p className="text-muted">{profile.weaknesses}</p>
        </div>
      </div>
    </div>
  );
};
