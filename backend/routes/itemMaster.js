const express = require('express');
const router = express.Router();
const { pool: db } = require('../config/db');
const tally = require('../services/tally');

// POST fetch from Tally ERP → upsert into DB → return items
router.post('/tally-sync', async (req, res) => {
  try {
    const items = await tally.fetchStockItems();
    if (!items.length) return res.json({ success: true, synced: 0, items: [] });

    // Respond immediately so the UI doesn't wait for DB saves
    res.json({ success: true, synced: items.length, items });

    // Bulk upsert in background
    const values = items.map(i => [
      i.tally_id, i.item_code, i.item_name, i.stock_group,
      i.unit, i.hsn_code, i.opening_rate, i.current_rate,
      i.opening_stock, i.current_stock
    ]);
    db.query(
      `INSERT INTO item_master
         (tally_id, item_code, item_name, stock_group, unit, hsn_code,
          opening_rate, current_rate, opening_stock, current_stock)
       VALUES ?
       ON DUPLICATE KEY UPDATE
         item_code=VALUES(item_code), item_name=VALUES(item_name),
         stock_group=VALUES(stock_group), unit=VALUES(unit),
         hsn_code=VALUES(hsn_code), opening_rate=VALUES(opening_rate),
         current_rate=VALUES(current_rate), opening_stock=VALUES(opening_stock),
         current_stock=VALUES(current_stock), synced_at=CURRENT_TIMESTAMP`,
      [values]
    ).catch(err => console.error('Item bulk upsert error:', err.message));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all items
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM item_master ORDER BY item_name ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST upsert items synced from Tally (bulk)
// Body: { items: [{ tally_id, item_code, item_name, stock_group, unit, hsn_code,
//                   opening_rate, current_rate, opening_stock, current_stock }] }
router.post('/sync', async (req, res) => {
  const { items } = req.body;
  if (!items?.length) return res.status(400).json({ error: 'No items provided' });

  try {
    for (const item of items) {
      await db.query(
        `INSERT INTO item_master
           (tally_id, item_code, item_name, stock_group, unit, hsn_code,
            opening_rate, current_rate, opening_stock, current_stock)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           item_code     = VALUES(item_code),
           item_name     = VALUES(item_name),
           stock_group   = VALUES(stock_group),
           unit          = VALUES(unit),
           hsn_code      = VALUES(hsn_code),
           opening_rate  = VALUES(opening_rate),
           current_rate  = VALUES(current_rate),
           opening_stock = VALUES(opening_stock),
           current_stock = VALUES(current_stock),
           synced_at     = CURRENT_TIMESTAMP`,
        [
          item.tally_id, item.item_code, item.item_name, item.stock_group,
          item.unit, item.hsn_code, item.opening_rate, item.current_rate,
          item.opening_stock, item.current_stock,
        ]
      );
    }
    res.json({ success: true, synced: items.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a single item by tally_id
router.delete('/:tallyId', async (req, res) => {
  try {
    await db.query('DELETE FROM item_master WHERE tally_id = ?', [req.params.tallyId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
