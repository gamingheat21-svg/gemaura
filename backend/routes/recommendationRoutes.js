const express = require('express');
const db = require('../db');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:zodiac', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM gemstones WHERE zodiac_sign = $1 LIMIT 1', [req.params.zodiac]);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'No recommendation found for this zodiac sign' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/history', protect, async (req, res) => {
  const { gemstone_id, zodiac_sign, profile } = req.body;
  try {
    // Fetch User Details for DOB to get Horoscope
    const userResult = await db.query('SELECT dob FROM users WHERE id = $1', [req.user.id]);
    const user = userResult[0];

    let horoscope = null;
    if (user && user.dob && zodiac_sign) {
      const horoscopeService = require('../services/horoscopeService');
      horoscope = await horoscopeService.getDailyHoroscope(req.user.id, zodiac_sign, user.dob);
    }

    const report_data = JSON.stringify({ profile, horoscope });

    // Schema uses user_saved_reports instead of recommendation_history
    const correctSavedRec = await db.execute(
      'INSERT INTO user_saved_reports (user_id, gemstone_id, zodiac_sign, report_data) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, gemstone_id, zodiac_sign, report_data]
    );
    res.status(201).json(correctSavedRec);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/history/user', protect, async (req, res) => {
  try {
    const history = await db.query(
      `SELECT r.id as rec_id, r.created_at, g.* 
       FROM user_saved_reports r 
       JOIN gemstones g ON r.gemstone_id = g.id 
       WHERE r.user_id = $1 
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
