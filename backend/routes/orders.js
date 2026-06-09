const express = require('express');
const router = express.Router();
const { pool: db } = require('../config/db');

// GET all orders with their items
router.get('/', async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    const [items] = await db.query('SELECT * FROM order_items');
    const result = orders.map(o => ({
      ...o,
      items: items.filter(i => i.order_id === o.order_id),
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new order with items
// Body: { order_id, customer_query, order_date, notes, total, items: [{ item_name, qty, rate }] }
router.post('/', async (req, res) => {
  const { order_id, customer_query, order_date, notes, total, items } = req.body;
  if (!order_id || !items?.length) return res.status(400).json({ error: 'order_id and items are required' });

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(
      `INSERT INTO orders (order_id, customer_query, order_date, notes, total)
       VALUES (?, ?, ?, ?, ?)`,
      [order_id, customer_query || 'Walk-in', order_date, notes || null, total]
    );
    for (const item of items) {
      await conn.query(
        'INSERT INTO order_items (order_id, item_name, qty, rate) VALUES (?, ?, ?, ?)',
        [order_id, item.name || item.item_name, item.qty, item.rate]
      );
    }
    await conn.commit();
    res.json({ success: true, order_id });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

// PUT update an order with items
// Body: { customer_query, order_date, notes, total, items: [{ item_name, qty, rate }] }
router.put('/:orderId', async (req, res) => {
  const { customer_query, order_date, notes, total, items } = req.body;
  const { orderId } = req.params;
  if (!items?.length) return res.status(400).json({ error: 'items are required' });

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    
    // 1. Update the order
    await conn.query(
      `UPDATE orders SET customer_query = ?, order_date = ?, notes = ?, total = ? WHERE order_id = ?`,
      [customer_query || 'Walk-in', order_date, notes || null, total, orderId]
    );

    // 2. Delete old items
    await conn.query('DELETE FROM order_items WHERE order_id = ?', [orderId]);

    // 3. Insert new items
    for (const item of items) {
      await conn.query(
        'INSERT INTO order_items (order_id, item_name, qty, rate) VALUES (?, ?, ?, ?)',
        [orderId, item.name || item.item_name, item.qty, item.rate]
      );
    }

    await conn.commit();
    res.json({ success: true, order_id: orderId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

// PATCH update order status
// Body: { status }
router.patch('/:orderId/status', async (req, res) => {
  try {
    await db.query('UPDATE orders SET status = ? WHERE order_id = ?', [req.body.status, req.params.orderId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE an order (cascades to order_items)
router.delete('/:orderId', async (req, res) => {
  try {
    await db.query('DELETE FROM orders WHERE order_id = ?', [req.params.orderId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
