const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: async (text, params) => {
    try {
      const res = await pool.query(text, params);
      return res.rows;
    } catch (error) {
      console.error('Database Query Error:', error);
      throw error;
    }
  },
  execute: async (text, params) => {
    try {
      const res = await pool.query(text, params);
      return res.rows[0]; // Useful for RETURNING clauses
    } catch (error) {
      console.error('Database Execute Error:', error);
      throw error;
    }
  },
  pool
};
