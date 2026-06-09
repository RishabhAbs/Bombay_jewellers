const express = require('express');
const router = express.Router();
const { pool: db } = require('../config/db');
const tally = require('../services/tally');

// POST fetch from Tally ERP → upsert into DB → return ledgers
router.post('/tally-sync', async (req, res) => {
  try {
    const ledgers = await tally.fetchLedgers();
    if (!ledgers.length) return res.json({ success: true, synced: 0, ledgers: [] });

    // Respond immediately so the UI doesn't wait for DB saves
    res.json({ success: true, synced: ledgers.length, ledgers });

    // Bulk upsert in background
    const values = ledgers.map(l => [
      l.tally_id, l.ledger_name, l.ledger_group,
      l.phone || null, l.address || null, l.gstin || null,
      l.opening_balance, l.current_balance, l.balance_type
    ]);
    db.query(
      `INSERT INTO ledger_master
         (tally_id, ledger_name, ledger_group, phone, address, gstin,
          opening_balance, current_balance, balance_type)
       VALUES ?
       ON DUPLICATE KEY UPDATE
         ledger_name=VALUES(ledger_name), ledger_group=VALUES(ledger_group),
         phone=VALUES(phone), address=VALUES(address), gstin=VALUES(gstin),
         opening_balance=VALUES(opening_balance), current_balance=VALUES(current_balance),
         balance_type=VALUES(balance_type), synced_at=CURRENT_TIMESTAMP`,
      [values]
    ).catch(err => console.error('Ledger bulk upsert error:', err.message));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all ledgers
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ledger_master ORDER BY ledger_name ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST upsert ledgers synced from Tally (bulk)
// Body: { ledgers: [{ tally_id, ledger_name, ledger_group, phone, address,
//                     gstin, opening_balance, current_balance, balance_type }] }
router.post('/sync', async (req, res) => {
  const { ledgers } = req.body;
  if (!ledgers?.length) return res.status(400).json({ error: 'No ledgers provided' });

  try {
    for (const ledger of ledgers) {
      await db.query(
        `INSERT INTO ledger_master
           (tally_id, ledger_name, ledger_group, phone, address,
            gstin, opening_balance, current_balance, balance_type)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           ledger_name      = VALUES(ledger_name),
           ledger_group     = VALUES(ledger_group),
           phone            = VALUES(phone),
           address          = VALUES(address),
           gstin            = VALUES(gstin),
           opening_balance  = VALUES(opening_balance),
           current_balance  = VALUES(current_balance),
           balance_type     = VALUES(balance_type),
           synced_at        = CURRENT_TIMESTAMP`,
        [
          ledger.tally_id, ledger.ledger_name, ledger.ledger_group,
          ledger.phone || null, ledger.address || null, ledger.gstin || null,
          ledger.opening_balance, ledger.current_balance, ledger.balance_type,
        ]
      );
    }
    res.json({ success: true, synced: ledgers.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a single ledger by tally_id
router.delete('/:tallyId', async (req, res) => {
  try {
    await db.query('DELETE FROM ledger_master WHERE tally_id = ?', [req.params.tallyId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
