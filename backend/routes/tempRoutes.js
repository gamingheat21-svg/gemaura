const express = require('express');
const db = require('../db');

const zodiacRouter = express.Router();
zodiacRouter.get('/:sign', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM zodiac_profiles WHERE sign = $1', [req.params.sign]);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Zodiac profile not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

const compatibilityRouter = express.Router();
compatibilityRouter.get('/', async (req, res) => {
  const { sign1, sign2 } = req.query;
  if (!sign1 || !sign2) return res.status(400).json({ message: 'sign1 and sign2 query parameters are required' });

  try {
    const result = await db.query(
      'SELECT * FROM compatibility WHERE (sign1 = $1 AND sign2 = $2) OR (sign1 = $2 AND sign2 = $1)', 
      [sign1, sign2]
    );
    if (result.length > 0) res.json(result[0]);
    else res.status(404).json({ message: 'Compatibility data not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = { zodiacRouter, compatibilityRouter };
