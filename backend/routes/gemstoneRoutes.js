const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, zodiac, page = 1, limit = 10 } = req.query;
    
    let query = 'SELECT * FROM gemstones WHERE 1=1';
    let params = [];
    let paramCount = 1;

    if (search) {
      query += ` AND name ILIKE $${paramCount}`;
      params.push(`%${search}%`);
      paramCount++;
    }

    if (zodiac) {
      query += ` AND zodiac_sign = $${paramCount}`;
      params.push(zodiac);
      paramCount++;
    }

    const offset = (page - 1) * limit;
    query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limit, offset);

    const gemstones = await db.query(query, params);
    
    let countQuery = 'SELECT COUNT(*) as count FROM gemstones WHERE 1=1';
    let countParams = [];
    let countParamCount = 1;

    if (search) {
      countQuery += ` AND name ILIKE $${countParamCount}`;
      countParams.push(`%${search}%`);
      countParamCount++;
    }
    if (zodiac) {
      countQuery += ` AND zodiac_sign = $${countParamCount}`;
      countParams.push(zodiac);
    }

    const countResult = await db.query(countQuery, countParams);
    const total = countResult[0].count;

    res.json({
      gemstones,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const gemstone = await db.query('SELECT * FROM gemstones WHERE id = $1', [req.params.id]);
    if (gemstone.length > 0) {
      res.json(gemstone[0]);
    } else {
      res.status(404).json({ message: 'Gemstone not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
