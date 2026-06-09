const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');
require('dotenv').config();

const dbName = process.env.DB_NAME;

// ── Column-level migration map ────────────────────────────────────────────────
// Every column that should exist per table.
// On each startup, missing columns are added automatically via ALTER TABLE.
// Adding a new column here is all that's needed for future schema changes.
const COLUMN_MAP = {
  users: {
    name:          `VARCHAR(100)  NOT NULL DEFAULT ''`,
    email:         `VARCHAR(150)  NOT NULL DEFAULT ''`,
    password_hash: `VARCHAR(255)  NOT NULL DEFAULT ''`,
    role:          `ENUM('admin','staff') NOT NULL DEFAULT 'staff'`,
    created_at:    `DATETIME DEFAULT CURRENT_TIMESTAMP`,
  },
  deliveries: {
    tally_id:         `VARCHAR(20)   NOT NULL DEFAULT ''`,
    voucher_no:       `VARCHAR(50)   NOT NULL DEFAULT ''`,
    voucher_date:     `VARCHAR(30)   NOT NULL DEFAULT ''`,
    party_name:       `VARCHAR(200)  NOT NULL DEFAULT ''`,
    party_phone:      `VARCHAR(20)   DEFAULT NULL`,
    party_address:    `TEXT`,
    item_description: `TEXT`,
    amount:           `DECIMAL(12,2) NOT NULL DEFAULT 0`,
    ledger_group:     `VARCHAR(100)  DEFAULT NULL`,
    assigned_to:      `BIGINT        NOT NULL DEFAULT 0`,
    assigned_to_name: `VARCHAR(100)  DEFAULT NULL`,
    assigned_by:      `BIGINT        NOT NULL DEFAULT 0`,
    assigned_at:      `DATETIME      DEFAULT CURRENT_TIMESTAMP`,
    status:           `ENUM('pending','completed') NOT NULL DEFAULT 'pending'`,
    completed_at:     `DATETIME      NULL`,
    notes:            `TEXT`,
    actual_location:  `TEXT`,
    completed_by:     `VARCHAR(100)  DEFAULT NULL`,
  },
  collections: {
    tally_id:         `VARCHAR(20)   NOT NULL DEFAULT ''`,
    voucher_no:       `VARCHAR(50)   NOT NULL DEFAULT ''`,
    voucher_date:     `VARCHAR(30)   NOT NULL DEFAULT ''`,
    party_name:       `VARCHAR(200)  NOT NULL DEFAULT ''`,
    party_phone:      `VARCHAR(20)   DEFAULT NULL`,
    party_address:    `TEXT`,
    description:      `TEXT`,
    amount:           `DECIMAL(12,2) NOT NULL DEFAULT 0`,
    amount_collected: `DECIMAL(12,2) DEFAULT 0`,
    ledger_group:     `VARCHAR(100)  DEFAULT NULL`,
    assigned_to:      `BIGINT        NOT NULL DEFAULT 0`,
    assigned_to_name: `VARCHAR(100)  DEFAULT NULL`,
    assigned_by:      `BIGINT        NOT NULL DEFAULT 0`,
    assigned_at:      `DATETIME      DEFAULT CURRENT_TIMESTAMP`,
    status:           `ENUM('pending','completed') NOT NULL DEFAULT 'pending'`,
    completed_at:     `DATETIME      NULL`,
    remarks:          `TEXT`,
    actual_location:  `TEXT`,
    completed_by:     `VARCHAR(100)  DEFAULT NULL`,
  },
  orders: {
    order_id:       `VARCHAR(30)   NOT NULL DEFAULT ''`,
    customer_query: `VARCHAR(300)  NOT NULL DEFAULT 'Walk-in'`,
    order_date:     `DATE          NOT NULL DEFAULT '2000-01-01'`,
    notes:          `TEXT`,
    total:          `DECIMAL(14,2) NOT NULL DEFAULT 0`,
    status:         `ENUM('Pending','Confirmed','Completed','Cancelled') NOT NULL DEFAULT 'Pending'`,
    created_at:     `DATETIME DEFAULT CURRENT_TIMESTAMP`,
  },
  order_items: {
    order_id:  `VARCHAR(30)   NOT NULL DEFAULT ''`,
    item_name: `VARCHAR(200)  NOT NULL DEFAULT ''`,
    qty:       `INT           NOT NULL DEFAULT 1`,
    rate:      `DECIMAL(14,2) NOT NULL DEFAULT 0`,
    // 'amount' is a GENERATED column — handled by CREATE TABLE only
  },
  item_master: {
    tally_id:      `VARCHAR(30)   NOT NULL DEFAULT ''`,
    item_code:     `VARCHAR(50)   NOT NULL DEFAULT ''`,
    item_name:     `VARCHAR(200)  NOT NULL DEFAULT ''`,
    stock_group:   `VARCHAR(100)  DEFAULT NULL`,
    unit:          `VARCHAR(30)   DEFAULT NULL`,
    hsn_code:      `VARCHAR(20)   DEFAULT NULL`,
    opening_rate:  `DECIMAL(14,4) DEFAULT 0`,
    current_rate:  `DECIMAL(14,4) DEFAULT 0`,
    opening_stock: `DECIMAL(14,4) DEFAULT 0`,
    current_stock: `DECIMAL(14,4) DEFAULT 0`,
    synced_at:     `DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
  },
  ledger_master: {
    tally_id:        `VARCHAR(30)   NOT NULL DEFAULT ''`,
    ledger_name:     `VARCHAR(200)  NOT NULL DEFAULT ''`,
    ledger_group:    `VARCHAR(100)  DEFAULT NULL`,
    phone:           `VARCHAR(30)   DEFAULT NULL`,
    address:         `TEXT`,
    gstin:           `VARCHAR(20)   DEFAULT NULL`,
    opening_balance: `DECIMAL(14,2) DEFAULT 0`,
    current_balance: `DECIMAL(14,2) DEFAULT 0`,
    balance_type:    `ENUM('Dr','Cr') NOT NULL DEFAULT 'Dr'`,
    synced_at:       `DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
  },
};

