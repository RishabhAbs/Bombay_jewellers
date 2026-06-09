-- Seed initial users (matches INITIAL_USERS in frontend App.jsx)
-- INSERT IGNORE skips if id already exists
INSERT IGNORE INTO users (id, name, email, password_hash, role) VALUES
  (1, 'Super Admin',  'admin@bombayjewellers.com', 'admin', 'admin'),
  (2, 'Rohan Sharma', 'rohan@bombayjewellers.com', 'user',  'staff'),
  (3, 'Pooja Patel',  'pooja@bombayjewellers.com', 'user',  'staff');
