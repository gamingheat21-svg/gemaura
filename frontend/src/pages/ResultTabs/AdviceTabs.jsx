import React from 'react';

export const GuidanceTab = ({ profile }) => {
  return (
    <div className="card">
      <h3 className="mb-4">Astrological Guidance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <h4 className="text-green-400 mb-2">Do's</h4>
          <ul className="list-disc pl-5 text-muted space-y-2">
            {profile.dos.split(',').map((item, i) => <li key={i}>{item.trim()}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-red-400 mb-2">Don'ts</h4>
          <ul className="list-disc pl-5 text-muted space-y-2">
            {profile.donts.split(',').map((item, i) => <li key={i}>{item.trim()}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const CareerTab = ({ profile }) => {
  return (
    <div className="card">
      <h3 className="mb-4">Career & Finance Insights</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-primary mb-2">Career Advice</h4>
          <p className="text-muted leading-relaxed">{profile.career_advice}</p>
        </div>
        <div>
          <h4 className="text-primary mb-2">Financial Advice</h4>
          <p className="text-muted leading-relaxed">{profile.financial_advice}</p>
        </div>
        <div>
          <h4 className="text-primary mb-2">Leadership Style</h4>
          <p className="text-muted leading-relaxed">{profile.leadership_style}</p>
        </div>
      </div>
    </div>
  );
};

export const RelationshipTab = ({ profile }) => {
  return (
    <div className="card">
      <h3 className="mb-4">Relationship & Love</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-accent mb-2">Relationship Advice</h4>
          <p className="text-muted leading-relaxed">{profile.relationship_advice}</p>
        </div>
        <div>
          <h4 className="text-accent mb-2">Emotional Traits</h4>
          <p className="text-muted leading-relaxed">{profile.emotional_traits}</p>
        </div>
      </div>
    </div>
  );
};
