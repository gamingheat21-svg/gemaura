const fs = require('fs');
const path = require('path');
const db = require('./index');

const initDB = async () => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Running schema.sql...');
    await db.query(schema);
    console.log('PostgreSQL Database initialized successfully with schema and seed data.');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    process.exit();
  }
};

initDB();
