const express = require('express');
const router = express.Router();
const { pool: db } = require('../config/db');

// GET all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, username, email, phone, role, is_active, created_at FROM users ORDER BY created_at');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST upsert user (insert or update on duplicate id)
router.post('/upsert', async (req, res) => {
  const { id, name, username, email, phone, role, is_active } = req.body;
  if (!id || !name) return res.status(400).json({ error: 'id and name are required' });
  try {
    await db.query(
      `INSERT INTO users (id, name, username, email, phone, role, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         name=VALUES(name), username=VALUES(username), email=VALUES(email),
         phone=VALUES(phone), role=VALUES(role), is_active=VALUES(is_active)`,
      [id, name, username || null, email || null, phone || null, role === 'admin' ? 'admin' : 'staff', is_active ? 1 : 0]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST bulk sync all users at once
router.post('/sync', async (req, res) => {
  const { users } = req.body;
  if (!users?.length) return res.status(400).json({ error: 'users array required' });
  try {
    for (const u of users) {
      await db.query(
        `INSERT INTO users (id, name, username, email, phone, role, is_active)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           name=VALUES(name), username=VALUES(username), email=VALUES(email),
           phone=VALUES(phone), role=VALUES(role), is_active=VALUES(is_active)`,
        [u.id, u.name, u.username || null, u.email || null, u.phone || null, u.role === 'admin' ? 'admin' : 'staff', u.isActive !== false ? 1 : 0]
      );
    }
    res.json({ synced: users.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
