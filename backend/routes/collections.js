const express = require('express');
const router = express.Router();
const { pool: db } = require('../config/db');
const tally = require('../services/tally');

// POST fetch Outstanding Bills Receivable from Tally → return as voucher list
router.post('/tally-sync', async (req, res) => {
  try {
    const vouchers = await tally.fetchOutstanding();
    res.json({ success: true, fetched: vouchers.length, vouchers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all collections (with staff name)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*,
             u1.name AS assigned_to_name,
             u2.name AS assigned_by_name
      FROM collections c
      LEFT JOIN users u1 ON c.assigned_to = u1.id
      LEFT JOIN users u2 ON c.assigned_by = u2.id
      ORDER BY c.assigned_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET collections assigned to a specific staff member
router.get('/staff/:userId', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM collections WHERE assigned_to = ? ORDER BY assigned_at DESC',
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST assign vouchers as collection tasks (bulk or single)
// Body: { vouchers: [...], assigned_to, assigned_by }
router.post('/assign', async (req, res) => {
  const { vouchers, assigned_to, assigned_by } = req.body;
  if (!vouchers?.length || !assigned_to || !assigned_by)
    return res.status(400).json({ error: 'vouchers, assigned_to, and assigned_by are required' });

  try {
    const values = vouchers.map(v => [
      v.tally_id, v.voucher_no, v.voucher_date, v.party_name,
      v.party_phone || null, v.party_address || null,
      v.description || null, v.amount, v.ledger_group || null,
      assigned_to, v.assigned_to_name || null, assigned_by,
      v.remarks || null
    ]);

    const [result] = await db.query(
      `INSERT INTO collections
        (tally_id, voucher_no, voucher_date, party_name, party_phone, party_address,
         description, amount, ledger_group, assigned_to, assigned_to_name, assigned_by,
         remarks)
       VALUES ?`,
      [values]
    );
    res.status(201).json({ inserted: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH mark collection as completed by tally_id (voucher_no)
router.patch('/tally/:tallyId/complete', async (req, res) => {
  const { amount_collected, remarks, actual_location, completed_by } = req.body || {};
  try {
    await db.query(
      "UPDATE collections SET status = 'completed', completed_at = NOW(), amount_collected = ?, remarks = ?, actual_location = ?, completed_by = ? WHERE voucher_no = ?",
      [amount_collected ?? 0, remarks || null, actual_location || null, completed_by || null, req.params.tallyId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH mark collection as completed by db id
router.patch('/:id/complete', async (req, res) => {
  const { amount_collected, remarks, actual_location, completed_by } = req.body || {};
  try {
    await db.query(
      "UPDATE collections SET status = 'completed', completed_at = NOW(), amount_collected = ?, remarks = ?, actual_location = ?, completed_by = ? WHERE id = ?",
      [amount_collected ?? 0, remarks || null, actual_location || null, completed_by || null, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
