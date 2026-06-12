-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS user_saved_reports CASCADE;
DROP TABLE IF EXISTS compatibility CASCADE;
DROP TABLE IF EXISTS recommendation_history CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS zodiac_profiles CASCADE;
DROP TABLE IF EXISTS gemstones CASCADE;

-- 1. users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE,
    birth_time TIME,
    birth_location VARCHAR(255),
    zodiac_sign VARCHAR(20),
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. zodiac_profiles
CREATE TABLE zodiac_profiles (
    id SERIAL PRIMARY KEY,
    sign VARCHAR(20) UNIQUE NOT NULL,
    element VARCHAR(20),
    ruling_planet VARCHAR(50),
    lucky_color VARCHAR(50),
    lucky_number INT,
    lucky_day VARCHAR(20),
    personality_description TEXT,
    core_nature TEXT,
    strengths TEXT, 
    weaknesses TEXT,
    emotional_traits TEXT,
    leadership_style TEXT,
    career_advice TEXT,
    financial_advice TEXT,
    relationship_advice TEXT,
    dos TEXT,
    donts TEXT
);

-- 3. compatibility
CREATE TABLE compatibility (
    id SERIAL PRIMARY KEY,
    sign1 VARCHAR(20) NOT NULL,
    sign2 VARCHAR(20) NOT NULL,
    friendship_score INT,
    love_score INT,
    communication_score INT,
    description TEXT,
    UNIQUE(sign1, sign2)
);

-- 4. gemstones
CREATE TABLE gemstones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    zodiac_sign VARCHAR(20) NOT NULL,
    color VARCHAR(20) NOT NULL,
    planet VARCHAR(50) NOT NULL,
    benefits TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- 5. user_saved_reports
