const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
require('dotenv').config();

const { bootstrap } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// ── API routes ────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: process.env.DB_NAME });
});

app.use('/api/users',         require('./routes/users'));
app.use('/api/deliveries',    require('./routes/deliveries'));
app.use('/api/collections',   require('./routes/collections'));
app.use('/api/item-master',   require('./routes/itemMaster'));
app.use('/api/ledger-master', require('./routes/ledgerMaster'));
app.use('/api/orders',        require('./routes/orders'));

// ── APK download & status ─────────────────────────────────────────────────────
const APK_PATH = path.join(__dirname, 'apk', 'BombayJewellers.apk');

app.get('/api/apk-status', (req, res) => {
  res.json({ available: fs.existsSync(APK_PATH) });
});

app.get('/BombayJewellers.apk', (req, res) => {
  if (fs.existsSync(APK_PATH)) {
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', 'attachment; filename="BombayJewellers.apk"');
    res.sendFile(APK_PATH);
  } else {
    res.status(404).json({ message: 'APK not yet available' });
  }
});

// ── Serve React build (production) ───────────────────────────────────────────
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// PORT: EB injects $PORT; fall back to SERVER_PORT for local dev
const PORT = process.env.PORT || process.env.SERVER_PORT || 5000;

bootstrap(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