// ── Check & add any missing columns ──────────────────────────────────────────
async function ensureColumns(conn) {
  for (const [table, columns] of Object.entries(COLUMN_MAP)) {
    // Fetch existing columns for this table
    const [rows] = await conn.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
      [dbName, table]
    );
    const existing = new Set(rows.map(r => r.COLUMN_NAME));

    for (const [col, def] of Object.entries(columns)) {
      if (!existing.has(col)) {
        console.log(`  [migrate] ALTER TABLE ${table} ADD COLUMN ${col}`);
        try {
          await conn.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${col}\` ${def}`);
        } catch (e) {
          console.warn(`  [migrate] Skipped ${table}.${col}: ${e.message}`);
        }
      }
    }
  }
}

// ── Bootstrap: runs once at server start ─────────────────────────────────────
async function bootstrap(callback) {
  let conn;
  try {
    conn = await mysql.createConnection({
      host:               process.env.DB_HOST,
      port:               parseInt(process.env.DB_PORT) || 3306,
      user:               process.env.DB_USER,
      password:           process.env.DB_PASSWORD,
      multipleStatements: true,
    });

    // 1. Create database if missing
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await conn.query(`USE \`${dbName}\``);

    // 2. Create all tables (IF NOT EXISTS — safe on every boot)
    const schema = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
    await conn.query(schema);

    // 3. Add any columns that are missing from existing tables
    await ensureColumns(conn);

    // 4. Seed default data (idempotent — INSERT IGNORE)
    const seeds = fs.readFileSync(path.join(__dirname, '../database/seeds.sql'), 'utf8');
    await conn.query(seeds);

    console.log(`DB '${dbName}' ready — tables & columns verified`);
  } catch (err) {
    console.error('Bootstrap failed:', err.message);
    process.exit(1);
  } finally {
    if (conn) await conn.end();
  }

  callback();
}

// ── Connection pool (used by all routes) ─────────────────────────────────────
const pool = mysql.createPool({
  host:             process.env.DB_HOST,
  port:             parseInt(process.env.DB_PORT) || 3306,
  user:             process.env.DB_USER,
  password:         process.env.DB_PASSWORD,
  database:         dbName,
  waitForConnections: true,
  connectionLimit:  10,
  queueLimit:       0,
});

module.exports = { pool, bootstrap };
