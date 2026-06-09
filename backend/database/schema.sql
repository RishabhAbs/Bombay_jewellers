-- Database: abstechnologieso_absbombay
-- Run this file once to set up all tables

-- -----------------------------------------------
-- USERS (staff members)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL,
  email         VARCHAR(150)  UNIQUE NOT NULL,
  password_hash VARCHAR(255)  NOT NULL,
  role          ENUM('admin', 'staff') NOT NULL DEFAULT 'staff',
  created_at    DATETIME      DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------
-- DELIVERIES  (only assigned vouchers are saved)
-- status: pending → completed
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS deliveries (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  tally_id         VARCHAR(20)    NOT NULL,        -- e.g. TV-2601
  voucher_no       VARCHAR(50)    NOT NULL,
  voucher_date     VARCHAR(30)    NOT NULL,
  party_name       VARCHAR(200)   NOT NULL,
  party_phone      VARCHAR(20),
  party_address    TEXT,
  item_description TEXT,
  amount           DECIMAL(12,2)  NOT NULL,
  ledger_group     VARCHAR(100),
  assigned_to      BIGINT         NOT NULL,
  assigned_to_name VARCHAR(100),
  assigned_by      BIGINT         NOT NULL,
  assigned_at      DATETIME       DEFAULT CURRENT_TIMESTAMP,
  status           ENUM('pending','completed') NOT NULL DEFAULT 'pending',
  completed_at     DATETIME       NULL
);

-- -----------------------------------------------
-- COLLECTIONS  (only assigned vouchers are saved)
-- status: pending → completed
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS collections (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  tally_id         VARCHAR(20)    NOT NULL,        -- e.g. TC-2601
  voucher_no       VARCHAR(50)    NOT NULL,
  voucher_date     VARCHAR(30)    NOT NULL,
  party_name       VARCHAR(200)   NOT NULL,
  party_phone      VARCHAR(20),
  party_address    TEXT,
  description      TEXT,
  amount           DECIMAL(12,2)  NOT NULL,
  amount_collected DECIMAL(12,2)  DEFAULT 0,
  ledger_group     VARCHAR(100),
  assigned_to      BIGINT         NOT NULL,
  assigned_to_name VARCHAR(100),
  assigned_by      BIGINT         NOT NULL,
  assigned_at      DATETIME       DEFAULT CURRENT_TIMESTAMP,
  status           ENUM('pending','completed') NOT NULL DEFAULT 'pending',
  completed_at     DATETIME       NULL
);

-- -----------------------------------------------
-- ORDERS  (customer orders created in the app)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  order_id         VARCHAR(30)    NOT NULL UNIQUE,   -- e.g. ORD-1716000000000
  customer_query   VARCHAR(300)   NOT NULL DEFAULT 'Walk-in',
  order_date       DATE           NOT NULL,
  notes            TEXT,
  total            DECIMAL(14,2)  NOT NULL DEFAULT 0,
  status           ENUM('Pending','Confirmed','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  created_at       DATETIME       DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------
-- ORDER ITEMS  (line items for each order)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  order_id   VARCHAR(30)   NOT NULL,
  item_name  VARCHAR(200)  NOT NULL,
  qty        INT           NOT NULL DEFAULT 1,
  rate       DECIMAL(14,2) NOT NULL DEFAULT 0,
  amount     DECIMAL(14,2) GENERATED ALWAYS AS (qty * rate) STORED,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- -----------------------------------------------
-- ITEM MASTER  (stock items synced from Tally ERP)
-- Columns reflect Tally stock item fields.
-- Add new columns here as Tally sends more data.
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS item_master (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  tally_id         VARCHAR(30)    NOT NULL UNIQUE,  -- e.g. IM-001
  item_code        VARCHAR(50)    NOT NULL,          -- Tally stock item alias/code
  item_name        VARCHAR(200)   NOT NULL,
  stock_group      VARCHAR(100),                     -- Tally stock group name
  unit             VARCHAR(30),                      -- e.g. Grams, Pieces
  hsn_code         VARCHAR(20),
  opening_rate     DECIMAL(14,4)  DEFAULT 0,
  current_rate     DECIMAL(14,4)  DEFAULT 0,
  opening_stock    DECIMAL(14,4)  DEFAULT 0,
  current_stock    DECIMAL(14,4)  DEFAULT 0,
  synced_at        DATETIME       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -----------------------------------------------
-- LEDGER MASTER  (ledger accounts synced from Tally ERP)
-- Columns reflect Tally ledger fields.
-- Add new columns here as Tally sends more data.
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS ledger_master (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  tally_id         VARCHAR(30)    NOT NULL UNIQUE,  -- e.g. LM-001
  ledger_name      VARCHAR(200)   NOT NULL,
  ledger_group     VARCHAR(100),                     -- Tally group (Sundry Debtors, Bank, etc.)
  phone            VARCHAR(30),
  address          TEXT,
  gstin            VARCHAR(20),
  opening_balance  DECIMAL(14,2)  DEFAULT 0,
  current_balance  DECIMAL(14,2)  DEFAULT 0,
  balance_type     ENUM('Dr','Cr') NOT NULL DEFAULT 'Dr',
  synced_at        DATETIME       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
