const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const gemstoneRoutes = require('./routes/gemstoneRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const zodiacRoutes = require('./routes/zodiacRoutes');
const compatibilityRoutes = require('./routes/compatibilityRoutes');
const horoscopeRoutes = require('./routes/horoscopeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/gemstones', gemstoneRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/zodiac', zodiacRoutes);
app.use('/api/compatibility', compatibilityRoutes);
app.use('/api/horoscope', horoscopeRoutes);

app.get('/', (req, res) => {
  res.send('GemAura API is running...');
});

// Temporary endpoint to initialize the database
app.get('/api/init-db', async (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const db = require('./db/index');
  try {
    const schemaPath = path.join(__dirname, 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await db.query(schema);
    res.send('Database initialized successfully! You can now use the app.');
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).send('Error initializing database: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