CREATE TABLE user_saved_reports (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    gemstone_id INT REFERENCES gemstones(id) ON DELETE CASCADE,
    zodiac_sign VARCHAR(20),
    report_data JSON, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEED DATA

-- Gemstones (Existing mappings)
INSERT INTO gemstones (name, zodiac_sign, color, planet, benefits, image_url) VALUES
('Diamond', 'Aries', 'White/Clear', 'Mars/Venus', 'Confidence, Clarity, Strength', '/images/diamond.png'),
('Emerald', 'Taurus', 'Green', 'Venus/Mercury', 'Prosperity, Wisdom, Memory', '/images/emerald.png'),
('Pearl', 'Gemini', 'White', 'Mercury/Moon', 'Peace, Emotional Balance, Calmness', '/images/pearl.png'),
('Ruby', 'Cancer', 'Red', 'Moon/Sun', 'Leadership, Energy, Passion', '/images/ruby.png'),
('Ruby', 'Leo', 'Red', 'Sun', 'Leadership, Authority, Confidence', '/images/ruby.png'),
('Emerald', 'Virgo', 'Green', 'Mercury', 'Intellect, Communication, Health', '/images/emerald.png'),
('Diamond', 'Libra', 'White/Clear', 'Venus', 'Harmony, Love, Beauty', '/images/diamond.png'),
('Coral', 'Scorpio', 'Red/Orange', 'Pluto/Mars', 'Courage, Vitality, Protection', '/images/coral.png'),
('Yellow Sapphire', 'Sagittarius', 'Yellow', 'Jupiter', 'Wealth, Knowledge, Success', '/images/yellow_sapphire.png'),
('Blue Sapphire', 'Capricorn', 'Blue', 'Saturn', 'Discipline, Focus, Prosperity', '/images/blue_sapphire.png'),
('Amethyst', 'Aquarius', 'Purple', 'Uranus/Saturn', 'Intuition, Calmness, Spiritual Growth', '/images/amethyst.png'),
('Yellow Sapphire', 'Pisces', 'Yellow', 'Neptune/Jupiter', 'Wisdom, Spirituality, Compassion', '/images/yellow_sapphire.png');

-- Zodiac Profiles Seed Data (12 Signs)
INSERT INTO zodiac_profiles 
(sign, element, ruling_planet, lucky_color, lucky_number, lucky_day, personality_description, core_nature, strengths, weaknesses, emotional_traits, leadership_style, career_advice, financial_advice, relationship_advice, dos, donts) VALUES
('Aries', 'Fire', 'Mars', 'Red', 9, 'Tuesday', 'Bold, ambitious, and diving headfirst into even the most challenging situations.', 'Dynamic and competitive', 'Courage, Determination, Confidence, Enthusiasm', 'Impatience, Moodiness, Short-tempered, Impulsive', 'Passionate but quick to anger', 'Leads by action and courage', 'Seek roles that allow independence and leadership.', 'Avoid impulsive buying; save for big goals.', 'Be patient with partners who process slower than you.', 'Take initiative, Trust your instincts, Stay active', 'Act impulsively, Ignore others advice, Give up easily'),

('Taurus', 'Earth', 'Venus', 'Green', 6, 'Friday', 'Reliable, patient, and devoted. Taurus loves the rewards of the game.', 'Stable and grounded', 'Reliable, Patient, Practical, Devoted, Responsible', 'Stubborn, Possessive, Uncompromising', 'Seeks comfort and security', 'Leads through consistency and reliability', 'Look for stable, long-term career growth.', 'Invest in tangible assets; avoid high-risk gambles.', 'Show affection through actions, not just words.', 'Build routines, Value quality, Stay grounded', 'Rush decisions, Be overly stubborn, Resist necessary change'),

('Gemini', 'Air', 'Mercury', 'Yellow', 5, 'Wednesday', 'Expressive, quick-witted, and sociable. Represents two different personalities.', 'Adaptable and intellectual', 'Gentle, Affectionate, Curious, Adaptable', 'Nervous, Inconsistent, Indecisive', 'Needs mental stimulation to feel connected', 'Leads through communication and ideas', 'Jobs requiring communication, writing, or travel suit you best.', 'Track your spending; you tend to scatter funds.', 'Keep communication open and intellectually stimulating.', 'Stay curious, Network, Read widely', 'Gossip, Scatter your energy, Make empty promises'),

('Cancer', 'Water', 'Moon', 'White', 2, 'Monday', 'Deeply intuitive and sentimental. Cancer can be one of the most challenging zodiac signs to get to know.', 'Emotional and protective', 'Tenacious, Highly Imaginative, Loyal, Emotional, Sympathetic', 'Moody, Pessimistic, Suspicious, Manipulative', 'Experiences emotions deeply; fiercely protective of loved ones', 'Leads by nurturing and supporting the team', 'Caregiving, human resources, or creative fields are ideal.', 'Save for security; real estate is a good investment.', 'Communicate your feelings instead of retreating into your shell.', 'Trust your intuition, Protect your peace, Nurture loved ones', 'Dwell on the past, Be overly defensive, Hide your true feelings'),

('Leo', 'Fire', 'Sun', 'Gold', 1, 'Sunday', 'Dramatic, creative, and self-confident. Leos are natural born leaders.', 'Proud and charismatic', 'Creative, Passionate, Generous, Warm-hearted, Cheerful', 'Arrogant, Stubborn, Self-centered, Lazy, Inflexible', 'Expressive and dramatic; needs to feel appreciated', 'Leads by inspiring and motivating others', 'Entertainment, management, or any role where you can shine.', 'You enjoy luxury; ensure you budget for it.', 'Shower your partner with warmth, but share the spotlight.', 'Express yourself, Be generous, Take the lead', 'Let ego rule, Ignore feedback, Be overly dramatic'),

('Virgo', 'Earth', 'Mercury', 'Grey', 5, 'Wednesday', 'Loyal, analytical, and practical. Virgos pay attention to the smallest details.', 'Analytical and service-oriented', 'Loyal, Analytical, Kind, Hardworking, Practical', 'Shyness, Worry, Overly critical of self and others', 'Reserved but deeply caring through acts of service', 'Leads through organization and attention to detail', 'Data analysis, editing, healthcare, or administrative roles.', 'Excellent at budgeting; keep an emergency fund.', 'Don''t over-analyze relationships; allow for imperfections.', 'Organize your life, Help others, Focus on details', 'Overthink, Be overly critical, Forget the big picture'),

('Libra', 'Air', 'Venus', 'Pink', 6, 'Friday', 'Peaceful, fair, and hates being alone. Partnership is very important for them.', 'Harmonious and diplomatic', 'Cooperative, Diplomatic, Gracious, Fair-minded, Social', 'Indecisive, Avoids confrontations, Will carry a grudge', 'Seeks balance and harmony in all emotional exchanges', 'Leads by building consensus and mediating', 'Law, design, human resources, or diplomacy.', 'Avoid spending purely on aesthetics; balance the books.', 'Maintain your own identity within the partnership.', 'Seek balance, Be diplomatic, Appreciate beauty', 'Avoid conflict at all costs, Be indecisive, People-please'),

('Scorpio', 'Water', 'Pluto', 'Black', 9, 'Tuesday', 'Passionate and assertive. Scorpions are determined and decisive.', 'Intense and transformative', 'Resourceful, Powerful, Brave, Passionate, A True Friend', 'Distrusting, Jealous, Secretive, Violent', 'Feels intensely but hides vulnerability', 'Leads through passion, strategy, and sheer willpower', 'Research, psychology, investigation, or crisis management.', 'You are secretive with money; investments are your forte.', 'Build trust gradually; avoid jealousy and control.', 'Be passionate, Dig deep, Transform yourself', 'Hold grudges, Be manipulative, Succumb to jealousy'),

('Sagittarius', 'Fire', 'Jupiter', 'Purple', 3, 'Thursday', 'Generous, idealistic, and great sense of humor. They love freedom and travel.', 'Optimistic and adventurous', 'Generous, Idealistic, Great sense of humor', 'Promises more than can deliver, Very impatient', 'Optimistic and expansive; dislikes emotional constraint', 'Leads through vision and enthusiasm', 'Travel, education, publishing, or entrepreneurship.', 'You take financial risks; ensure they are calculated.', 'Need a partner who respects your freedom and loves adventure.', 'Explore, Learn constantly, Stay optimistic', 'Over-promise, Ignore details, Be tactless'),

('Capricorn', 'Earth', 'Saturn', 'Brown', 8, 'Saturday', 'Responsible, disciplined, and self-control. Good managers.', 'Ambitious and disciplined', 'Responsible, Disciplined, Self-control, Good managers', 'Know-it-all, Unforgiving, Condescending, Expecting the worst', 'Reserved and cautious; values loyalty and stability', 'Leads by structure, rules, and long-term planning', 'Finance, management, engineering, or architecture.', 'Highly disciplined with money; focus on long-term wealth.', 'Make time for romance; don''t let work consume you.', 'Set goals, Be disciplined, Respect tradition', 'Be overly pessimistic, Work too much, Be unforgiving'),

('Aquarius', 'Air', 'Uranus', 'Blue', 4, 'Saturday', 'Deep thinkers and highly intellectual people who love helping others.', 'Innovative and humanitarian', 'Progressive, Original, Independent, Humanitarian', 'Runs from emotional expression, Temperamental, Uncompromising', 'Detached but deeply cares for humanity as a whole', 'Leads through innovation and unconventional ideas', 'Technology, social work, science, or activism.', 'You prefer to spend on causes or gadgets; budget wisely.', 'Need intellectual stimulation and independence in love.', 'Be original, Help humanity, Think outside the box', 'Be overly detached, Rebel without a cause, Be unpredictable'),

('Pisces', 'Water', 'Neptune', 'Sea Green', 7, 'Thursday', 'Very friendly, so they often find themselves in a company of very different people.', 'Compassionate and artistic', 'Compassionate, Artistic, Intuitive, Gentle, Wise, Musical', 'Fearful, Overly trusting, Sad, Desire to escape reality', 'Highly empathetic and absorbs others emotions', 'Leads through empathy and creative vision', 'Art, healthcare, counseling, or any creative field.', 'You can be easily scammed; consult an advisor for finances.', 'Set boundaries to avoid losing yourself in the relationship.', 'Trust your intuition, Be compassionate, Create art', 'Play the victim, Escape reality, Ignore boundaries');

-- Compatibility Seed Data (Sample)
INSERT INTO compatibility (sign1, sign2, friendship_score, love_score, communication_score, description) VALUES
('Aries', 'Leo', 90, 95, 85, 'A fiery and passionate match. Both are energetic and love excitement.'),
('Taurus', 'Virgo', 95, 90, 95, 'A highly stable and practical connection based on mutual respect.'),
('Gemini', 'Libra', 90, 85, 95, 'An intellectual and social match. Great communication and shared ideas.'),
('Cancer', 'Scorpio', 85, 95, 90, 'Deeply emotional and intuitive connection. They understand each other without words.'),
('Leo', 'Sagittarius', 95, 90, 85, 'Fun, adventurous, and dynamic. They inspire each other to be better.'),
('Virgo', 'Capricorn', 90, 95, 90, 'Highly ambitious and organized. A power couple built on solid foundations.'),
('Libra', 'Aquarius', 90, 85, 95, 'A match of ideas and social causes. They give each other the freedom they need.'),
('Scorpio', 'Pisces', 85, 95, 90, 'Intensely romantic and spiritual. A deeply transformative relationship.'),
('Sagittarius', 'Aries', 95, 90, 85, 'Explosive energy and mutual love for freedom. Never a dull moment.'),
('Capricorn', 'Taurus', 90, 95, 90, 'A grounded and secure match. Both value loyalty and material success.'),
('Aquarius', 'Gemini', 95, 85, 95, 'Highly stimulating mentally. They share a unique and quirky bond.'),
('Pisces', 'Cancer', 90, 95, 90, 'A deeply nurturing and empathetic connection. Emotionally very fulfilling.');
