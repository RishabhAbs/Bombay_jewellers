const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL');

  const dbName = process.env.DB_NAME;

  connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`, (err) => {
    if (err) { console.error('Create DB failed:', err.message); connection.end(); return; }
    console.log(`Database '${dbName}' ready`);

    connection.query(`USE \`${dbName}\`;`, (err) => {
      if (err) { console.error('USE DB failed:', err.message); connection.end(); return; }

      connection.query(sql, (err) => {
        if (err) {
          console.error('Migration failed:', err.message);
        } else {
          console.log('All tables created successfully.');
        }
        connection.end();
      });
    });
  });
});
