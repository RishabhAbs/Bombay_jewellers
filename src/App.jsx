import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  LogOut, 
  Home, 
  UserPlus, 
  Shield, 
  TrendingUp, 
  Bell, 
  CheckCircle, 
  X, 
  AlertTriangle, 
  Lock,
  Key, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronDown, 
  DollarSign, 
  ChevronRight,
  MapPin,
  Clock,
  Sparkles,
  Eye,
  EyeOff,
  Edit2,
  UserX,
  UserCheck,
  Package,
  Truck,
  Search,
  Plus,
  Filter,
  Trash2,
  Check,
  ArrowUpDown,
  Database,
  RefreshCw,
  Link,
  Tag,
  Navigation,
  Menu,
  ShoppingCart,
  FileText,
  MessageSquare,
  Minus,
  BookOpen,
  Download
} from 'lucide-react';
import logoImg from './assets/logo.png';
import './App.css';

// Sleek iOS-style Toggle Switch
const IOSSwitch = ({ checked, onChange }) => {
  return (
    <div 
      onClick={() => onChange(!checked)}
      style={{
        width: '42px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: checked ? '#ef4444' : '#e2e8f0',
        padding: '2px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: checked ? 'flex-end' : 'flex-start'
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'all 0.2s ease-in-out'
      }} />
    </div>
  );
};

// Swipeable card for mobile user list rows
const SwipeableCard = ({ children, actions, snap = 170 }) => {
  const [offset, setOffset] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const touchStartX = useRef(null);
  const baseOffset = useRef(0);
  const SNAP = snap;

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    baseOffset.current = isOpen ? SNAP : 0;
  };
  const onTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.touches[0].clientX;
    setOffset(Math.max(0, Math.min(SNAP, baseOffset.current + delta)));
  };
  const onTouchEnd = () => {
    const snap = offset > SNAP / 2;
    setOffset(snap ? SNAP : 0);
    setIsOpen(snap);
    touchStartX.current = null;
  };

  if (!actions) return <div style={{ borderBottom: '1px solid #e2e8f0' }}>{children}</div>;

  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: SNAP + 'px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        backgroundColor: '#f1f5f9', paddingRight: '0.5rem'
      }}>
        {actions}
      </div>
      <div
        style={{
          transform: `translateX(-${offset}px)`,
          transition: touchStartX.current !== null ? 'none' : 'transform 0.2s ease',
          backgroundColor: '#ffffff', position: 'relative', zIndex: 1
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

// Default initial database seed
const INITIAL_USERS = [
  {
    id: 1,
    name: 'Super Admin',
    username: 'admin',
    email: 'admin@bombayjewellers.com',
    phone: '+91 98765 43210',
    role: 'admin',
    password: 'admin',
    joinedDate: 'May 10, 2026'
  },
  {
    id: 2,
    name: 'Rohan Sharma',
    username: 'user',
    email: 'rohan@bombayjewellers.com',
    phone: '+91 98123 45678',
    role: 'user',
    password: 'user',
    joinedDate: 'May 12, 2026'
  },
  {
    id: 3,
    name: 'Pooja Patel',
    username: 'pooja',
    email: 'pooja@bombayjewellers.com',
    phone: '+91 98222 33344',
    role: 'user',
    password: 'user',
    joinedDate: 'May 15, 2026'
  }
];

// ── Tally ERP Mock Voucher Data ──────────────────────────────────────────────
const TALLY_VOUCHERS_SEED = [
  {
    id: 'TV-2601',
    voucherNo: 'SV/2025-26/0412',
    voucherDate: 'May 20, 2026',
    partyName: 'Rajesh Kumar Gupta',
    partyPhone: '+91 98200 11223',
    partyAddress: 'Shop No. 7, Manish Market, Grant Road East, Mumbai - 400007',
    itemDescription: '22K Gold Chain (18g) + Earring Set',
    amount: 85000,
    ledgerGroup: 'Sundry Debtors'
  },
  {
    id: 'TV-2602',
    voucherNo: 'SV/2025-26/0413',
    voucherDate: 'May 20, 2026',
    partyName: 'Meena Agarwal',
    partyPhone: '+91 99204 55678',
    partyAddress: 'B-204, Sai Residency, Malad West, Mumbai - 400064',
    itemDescription: 'Diamond Nose Pin (0.15ct)',
    amount: 32500,
    ledgerGroup: 'Sundry Debtors'
  },
  {
    id: 'TV-2603',
    voucherNo: 'SV/2025-26/0414',
    voucherDate: 'May 20, 2026',
    partyName: 'Suresh Chand Jain',
    partyPhone: '+91 97699 33445',
    partyAddress: '14/A, Navratna Complex, Zaveri Bazaar, Mumbai - 400002',
    itemDescription: '24K Gold Coin (10g) - Laxmi',
    amount: 74000,
    ledgerGroup: 'Sundry Debtors'
  },
  {
    id: 'TV-2604',
    voucherNo: 'SV/2025-26/0415',
    voucherDate: 'May 20, 2026',
    partyName: 'Priya Nair',
    partyPhone: '+91 86000 77889',
    partyAddress: 'Flat 501, Lotus Tower, Andheri West, Mumbai - 400058',
    itemDescription: 'Platinum Wedding Band Set (His & Hers)',
    amount: 128000,
    ledgerGroup: 'Sundry Debtors'
  },
  {
    id: 'TV-2605',
    voucherNo: 'SV/2025-26/0416',
    voucherDate: 'May 19, 2026',
    partyName: 'Hemant Shah',
    partyPhone: '+91 98330 21100',
    partyAddress: 'C-7, Royal Gardens, Borivali East, Mumbai - 400066',
    itemDescription: '22K Gold Bangles Set (4 pcs, 32g)',
    amount: 155200,
    ledgerGroup: 'Sundry Debtors'
  }
];

const TALLY_COLLECTIONS_SEED = [
  {
    id: 'TC-2601',
    voucherNo: 'RCV/2025-26/0301',
    voucherDate: 'May 19, 2026',
    partyName: 'Rajesh Jewellers',
    partyPhone: '+91 98765 12345',
    partyAddress: 'Zaveri Bazaar, Kalbadevi, Mumbai - 400002',
    description: 'Outstanding balance – Sales Invoice SV/2025-26/0389',
    amount: 75000,
    ledgerGroup: 'Sundry Debtors'
  },
  {
    id: 'TC-2602',
    voucherNo: 'RCV/2025-26/0302',
    voucherDate: 'May 20, 2026',
    partyName: 'Karan Johar Gold',
    partyPhone: '+91 99988 88877',
    partyAddress: 'Linking Road, Bandra West, Mumbai - 400050',
    description: 'Pending dues – Gold purchase credit balance',
    amount: 120000,
    ledgerGroup: 'Sundry Debtors'
  },
  {
    id: 'TC-2603',
    voucherNo: 'RCV/2025-26/0303',
    voucherDate: 'May 20, 2026',
    partyName: 'Sharma Brothers Jewels',
    partyPhone: '+91 97654 32109',
    partyAddress: 'Shop 14, Mulji Jetha Market, Kalbadevi, Mumbai - 400002',
    description: 'EMI Collection – Diamond Set instalment 3/6',
    amount: 45000,
    ledgerGroup: 'Sundry Debtors'
  },
  {
    id: 'TC-2604',
    voucherNo: 'RCV/2025-26/0304',
    voucherDate: 'May 19, 2026',
    partyName: 'Lata Gold Palace',
    partyPhone: '+91 98100 56789',
    partyAddress: 'C-2, Gold Exchange Complex, Dadar West, Mumbai - 400028',
    description: 'Outstanding balance – Bulk silver order credit',
    amount: 98500,
    ledgerGroup: 'Sundry Debtors'
  },
  {
    id: 'TC-2605',
    voucherNo: 'RCV/2025-26/0305',
    voucherDate: 'May 18, 2026',
    partyName: 'Patel Diamond House',
    partyPhone: '+91 90000 77654',
    partyAddress: 'Opera House, Girgaon, Mumbai - 400004',
    description: 'Pending recovery – Solitaire set payment',
    amount: 220000,
    ledgerGroup: 'Sundry Debtors'
  }
];

const TALLY_ITEM_MASTER_SEED = [
  {
    id: 'IM-001',
    itemCode: 'GJ-22K-001',
    itemName: '22K Gold Chain',
    stockGroup: 'Gold Jewellery',
    unit: 'Grams',
    hsnCode: '7113',
    openingRate: 6200,
    currentRate: 6450,
    openingStock: 450,
    currentStock: 312,
  },
  {
    id: 'IM-002',
    itemCode: 'GJ-22K-002',
    itemName: '22K Gold Bangles Set',
    stockGroup: 'Gold Jewellery',
    unit: 'Grams',
    hsnCode: '7113',
    openingRate: 6200,
    currentRate: 6450,
    openingStock: 320,
    currentStock: 218,
  },
  {
    id: 'IM-003',
    itemCode: 'GJ-24K-001',
    itemName: '24K Gold Coin (Laxmi)',
    stockGroup: 'Gold Coins',
    unit: 'Pieces',
    hsnCode: '7108',
    openingRate: 74000,
    currentRate: 76500,
    openingStock: 50,
    currentStock: 34,
  },
  {
    id: 'IM-004',
    itemCode: 'DJ-DIA-001',
    itemName: 'Diamond Nose Pin (0.15ct)',
    stockGroup: 'Diamond Jewellery',
    unit: 'Pieces',
    hsnCode: '7113',
    openingRate: 30000,
    currentRate: 32500,
    openingStock: 25,
    currentStock: 18,
  },
  {
    id: 'IM-005',
    itemCode: 'PJ-PT-001',
    itemName: 'Platinum Wedding Band Set',
    stockGroup: 'Platinum Jewellery',
    unit: 'Pieces',
    hsnCode: '7113',
    openingRate: 120000,
    currentRate: 128000,
    openingStock: 12,
    currentStock: 7,
  },
  {
    id: 'IM-006',
    itemCode: 'SJ-SIL-001',
    itemName: 'Silver Anklet Pair',
    stockGroup: 'Silver Jewellery',
    unit: 'Grams',
    hsnCode: '7113',
    openingRate: 110,
    currentRate: 115,
    openingStock: 800,
    currentStock: 560,
  },
  {
    id: 'IM-007',
    itemCode: 'GJ-22K-003',
    itemName: '22K Gold Earring Set',
    stockGroup: 'Gold Jewellery',
    unit: 'Grams',
    hsnCode: '7113',
    openingRate: 6200,
    currentRate: 6450,
    openingStock: 280,
    currentStock: 195,
  },
  {
    id: 'IM-008',
    itemCode: 'DJ-DIA-002',
    itemName: 'Diamond Solitaire Ring (0.5ct)',
    stockGroup: 'Diamond Jewellery',
    unit: 'Pieces',
    hsnCode: '7113',
    openingRate: 95000,
    currentRate: 102000,
    openingStock: 8,
    currentStock: 5,
  },
];

const TALLY_LEDGER_MASTER_SEED = [
  {
    id: 'LM-001',
    ledgerName: 'Rajesh Jewellers',
    ledgerGroup: 'Sundry Debtors',
    phone: '+91 98765 12345',
    address: 'Zaveri Bazaar, Kalbadevi, Mumbai - 400002',
    openingBalance: 75000,
    currentBalance: 142000,
    balanceType: 'Dr',
    gstin: '27AABCR1234D1Z5',
  },
  {
    id: 'LM-002',
    ledgerName: 'Karan Johar Gold',
    ledgerGroup: 'Sundry Debtors',
    phone: '+91 99988 88877',
    address: 'Linking Road, Bandra West, Mumbai - 400050',
    openingBalance: 120000,
    currentBalance: 98500,
    balanceType: 'Dr',
    gstin: '27AACKJ5678E2Z3',
  },
  {
    id: 'LM-003',
    ledgerName: 'Sharma Brothers Jewels',
    ledgerGroup: 'Sundry Debtors',
    phone: '+91 97654 32109',
    address: 'Shop 14, Mulji Jetha Market, Kalbadevi, Mumbai - 400002',
    openingBalance: 45000,
    currentBalance: 45000,
    balanceType: 'Dr',
    gstin: '27AABCS2345F3Z1',
  },
  {
    id: 'LM-004',
    ledgerName: 'Gold Supplier Co.',
    ledgerGroup: 'Sundry Creditors',
    phone: '+91 93456 78901',
    address: 'Opera House, Girgaon, Mumbai - 400004',
    openingBalance: 200000,
    currentBalance: 155000,
    balanceType: 'Cr',
    gstin: '27AABCG6789H4Z8',
  },
  {
    id: 'LM-005',
    ledgerName: 'HDFC Bank - Current A/C',
    ledgerGroup: 'Bank Accounts',
    phone: '',
    address: 'Branch: Zaveri Bazaar, Mumbai',
    openingBalance: 500000,
    currentBalance: 734200,
    balanceType: 'Dr',
    gstin: '',
  },
  {
    id: 'LM-006',
    ledgerName: 'Cash in Hand',
    ledgerGroup: 'Cash-in-Hand',
    phone: '',
    address: '',
    openingBalance: 50000,
    currentBalance: 38750,
    balanceType: 'Dr',
    gstin: '',
  },
  {
    id: 'LM-007',
    ledgerName: 'CGST Payable',
    ledgerGroup: 'Duties & Taxes',
    phone: '',
    address: '',
    openingBalance: 0,
    currentBalance: 28600,
    balanceType: 'Cr',
    gstin: '',
  },
  {
    id: 'LM-008',
    ledgerName: 'SGST Payable',
    ledgerGroup: 'Duties & Taxes',
    phone: '',
    address: '',
    openingBalance: 0,
    currentBalance: 28600,
    balanceType: 'Cr',
    gstin: '',
  },
  {
    id: 'LM-009',
    ledgerName: 'Patel Diamond House',
    ledgerGroup: 'Sundry Debtors',
    phone: '+91 90000 77654',
    address: 'Opera House, Girgaon, Mumbai - 400004',
    openingBalance: 220000,
    currentBalance: 185000,
    balanceType: 'Dr',
    gstin: '27AABCP9012I5Z2',
  },
  {
    id: 'LM-010',
    ledgerName: 'Capital Account',
    ledgerGroup: 'Capital Account',
    phone: '',
    address: '',
    openingBalance: 2000000,
    currentBalance: 2350000,
    balanceType: 'Cr',
    gstin: '',
  },
];

const TALLY_EMPLOYEES_SEED = [
  {
    id: 'TE-2601',
    name: 'Vikram Desai',
    phone: '+91 98100 44556',
    email: 'vikram@bombayjewellers.com',
    department: 'Retail Sales',
    tallyLedger: 'Vikram Desai – Employee Ledger'
  },
  {
    id: 'TE-2602',
    name: 'Sunita Rao',
    phone: '+91 97200 33445',
    email: 'sunita@bombayjewellers.com',
    department: 'Logistics',
    tallyLedger: 'Sunita Rao – Employee Ledger'
  },
  {
    id: 'TE-2603',
    name: 'Amit Tiwari',
    phone: '+91 96300 22334',
    email: 'amit@bombayjewellers.com',
    department: 'Finance',
    tallyLedger: 'Amit Tiwari – Employee Ledger'
  },
  {
    id: 'TE-2604',
    name: 'Kavya Menon',
    phone: '+91 95400 11223',
    email: 'kavya@bombayjewellers.com',
    department: 'Operations',
    tallyLedger: 'Kavya Menon – Employee Ledger'
  }
];

const INITIAL_DELIVERIES = [];

const INITIAL_COLLECTIONS = [];

// Initial dummy alerts and gold rates for a premium feel
const GOLD_RATES = [
  { metal: 'Gold 24K', price: '₹7,450 / g', change: '-₹15', trend: 'down' },
  { metal: 'Gold 22K', price: '₹6,830 / g', change: '+₹25', trend: 'up' },
  { metal: 'Silver 999', price: '₹92.50 / g', change: '+₹0.80', trend: 'up' }
];

// One-time clear of old delivery/collection cache (commented out to preserve DB-synced cache)
// localStorage.removeItem('bj_deliveries');
// localStorage.removeItem('bj_collections');
// localStorage.removeItem('bj_assigned_vouchers');
// localStorage.removeItem('bj_assigned_col_vouchers');

function App() {
  // --- Persistent Database ---
  // --- Persistent Database ---
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('bj_users');
      return saved && saved !== 'undefined' ? JSON.parse(saved) : INITIAL_USERS;
    } catch (e) {
      console.error("bj_users local storage parsing failed:", e);
      return INITIAL_USERS;
    }
  });

  // Sync all users to backend on load
  useEffect(() => {
    fetch('/api/users/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ users }),
    }).catch(err => console.error('Users sync failed:', err));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bj_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  const [deliveries, setDeliveries] = useState(() => {
    try {
      const saved = localStorage.getItem('bj_deliveries');
      return saved && saved !== 'undefined' ? JSON.parse(saved) : INITIAL_DELIVERIES;
    } catch (e) {
      console.error("bj_deliveries local storage parsing failed:", e);
      return INITIAL_DELIVERIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bj_deliveries', JSON.stringify(deliveries));
    } catch (e) {
      console.error(e);
    }
  }, [deliveries]);

  const [collectionTasks, setCollectionTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('bj_collections');
      return saved && saved !== 'undefined' ? JSON.parse(saved) : INITIAL_COLLECTIONS;
    } catch (e) {
      console.error("bj_collections local storage parsing failed:", e);
      return INITIAL_COLLECTIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bj_collections', JSON.stringify(collectionTasks));
    } catch (e) {
      console.error(e);
    }
  }, [collectionTasks]);

  // --- Auth State ---
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bj_current_user');
      return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("bj_current_user local storage parsing failed:", e);
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bj_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bj_current_user');
    }
  }, [currentUser]);

  // --- Dynamic Dashboard State ---
  const [pendingTasksCount, setPendingTasksCount] = useState(3);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Backup database scheduled successfully', type: 'info', time: '10 mins ago' },
    { id: 2, text: 'Gold price rates updated', type: 'success', time: '1 hour ago' },
    { id: 3, text: 'Rohan logged in from Mumbai, India', type: 'info', time: '3 hours ago' }
  ]);

  // --- Form & Screen States ---
  const [activeTab, setActiveTab] = useState('Home'); // 'Home' or 'User'
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // --- Modals States ---
  const [pwaInstallPrompt, setPwaInstallPrompt] = useState(null);
  const isInWebView = typeof window !== 'undefined' &&
    (!!window.Capacitor || /wv|WebView/.test(navigator.userAgent));

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedUserForReset, setSelectedUserForReset] = useState(null);
  const [newResetPassword, setNewResetPassword] = useState('');
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');
  const [editRole, setEditRole] = useState('user');

  // --- New User Form Inputs ---
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState('user');
  const [newPassword, setNewPassword] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newStateVal, setNewStateVal] = useState('');
  const DEFAULT_PERMISSIONS = { view: false, create: false, edit: false, delete: false };
  const [newPermissions, setNewPermissions] = useState({
    Deliveries: { ...DEFAULT_PERMISSIONS },
    Collections: { ...DEFAULT_PERMISSIONS },
    Orders: { ...DEFAULT_PERMISSIONS },
    Master: { ...DEFAULT_PERMISSIONS },
  });
  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileCurrentPassword, setProfileCurrentPassword] = useState('');
  const [profileNewPassword, setProfileNewPassword] = useState('');
  const [profileConfirmPassword, setProfileConfirmPassword] = useState('');
  const [showProfilePasswords, setShowProfilePasswords] = useState(false);

  // --- Tally Integration States (Deliveries) ---
  const [tallyData, setTallyData] = useState(() => {
    try { const s = localStorage.getItem('bj_tally_vouchers'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [tallyLoading, setTallyLoading] = useState(false);
  const [tallyFetched, setTallyFetched] = useState(false);
  const [assignedVoucherIds, setAssignedVoucherIds] = useState(() => {
    try {
      const saved = localStorage.getItem('bj_assigned_vouchers');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [tallyVoucherRef, setTallyVoucherRef] = useState(null);
  const [tallyAmountRef, setTallyAmountRef] = useState(null);

  // --- Tally Employee Sync States ---
  const [tallyEmpData, setTallyEmpData] = useState([]);
  const [tallyEmpLoading, setTallyEmpLoading] = useState(false);
  const [tallyEmpFetched, setTallyEmpFetched] = useState(false);
  const [importedTallyEmpIds, setImportedTallyEmpIds] = useState(() => {
    try {
      const saved = localStorage.getItem('bj_imported_tally_emps');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [showGrantAccessModal, setShowGrantAccessModal] = useState(false);
  const [selectedTallyEmployee, setSelectedTallyEmployee] = useState(null);
  const [grantUsername, setGrantUsername] = useState('');
  const [grantPassword, setGrantPassword] = useState('');
  const [grantRole, setGrantRole] = useState('user');
  const [grantSuccessMessage, setGrantSuccessMessage] = useState('');
  const [grantErrorMessage, setGrantErrorMessage] = useState('');

  // --- Tally Integration States (Collections) ---
  const [tallyColData, setTallyColData] = useState(() => {
    try { const s = localStorage.getItem('bj_tally_collections'); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [tallyColLoading, setTallyColLoading] = useState(false);
  const [tallyColFetched, setTallyColFetched] = useState(false);
  const [assignedColVoucherIds, setAssignedColVoucherIds] = useState(() => {
    try {
      const saved = localStorage.getItem('bj_assigned_col_vouchers');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [colTallyVoucherRef, setColTallyVoucherRef] = useState(null);
  const [colTallyAmountRef, setColTallyAmountRef] = useState(null);

  useEffect(() => {
    try { localStorage.setItem('bj_tally_vouchers', JSON.stringify(tallyData)); } catch (e) { console.error(e); }
  }, [tallyData]);

  useEffect(() => {
    try { localStorage.setItem('bj_tally_collections', JSON.stringify(tallyColData)); } catch (e) { console.error(e); }
  }, [tallyColData]);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setPwaInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);


  // --- Deliveries Sub-Tab Navigation ---
  const [deliverySubTab, setDeliverySubTab] = useState('unassigned');

  useEffect(() => {
    if (currentUser && currentUser.role !== 'admin') {
      setDeliverySubTab('pending');
    } else {
      setDeliverySubTab('unassigned');
    }
  }, [currentUser]);

  // --- Collections Sub-Tab Navigation ---
  const [collectionSubTab, setCollectionSubTab] = useState('unassigned');
  const [masterSubTab, setMasterSubTab] = useState(null);
  const [showMasterDropdown, setShowMasterDropdown] = useState(false);
  const [tallyItemMasterData, setTallyItemMasterData] = useState([]);
  const [tallyItemMasterLoading, setTallyItemMasterLoading] = useState(false);
  const [tallyItemMasterFetched, setTallyItemMasterFetched] = useState(false);
  const [itemMasterSearch, setItemMasterSearch] = useState('');
  const [itemMasterGroupFilter, setItemMasterGroupFilter] = useState('All');
  const [tallyLedgerMasterData, setTallyLedgerMasterData] = useState([]);
  const [tallyLedgerMasterLoading, setTallyLedgerMasterLoading] = useState(false);
  const [tallyLedgerMasterFetched, setTallyLedgerMasterFetched] = useState(false);
  const [ledgerMasterSearch, setLedgerMasterSearch] = useState('');
  const [deliveryPage, setDeliveryPage] = useState(1);
  const [collectionPage, setCollectionPage] = useState(1);
  const [itemMasterPage, setItemMasterPage] = useState(1);
  const [ledgerMasterPage, setLedgerMasterPage] = useState(1);
  const [deliveryReportPage, setDeliveryReportPage] = useState(1);
  const [collectionReportPage, setCollectionReportPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);

  useEffect(() => {
    if (currentUser && currentUser.role !== 'admin') {
      setCollectionSubTab('pending');
    } else {
      setCollectionSubTab('unassigned');
    }
  }, [currentUser]);

  // --- Deliveries Module Form States ---
  const [assignProduct, setAssignProduct] = useState('');
  const [assignCustomer, setAssignCustomer] = useState('');
  const [assignPhone, setAssignPhone] = useState('');
  const [assignAddress, setAssignAddress] = useState('');
  const [assignStaffId, setAssignStaffId] = useState('');
  const [assignNotes, setAssignNotes] = useState('');
  const [assignSuccessMessage, setAssignSuccessMessage] = useState('');
  const [assignErrorMessage, setAssignErrorMessage] = useState('');

  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedDeliveryForCompletion, setSelectedDeliveryForCompletion] = useState(null);
  const [completionLocation, setCompletionLocation] = useState('');
  const [completionNotes, setCompletionNotes] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);

  // --- Orders States ---
  const [orders, setOrders] = useState(() => { try { return JSON.parse(localStorage.getItem('bj_orders') || '[]'); } catch { return []; } });
  const [orderSearch, setOrderSearch] = useState('');
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showOrderNotes, setShowOrderNotes] = useState(false);
  const [orderForm, setOrderForm] = useState({ customerQuery: '', date: new Date().toISOString().split('T')[0], items: [], notes: '' });
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [showOrderDeleteModal, setShowOrderDeleteModal] = useState(false);
  const [selectedOrderForDelete, setSelectedOrderForDelete] = useState(null);
  const [orderItemQuery, setOrderItemQuery] = useState('');
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [orderItemForm, setOrderItemForm] = useState({ name: '', qty: 1, rate: '', discount: 0 });
  const [showAddItemRow, setShowAddItemRow] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  // --- Deliveries Premium Report Filter States ---
  const [deliverySearch, setDeliverySearch] = useState('');
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState('All');
  const [deliveryStaffFilter, setDeliveryStaffFilter] = useState('All');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedVoucherIds, setSelectedVoucherIds] = useState([]);
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);
  const [bulkAssignStaffId, setBulkAssignStaffId] = useState('');
  const [selectedColVoucherIds, setSelectedColVoucherIds] = useState([]);
  const [showBulkColAssignModal, setShowBulkColAssignModal] = useState(false);
  const [bulkColAssignStaffId, setBulkColAssignStaffId] = useState('');
  const [showMobileSelection, setShowMobileSelection] = useState(false);
  const [showMobileColSelection, setShowMobileColSelection] = useState(false);
  const [showBulkStaffDropdown, setShowBulkStaffDropdown] = useState(false);
  const [showBulkColStaffDropdown, setShowBulkColStaffDropdown] = useState(false);
  const [deliverySortField, setDeliverySortField] = useState('product');
  const [deliverySortDirection, setDeliverySortDirection] = useState('asc');

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showStaffDropdown, setShowStaffDropdown] = useState(false);
  const statusDropdownRef = useRef(null);
  const staffDropdownRef = useRef(null);

  // --- Money Collections Module States ---
  const [showAssignCollectionModal, setShowAssignCollectionModal] = useState(false);
  const [showCollectionReportModal, setShowCollectionReportModal] = useState(false);
  const [selectedCollectionForReport, setSelectedCollectionForReport] = useState(null);

  // Form states: Assign Collection
  const [colClientName, setColClientName] = useState('');
  const [colClientPhone, setColClientPhone] = useState('');
  const [colLocation, setColLocation] = useState('');
  const [colAmountToCollect, setColAmountToCollect] = useState('');
  const [colAssignedToId, setColAssignedToId] = useState('');
  const [colAssignSuccessMessage, setColAssignSuccessMessage] = useState('');
  const [colAssignErrorMessage, setColAssignErrorMessage] = useState('');

  // Form states: Report/Complete Collection
  const [colAmountCollected, setColAmountCollected] = useState('');
  const [colAmountPending, setColAmountPending] = useState('');
  const [colRemarks, setColRemarks] = useState('');
  const [colReportSuccessMessage, setColReportSuccessMessage] = useState('');
  const [colReportErrorMessage, setColReportErrorMessage] = useState('');

  // Filters: Collections
  const [collectionSearch, setCollectionSearch] = useState('');
  const [collectionStatusFilter, setCollectionStatusFilter] = useState('All');
  const [collectionStaffFilter, setCollectionStaffFilter] = useState('All');
  const [collectionSortField, setCollectionSortField] = useState('client');
  const [collectionSortDirection, setCollectionSortDirection] = useState('asc');

  // Dropdown refs for collections filters
  const [showColStatusDropdown, setShowColStatusDropdown] = useState(false);
  const [showColStaffDropdown, setShowColStaffDropdown] = useState(false);
  const colStatusDropdownRef = useRef(null);
  const colStaffDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
      if (staffDropdownRef.current && !staffDropdownRef.current.contains(event.target)) {
        setShowStaffDropdown(false);
      }
      if (colStatusDropdownRef.current && !colStatusDropdownRef.current.contains(event.target)) {
        setShowColStatusDropdown(false);
      }
      if (colStaffDropdownRef.current && !colStaffDropdownRef.current.contains(event.target)) {
        setShowColStaffDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDeliveryPage(1);
    setDeliveryReportPage(1);
  }, [deliverySearch, deliveryStaffFilter, deliverySubTab]);

  useEffect(() => {
    setCollectionPage(1);
    setCollectionReportPage(1);
  }, [collectionSearch, collectionStaffFilter, collectionSubTab]);

  useEffect(() => {
    setOrderPage(1);
  }, [orderSearch]);

  // Persist assignedVoucherIds
  useEffect(() => {
    try { localStorage.setItem('bj_assigned_vouchers', JSON.stringify(assignedVoucherIds)); } catch(e) { console.error(e); }
  }, [assignedVoucherIds]);

  // Persist assignedColVoucherIds
  useEffect(() => {
    try { localStorage.setItem('bj_assigned_col_vouchers', JSON.stringify(assignedColVoucherIds)); } catch(e) { console.error(e); }
  }, [assignedColVoucherIds]);

  // Auto-fetch master data when Master tab first opened; reset sub-tab on leave
  useEffect(() => {
    if (activeTab === 'Master') {
      if (!tallyItemMasterFetched && !tallyItemMasterLoading) handleFetchItemMasterData();
      if (!tallyLedgerMasterFetched && !tallyLedgerMasterLoading) handleFetchLedgerMasterData();
    } else {
      setMasterSubTab(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Persist importedTallyEmpIds
  useEffect(() => {
    try { localStorage.setItem('bj_imported_tally_emps', JSON.stringify(importedTallyEmpIds)); } catch(e) { console.error(e); }
  }, [importedTallyEmpIds]);

  useEffect(() => {
    if (currentUser) {
      setProfileEmail(currentUser.email || '');
    }
  }, [currentUser]);

  // Page Permissions
  const [liveTracking, setLiveTracking] = useState(false);
  const [itemMaster, setItemMaster] = useState(false);
  const [customers, setCustomers] = useState(false);
  const [ordersEnabled, setOrdersEnabled] = useState(false);
  const [beatMaster, setBeatMaster] = useState(false);

  // --- Dynamic Browser Tab Title and Favicon Synchronization ---
  useEffect(() => {
    // 1. Update title based on page state
    let tabTitle = 'Bombay Jewellers - Authentication';
    if (currentUser) {
      if (activeTab === 'Home') {
        tabTitle = `Bombay Jewellers - Dashboard (${currentUser.role === 'admin' ? 'Admin' : 'Staff'})`;
      } else if (activeTab === 'User') {
        tabTitle = 'Bombay Jewellers - User Directory';
      } else if (activeTab === 'Profile') {
        tabTitle = 'Bombay Jewellers - Security Profile';
      } else if (activeTab === 'Deliveries') {
        tabTitle = 'Bombay Jewellers - Deliveries';
      } else if (activeTab === 'Collections') {
        tabTitle = 'Bombay Jewellers - Money Collection';
      } else if (activeTab === 'Orders') {
        tabTitle = 'Bombay Jewellers - Orders';
      } else if (activeTab === 'Master') {
        tabTitle = 'Bombay Jewellers - Master';
      }
    }
    document.title = tabTitle;

    // 2. Force dynamic replacement of favicon using the customized company logo
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = logoImg;
    if (document.head) {
      document.head.appendChild(link);
    }
  }, [currentUser, activeTab]);

  // --- Auth Actions ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!usernameInput || !passwordInput) {
      setLoginError('Please enter both username and password.');
      return;
    }

    const foundUser = users.find(
      (u) => u.username.toLowerCase() === usernameInput.toLowerCase() && u.password === passwordInput
    );

    if (!foundUser) {
      setLoginError('Invalid credentials. Check the helper box below to copy demo accounts!');
      return;
    }

    // Login successful - dynamically detects and opens admin/user panel
    setCurrentUser(foundUser);
    setActiveTab('Home');
    setUsernameInput('');
    setPasswordInput('');
    
    // Add success notification
    const newLog = {
      id: Date.now(),
      text: `${foundUser.name} successfully authenticated as ${foundUser.role === 'admin' ? 'Admin' : 'User'}`,
      type: 'success',
      time: 'Just now'
    };
    setNotifications((prev) => [newLog, ...prev]);
  };

  const handleLogoutConfirm = () => {
    setCurrentUser(null);
    setShowLogoutModal(false);
    setActiveTab('Home');
  };

  // --- New User Creation Action ---
  const handleCreateUserSubmit = (e) => {
    e.preventDefault();
    setFormSuccessMessage('');
    setFormErrorMessage('');

    if (!newFullName) {
      setFormErrorMessage('Full Name is required.');
      return;
    }
    if (!newUsername) {
      setFormErrorMessage('Username is required.');
      return;
    }
    if (!newPassword) {
      setFormErrorMessage('Password is required.');
      return;
    }

    const finalUsername = newUsername.toLowerCase().trim();
    const finalPassword = newPassword;

    const usernameExists = users.some(
      (u) => u.username.toLowerCase() === finalUsername.toLowerCase()
    );

    if (usernameExists) {
      setFormErrorMessage('The username is already taken by another system employee.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: newFullName,
      username: finalUsername,
      email: newEmail || `${finalUsername}@bombayjewellers.com`,
      phone: newPhone || 'Not Provided',
      address: newAddress || 'Not Provided',
      city: newCity || 'Not Provided',
      state: newStateVal || 'Not Provided',
      role: newRole,
      password: finalPassword,
      isActive: true,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      permissions: newRole === 'admin' ? null : newPermissions,
    };

    setUsers((prev) => [...prev, newUser]);

    // Save to backend
    fetch('/api/users/upsert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    }).catch(err => console.error('User save failed:', err));

    // Add activity log
    const newLog = {
      id: Date.now(),
      text: `Employee "${newFullName}" created by Admin`,
      type: 'success',
      time: 'Just now'
    };
    setNotifications((prev) => [newLog, ...prev]);

    // Reset inputs
    setNewFullName('');
    setNewEmail('');
    setNewPhone('');
    setNewUsername('');
    setNewRole('user');
    setNewPassword('');
    setNewAddress('');
    setNewCity('');
    setNewStateVal('');
    setLiveTracking(false);
    setItemMaster(false);
    setCustomers(false);
    setOrders(false);
    setBeatMaster(false);
    setNewPermissions({ Deliveries: { view: false, create: false, edit: false, delete: false }, Collections: { view: false, create: false, edit: false, delete: false }, Orders: { view: false, create: false, edit: false, delete: false }, Master: { view: false, create: false, edit: false, delete: false } });

    // Close the popup modal
    setShowAddEmployeeModal(false);
  };

  // --- Persistent Database Sync ---
  const fetchDeliveriesAndCollections = async () => {
    try {
      const dRes = await fetch('/api/deliveries');
      if (dRes.ok) {
        const dData = await dRes.json();
        const mappedDeliveries = dData.map(d => {
          const completedAt = d.completed_at ? new Date(d.completed_at) : null;
          const assignedToId = Number(d.assigned_to);
          const assignedToName = d.assigned_to_name || users.find(u => u.id === assignedToId)?.name || '';
          return {
            id: d.id,
            product: d.item_description || 'Outstanding Bill',
            customerName: d.party_name,
            customerPhone: d.party_phone || '',
            targetLocation: d.party_address || '',
            assignedToId,
            assignedToName,
            status: d.status === 'completed' ? 'delivered' : 'pending',
            assignedDate: d.assigned_at ? new Date(d.assigned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : d.voucher_date,
            notes: d.notes || 'None',
            tallyVoucherNo: d.voucher_no || null,
            tallyAmount: d.amount || 0,
            completedDate: completedAt ? completedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
            completedTime: completedAt ? completedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : '',
            completedBy: d.completed_by || '',
            actualLocation: d.actual_location || ''
          };
        });
        setDeliveries(mappedDeliveries);

        // Derive assigned Tally voucher IDs
        const assignedIds = dData.map(d => d.tally_id).filter(Boolean);
        setAssignedVoucherIds(assignedIds);
      }
    } catch (e) {
      console.error('Failed to fetch deliveries:', e);
    }

    try {
      const cRes = await fetch('/api/collections');
      if (cRes.ok) {
        const cData = await cRes.json();
        const mappedCollections = cData.map(c => {
          const completedAt = c.completed_at ? new Date(c.completed_at) : null;
          const assignedToId = Number(c.assigned_to);
          const assignedToName = c.assigned_to_name || users.find(u => u.id === assignedToId)?.name || '';
          return {
            id: c.id,
            clientName: c.party_name,
            clientPhone: c.party_phone || '',
            location: c.party_address || '',
            amountToCollect: c.amount || 0,
            assignedToId,
            assignedToName,
            status: c.status,
            assignedDate: c.assigned_at ? new Date(c.assigned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : c.voucher_date,
            amountCollected: c.amount_collected || 0,
            amountPending: c.amount - (c.amount_collected || 0),
            remarks: c.remarks || '',
            completedDate: completedAt ? completedAt.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            }) : '',
            tallyVoucherNo: c.voucher_no || null,
            tallyAmount: c.amount || 0
          };
        });
        setCollectionTasks(mappedCollections);

        // Derive assigned Tally collection IDs
        const assignedColIds = cData.map(c => c.tally_id).filter(Boolean);
        setAssignedColVoucherIds(assignedColIds);
      }
    } catch (e) {
      console.error('Failed to fetch collections:', e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        const mapped = data.map(o => ({
          orderId: o.order_id,
          customerQuery: o.customer_query,
          date: o.order_date,
          items: (o.items || []).map(i => ({ name: i.item_name, qty: i.qty, rate: Number(i.rate) })),
          notes: o.notes || '',
          total: Number(o.total),
          status: o.status || 'Pending'
        }));
        setOrders(mapped);
      }
    } catch (e) {
      console.error('Failed to fetch orders:', e);
    }
  };

  useEffect(() => {
    fetchDeliveriesAndCollections();
    fetchOrders();
  }, []);

  // --- Tally ERP Actions ---
  const handleFetchTallyData = async () => {
    setTallyLoading(true);
    setTallyFetched(false);
    try {
      const res = await fetch('/api/deliveries/tally-sync', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sync failed');
      setTallyData(data.vouchers || []);
      setTallyFetched(true);
      setNotifications(prev => [{ id: Date.now(), text: `Tally ERP sync complete — ${(data.vouchers||[]).length} pending vouchers loaded`, type: 'success', time: 'Just now' }, ...prev]);
    } catch (err) {
      setNotifications(prev => [{ id: Date.now(), text: `Tally sync failed: ${err.message}`, type: 'error', time: 'Just now' }, ...prev]);
    } finally {
      setTallyLoading(false);
    }
  };

  const handleFetchTallyEmployees = () => {
    setTallyEmpLoading(true);
    setTimeout(() => {
      setTallyEmpData(TALLY_EMPLOYEES_SEED);
      setTallyEmpLoading(false);
      setTallyEmpFetched(true);
      const newLog = {
        id: Date.now(),
        text: `Tally ERP sync complete — ${TALLY_EMPLOYEES_SEED.length} employee ledgers loaded`,
        type: 'success',
        time: 'Just now'
      };
      setNotifications(prev => [newLog, ...prev]);
    }, 1800);
  };

  const handleGrantAccessSubmit = (e) => {
    e.preventDefault();
    setGrantSuccessMessage('');
    setGrantErrorMessage('');

    if (!grantUsername || !grantPassword) {
      setGrantErrorMessage('Username and Password are required.');
      return;
    }
    const finalUsername = grantUsername.toLowerCase().trim();
    if (users.some(u => u.username.toLowerCase() === finalUsername)) {
      setGrantErrorMessage('This username is already taken.');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: selectedTallyEmployee.name,
      username: finalUsername,
      email: selectedTallyEmployee.email,
      phone: selectedTallyEmployee.phone,
      role: grantRole,
      password: grantPassword,
      isActive: true,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tallyLedger: selectedTallyEmployee.tallyLedger
    };

    setUsers(prev => [...prev, newUser]);
    setImportedTallyEmpIds(prev => [...prev, selectedTallyEmployee.id]);

    // Save to backend
    fetch('/api/users/upsert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    }).catch(err => console.error('Tally user save failed:', err));

    const newLog = {
      id: Date.now(),
      text: `System access granted to Tally employee "${selectedTallyEmployee.name}"`,
      type: 'success',
      time: 'Just now'
    };
    setNotifications(prev => [newLog, ...prev]);
    setGrantSuccessMessage(`Access granted! ${selectedTallyEmployee.name} can now log in.`);

    setTimeout(() => {
      setShowGrantAccessModal(false);
      setSelectedTallyEmployee(null);
      setGrantUsername('');
      setGrantPassword('');
      setGrantRole('user');
      setGrantSuccessMessage('');
    }, 1500);
  };

  const handleFetchTallyColData = async () => {
    setTallyColLoading(true);
    setTallyColFetched(false);
    try {
      const res = await fetch('/api/collections/tally-sync', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sync failed');
      setTallyColData(data.vouchers || []);
      setTallyColFetched(true);
      setNotifications(prev => [{ id: Date.now(), text: `Tally ERP sync complete — ${(data.vouchers||[]).length} pending collection vouchers loaded`, type: 'success', time: 'Just now' }, ...prev]);
    } catch (err) {
      setNotifications(prev => [{ id: Date.now(), text: `Tally sync failed: ${err.message}`, type: 'error', time: 'Just now' }, ...prev]);
    } finally {
      setTallyColLoading(false);
    }
  };

  const handleFetchItemMasterData = async () => {
    setTallyItemMasterLoading(true);
    setTallyItemMasterFetched(false);
    try {
      const res = await fetch('/api/item-master/tally-sync', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sync failed');
      const mapped = (data.items || []).map(i => ({
        id: i.tally_id,
        itemCode: i.item_code,
        itemName: i.item_name,
        stockGroup: i.stock_group,
        unit: i.unit,
        hsnCode: i.hsn_code,
        openingRate: i.opening_rate,
        currentRate: i.current_rate,
        openingStock: i.opening_stock,
        currentStock: i.current_stock,
      }));
      setTallyItemMasterData(mapped);
      setTallyItemMasterFetched(true);
      setNotifications(prev => [{ id: Date.now(), text: `Tally ERP sync complete — ${mapped.length} stock items loaded`, type: 'success', time: 'Just now' }, ...prev]);
    } catch (err) {
      setNotifications(prev => [{ id: Date.now(), text: `Tally sync failed: ${err.message}`, type: 'error', time: 'Just now' }, ...prev]);
    } finally {
      setTallyItemMasterLoading(false);
    }
  };

  const handleFetchLedgerMasterData = async () => {
    setTallyLedgerMasterLoading(true);
    setTallyLedgerMasterFetched(false);
    try {
      const res = await fetch('/api/ledger-master/tally-sync', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sync failed');
      const mapped = (data.ledgers || []).map(l => ({
        id: l.tally_id,
        ledgerName: l.ledger_name,
        ledgerGroup: l.ledger_group,
        phone: l.phone,
        address: l.address,
        gstin: l.gstin,
        openingBalance: l.opening_balance,
        currentBalance: l.current_balance,
        balanceType: l.balance_type,
      }));
      setTallyLedgerMasterData(mapped);
      setTallyLedgerMasterFetched(true);
      setNotifications(prev => [{ id: Date.now(), text: `Tally ERP sync complete — ${mapped.length} ledgers loaded`, type: 'success', time: 'Just now' }, ...prev]);
    } catch (err) {
      setNotifications(prev => [{ id: Date.now(), text: `Tally sync failed: ${err.message}`, type: 'error', time: 'Just now' }, ...prev]);
    } finally {
      setTallyLedgerMasterLoading(false);
    }
  };

  // --- Deliveries Module Actions ---
  const handleAssignDeliverySubmit = (e) => {
    e.preventDefault();
    setAssignSuccessMessage('');
    setAssignErrorMessage('');

    if (!assignProduct || !assignCustomer || !assignPhone || !assignAddress || !assignStaffId) {
      setAssignErrorMessage('Please fill out all required fields.');
      return;
    }

    const assignedStaff = users.find(u => u.id === parseInt(assignStaffId));
    if (!assignedStaff) {
      setAssignErrorMessage('Invalid staff member selected.');
      return;
    }

    const newDelivery = {
      id: Date.now(),
      product: assignProduct,
      customerName: assignCustomer,
      customerPhone: assignPhone,
      targetLocation: assignAddress,
      assignedToId: assignedStaff.id,
      assignedToName: assignedStaff.name,
      status: "pending",
      assignedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: assignNotes || 'None',
      tallyVoucherNo: tallyVoucherRef || null,
      tallyAmount: tallyAmountRef || null
    };

    setDeliveries((prev) => [newDelivery, ...prev]);

    // Save single delivery assignment to database
    const voucher = {
      tally_id: tallyVoucherRef ? (tallyData.find(v => v.voucherNo === tallyVoucherRef)?.id || `TV-${tallyVoucherRef}`) : `CUSTOM-${Date.now()}`,
      voucher_no: tallyVoucherRef || `DLV-${Date.now()}`,
      voucher_date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      party_name: assignCustomer,
      party_phone: assignPhone || null,
      party_address: assignAddress || null,
      item_description: assignProduct || null,
      amount: tallyAmountRef || 0,
      ledger_group: 'Sundry Debtors',
      assigned_to_name: assignedStaff.name,
      notes: assignNotes || 'None'
    };

    fetch('/api/deliveries/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vouchers: [voucher], assigned_to: assignedStaff.id, assigned_by: currentUser.id }),
    })
      .then(res => {
        if (res.ok) {
          fetchDeliveriesAndCollections();
        }
      })
      .catch(err => console.error('Delivery save failed:', err));

    // Mark the Tally voucher as assigned so it grays out
    if (tallyVoucherRef) {
      const voucherEntry = tallyData.find(v => v.voucherNo === tallyVoucherRef);
      if (voucherEntry) {
        setAssignedVoucherIds(prev => [...prev, voucherEntry.id]);
      }
    }

    setAssignSuccessMessage(`Delivery task for "${assignProduct}" successfully assigned to ${assignedStaff.name}!`);

    // Add activity log
    const newLog = {
      id: Date.now(),
      text: `New delivery assigned: "${assignProduct}" to ${assignedStaff.name}${tallyVoucherRef ? ` (Tally: ${tallyVoucherRef})` : ''}`,
      type: 'info',
      time: 'Just now'
    };
    setNotifications((prev) => [newLog, ...prev]);

    // Reset fields
    setAssignProduct('');
    setAssignCustomer('');
    setAssignPhone('');
    setAssignAddress('');
    setAssignStaffId('');
    setAssignNotes('');
    setTallyVoucherRef(null);
    setTallyAmountRef(null);

    // Auto-close modal after 1.5 seconds
    setTimeout(() => {
      setShowAssignModal(false);
      setAssignSuccessMessage('');
    }, 1500);
  };

  const handleBulkAssignSubmit = (e) => {
    e.preventDefault();
    if (!bulkAssignStaffId) return;
    const staff = users.find(u => u.id === parseInt(bulkAssignStaffId));
    if (!staff) return;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newDeliveries = selectedVoucherIds.map(id => {
      const v = tallyData.find(x => x.id === id);
      if (!v) return null;
      return {
        id: Date.now() + Math.random(),
        product: v.itemDescription,
        customerName: v.partyName,
        customerPhone: v.partyPhone,
        targetLocation: v.partyAddress || '',
        assignedToId: staff.id,
        assignedToName: staff.name,
        status: 'pending',
        assignedDate: today,
        notes: `Tally Ref: ${v.voucherNo} | Amount: ₹${v.amount.toLocaleString()}`,
        tallyVoucherNo: v.voucherNo,
        tallyAmount: v.amount
      };
    }).filter(Boolean);
    setDeliveries(prev => [...newDeliveries, ...prev]);
    setAssignedVoucherIds(prev => [...prev, ...selectedVoucherIds]);

    // Save to backend
    const vouchers = selectedVoucherIds.map(id => {
      const v = tallyData.find(x => x.id === id);
      if (!v) return null;
      return {
        tally_id: v.id,
        voucher_no: v.voucherNo,
        voucher_date: v.voucherDate,
        party_name: v.partyName,
        party_phone: v.partyPhone || null,
        party_address: v.partyAddress || null,
        item_description: v.itemDescription || null,
        amount: v.amount,
        ledger_group: v.ledgerGroup || null,
        assigned_to_name: staff.name,
      };
    }).filter(Boolean);
    fetch('/api/deliveries/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vouchers, assigned_to: staff.id, assigned_by: currentUser.id }),
    })
      .then(res => {
        if (res.ok) {
          fetchDeliveriesAndCollections();
        }
      })
      .catch(err => console.error('Delivery save failed:', err));

    setSelectedVoucherIds([]);
    setBulkAssignStaffId('');
    setShowBulkAssignModal(false);
  };

  const handleBulkColAssignSubmit = (e) => {
    e.preventDefault();
    if (!bulkColAssignStaffId) return;
    const staff = users.find(u => u.id === parseInt(bulkColAssignStaffId));
    if (!staff) return;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newCollections = selectedColVoucherIds.map(id => {
      const v = tallyColData.find(x => x.id === id);
      if (!v) return null;
      return {
        id: Date.now() + Math.random(),
        clientName: v.partyName,
        clientPhone: v.partyPhone,
        location: v.partyAddress || '',
        amountToCollect: v.amount,
        assignedToId: staff.id,
        assignedToName: staff.name,
        status: 'pending',
        assignedDate: today,
        amountCollected: 0,
        amountPending: v.amount,
        remarks: '',
        completedDate: '',
        tallyVoucherNo: v.voucherNo,
        tallyAmount: v.amount
      };
    }).filter(Boolean);
    setCollectionTasks(prev => [...newCollections, ...prev]);
    setAssignedColVoucherIds(prev => [...prev, ...selectedColVoucherIds]);

    // Save to backend
    const vouchers = selectedColVoucherIds.map(id => {
      const v = tallyColData.find(x => x.id === id);
      if (!v) return null;
      return {
        tally_id: v.id,
        voucher_no: v.voucherNo,
        voucher_date: v.voucherDate,
        party_name: v.partyName,
        party_phone: v.partyPhone || null,
        party_address: v.partyAddress || null,
        description: v.description || null,
        amount: v.amount,
        ledger_group: v.ledgerGroup || null,
        assigned_to_name: staff.name,
      };
    }).filter(Boolean);
    fetch('/api/collections/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vouchers, assigned_to: staff.id, assigned_by: currentUser.id }),
    })
      .then(res => {
        if (res.ok) {
          fetchDeliveriesAndCollections();
        }
      })
      .catch(err => console.error('Collection save failed:', err));

    setSelectedColVoucherIds([]);
    setBulkColAssignStaffId('');
    setShowBulkColAssignModal(false);
  };

  const handleFetchLocation = (onDone) => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = `GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        setCompletionLocation(coords);
        setGpsLoading(false);
        if (onDone) onDone(coords);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleCompleteDeliverySubmit = (e) => {
    e.preventDefault();
    if (!completionLocation.trim()) {
      alert('Please specify the meeting location.');
      return;
    }

    const now = new Date();
    const completedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const completedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const updatedDeliveries = deliveries.map(d => {
      if (d.id === selectedDeliveryForCompletion.id) {
        return {
          ...d,
          status: "delivered",
          completedDate,
          completedTime,
          actualLocation: completionLocation,
          notes: completionNotes || d.notes || 'None',
          completedBy: currentUser.name
        };
      }
      return d;
    });

    setDeliveries(updatedDeliveries);

    // Update status in backend
    const completeUrl = selectedDeliveryForCompletion.tallyVoucherNo
      ? `/api/deliveries/tally/${encodeURIComponent(selectedDeliveryForCompletion.tallyVoucherNo)}/complete`
      : `/api/deliveries/${selectedDeliveryForCompletion.id}/complete`;

    fetch(completeUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notes: completionNotes || selectedDeliveryForCompletion.notes || 'None',
        actual_location: completionLocation,
        completed_by: currentUser.name
      })
    })
      .then(res => {
        if (res.ok) {
          fetchDeliveriesAndCollections();
        }
      })
      .catch(err => console.error('Delivery complete update failed:', err));

    // Add activity log
    const newLog = {
      id: Date.now(),
      text: `Delivery completed: "${selectedDeliveryForCompletion.product}" by ${currentUser.name}`,
      type: 'success',
      time: 'Just now'
    };
    setNotifications((prev) => [newLog, ...prev]);

    // Reset completion modal states
    setShowCompletionModal(false);
    setSelectedDeliveryForCompletion(null);
    setCompletionLocation('');
    setCompletionNotes('');
  };

  // --- Money Collections Module Actions ---
  const handleAssignCollectionSubmit = (e) => {
    e.preventDefault();
    setColAssignSuccessMessage('');
    setColAssignErrorMessage('');

    if (!colClientName || !colClientPhone || !colLocation || !colAmountToCollect || !colAssignedToId) {
      setColAssignErrorMessage('Please fill out all required fields.');
      return;
    }

    const assignedStaff = users.find(u => u.id === parseInt(colAssignedToId));
    if (!assignedStaff) {
      setColAssignErrorMessage('Invalid staff member selected.');
      return;
    }

    const amt = parseFloat(colAmountToCollect);
    if (isNaN(amt) || amt <= 0) {
      setColAssignErrorMessage('Please enter a valid target amount greater than zero.');
      return;
    }

    const newCollection = {
      id: Date.now(),
      clientName: colClientName,
      clientPhone: colClientPhone,
      location: colLocation,
      amountToCollect: amt,
      assignedToId: assignedStaff.id,
      assignedToName: assignedStaff.name,
      status: "pending",
      assignedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amountCollected: 0,
      amountPending: amt,
      remarks: "",
      completedDate: "",
      tallyVoucherNo: colTallyVoucherRef || null,
      tallyAmount: colTallyAmountRef || null
    };

    setCollectionTasks((prev) => [newCollection, ...prev]);

    // Save single collection assignment to database
    const voucher = {
      tally_id: colTallyVoucherRef ? (tallyColData.find(v => v.voucherNo === colTallyVoucherRef)?.id || `TC-${colTallyVoucherRef}`) : `CUSTOM-${Date.now()}`,
      voucher_no: colTallyVoucherRef || `COL-${Date.now()}`,
      voucher_date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      party_name: colClientName,
      party_phone: colClientPhone || null,
      party_address: colLocation || null,
      description: colClientName || null,
      amount: amt,
      ledger_group: 'Sundry Debtors',
      assigned_to_name: assignedStaff.name,
      remarks: ''
    };

    fetch('/api/collections/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vouchers: [voucher], assigned_to: assignedStaff.id, assigned_by: currentUser.id }),
    })
      .then(res => {
        if (res.ok) {
          fetchDeliveriesAndCollections();
        }
      })
      .catch(err => console.error('Collection save failed:', err));

    // Mark the Tally collection voucher as assigned
    if (colTallyVoucherRef) {
      const voucherEntry = tallyColData.find(v => v.voucherNo === colTallyVoucherRef);
      if (voucherEntry) {
        setAssignedColVoucherIds(prev => [...prev, voucherEntry.id]);
      }
    }

    setColAssignSuccessMessage(`Collection task of ₹${amt.toLocaleString()} successfully assigned to ${assignedStaff.name}!`);

    // Add activity log
    const newLog = {
      id: Date.now(),
      text: `New collection assigned: ₹${amt.toLocaleString()} from "${colClientName}" to ${assignedStaff.name}`,
      type: 'info',
      time: 'Just now'
    };
    setNotifications((prev) => [newLog, ...prev]);

    // Reset fields
    setColClientName('');
    setColClientPhone('');
    setColLocation('');
    setColAmountToCollect('');
    setColAssignedToId('');
    setColTallyVoucherRef(null);
    setColTallyAmountRef(null);

    // Auto-close modal after 1.5 seconds
    setTimeout(() => {
      setShowAssignCollectionModal(false);
      setColAssignSuccessMessage('');
    }, 1500);
  };

  const handleReportCollectionSubmit = (e) => {
    e.preventDefault();
    setColReportSuccessMessage('');
    setColReportErrorMessage('');

    if (!selectedCollectionForReport) return;

    const collected = parseFloat(colAmountCollected);
    if (isNaN(collected) || collected < 0) {
      setColReportErrorMessage('Please enter a valid amount collected (cannot be negative).');
      return;
    }

    if (collected > selectedCollectionForReport.amountToCollect) {
      setColReportErrorMessage(`Collected amount cannot exceed the target of ₹${selectedCollectionForReport.amountToCollect.toLocaleString()}.`);
      return;
    }

    const pending = selectedCollectionForReport.amountToCollect - collected;

    const updatedTasks = collectionTasks.map(task => {
      if (task.id === selectedCollectionForReport.id) {
        return {
          ...task,
          status: "completed",
          amountCollected: collected,
          amountPending: pending,
          remarks: colRemarks || 'None',
          completedDate: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        };
      }
      return task;
    });

    setCollectionTasks(updatedTasks);

    // Update status in backend
    const completeUrl = selectedCollectionForReport.tallyVoucherNo
      ? `/api/collections/tally/${encodeURIComponent(selectedCollectionForReport.tallyVoucherNo)}/complete`
      : `/api/collections/${selectedCollectionForReport.id}/complete`;

    fetch(completeUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount_collected: collected,
        remarks: colRemarks || 'None',
        completed_by: currentUser.name
      }),
    })
      .then(res => {
        if (res.ok) {
          fetchDeliveriesAndCollections();
        }
      })
      .catch(err => console.error('Collection complete update failed:', err));

    setColReportSuccessMessage(`Collection information successfully submitted! Pending remaining: ₹${pending.toLocaleString()}`);

    // Add activity log
    const newLog = {
      id: Date.now(),
      text: `Collection completed: ₹${collected.toLocaleString()} from "${selectedCollectionForReport.clientName}" by ${currentUser.name}`,
      type: 'success',
      time: 'Just now'
    };
    setNotifications((prev) => [newLog, ...prev]);

    // Reset fields
    setColAmountCollected('');
    setColAmountPending('');
    setColRemarks('');

    setTimeout(() => {
      setShowCollectionReportModal(false);
      setSelectedCollectionForReport(null);
      setColReportSuccessMessage('');
    }, 1500);
  };

  const handleDeleteCollection = (id) => {
    if (!window.confirm("Are you sure you want to delete this collection task assignment?")) {
      return;
    }

    const taskToDelete = collectionTasks.find(t => t.id === id);
    setCollectionTasks((prev) => prev.filter(t => t.id !== id));

    const newLog = {
      id: Date.now(),
      text: `Collection task from "${taskToDelete ? taskToDelete.clientName : 'Unknown'}" deleted by Admin`,
      type: 'warning',
      time: 'Just now'
    };
    setNotifications((prev) => [newLog, ...prev]);
  };

  const handleEditOrderClick = (order) => {
    const items = (order.items || []).map((item, idx) => ({
      id: Date.now() + idx,
      name: item.name || item.item_name,
      qty: item.qty,
      rate: item.rate,
      discount: item.discount || 0,
      total: item.qty * item.rate - (item.qty * item.rate * (item.discount || 0)) / 100
    }));

    setOrderForm({
      customerQuery: order.customerQuery,
      date: order.date,
      items: items,
      notes: order.notes || ''
    });

    setEditingOrderId(order.orderId);
    setShowCreateOrder(true);
  };

  const handleDeleteOrderClick = (order) => {
    setSelectedOrderForDelete(order);
    setShowOrderDeleteModal(true);
  };

  // Auto-fill credential helper for testing (Default to Admin, but both are options)
  const autofillCredentials = (role) => {
    if (role === 'admin') {
      setUsernameInput('admin');
      setPasswordInput('admin');
    } else {
      setUsernameInput('user');
      setPasswordInput('user');
    }
  };

  // --- Render Login View ---
  if (!currentUser) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <img src={logoImg} alt="ABS Technologies Logo" className="login-logo" />
            <h2 className="login-title">Bombay Jewellers</h2>
            <p className="login-subtitle">System Portal Authentication</p>
          </div>

          <div className="login-body">
            {loginError && (
              <div className="login-error">
                <AlertTriangle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter your system username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    className="form-input" 
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    style={{ paddingRight: '2.75rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                    title={showPassword ? "Hide Password" : "Show Password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>
            </form>

            {!isInWebView && (
              <button
                type="button"
                onClick={async () => {
                  if (pwaInstallPrompt) {
                    pwaInstallPrompt.prompt();
                    const { outcome } = await pwaInstallPrompt.userChoice;
                    if (outcome === 'accepted') setPwaInstallPrompt(null);
                    return;
                  }
                  try {
                    const res = await fetch('/api/apk-status');
                    const { available } = await res.json();
                    if (available) {
                      const a = document.createElement('a');
                      a.href = '/BombayJewellers.apk';
                      a.download = 'BombayJewellers.apk';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    } else {
                      alert('Android app is not yet available for download.\nPlease contact your administrator.');
                    }
                  } catch {
                    alert('Could not reach the server. Please try again.');
                  }
                }}
                style={{
                  width: '100%',
                  marginTop: '0.75rem',
                  padding: '0.65rem 1rem',
                  border: '1.5px solid #ef4444',
                  borderRadius: '8px',
                  background: 'transparent',
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <Download size={16} />
                {pwaInstallPrompt ? 'Install App' : 'Download Android App'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- Render Logged In Layout ---
  const isAdmin = currentUser.role === 'admin';

  // --- Deliveries Statistics & Filters Computations ---
  const userDeliveries = isAdmin 
    ? deliveries 
    : deliveries.filter(d => d.assignedToId === currentUser.id);

  const totalCount = userDeliveries.length;
  const pendingCount = userDeliveries.filter(d => d.status === 'pending').length;
  const completedCount = userDeliveries.filter(d => d.status === 'delivered').length;
  const completionRate = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredDeliveries = userDeliveries.filter(d => {
    // 1. Search Query
    const query = deliverySearch.toLowerCase().trim();
    const matchesSearch = !query || 
      (d.product && d.product.toLowerCase().includes(query)) ||
      (d.customerName && d.customerName.toLowerCase().includes(query)) ||
      (d.customerPhone && d.customerPhone.toLowerCase().includes(query)) ||
      (d.assignedToName && d.assignedToName.toLowerCase().includes(query)) ||
      (d.completedBy && d.completedBy.toLowerCase().includes(query));

    // 2. Tab Filter (Pending vs Completed)
    const matchesStatus = (deliverySubTab === 'pending' && d.status === 'pending') ||
                          (deliverySubTab === 'completed' && d.status === 'delivered');

    // 3. Staff Filter
    const matchesStaff = !isAdmin || deliveryStaffFilter === 'All' ||
      d.assignedToId === parseInt(deliveryStaffFilter);

    return matchesSearch && matchesStatus && matchesStaff;
  });

  const sortedDeliveries = [...filteredDeliveries].sort((a, b) => {
    let valA = '';
    let valB = '';
    
    if (deliverySortField === 'product') {
      valA = (a.product || '').toLowerCase();
      valB = (b.product || '').toLowerCase();
    } else if (deliverySortField === 'customer') {
      valA = (a.customerName || '').toLowerCase();
      valB = (b.customerName || '').toLowerCase();
    } else if (deliverySortField === 'handler') {
      valA = (a.assignedToName || '').toLowerCase();
      valB = (b.assignedToName || '').toLowerCase();
    } else if (deliverySortField === 'timeline') {
      valA = a.assignedDate || '';
      valB = b.assignedDate || '';
    } else if (deliverySortField === 'location') {
      const locA = a.status === 'pending' ? a.targetLocation : a.actualLocation;
      const locB = b.status === 'pending' ? b.targetLocation : b.actualLocation;
      valA = (locA || '').toLowerCase();
      valB = (locB || '').toLowerCase();
    } else if (deliverySortField === 'status') {
      valA = (a.status || '').toLowerCase();
      valB = (b.status || '').toLowerCase();
    }

    if (valA < valB) return deliverySortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return deliverySortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const DR_PAGE = 20;
  const drTotalPages = Math.max(1, Math.ceil(sortedDeliveries.length / DR_PAGE));
  const drEffPage = Math.min(deliveryReportPage, drTotalPages);
  const pagedSortedDeliveries = sortedDeliveries.slice((drEffPage - 1) * DR_PAGE, drEffPage * DR_PAGE);

  const handleSort = (field) => {
    if (deliverySortField === field) {
      setDeliverySortDirection(deliverySortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setDeliverySortField(field);
      setDeliverySortDirection('asc');
    }
  };

  // --- Money Collections Statistics & Filters Computations ---
  const userCollections = isAdmin
    ? collectionTasks
    : collectionTasks.filter(c => c.assignedToId === currentUser.id);

  const colTotalTarget = userCollections.reduce((sum, c) => sum + (c.amountToCollect || 0), 0);
  const colTotalCollected = userCollections.reduce((sum, c) => sum + (c.amountCollected || 0), 0);
  const colTotalPending = userCollections.reduce((sum, c) => sum + (c.amountPending || 0), 0);
  const colActiveCount = userCollections.filter(c => c.status === 'pending').length;
  const colCompletedCount = userCollections.filter(c => c.status === 'completed').length;
  const colTotalCount = userCollections.length;
  const colCompletionRate = colTotalCount ? Math.round((colCompletedCount / colTotalCount) * 100) : 0;

  const filteredCollections = userCollections.filter(c => {
    const query = collectionSearch.toLowerCase().trim();
    const matchesSearch = !query ||
      (c.clientName && c.clientName.toLowerCase().includes(query)) ||
      (c.clientPhone && c.clientPhone.toLowerCase().includes(query)) ||
      (c.location && c.location.toLowerCase().includes(query)) ||
      (c.assignedToName && c.assignedToName.toLowerCase().includes(query)) ||
      (c.remarks && c.remarks.toLowerCase().includes(query));

    const matchesStatus = (collectionSubTab === 'pending' && c.status === 'pending') ||
                          (collectionSubTab === 'completed' && c.status === 'completed');

    const matchesStaff = !isAdmin || collectionStaffFilter === 'All' ||
      c.assignedToId === parseInt(collectionStaffFilter);

    return matchesSearch && matchesStatus && matchesStaff;
  });

  const sortedCollections = [...filteredCollections].sort((a, b) => {
    let valA = '';
    let valB = '';

    if (collectionSortField === 'client') {
      valA = (a.clientName || '').toLowerCase();
      valB = (b.clientName || '').toLowerCase();
    } else if (collectionSortField === 'handler') {
      valA = (a.assignedToName || '').toLowerCase();
      valB = (b.assignedToName || '').toLowerCase();
    } else if (collectionSortField === 'target') {
      valA = a.amountToCollect || 0;
      valB = b.amountToCollect || 0;
    } else if (collectionSortField === 'collected') {
      valA = a.amountCollected || 0;
      valB = b.amountCollected || 0;
    } else if (collectionSortField === 'pending') {
      valA = a.amountPending || 0;
      valB = b.amountPending || 0;
    } else if (collectionSortField === 'status') {
      valA = (a.status || '').toLowerCase();
      valB = (b.status || '').toLowerCase();
    } else if (collectionSortField === 'timeline') {
      valA = a.assignedDate || '';
      valB = b.assignedDate || '';
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return collectionSortDirection === 'asc' ? valA - valB : valB - valA;
    }

    valA = (valA || '').toString();
    valB = (valB || '').toString();

    if (valA < valB) return collectionSortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return collectionSortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const CR_PAGE = 20;
  const crTotalPages = Math.max(1, Math.ceil(sortedCollections.length / CR_PAGE));
  const crEffPage = Math.min(collectionReportPage, crTotalPages);
  const pagedSortedCollections = sortedCollections.slice((crEffPage - 1) * CR_PAGE, crEffPage * CR_PAGE);

  const handleColSort = (field) => {
    if (collectionSortField === field) {
      setCollectionSortDirection(collectionSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setCollectionSortField(field);
      setCollectionSortDirection('asc');
    }
  };

  return (
    <>
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 1. Navbar section */}
      <nav className="navbar">
        <div className="navbar-left">
          <div
            className="navbar-logo-container"
            onClick={() => { setActiveTab('Home'); setMobileNavOpen(false); }}
            style={{ cursor: 'pointer' }}
            title="Go to Home Page"
          >
            <img src={logoImg} alt="ABS Logo" className="navbar-logo" />
          </div>

          <ul className={`navbar-menu${mobileNavOpen ? ' mobile-open' : ''}`}>
            <li>
              <button
                className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`}
                onClick={() => { setActiveTab('Home'); setMobileNavOpen(false); }}
              >
                <Home size={16} />
                Home
              </button>
            </li>
            {isAdmin && (
              <li>
                <button
                  className={`nav-item ${activeTab === 'User' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('User'); setMobileNavOpen(false); }}
                >
                  <UserPlus size={16} />
                  User
                </button>
              </li>
            )}
            <li>
              <button
                className={`nav-item ${activeTab === 'Deliveries' ? 'active' : ''}`}
                onClick={() => { setActiveTab('Deliveries'); setMobileNavOpen(false); }}
              >
                <Package size={16} />
                Deliveries
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'Collections' ? 'active' : ''}`}
                onClick={() => { setActiveTab('Collections'); setMobileNavOpen(false); }}
              >
                <DollarSign size={16} />
                Money Collection
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'Orders' ? 'active' : ''}`}
                onClick={() => { setActiveTab('Orders'); setMobileNavOpen(false); }}
              >
                <ShoppingCart size={16} />
                Orders
              </button>
            </li>
            {isAdmin && (
              <li style={{ position: 'relative' }}
                onMouseEnter={() => setShowMasterDropdown(true)}
                onMouseLeave={() => setShowMasterDropdown(false)}
              >
                <button
                  className={`nav-item ${activeTab === 'Master' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('Master'); setMasterSubTab(null); setMobileNavOpen(false); }}
                >
                  <Package size={16} />
                  Master
                </button>
                {showMasterDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                    minWidth: '160px',
                    zIndex: 200,
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem'
                  }}>
                    {[
                      { key: 'ledgerMaster', label: 'Ledger Master', icon: <BookOpen size={13} /> },
                      { key: 'itemMaster', label: 'Item Master', icon: <Package size={13} /> },
                    ].map(opt => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => { setActiveTab('Master'); setMasterSubTab(opt.key); setShowMasterDropdown(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                          width: '100%', padding: '0.55rem 0.9rem',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontSize: '0.82rem', fontWeight: '600',
                          color: masterSubTab === opt.key && activeTab === 'Master' ? '#ef4444' : '#334155',
                          textAlign: 'left'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {opt.icon}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-center-tab">
          {activeTab}
        </div>

        <div className="navbar-right">
          {/* Profile Icon Button */}
          <button
            className={`icon-button navbar-profile-btn ${activeTab === 'Profile' ? 'active' : ''}`}
            title="View Profile Details"
            onClick={() => { setActiveTab('Profile'); setMobileNavOpen(false); }}
          >
            <User size={20} />
          </button>

          {/* Logout Icon Button */}
          <button
            className="icon-button logout-btn"
            title="Log Out of System"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut size={20} />
          </button>

          {/* Hamburger (mobile only) */}
          <button
            className="icon-button navbar-hamburger"
            onClick={() => setMobileNavOpen(prev => !prev)}
            title="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile nav backdrop */}
      {mobileNavOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* 2. Main Page Body */}
      <main className="dashboard-container flex-grow" style={{ flexGrow: 1 }}>
        
        {/* --- HOME TAB (DASHBOARD) --- */}
        {activeTab === 'Home' && (
          <div className="animate-fade-in">
            {/* Header info */}
            <div className="dashboard-header">
              <h1>Good Morning, {currentUser.name}</h1>
              <p>{isAdmin ? "Here's what's happening with your team today." : "Here's your live gold store status dashboard today."}</p>
            </div>

            {/* 4-card Grid layout */}
            <div className="dashboard-grid">
              
              {/* Card 1: STATUS (Navy Background) */}
              <div className="dashboard-card status-card">
                <div className="card-top">
                  <span className="card-label">
                    <span className="status-dot"></span> STATUS
                  </span>
                  <span className="card-icon-container" style={{ color: '#22c55e' }}>
                    <Shield size={16} />
                  </span>
                </div>
                <div>
                  <h3 className="card-value">Active</h3>
                  <p className="card-desc">System is running smoothly</p>
                </div>
              </div>

              {/* Card 2: PENDING TASKS (Yellow Bottom Border) */}
              <div className="dashboard-card tasks-card">
                <div className="card-top">
                  <span className="card-label">Pending Tasks</span>
                  {pendingTasksCount > 0 ? (
                    <button 
                      className="modal-close-btn" 
                      style={{ padding: '2px', border: '1px solid #fef3c7', borderRadius: '4px', background: '#fffbeb' }}
                      title="Clear tasks" 
                      onClick={() => setPendingTasksCount(0)}
                    >
                      <X size={14} style={{ color: '#d97706' }} />
                    </button>
                  ) : (
                    <span className="card-icon-container">
                      <CheckCircle size={16} />
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="card-value">{pendingTasksCount}</h3>
                  <p className="card-desc">{pendingTasksCount > 0 ? 'Approvals and Rate audits left' : 'All caught up!'}</p>
                </div>
              </div>

              {/* Card 3: NOTIFICATIONS (Red Bottom Border) */}
              <div className="dashboard-card notify-card">
                <div className="card-top">
                  <span className="card-label">Notifications</span>
                  <span className="card-icon-container">
                    <Bell size={16} />
                  </span>
                </div>
                <div>
                  <h3 className="card-value">{notifications.length > 0 ? notifications.length : 'None'}</h3>
                  <p className="card-desc">
                    {notifications.length > 0 ? notifications[0].text.substring(0, 30) + '...' : 'No new alerts'}
                  </p>
                </div>
              </div>

              {/* Card 4: PENDING DELIVERIES (Blue Bottom Border) */}
              <div className="dashboard-card deliveries-card">
                <div className="card-top">
                  <span className="card-label">Deliveries</span>
                  <span className="card-icon-container" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                    <Truck size={16} />
                  </span>
                </div>
                <div>
                  <h3 className="card-value" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.1rem', fontFamily: 'var(--font-heading)' }}>
                    {deliveries.filter(d => d.status === 'pending').length}
                  </h3>
                  <p className="card-desc" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {deliveries.filter(d => d.status === 'pending').length === 1 ? 'Delivery in progress' : 'Pending deliveries'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- USER MANAGEMENT TAB (ADMIN ONLY) --- */}
        {activeTab === 'User' && isAdmin && (
          <div className="animate-fade-in" style={{ position: 'relative', minHeight: '60vh' }}>
            
            {/* Header info */}
            <div className="dashboard-header" style={{ marginBottom: '0.75rem' }}>
              <h1 style={{ fontSize: '1.35rem', margin: 0 }}>User Access Directory</h1>
            </div>

            {/* Unified Search & Actions Bar */}
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              marginBottom: '0.75rem', 
              width: '100%', 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              {/* Search input field (flexes to occupy left side) */}
              <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                <input 
                  type="text" 
                  className="form-input animate-scale-in" 
                  style={{ 
                    paddingLeft: '2.5rem', 
                    height: '36px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--border-color)', 
                    width: '100%', 
                    fontSize: '0.875rem',
                    backgroundColor: '#ffffff',
                    boxShadow: 'none'
                  }}
                  placeholder="Search by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>

              {/* Sync Tally ERP Button */}
              <button
                type="button"
                className="btn animate-scale-in user-action-btn"
                style={{
                  backgroundColor: '#0f172a', color: 'white', border: 'none',
                  borderRadius: '6px', padding: '0 1rem', height: '36px',
                  fontWeight: '700', fontSize: '0.85rem', display: 'flex',
                  alignItems: 'center', gap: '0.5rem',
                  cursor: tallyEmpLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease', flexShrink: 0,
                  opacity: tallyEmpLoading ? 0.7 : 1
                }}
                onClick={handleFetchTallyEmployees}
                disabled={tallyEmpLoading}
              >
                {tallyEmpLoading
                  ? <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                  : <RefreshCw size={15} />
                }
                <span className="btn-label">{tallyEmpLoading ? 'Syncing...' : 'Sync Tally ERP'}</span>
              </button>

              {/* Create Employee Button */}
              <button
                type="button"
                className="btn animate-scale-in user-action-btn"
                style={{
                  backgroundColor: '#ef4444', color: 'white', border: 'none',
                  borderRadius: '6px', padding: '0 1rem', height: '36px',
                  fontWeight: '700', fontSize: '0.85rem', display: 'flex',
                  alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(239,68,68,0.25)',
                  transition: 'all 0.2s ease', flexShrink: 0
                }}
                onClick={() => { setFormSuccessMessage(''); setFormErrorMessage(''); setShowAddEmployeeModal(true); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="btn-label">Create Employee</span>
              </button>
            </div>

            {/* Full Width Users Flat Report Table Container */}
            <div className="animate-scale-in user-table-desktop" style={{ width: '100%', overflow: 'hidden' }}>
              <div style={{ padding: 0 }}>
                <div className="table-container" style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                  <table className="premium-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc' }}>
                        <th style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Employee Name</th>
                        <th style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</th>
                        <th style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</th>
                        <th style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                        <th style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', fontSize: '0.725rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const q = searchQuery.toLowerCase();
                        const filteredUsers = users.filter(u =>
                          u.name.toLowerCase().includes(q) ||
                          u.username.toLowerCase().includes(q) ||
                          u.email.toLowerCase().includes(q) ||
                          u.phone.toLowerCase().includes(q) ||
                          u.role.toLowerCase().includes(q)
                        );
                        const filteredTallyEmps = tallyEmpFetched
                          ? tallyEmpData
                              .filter(e => !importedTallyEmpIds.includes(e.id))
                              .filter(e => !q || e.name.toLowerCase().includes(q) || e.phone.toLowerCase().includes(q) || e.department.toLowerCase().includes(q))
                          : [];

                        if (filteredUsers.length === 0 && filteredTallyEmps.length === 0) {
                          return (
                            <tr>
                              <td colSpan="5" style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                {tallyEmpFetched ? 'No users found matching criteria.' : 'No users created yet. Click "+ Create Employee" or sync from Tally ERP.'}
                              </td>
                            </tr>
                          );
                        }

                        return (
                          <>
                            {/* System users */}
                            {filteredUsers.map((user) => (
                              <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0', color: '#0f172a', fontWeight: '500', fontSize: '0.85rem' }}>
                                  {user.name}
                                  {user.tallyLedger && (
                                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '600', marginTop: '0.1rem' }}>
                                      {user.tallyLedger}
                                    </div>
                                  )}
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0', color: '#334155', fontWeight: '500', fontSize: '0.85rem' }}>
                                  {user.phone}
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', fontSize: '0.775rem' }}>
                                  {user.role === 'admin' ? 'ADMIN' : 'EMPLOYEE'}
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0' }}>
                                  <span style={{ fontWeight: '700', fontSize: '0.775rem', color: user.isActive === false ? '#ef4444' : '#22c55e' }}>
                                    {user.isActive === false ? 'INACTIVE' : 'ACTIVE'}
                                  </span>
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem' }}>
                                  {user.id !== 1 ? (
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                      <button
                                        type="button"
                                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                        title="Edit Employee"
                                        onClick={() => { setSelectedUserForEdit(user); setEditName(user.name); setEditEmail(user.email || ''); setEditPhone(user.phone || ''); setEditAddress(user.address || ''); setEditCity(user.city || ''); setEditState(user.state || ''); setEditRole(user.role || 'user'); setShowEditUserModal(true); }}
                                      >
                                        <Edit2 size={14} color="#3b82f6" />
                                      </button>
                                      <button
                                        type="button"
                                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                        title={user.isActive === false ? 'Activate Employee' : 'Deactivate Employee'}
                                        onClick={() => {
                                          const nextActive = user.isActive === false;
                                          setUsers(users.map(u => u.id === user.id ? { ...u, isActive: nextActive } : u));
                                          setNotifications(prev => [{
                                            id: Date.now(),
                                            text: `${nextActive ? 'Activated' : 'Deactivated'} employee account "${user.name}"`,
                                            type: 'info',
                                            time: 'Just now'
                                          }, ...prev]);
                                        }}
                                      >
                                        {user.isActive === false ? <UserCheck size={14} color="#22c55e" /> : <UserX size={14} color="#ef4444" />}
                                      </button>
                                      <button
                                        type="button"
                                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                        title="Reset Password"
                                        onClick={() => { setSelectedUserForReset(user); setNewResetPassword(''); setShowResetPasswordModal(true); }}
                                      >
                                        <Key size={14} color="#f59e0b" />
                                      </button>
                                      <button
                                        type="button"
                                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                        title="Delete Employee"
                                        onClick={() => { setSelectedUserForDelete(user); setShowDeleteConfirmModal(true); }}
                                      >
                                        <Trash2 size={14} color="#ef4444" />
                                      </button>
                                    </div>
                                  ) : (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Protected</span>
                                  )}
                                </td>
                              </tr>
                            ))}

                            {/* Tally-synced employees (not yet imported) */}
                            {filteredTallyEmps.map((emp) => (
                              <tr key={emp.id} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafaf7' }}>
                                <td style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0', color: '#0f172a', fontWeight: '500', fontSize: '0.85rem' }}>
                                  {emp.name}
                                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '600', marginTop: '0.1rem' }}>
                                    {emp.tallyLedger}
                                  </div>
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0', color: '#334155', fontWeight: '500', fontSize: '0.85rem' }}>
                                  {emp.phone}
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', fontSize: '0.775rem' }}>
                                  {emp.department.toUpperCase()}
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem', borderRight: '1px solid #e2e8f0' }}>
                                  <span style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                                    fontWeight: '700', fontSize: '0.7rem',
                                    color: '#d97706', backgroundColor: '#fef3c7',
                                    border: '1px solid #fde68a', borderRadius: '4px',
                                    padding: '0.1rem 0.4rem'
                                  }}>
                                    TALLY SYNC
                                  </span>
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem' }}>
                                  <button
                                    type="button"
                                    style={{
                                      backgroundColor: '#0f172a', color: 'white', border: 'none',
                                      borderRadius: '5px', padding: '0.25rem 0.6rem',
                                      fontSize: '0.72rem', fontWeight: '700', cursor: 'pointer',
                                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem'
                                    }}
                                    onClick={() => {
                                      setSelectedTallyEmployee(emp);
                                      setGrantUsername('');
                                      setGrantPassword('');
                                      setGrantRole('user');
                                      setGrantSuccessMessage('');
                                      setGrantErrorMessage('');
                                      setShowGrantAccessModal(true);
                                    }}
                                  >
                                    <UserCheck size={12} /> Grant Access
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </>
                        );
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile card list (hidden on desktop) */}
            <div className="user-mobile-cards animate-scale-in">
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                {(() => {
                  const q = searchQuery.toLowerCase();
                  const filteredUsers = users.filter(u =>
                    u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q) || u.phone.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)
                  );
                  const filteredTallyEmps = tallyEmpFetched
                    ? tallyEmpData.filter(e => !importedTallyEmpIds.includes(e.id))
                        .filter(e => !q || e.name.toLowerCase().includes(q) || e.phone.toLowerCase().includes(q) || e.department.toLowerCase().includes(q))
                    : [];

                  if (filteredUsers.length === 0 && filteredTallyEmps.length === 0) {
                    return <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No users found.</div>;
                  }

                  return (
                    <>
                      {filteredUsers.map((user) => (
                        <SwipeableCard
                          key={user.id}
                          actions={user.id !== 1 ? (
                            <>
                              <button
                                style={{ border: 'none', background: '#eff6ff', cursor: 'pointer', padding: '0.5rem', borderRadius: '7px', display: 'flex', alignItems: 'center' }}
                                title="Edit Employee"
                                onClick={() => { setSelectedUserForEdit(user); setEditName(user.name); setEditEmail(user.email || ''); setEditPhone(user.phone || ''); setEditAddress(user.address || ''); setEditCity(user.city || ''); setEditState(user.state || ''); setEditRole(user.role || 'user'); setShowEditUserModal(true); }}
                              >
                                <Edit2 size={16} color="#3b82f6" />
                              </button>
                              <button
                                style={{ border: 'none', background: user.isActive === false ? '#f0fdf4' : '#fef2f2', cursor: 'pointer', padding: '0.5rem', borderRadius: '7px', display: 'flex', alignItems: 'center' }}
                                title={user.isActive === false ? 'Activate' : 'Deactivate'}
                                onClick={() => {
                                  const nextActive = user.isActive === false;
                                  setUsers(users.map(u => u.id === user.id ? { ...u, isActive: nextActive } : u));
                                  setNotifications(prev => [{ id: Date.now(), text: `${nextActive ? 'Activated' : 'Deactivated'} "${user.name}"`, type: 'info', time: 'Just now' }, ...prev]);
                                }}
                              >
                                {user.isActive === false ? <UserCheck size={16} color="#22c55e" /> : <UserX size={16} color="#ef4444" />}
                              </button>
                              <button
                                style={{ border: 'none', background: '#fef3c7', cursor: 'pointer', padding: '0.5rem', borderRadius: '7px', display: 'flex', alignItems: 'center' }}
                                title="Reset Password"
                                onClick={() => { setSelectedUserForReset(user); setNewResetPassword(''); setShowResetPasswordModal(true); }}
                              >
                                <Key size={16} color="#f59e0b" />
                              </button>
                              <button
                                style={{ border: 'none', background: '#fef2f2', cursor: 'pointer', padding: '0.5rem', borderRadius: '7px', display: 'flex', alignItems: 'center' }}
                                title="Delete Employee"
                                onClick={() => { setSelectedUserForDelete(user); setShowDeleteConfirmModal(true); }}
                              >
                                <Trash2 size={16} color="#ef4444" />
                              </button>
                            </>
                          ) : null}
                        >
                          <div style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                            {/* Left: avatar + name + phone */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                              <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', backgroundColor: user.role === 'admin' ? '#fef2f2' : '#eff6ff', color: user.role === 'admin' ? '#ef4444' : '#2563eb' }}>
                                {user.name.charAt(0)}
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontWeight: '700', fontSize: '0.875rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem' }}>{user.phone}</div>
                              </div>
                            </div>
                            {/* Right: role badge + status */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                              <span style={{ fontSize: '0.62rem', fontWeight: '700', padding: '0.15rem 0.4rem', borderRadius: '4px', color: user.role === 'admin' ? '#b91c1c' : '#0369a1', backgroundColor: user.role === 'admin' ? '#fee2e2' : '#e0f2fe' }}>
                                {user.role === 'admin' ? 'ADMIN' : 'EMPLOYEE'}
                              </span>
                              <span style={{ fontSize: '0.62rem', fontWeight: '700', color: user.isActive === false ? '#ef4444' : '#22c55e' }}>
                                ● {user.isActive === false ? 'INACTIVE' : 'ACTIVE'}
                              </span>
                            </div>
                          </div>
                        </SwipeableCard>
                      ))}

                      {filteredTallyEmps.map((emp) => (
                        <SwipeableCard
                          key={emp.id}
                          actions={
                            <button
                              style={{ border: 'none', background: '#fef3c7', cursor: 'pointer', padding: '0.55rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}
                              title="Grant Access"
                              onClick={() => { setSelectedTallyEmployee(emp); setGrantUsername(''); setGrantPassword(''); setGrantRole('user'); setGrantSuccessMessage(''); setGrantErrorMessage(''); setShowGrantAccessModal(true); }}
                            >
                              <UserCheck size={17} color="#d97706" />
                            </button>
                          }
                        >
                          <div style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', backgroundColor: '#fafaf7' }}>
                            {/* Left: avatar + name + phone */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                              <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', backgroundColor: '#fef3c7', color: '#d97706' }}>
                                {emp.name.charAt(0)}
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontWeight: '700', fontSize: '0.875rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem' }}>{emp.phone}</div>
                              </div>
                            </div>
                            {/* Right: tally badge + department */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                              <span style={{ fontSize: '0.62rem', fontWeight: '700', padding: '0.15rem 0.4rem', borderRadius: '4px', color: '#d97706', backgroundColor: '#fef3c7', border: '1px solid #fde68a' }}>TALLY SYNC</span>
                              <span style={{ fontSize: '0.62rem', color: '#64748b', fontWeight: '600' }}>{emp.department}</span>
                            </div>
                          </div>
                        </SwipeableCard>
                      ))}
                    </>
                  );
                })()}
              </div>
            </div>

          </div>
        )}

        {/* --- DEDICATED FULL-SCREEN EXPANSIVE PROFILE SCREEN --- */}
        {activeTab === 'Profile' && (
          <div className="animate-fade-in" style={{ width: '100%', paddingBottom: '3rem' }}>
            {/* Header Toolbar */}
            <div className="dashboard-header" style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '1.35rem', margin: 0, fontWeight: '800' }}>Security Account Profile</h1>
              </div>
              <button
                className="btn btn-secondary profile-back-btn"
                onClick={() => setActiveTab('Home')}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: '6px' }}
              >
                Back to Dashboard
              </button>
            </div>

            {/* Profile Content - Direct Page Flow Layout */}
            <div className="animate-scale-in profile-content" style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '1.75rem'
            }}>
              {/* Sleek Top Header Row */}
              <div className="profile-top-row" style={{
                padding: '0 0 1.25rem 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e2e8f0',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                {/* Left Side: Avatar and Identity */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', flexWrap: 'nowrap', flex: 1, minWidth: 0 }}>
                  {/* Avatar */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#fef2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#ef4444',
                    border: '2px solid #fee2e2',
                    boxShadow: '0 2px 5px rgba(239, 68, 68, 0.08)',
                    flexShrink: 0
                  }}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Name and Badges */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>
                        {currentUser.name}
                      </h2>
                      <span style={{ 
                        fontSize: '0.65rem', 
                        fontWeight: '700', 
                        color: '#64748b', 
                        backgroundColor: '#f1f5f9', 
                        padding: '0.15rem 0.5rem', 
                        borderRadius: '12px', 
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em'
                      }}>
                        @{currentUser.username || 'user'}
                      </span>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center',
                        gap: '0.25rem',
                        backgroundColor: currentUser.role === 'admin' ? '#fef2f2' : '#f0fdf4', 
                        color: currentUser.role === 'admin' ? '#ef4444' : '#22c55e',
                        border: `1px solid ${currentUser.role === 'admin' ? '#fecaca' : '#bbf7d0'}`, 
                        borderRadius: '12px', 
                        padding: '0.15rem 0.5rem', 
                        fontSize: '0.65rem', 
                        fontWeight: '800'
                      }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: currentUser.role === 'admin' ? '#ef4444' : '#22c55e' }} />
                        {currentUser.role === 'admin' ? 'Admin' : 'Staff'}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>
                      Manage your profile settings and security credentials.
                    </p>
                  </div>
                </div>

                {/* Right Side: Sign Out Button */}
                <button
                  type="button"
                  className="profile-signout-desktop"
                  style={{
                    backgroundColor: '#fff1f2',
                    border: '1px solid #ffe4e6',
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    color: '#ef4444',
                    fontWeight: '700',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.2s ease',
                    height: '34px'
                  }}
                  onClick={() => setShowLogoutModal(true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffe4e6';
                    e.currentTarget.style.borderColor = '#fecaca';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff1f2';
                    e.currentTarget.style.borderColor = '#ffe4e6';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>

              {/* Horizontal Metadata Bar / Mini-Grid */}
              <div style={{
                padding: '1.25rem 0',
                borderBottom: '1px solid #e2e8f0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                {/* Phone Number Item */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '6px', 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    color: '#64748b',
                    flexShrink: 0
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', lineHeight: '1.2' }}>
                      Phone Number
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155' }}>
                      {currentUser.phone && currentUser.phone !== 'Not Provided' ? currentUser.phone : 'Not Provided'}
                    </span>
                  </div>
                </div>

                {/* Current Email Item */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '6px', 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    color: '#64748b',
                    flexShrink: 0
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', lineHeight: '1.2' }}>
                      Email Address
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', wordBreak: 'break-all' }}>
                      {currentUser.email || 'Not Set'}
                    </span>
                  </div>
                </div>

                {/* Member Since Item */}
                {currentUser.joinedDate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '6px', 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e2e8f0',
                      color: '#64748b',
                      flexShrink: 0
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em', lineHeight: '1.2' }}>
                        Member Since
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155' }}>
                        {currentUser.joinedDate}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Main Credentials Panel (Direct on Page) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0.5rem 0' }}>
                {/* Section 1: Update Email */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <h3 style={{ margin: 0, fontSize: '0.75rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Update Registered Email Address
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <input 
                        type="email" 
                        className="form-input" 
                        style={{ 
                          width: '100%', 
                          height: '38px', 
                          borderRadius: '6px', 
                          border: '1px solid #e2e8f0', 
                          padding: '0 0.75rem', 
                          fontSize: '0.8rem',
                          backgroundColor: '#ffffff'
                        }} 
                        placeholder="email@example.com"
                        value={profileEmail} 
                        onChange={(e) => setProfileEmail(e.target.value)}
                      />
                    </div>
                    <button 
                      type="button" 
                      style={{ 
                        backgroundColor: '#ef4444', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        height: '38px', 
                        padding: '0 1.25rem',
                        fontSize: '0.8rem', 
                        fontWeight: '700', 
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(239, 68, 68, 0.15)',
                        transition: 'background-color 0.2s ease'
                      }}
                      onClick={() => {
                        if (!profileEmail) {
                          alert('Email address cannot be empty.');
                          return;
                        }
                        setCurrentUser(prev => ({ ...prev, email: profileEmail }));
                        setUsers(users.map(u => u.id === currentUser.id ? { ...u, email: profileEmail } : u));
                        alert('Email address successfully updated!');
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>

                {/* Sleek divider line */}
                <div style={{ width: '100%', height: '1px', backgroundColor: '#e2e8f0' }} />

                {/* Section 2: Change Password */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <h3 style={{ margin: 0, fontSize: '0.75rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Change Portal Password
                    </h3>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                        Current Password
                      </label>
                      <input 
                        type={showProfilePasswords ? "text" : "password"} 
                        className="form-input" 
                        style={{ 
                          width: '100%', 
                          height: '38px', 
                          borderRadius: '6px', 
                          border: '1px solid #e2e8f0', 
                          padding: '0 0.75rem', 
                          fontSize: '0.8rem',
                          backgroundColor: '#ffffff'
                        }} 
                        placeholder="••••••••"
                        value={profileCurrentPassword}
                        onChange={(e) => setProfileCurrentPassword(e.target.value)}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                        New Password
                      </label>
                      <input 
                        type={showProfilePasswords ? "text" : "password"} 
                        className="form-input" 
                        style={{ 
                          width: '100%', 
                          height: '38px', 
                          borderRadius: '6px', 
                          border: '1px solid #e2e8f0', 
                          padding: '0 0.75rem', 
                          fontSize: '0.8rem',
                          backgroundColor: '#ffffff'
                        }} 
                        placeholder="••••••••"
                        value={profileNewPassword}
                        onChange={(e) => setProfileNewPassword(e.target.value)}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                        Confirm New Password
                      </label>
                      <input 
                        type={showProfilePasswords ? "text" : "password"} 
                        className="form-input" 
                        style={{ 
                          width: '100%', 
                          height: '38px', 
                          borderRadius: '6px', 
                          border: '1px solid #e2e8f0', 
                          padding: '0 0.75rem', 
                          fontSize: '0.8rem',
                          backgroundColor: '#ffffff'
                        }} 
                        placeholder="••••••••"
                        value={profileConfirmPassword}
                        onChange={(e) => setProfileConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Show passwords toggle & Submit Button Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                    <button 
                      type="button" 
                      onClick={() => setShowProfilePasswords(!showProfilePasswords)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: 0
                      }}
                    >
                      {showProfilePasswords ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                      {showProfilePasswords ? "Hide Passwords" : "Show Passwords"}
                    </button>

                    <button 
                      type="button" 
                      style={{ 
                        backgroundColor: '#ef4444', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        height: '38px', 
                        padding: '0 1.5rem',
                        fontSize: '0.8rem', 
                        fontWeight: '700', 
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(239, 68, 68, 0.15)',
                        transition: 'background-color 0.2s ease'
                      }}
                      onClick={() => {
                        if (!profileCurrentPassword || !profileNewPassword || !profileConfirmPassword) {
                          alert('Please fill out all password fields.');
                          return;
                        }
                        if (profileCurrentPassword !== currentUser.password) {
                          alert('Incorrect current password.');
                          return;
                        }
                        if (profileNewPassword.length < 6) {
                          alert('New password must be at least 6 characters.');
                          return;
                        }
                        if (profileNewPassword !== profileConfirmPassword) {
                          alert('New password and Confirmation password do not match.');
                          return;
                        }
                        setCurrentUser(prev => ({ ...prev, password: profileNewPassword }));
                        setUsers(users.map(u => u.id === currentUser.id ? { ...u, password: profileNewPassword } : u));
                        setProfileCurrentPassword('');
                        setProfileNewPassword('');
                        setProfileConfirmPassword('');
                        alert('Password successfully updated!');
                      }}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- DELIVERIES MODULE TAB (ADMIN AND STAFF VIEW) --- */}
        {activeTab === 'Deliveries' && (
          <div className="animate-fade-in" style={{ width: '100%', paddingBottom: '1.5rem' }}>

            <div className="tab-sticky-header">
            {/* Header section */}
            <div style={{ marginBottom: '0.4rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Product Deliveries Ledger
              </h1>
            </div>

            {/* Sub-Tab Navigation Switcher */}
            <div className="sub-tab-nav" style={{
              display: 'flex',
              borderBottom: '2px solid #e2e8f0',
              marginBottom: '0.5rem',
              gap: '1.5rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '2px'
            }}>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setDeliverySubTab('unassigned')}
                  style={{
                    padding: '0.6rem 0.2rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: deliverySubTab === 'unassigned' ? '#0f172a' : '#64748b',
                    border: 'none',
                    borderBottom: deliverySubTab === 'unassigned' ? '3px solid #0f172a' : '3px solid transparent',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    marginBottom: '-2px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Database size={15} />
                  <span><span className="tab-full">Unassigned Vouchers</span><span className="tab-short">Unassigned</span></span>
                  <span style={{
                    backgroundColor: deliverySubTab === 'unassigned' ? '#e2e8f0' : '#f1f5f9',
                    color: deliverySubTab === 'unassigned' ? '#0f172a' : '#64748b',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    padding: '0.05rem 0.4rem'
                  }}>
                    {tallyData.filter(v => !assignedVoucherIds.includes(v.id)).length}
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setDeliverySubTab('pending')}
                style={{
                  padding: '0.6rem 0.2rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: deliverySubTab === 'pending' ? '#0f172a' : '#64748b',
                  border: 'none',
                  borderBottom: deliverySubTab === 'pending' ? '3px solid #0f172a' : '3px solid transparent',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  marginBottom: '-2px',
                  whiteSpace: 'nowrap'
                }}
              >
                <Clock size={15} />
                <span><span className="tab-full">Pending Handovers</span><span className="tab-short">Pending</span></span>
                <span style={{
                  backgroundColor: deliverySubTab === 'pending' ? '#e2e8f0' : '#f1f5f9',
                  color: deliverySubTab === 'pending' ? '#0f172a' : '#64748b',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  padding: '0.05rem 0.4rem'
                }}>
                  {deliveries.filter(d => d.status === 'pending' && (isAdmin || d.assignedToId === currentUser.id)).length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setDeliverySubTab('completed')}
                style={{
                  padding: '0.6rem 0.2rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: deliverySubTab === 'completed' ? '#0f172a' : '#64748b',
                  border: 'none',
                  borderBottom: deliverySubTab === 'completed' ? '3px solid #0f172a' : '3px solid transparent',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  marginBottom: '-2px',
                  whiteSpace: 'nowrap'
                }}
              >
                <CheckCircle size={15} />
                <span><span className="tab-full">Completed Registry</span><span className="tab-short">Completed</span></span>
                <span style={{
                  backgroundColor: deliverySubTab === 'completed' ? '#e2e8f0' : '#f1f5f9',
                  color: deliverySubTab === 'completed' ? '#0f172a' : '#64748b',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  padding: '0.05rem 0.4rem'
                }}>
                  {deliveries.filter(d => d.status === 'delivered' && (isAdmin || d.assignedToId === currentUser.id)).length}
                </span>
              </button>
            </div>
            </div>{/* end tab-sticky-header */}

            {/* TAB CONTENT: UNASSIGNED VOUCHERS (ADMIN ONLY) */}
            {deliverySubTab === 'unassigned' && isAdmin && (() => {
              const unassignedVouchers = tallyData.filter(v => {
                if (assignedVoucherIds.includes(v.id)) return false;
                const query = deliverySearch.toLowerCase().trim();
                return !query || 
                  (v.voucherNo && v.voucherNo.toLowerCase().includes(query)) ||
                  (v.partyName && v.partyName.toLowerCase().includes(query)) ||
                  (v.partyPhone && v.partyPhone.toLowerCase().includes(query)) ||
                  (v.itemDescription && v.itemDescription.toLowerCase().includes(query));
              });
              const D_PAGE = 20;
              const dTotalPages = Math.max(1, Math.ceil(unassignedVouchers.length / D_PAGE));
              const dEffPage = Math.min(deliveryPage, dTotalPages);
              const pagedVouchers = unassignedVouchers.slice((dEffPage - 1) * D_PAGE, dEffPage * D_PAGE);

              return (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>

                  {/* Sync & Search Toolbar */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.4rem'
                  }}>
                    {/* Search Field */}
                    <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                      <input
                        type="text"
                        className="form-input"
                        style={{ paddingLeft: '2.2rem', height: '38px', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%', fontSize: '0.825rem', backgroundColor: '#ffffff' }}
                        placeholder="Search unassigned Tally vouchers..."
                        value={deliverySearch}
                        onChange={(e) => setDeliverySearch(e.target.value)}
                      />
                      <span style={{ 
                        position: 'absolute', 
                        left: '0.8rem', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        color: 'var(--text-muted)', 
                        display: 'flex', 
                        alignItems: 'center' 
                      }}>
                        <Search size={14} />
                      </span>
                    </div>

                    {/* Action button */}
                    <button
                      type="button"
                      className="user-action-btn"
                      style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '0 1rem', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: tallyLoading ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease', height: '38px', flexShrink: 0, opacity: tallyLoading ? 0.7 : 1 }}
                      onClick={handleFetchTallyData}
                      disabled={tallyLoading}
                    >
                      {tallyLoading ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <RefreshCw size={14} />}
                      <span className="btn-label">{tallyLoading ? 'Syncing Tally ERP...' : 'Sync Tally ERP Vouchers'}</span>
                    </button>
                    {/* Mobile-only assign icon button */}
                    <button
                      type="button"
                      className="mobile-assign-btn"
                      title="Assign selected vouchers"
                      disabled={selectedVoucherIds.length === 0}
                      onClick={() => setShowBulkAssignModal(true)}
                      style={{ position: 'relative', backgroundColor: selectedVoucherIds.length > 0 ? '#ef4444' : '#e2e8f0', color: selectedVoucherIds.length > 0 ? 'white' : '#94a3b8', border: 'none', borderRadius: '8px', width: '38px', height: '38px', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: selectedVoucherIds.length > 0 ? 'pointer' : 'not-allowed', transition: 'all 0.2s ease' }}
                    >
                      <UserPlus size={16} />
                      {selectedVoucherIds.length > 0 && (
                        <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#0f172a', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '0.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                          {selectedVoucherIds.length}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Report Card & Table */}
                  <div className="delivery-table-desktop" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    {/* Table */}
                    <div style={{ flex: 1, minWidth: 0, backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                      <div className="table-container">
                        {tallyLoading ? (
                          <div style={{ padding: '3.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                            <RefreshCw size={28} style={{ animation: 'spin 1s linear infinite' }} color="#ef4444" />
                            <div style={{ fontWeight: '750', fontSize: '0.875rem', color: '#0f172a' }}>Connecting to Tally ERP...</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Fetching pending sales vouchers from TallyPrime server</div>
                          </div>
                        ) : unassignedVouchers.length === 0 ? (
                          <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            No unassigned Tally vouchers found. Click 'Sync Tally ERP Vouchers' to fetch from database.
                          </div>
                        ) : (
                          <>
                          <table className="premium-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                            <thead>
                              <tr style={{ backgroundColor: '#f8fafc' }}>
                                <th style={{ width: '44px', padding: '0.75rem 0.75rem 0.75rem 1rem', borderBottom: '1px solid #e2e8f0' }}>
                                  <input
                                    type="checkbox"
                                    accentColor="#ef4444"
                                    checked={unassignedVouchers.length > 0 && unassignedVouchers.every(v => selectedVoucherIds.includes(v.id))}
                                    onChange={(e) => {
                                      if (e.target.checked) setSelectedVoucherIds(unassignedVouchers.map(v => v.id));
                                      else setSelectedVoucherIds([]);
                                    }}
                                    style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: '#ef4444' }}
                                  />
                                </th>
                                <th style={{ width: '44px', padding: '0.75rem 0.5rem', fontSize: '0.725rem', fontWeight: '700', color: '#475569', textAlign: 'left', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>#</th>
                                {['Bill Ref', 'Party Name', 'Opening Bal.', 'Closing Bal.', 'Due Date', 'Days Overdue'].map(h => (
                                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.725rem', fontWeight: '700', color: '#475569', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {pagedVouchers.map((v, idx) => {
                                const isSelected = selectedVoucherIds.includes(v.id);
                                return (
                                  <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: isSelected ? '#fef2f2' : 'transparent', transition: 'background-color 0.15s ease' }}>
                                    <td style={{ padding: '0.85rem 0.75rem 0.85rem 1rem' }}>
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => {
                                          if (e.target.checked) setSelectedVoucherIds(prev => [...prev, v.id]);
                                          else setSelectedVoucherIds(prev => prev.filter(i => i !== v.id));
                                        }}
                                        style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: '#ef4444' }}
                                      />
                                    </td>
                                    <td style={{ padding: '0.85rem 0.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.8rem' }}>{(dEffPage - 1) * D_PAGE + idx + 1}</td>
                                    <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap' }}>{v.voucherNo}</td>
                                    <td style={{ padding: '0.85rem 1rem', fontWeight: '600', color: '#0f172a' }}>{v.partyName}</td>
                                    <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap' }}>₹{(v.openingBalance || v.amount || 0).toLocaleString()}</td>
                                    <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>₹{(v.closingBalance || v.openingBalance || v.amount || 0).toLocaleString()}</td>
                                    <td style={{ padding: '0.85rem 1rem', color: '#64748b', whiteSpace: 'nowrap' }}>{v.dueDate}</td>
                                    <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: v.daysOverdue > 90 ? '#ef4444' : v.daysOverdue > 30 ? '#f59e0b' : '#22c55e', whiteSpace: 'nowrap' }}>{v.daysOverdue} days</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          {dTotalPages > 1 && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                              <span>{unassignedVouchers.length} total · Page {dEffPage} of {dTotalPages}</span>
                              <div style={{ display: 'flex', gap: '0.4rem' }}>
                                <button type="button" onClick={() => setDeliveryPage(p => Math.max(1, p - 1))} disabled={dEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: dEffPage === 1 ? '#f8fafc' : '#fff', color: dEffPage === 1 ? '#cbd5e1' : '#334155', cursor: dEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                                <button type="button" onClick={() => setDeliveryPage(p => Math.min(dTotalPages, p + 1))} disabled={dEffPage === dTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: dEffPage === dTotalPages ? '#f8fafc' : '#fff', color: dEffPage === dTotalPages ? '#cbd5e1' : '#334155', cursor: dEffPage === dTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                              </div>
                            </div>
                          )}
                          </>
                        )}
                      </div>
                    </div>
                    {/* Right Panel - always visible */}
                    <div style={{ width: '22%', minWidth: '180px', flexShrink: 0, position: 'sticky', top: '80px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                      <div style={{ padding: '0.6rem 0.85rem', backgroundColor: selectedVoucherIds.length > 0 ? '#fef2f2' : '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: selectedVoucherIds.length > 0 ? '#ef4444' : '#64748b' }}>
                          {selectedVoucherIds.length > 0 ? `Selected (${selectedVoucherIds.length})` : 'Selection'}
                        </span>
                        {selectedVoucherIds.length > 0 && (
                          <button type="button" onClick={() => setSelectedVoucherIds([])} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '0.7rem', padding: '0' }}>Clear all</button>
                        )}
                      </div>
                      {selectedVoucherIds.length === 0 ? (
                        <div style={{ padding: '1.5rem 0.85rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.72rem' }}>
                          <div style={{ marginBottom: '0.4rem', fontSize: '1.25rem' }}>☑</div>
                          Tick vouchers to select them for bulk assignment
                        </div>
                      ) : (
                        <>
                          <div style={{ maxHeight: '275px', overflowY: 'auto' }}>
                            {selectedVoucherIds.map(id => {
                              const v = tallyData.find(x => x.id === id);
                              if (!v) return null;
                              return (
                                <div key={id} style={{ padding: '0.5rem 0.85rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.4rem' }}>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.voucherNo}</div>
                                    <div style={{ fontSize: '0.68rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.partyName}</div>
                                    <div style={{ fontSize: '0.68rem', color: '#ef4444', fontWeight: '700' }}>₹{v.amount.toLocaleString()}</div>
                                  </div>
                                  <button type="button" onClick={() => setSelectedVoucherIds(prev => prev.filter(i => i !== id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', flexShrink: 0, lineHeight: 1, padding: '0.1rem' }}>✕</button>
                                </div>
                              );
                            })}
                          </div>
                          <div style={{ padding: '0.6rem 0.85rem' }}>
                            <button type="button" onClick={() => setShowBulkAssignModal(true)}
                              style={{ width: '100%', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.775rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                              <Link size={13} /> Assign {selectedVoucherIds.length} to Staff
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Mobile cards for unassigned vouchers */}
                  <div className="delivery-mobile-cards">
                    {tallyLoading ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                        <RefreshCw size={22} style={{ animation: 'spin 1s linear infinite' }} color="#ef4444" />
                      </div>
                    ) : unassignedVouchers.length === 0 ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.82rem' }}>No unassigned vouchers. Click Sync to fetch.</div>
                    ) : (
                      <div style={{ position: 'relative' }}>
                        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
                          {pagedVouchers.map((v) => {
                            const isSelected = selectedVoucherIds.includes(v.id);
                            return (
                              <SwipeableCard
                                key={v.id}
                                snap={72}
                                actions={null}
                              >
                                <div style={{ padding: '0.7rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem', backgroundColor: isSelected ? '#fef2f2' : 'transparent' }}>
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      if (e.target.checked) setSelectedVoucherIds(prev => [...prev, v.id]);
                                      else setSelectedVoucherIds(prev => prev.filter(i => i !== v.id));
                                    }}
                                    style={{ marginTop: '0.2rem', flexShrink: 0, width: '15px', height: '15px', accentColor: '#ef4444', cursor: 'pointer' }}
                                  />
                                  <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <div style={{ fontWeight: '800', fontSize: '0.82rem', color: '#0f172a' }}>{v.voucherNo}</div>
                                      <div style={{ fontSize: '0.75rem', color: '#0f172a', fontWeight: '600', marginTop: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.partyName}</div>
                                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem' }}>{v.partyPhone}</div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                      <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#0f172a' }}>₹{v.amount.toLocaleString()}</div>
                                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>{v.voucherDate}</div>
                                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.itemDescription}</div>
                                    </div>
                                  </div>
                                </div>
                              </SwipeableCard>
                            );
                          })}
                        </div>
                        {dTotalPages > 1 && (
                          <div style={{ marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', backgroundColor: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                              <span>{unassignedVouchers.length} total · Page {dEffPage} of {dTotalPages}</span>
                              <div style={{ display: 'flex', gap: '0.4rem' }}>
                                <button type="button" onClick={() => setDeliveryPage(p => Math.max(1, p - 1))} disabled={dEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: dEffPage === 1 ? '#f8fafc' : '#fff', color: dEffPage === 1 ? '#cbd5e1' : '#334155', cursor: dEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                                <button type="button" onClick={() => setDeliveryPage(p => Math.min(dTotalPages, p + 1))} disabled={dEffPage === dTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: dEffPage === dTotalPages ? '#f8fafc' : '#fff', color: dEffPage === dTotalPages ? '#cbd5e1' : '#334155', cursor: dEffPage === dTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              );
            })()}

            {/* TAB CONTENT: PENDING AND COMPLETED REPORT TABLES */}
            {(deliverySubTab === 'pending' || deliverySubTab === 'completed') && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>

                {/* Advanced Search & Filtering Toolbar */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.4rem'
                }}>
                  {/* Search field */}
                  <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                    <input
                      type="text"
                      className="form-input"
                      style={{ paddingLeft: '2.2rem', height: '38px', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%', fontSize: '0.825rem', backgroundColor: '#ffffff' }}
                      placeholder={`Search ${deliverySubTab === 'pending' ? 'pending' : 'completed'} handovers...`}
                      value={deliverySearch}
                      onChange={(e) => setDeliverySearch(e.target.value)}
                    />
                    <span style={{ 
                      position: 'absolute', 
                      left: '0.8rem', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-muted)', 
                      display: 'flex', 
                      alignItems: 'center' 
                    }}>
                      <Search size={14} />
                    </span>
                  </div>

                  {/* Filters group (right-aligned) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    
                    {/* Staff Dropdown (Admin only) */}
                    {isAdmin && (() => {
                      const staffUsers = users.filter(u => u.role !== 'admin');
                      const currentStaffName = deliveryStaffFilter === 'All' 
                        ? 'All Staff Handlers' 
                        : (staffUsers.find(u => u.id === Number(deliveryStaffFilter))?.name || 'All Staff Handlers');

                      return (
                        <div ref={staffDropdownRef} style={{ position: 'relative' }}>
                          <div 
                            onClick={() => {
                              setShowStaffDropdown(prev => !prev);
                              setShowStatusDropdown(false);
                            }}
                            className="filter-dropdown-trigger"
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.4rem', 
                              cursor: 'pointer',
                              userSelect: 'none',
                              padding: '0.3rem 0.65rem',
                              borderRadius: '8px',
                              height: '38px'
                            }}
                            title="Staff Filter"
                          >
                            <User size={13} style={{ color: deliveryStaffFilter !== 'All' ? '#ef4444' : '#64748b' }} />
                            <span className="filter-label" style={{
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              color: '#334155'
                            }}>
                              {currentStaffName}
                            </span>
                            <ChevronDown size={11} style={{ color: '#94a3b8', marginLeft: '0.1rem' }} />
                          </div>

                          {showStaffDropdown && (
                            <div style={{
                              position: 'absolute',
                              top: '40px',
                              right: 0,
                              backgroundColor: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                              padding: '0.25rem',
                              minWidth: '180px',
                              zIndex: 100,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1px'
                            }}>
                              {/* All Staff Handlers option */}
                              {(() => {
                                const isActive = deliveryStaffFilter === 'All';
                                return (
                                  <div
                                    className="dropdown-item"
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      fontSize: '0.8rem',
                                      color: isActive ? '#ef4444' : '#475569',
                                      fontWeight: isActive ? '700' : '500',
                                      backgroundColor: isActive ? '#f8fafc' : 'transparent',
                                      padding: '0.45rem 0.65rem',
                                      borderRadius: '6px',
                                      cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                      setDeliveryStaffFilter('All');
                                      setShowStaffDropdown(false);
                                    }}
                                  >
                                    <span>All Staff Handlers</span>
                                    {isActive && <Check size={12} style={{ color: '#ef4444' }} />}
                                  </div>
                                );
                              })()}

                              {/* Individual Staff options */}
                              {staffUsers.map((u) => {
                                const isActive = deliveryStaffFilter === u.id.toString();
                                return (
                                  <div
                                    key={u.id}
                                    className="dropdown-item"
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      fontSize: '0.8rem',
                                      color: isActive ? '#ef4444' : '#475569',
                                      fontWeight: isActive ? '700' : '500',
                                      backgroundColor: isActive ? '#f8fafc' : 'transparent',
                                      padding: '0.45rem 0.65rem',
                                      borderRadius: '6px',
                                      cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                      setDeliveryStaffFilter(u.id.toString());
                                      setShowStaffDropdown(false);
                                    }}
                                  >
                                    <span>{u.name}</span>
                                    {isActive && <Check size={12} style={{ color: '#ef4444' }} />}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Flat Ledger Table */}
                <div className="delivery-table-desktop" style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                  <div className="table-container">
                    <table className="premium-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8fafc' }}>
                          <th style={{ width: '50px', padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: '700', color: '#475569', textAlign: 'left', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>#</th>
                          {(() => {
                            const renderSortHeader = (label, field) => {
                              const isActive = deliverySortField === field;
                              return (
                                <th 
                                  style={{ 
                                    padding: '0.75rem 1rem', 
                                    textAlign: 'left', 
                                    fontSize: '0.725rem', 
                                    fontWeight: '700', 
                                    color: '#475569', 
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    transition: 'all 0.2s ease',
                                    backgroundColor: '#f8fafc',
                                    borderBottom: '1px solid #e2e8f0',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                  }}
                                  onClick={() => handleSort(field)}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <span>{label}</span>
                                    <ArrowUpDown size={11} style={{ color: '#475569', opacity: isActive ? 1 : 0.4, flexShrink: 0 }} />
                                  </div>
                                </th>
                              );
                            };
                            return (
                              <>
                                {renderSortHeader('Product Details', 'product')}
                                {renderSortHeader('Customer', 'customer')}
                                {renderSortHeader('Assigned Handler', 'handler')}
                                {renderSortHeader('Timeline', 'timeline')}
                                {renderSortHeader(deliverySubTab === 'pending' ? 'Target Address' : 'Handover GPS / Address', 'location')}
                                {renderSortHeader('Action / Status', 'status')}
                              </>
                            );
                          })()}
                        </tr>
                      </thead>
                      <tbody>
                        {sortedDeliveries.length === 0 ? (
                          <tr>
                            <td colSpan="7" style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                              No delivery ledger entries found matching criteria.
                            </td>
                          </tr>
                        ) : (
                          pagedSortedDeliveries.map((d, index) => {
                            const isPending = d.status === 'pending';
                            
                            return (
                              <tr key={d.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s ease' }}>
                                <td style={{ padding: '0.85rem 1rem', color: '#64748b', fontWeight: '600', fontSize: '0.8rem' }}>
                                  {(drEffPage - 1) * DR_PAGE + index + 1}
                                </td>
                                
                                <td style={{ padding: '0.85rem 1rem', fontWeight: '600', color: '#0f172a', fontSize: '0.8rem' }}>
                                  <div>{d.product}</div>
                                  {d.tallyVoucherNo && (
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', backgroundColor: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '800', padding: '0.05rem 0.3rem', marginTop: '0.2rem' }}>
                                      Tally Ref: {d.tallyVoucherNo}
                                    </div>
                                  )}
                                </td>
                                
                                <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem' }}>
                                  <div style={{ fontWeight: '600', color: '#0f172a' }}>{d.customerName}</div>
                                  <div style={{ color: '#64748b', fontSize: '0.725rem', marginTop: '0.05rem' }}>{d.customerPhone}</div>
                                </td>
                                
                                <td style={{ padding: '0.85rem 1rem', color: '#334155', fontWeight: '500', fontSize: '0.8rem' }}>
                                  {d.assignedToName}
                                </td>
                                
                                <td style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', color: '#64748b' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <span>Assigned: {d.assignedDate}</span>
                                  </div>
                                  {!isPending && d.completedDate && (
                                    <div style={{ marginTop: '0.15rem', color: '#475569', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                      <span>Handed Over: {d.completedDate} {d.completedTime ? `at ${d.completedTime}` : ''}</span>
                                    </div>
                                  )}
                                </td>
                                
                                <td style={{ padding: '0.85rem 1rem', fontSize: '0.775rem', color: '#475569', maxWidth: '280px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', lineBreak: 'anywhere' }}>
                                    <span style={{ fontWeight: 'normal', color: '#475569' }}>
                                      {isPending ? d.targetLocation : d.actualLocation}
                                    </span>
                                  </div>
                                  {d.notes && d.notes !== 'None' && (
                                    <div style={{ fontSize: '0.725rem', color: '#64748b', fontStyle: 'italic', marginTop: '0.05rem' }} title={d.notes}>
                                      "{d.notes}"
                                    </div>
                                  )}
                                </td>
                                
                                <td style={{ padding: '0.85rem 1rem' }}>
                                  {isPending ? (
                                    !isAdmin ? (
                                      <button
                                        type="button"
                                        className="btn btn-success"
                                        style={{
                                          backgroundColor: '#10b981',
                                          color: 'white',
                                          border: 'none',
                                          padding: '0.35rem 0.75rem',
                                          borderRadius: '6px',
                                          fontSize: '0.75rem',
                                          fontWeight: '700',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '0.25rem',
                                          cursor: 'pointer',
                                          height: '30px',
                                          transition: 'all 0.2s'
                                        }}
                                        onClick={() => {
                                          setSelectedDeliveryForCompletion(d);
                                          setCompletionLocation('');
                                          setCompletionNotes('');
                                          setShowCompletionModal(true);
                                          // Auto-fetch GPS immediately on open
                                          setTimeout(() => handleFetchLocation(), 300);
                                        }}
                                      >
                                        <CheckCircle size={12} />
                                        Confirm Handover
                                      </button>
                                    ) : (
                                      <div style={{ fontWeight: '700', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Pending
                                      </div>
                                    )
                                  ) : (
                                    <div style={{ fontWeight: '700', fontSize: '0.75rem', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                      Completed
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                    {drTotalPages > 1 && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span>{sortedDeliveries.length} total · Page {drEffPage} of {drTotalPages}</span>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button type="button" onClick={() => setDeliveryReportPage(p => Math.max(1, p - 1))} disabled={drEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: drEffPage === 1 ? '#f8fafc' : '#fff', color: drEffPage === 1 ? '#cbd5e1' : '#334155', cursor: drEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                          <button type="button" onClick={() => setDeliveryReportPage(p => Math.min(drTotalPages, p + 1))} disabled={drEffPage === drTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: drEffPage === drTotalPages ? '#f8fafc' : '#fff', color: drEffPage === drTotalPages ? '#cbd5e1' : '#334155', cursor: drEffPage === drTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile cards for pending/completed deliveries */}
                <div className="delivery-mobile-cards">
                  {sortedDeliveries.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.82rem' }}>No entries found.</div>
                  ) : (
                    <div style={{ position: 'relative' }}>
                      <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff', marginBottom: '0.5rem' }}>
                        {pagedSortedDeliveries.map((d) => {
                          const isPending = d.status === 'pending';
                          return (
                            <SwipeableCard
                              key={d.id}
                              snap={72}
                              actions={isPending && !isAdmin ? (
                                <button
                                  type="button"
                                  style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', cursor: 'pointer', padding: '0.4rem 0.5rem' }}
                                  onClick={() => { setSelectedDeliveryForCompletion(d); setCompletionLocation(''); setCompletionNotes(''); setShowCompletionModal(true); setTimeout(() => handleFetchLocation(), 300); }}
                                >
                                  <CheckCircle size={20} color="#10b981" />
                                </button>
                              ) : null}
                            >
                              <div style={{ padding: '0.7rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontWeight: '700', fontSize: '0.82rem', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.product}</div>
                                  <div style={{ fontSize: '0.75rem', color: '#0f172a', fontWeight: '600', marginTop: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.customerName}</div>
                                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem' }}>{d.customerPhone}</div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                  <span style={{ fontSize: '0.62rem', fontWeight: '800', padding: '0.12rem 0.35rem', borderRadius: '4px', display: 'inline-block', backgroundColor: isPending ? '#fef3c7' : '#dcfce7', color: isPending ? '#d97706' : '#16a34a' }}>
                                    {isPending ? 'PENDING' : 'DELIVERED'}
                                  </span>
                                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>{d.assignedDate}</div>
                                  {d.tallyVoucherNo && <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.1rem' }}>{d.tallyVoucherNo}</div>}
                                </div>
                              </div>
                            </SwipeableCard>
                          );
                        })}
                      </div>
                      <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', backgroundColor: '#fff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span>{sortedDeliveries.length} total · Page {drEffPage} of {drTotalPages}</span>
                          {drTotalPages > 1 && (
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button type="button" onClick={() => setDeliveryReportPage(p => Math.max(1, p - 1))} disabled={drEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: drEffPage === 1 ? '#f8fafc' : '#fff', color: drEffPage === 1 ? '#cbd5e1' : '#334155', cursor: drEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                              <button type="button" onClick={() => setDeliveryReportPage(p => Math.min(drTotalPages, p + 1))} disabled={drEffPage === drTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: drEffPage === drTotalPages ? '#f8fafc' : '#fff', color: drEffPage === drTotalPages ? '#cbd5e1' : '#334155', cursor: drEffPage === drTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

        {/* --- MONEY COLLECTIONS MODULE TAB (ADMIN AND STAFF VIEW) --- */}
        {activeTab === 'Collections' && (
          <div className="animate-fade-in" style={{ width: '100%', paddingBottom: '1.5rem' }}>

            <div className="tab-sticky-header">
            {/* Header section */}
            <div style={{ marginBottom: '0.4rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Money Collections Ledger
              </h1>
            </div>

            {/* Sub-Tab Navigation Switcher */}
            <div className="sub-tab-nav" style={{
              display: 'flex',
              borderBottom: '2px solid #e2e8f0',
              marginBottom: '0.5rem',
              gap: '1.5rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '2px'
            }}>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setCollectionSubTab('unassigned')}
                  style={{
                    padding: '0.6rem 0.2rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: collectionSubTab === 'unassigned' ? '#0f172a' : '#64748b',
                    border: 'none',
                    borderBottom: collectionSubTab === 'unassigned' ? '3px solid #0f172a' : '3px solid transparent',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    marginBottom: '-2px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Database size={15} />
                  <span><span className="tab-full">Unassigned Vouchers</span><span className="tab-short">Unassigned</span></span>
                  <span style={{
                    backgroundColor: collectionSubTab === 'unassigned' ? '#e2e8f0' : '#f1f5f9',
                    color: collectionSubTab === 'unassigned' ? '#0f172a' : '#64748b',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    padding: '0.05rem 0.4rem'
                  }}>
                    {tallyColData.filter(v => !assignedColVoucherIds.includes(v.id)).length}
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setCollectionSubTab('pending')}
                style={{
                  padding: '0.6rem 0.2rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: collectionSubTab === 'pending' ? '#0f172a' : '#64748b',
                  border: 'none',
                  borderBottom: collectionSubTab === 'pending' ? '3px solid #0f172a' : '3px solid transparent',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  marginBottom: '-2px',
                  whiteSpace: 'nowrap'
                }}
              >
                <Clock size={15} />
                <span><span className="tab-full">Pending Collections</span><span className="tab-short">Pending</span></span>
                <span style={{
                  backgroundColor: collectionSubTab === 'pending' ? '#e2e8f0' : '#f1f5f9',
                  color: collectionSubTab === 'pending' ? '#0f172a' : '#64748b',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  padding: '0.05rem 0.4rem'
                }}>
                  {userCollections.filter(c => c.status === 'pending').length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setCollectionSubTab('completed')}
                style={{
                  padding: '0.6rem 0.2rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: collectionSubTab === 'completed' ? '#0f172a' : '#64748b',
                  border: 'none',
                  borderBottom: collectionSubTab === 'completed' ? '3px solid #0f172a' : '3px solid transparent',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  marginBottom: '-2px',
                  whiteSpace: 'nowrap'
                }}
              >
                <CheckCircle size={15} />
                <span><span className="tab-full">Completed Collections</span><span className="tab-short">Completed</span></span>
                <span style={{
                  backgroundColor: collectionSubTab === 'completed' ? '#e2e8f0' : '#f1f5f9',
                  color: collectionSubTab === 'completed' ? '#0f172a' : '#64748b',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  padding: '0.05rem 0.4rem'
                }}>
                  {userCollections.filter(c => c.status === 'completed').length}
                </span>
              </button>
            </div>
            </div>{/* end tab-sticky-header */}

            {/* TAB CONTENT: UNASSIGNED COLLECTION VOUCHERS (ADMIN ONLY) */}
            {collectionSubTab === 'unassigned' && isAdmin && (() => {
              const unassignedColVouchers = tallyColData.filter(v => {
                if (assignedColVoucherIds.includes(v.id)) return false;
                const query = collectionSearch.toLowerCase().trim();
                return !query ||
                  (v.voucherNo && v.voucherNo.toLowerCase().includes(query)) ||
                  (v.partyName && v.partyName.toLowerCase().includes(query)) ||
                  (v.partyPhone && v.partyPhone.toLowerCase().includes(query)) ||
                  (v.description && v.description.toLowerCase().includes(query));
              });
              const C_PAGE = 20;
              const cTotalPages = Math.max(1, Math.ceil(unassignedColVouchers.length / C_PAGE));
              const cEffPage = Math.min(collectionPage, cTotalPages);
              const pagedColVouchers = unassignedColVouchers.slice((cEffPage - 1) * C_PAGE, cEffPage * C_PAGE);

              return (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>

                  {/* Sync & Search Toolbar */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.4rem'
                  }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                      <input
                        type="text"
                        className="form-input"
                        style={{
                          paddingLeft: '2.2rem',
                          height: '38px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          width: '100%',
                          fontSize: '0.825rem',
                          backgroundColor: '#ffffff'
                        }}
                        placeholder="Search unassigned collection vouchers..."
                        value={collectionSearch}
                        onChange={(e) => setCollectionSearch(e.target.value)}
                      />
                      <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                        <Search size={14} />
                      </span>
                    </div>

                    <button
                      type="button"
                      className="user-action-btn"
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0 1rem',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: tallyColLoading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        height: '38px',
                        flexShrink: 0,
                        opacity: tallyColLoading ? 0.7 : 1
                      }}
                      onClick={handleFetchTallyColData}
                      disabled={tallyColLoading}
                    >
                      {tallyColLoading ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <RefreshCw size={14} />}
                      <span className="btn-label">{tallyColLoading ? 'Syncing Tally ERP...' : 'Sync Tally ERP Vouchers'}</span>
                    </button>
                    {/* Mobile-only assign icon button */}
                    <button
                      type="button"
                      className="mobile-assign-btn"
                      title="Assign selected vouchers"
                      disabled={selectedColVoucherIds.length === 0}
                      onClick={() => setShowBulkColAssignModal(true)}
                      style={{ position: 'relative', backgroundColor: selectedColVoucherIds.length > 0 ? '#ef4444' : '#e2e8f0', color: selectedColVoucherIds.length > 0 ? 'white' : '#94a3b8', border: 'none', borderRadius: '8px', width: '38px', height: '38px', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: selectedColVoucherIds.length > 0 ? 'pointer' : 'not-allowed', transition: 'all 0.2s ease' }}
                    >
                      <UserPlus size={16} />
                      {selectedColVoucherIds.length > 0 && (
                        <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#0f172a', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '0.6rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                          {selectedColVoucherIds.length}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Vouchers Table - desktop */}
                  <div className="delivery-table-desktop" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    {/* Table */}
                    <div style={{ flex: 1, minWidth: 0, backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                      <div className="table-container">
                        {tallyColLoading ? (
                          <div style={{ padding: '3.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                            <RefreshCw size={28} style={{ animation: 'spin 1s linear infinite' }} color="#ef4444" />
                            <div style={{ fontWeight: '750', fontSize: '0.875rem', color: '#0f172a' }}>Connecting to Tally ERP...</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Fetching outstanding collection vouchers from TallyPrime server</div>
                          </div>
                        ) : unassignedColVouchers.length === 0 ? (
                          <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            No unassigned collection vouchers found. Click 'Sync Tally ERP Vouchers' to fetch from database.
                          </div>
                        ) : (
                          <>
                          <table className="premium-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                            <thead>
                              <tr style={{ backgroundColor: '#f8fafc' }}>
                                <th style={{ width: '44px', padding: '0.75rem 0.75rem 0.75rem 1rem', borderBottom: '1px solid #e2e8f0' }}>
                                  <input
                                    type="checkbox"
                                    checked={unassignedColVouchers.length > 0 && unassignedColVouchers.every(v => selectedColVoucherIds.includes(v.id))}
                                    onChange={(e) => {
                                      if (e.target.checked) setSelectedColVoucherIds(unassignedColVouchers.map(v => v.id));
                                      else setSelectedColVoucherIds([]);
                                    }}
                                    style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: '#ef4444' }}
                                  />
                                </th>
                                <th style={{ width: '44px', padding: '0.75rem 0.5rem', fontSize: '0.725rem', fontWeight: '700', color: '#475569', textAlign: 'left', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>#</th>
                                {['Bill Ref', 'Party Name', 'Opening Bal.', 'Closing Bal.', 'Due Date', 'Days Overdue'].map(h => (
                                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.725rem', fontWeight: '700', color: '#475569', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {pagedColVouchers.map((v, idx) => {
                                const isSelected = selectedColVoucherIds.includes(v.id);
                                return (
                                  <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: isSelected ? '#fef2f2' : 'transparent', transition: 'background-color 0.15s ease' }}>
                                    <td style={{ padding: '0.85rem 0.75rem 0.85rem 1rem' }}>
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => {
                                          if (e.target.checked) setSelectedColVoucherIds(prev => [...prev, v.id]);
                                          else setSelectedColVoucherIds(prev => prev.filter(i => i !== v.id));
                                        }}
                                        style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: '#ef4444' }}
                                      />
                                    </td>
                                    <td style={{ padding: '0.85rem 0.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.8rem' }}>{(cEffPage - 1) * C_PAGE + idx + 1}</td>
                                    <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap' }}>{v.voucherNo}</td>
                                    <td style={{ padding: '0.85rem 1rem', fontWeight: '600', color: '#0f172a' }}>{v.partyName}</td>
                                    <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap' }}>₹{(v.openingBalance || v.amount || 0).toLocaleString()}</td>
                                    <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: '#ef4444', whiteSpace: 'nowrap' }}>₹{(v.closingBalance || v.openingBalance || v.amount || 0).toLocaleString()}</td>
                                    <td style={{ padding: '0.85rem 1rem', color: '#64748b', whiteSpace: 'nowrap' }}>{v.dueDate}</td>
                                    <td style={{ padding: '0.85rem 1rem', fontWeight: '700', color: v.daysOverdue > 90 ? '#ef4444' : v.daysOverdue > 30 ? '#f59e0b' : '#22c55e', whiteSpace: 'nowrap' }}>{v.daysOverdue} days</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          {cTotalPages > 1 && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                              <span>{unassignedColVouchers.length} total · Page {cEffPage} of {cTotalPages}</span>
                              <div style={{ display: 'flex', gap: '0.4rem' }}>
                                <button type="button" onClick={() => setCollectionPage(p => Math.max(1, p - 1))} disabled={cEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: cEffPage === 1 ? '#f8fafc' : '#fff', color: cEffPage === 1 ? '#cbd5e1' : '#334155', cursor: cEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                                <button type="button" onClick={() => setCollectionPage(p => Math.min(cTotalPages, p + 1))} disabled={cEffPage === cTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: cEffPage === cTotalPages ? '#f8fafc' : '#fff', color: cEffPage === cTotalPages ? '#cbd5e1' : '#334155', cursor: cEffPage === cTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                              </div>
                            </div>
                          )}
                          </>
                        )}
                      </div>
                    </div>
                    {/* Right Panel - always visible */}
                    <div style={{ width: '22%', minWidth: '180px', flexShrink: 0, position: 'sticky', top: '80px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                      <div style={{ padding: '0.6rem 0.85rem', backgroundColor: selectedColVoucherIds.length > 0 ? '#fef2f2' : '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: selectedColVoucherIds.length > 0 ? '#ef4444' : '#64748b' }}>
                          {selectedColVoucherIds.length > 0 ? `Selected (${selectedColVoucherIds.length})` : 'Selection'}
                        </span>
                        {selectedColVoucherIds.length > 0 && (
                          <button type="button" onClick={() => setSelectedColVoucherIds([])} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '0.7rem', padding: '0' }}>Clear all</button>
                        )}
                      </div>
                      {selectedColVoucherIds.length === 0 ? (
                        <div style={{ padding: '1.5rem 0.85rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.72rem' }}>
                          <div style={{ marginBottom: '0.4rem', fontSize: '1.25rem' }}>☑</div>
                          Tick vouchers to select them for bulk assignment
                        </div>
                      ) : (
                        <>
                          <div style={{ maxHeight: '275px', overflowY: 'auto' }}>
                            {selectedColVoucherIds.map(id => {
                              const v = tallyColData.find(x => x.id === id);
                              if (!v) return null;
                              return (
                                <div key={id} style={{ padding: '0.5rem 0.85rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.4rem' }}>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.voucherNo}</div>
                                    <div style={{ fontSize: '0.68rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.partyName}</div>
                                    <div style={{ fontSize: '0.68rem', color: '#ef4444', fontWeight: '700' }}>₹{v.amount.toLocaleString()}</div>
                                  </div>
                                  <button type="button" onClick={() => setSelectedColVoucherIds(prev => prev.filter(i => i !== id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', flexShrink: 0, lineHeight: 1, padding: '0.1rem' }}>✕</button>
                                </div>
                              );
                            })}
                          </div>
                          <div style={{ padding: '0.6rem 0.85rem' }}>
                            <button type="button" onClick={() => setShowBulkColAssignModal(true)}
                              style={{ width: '100%', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.775rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                              <Link size={13} /> Assign {selectedColVoucherIds.length} to Staff
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mobile cards for unassigned collection vouchers */}
                  <div className="delivery-mobile-cards">
                    {tallyColLoading ? (
                      <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <RefreshCw size={22} style={{ animation: 'spin 1s linear infinite' }} color="#ef4444" />
                      </div>
                    ) : unassignedColVouchers.length === 0 ? (
                      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.82rem' }}>No unassigned vouchers. Click Sync to fetch.</div>
                    ) : (
                       <div style={{ position: 'relative' }}>
                        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
                          {pagedColVouchers.map((v) => {
                            const isSelected = selectedColVoucherIds.includes(v.id);
                            return (
                              <SwipeableCard
                                key={v.id}
                                snap={72}
                                actions={null}
                              >
                                <div style={{ padding: '0.7rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem', backgroundColor: isSelected ? '#fef2f2' : 'transparent' }}>
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      if (e.target.checked) setSelectedColVoucherIds(prev => [...prev, v.id]);
                                      else setSelectedColVoucherIds(prev => prev.filter(i => i !== v.id));
                                    }}
                                    style={{ marginTop: '0.2rem', flexShrink: 0, width: '15px', height: '15px', accentColor: '#ef4444', cursor: 'pointer' }}
                                  />
                                  <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <div style={{ fontWeight: '800', fontSize: '0.82rem', color: '#0f172a' }}>{v.voucherNo}</div>
                                      <div style={{ fontSize: '0.75rem', color: '#0f172a', fontWeight: '600', marginTop: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.partyName}</div>
                                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem' }}>{v.partyPhone}</div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                      <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#0f172a' }}>₹{v.amount.toLocaleString()}</div>
                                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>{v.voucherDate}</div>
                                      <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.description}</div>
                                    </div>
                                  </div>
                                </div>
                              </SwipeableCard>
                            );
                          })}
                        </div>
                        {cTotalPages > 1 && (
                          <div style={{ marginTop: '0.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', backgroundColor: '#fff' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                              <span>{unassignedColVouchers.length} total · Page {cEffPage} of {cTotalPages}</span>
                              <div style={{ display: 'flex', gap: '0.4rem' }}>
                                <button type="button" onClick={() => setCollectionPage(p => Math.max(1, p - 1))} disabled={cEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: cEffPage === 1 ? '#f8fafc' : '#fff', color: cEffPage === 1 ? '#cbd5e1' : '#334155', cursor: cEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                                <button type="button" onClick={() => setCollectionPage(p => Math.min(cTotalPages, p + 1))} disabled={cEffPage === cTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: cEffPage === cTotalPages ? '#f8fafc' : '#fff', color: cEffPage === cTotalPages ? '#cbd5e1' : '#334155', cursor: cEffPage === cTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              );
            })()}

            {/* TAB CONTENT: PENDING AND COMPLETED LEDGER TABLE */}
            {(collectionSubTab === 'pending' || collectionSubTab === 'completed') && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

            {/* Advanced Search & Filtering Toolbar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem'
            }}>
              {/* Search field */}
              <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                <input
                  type="text"
                  className="form-input"
                  style={{
                    paddingLeft: '2.2rem',
                    height: '38px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    width: '100%',
                    fontSize: '0.825rem',
                    backgroundColor: '#ffffff'
                  }}
                  placeholder={`Search ${collectionSubTab === 'pending' ? 'pending' : 'completed'} collections...`}
                  value={collectionSearch}
                  onChange={(e) => setCollectionSearch(e.target.value)}
                />
                <span style={{
                  position: 'absolute',
                  left: '0.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Search size={14} />
                </span>
              </div>

              {/* Filters group (right-aligned) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

                {/* Staff Dropdown (Admin only) */}
                {isAdmin && (() => {
                  const staffUsers = users.filter(u => u.role !== 'admin');
                  const currentStaffName = collectionStaffFilter === 'All'
                    ? 'All Staff Handlers'
                    : (staffUsers.find(u => u.id === Number(collectionStaffFilter))?.name || 'All Staff Handlers');

                  return (
                    <div ref={colStaffDropdownRef} style={{ position: 'relative' }}>
                      <div
                        onClick={() => setShowColStaffDropdown(prev => !prev)}
                        className="filter-dropdown-trigger"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          cursor: 'pointer',
                          userSelect: 'none',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '8px',
                          height: '38px'
                        }}
                        title="Staff Filter"
                      >
                        <User size={13} style={{ color: collectionStaffFilter !== 'All' ? '#ef4444' : '#64748b' }} />
                        <span className="filter-label" style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155' }}>
                          {currentStaffName}
                        </span>
                        <ChevronDown size={11} style={{ color: '#94a3b8', marginLeft: '0.1rem' }} />
                      </div>

                      {showColStaffDropdown && (
                        <div style={{
                          position: 'absolute',
                          top: '40px',
                          right: 0,
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                          padding: '0.25rem',
                          minWidth: '180px',
                          zIndex: 100,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1px'
                        }}>
                          {(() => {
                            const isActive = collectionStaffFilter === 'All';
                            return (
                              <div
                                className="dropdown-item"
                                style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  fontSize: '0.8rem', color: isActive ? '#ef4444' : '#475569',
                                  fontWeight: isActive ? '700' : '500',
                                  backgroundColor: isActive ? '#f8fafc' : 'transparent',
                                  padding: '0.45rem 0.65rem', borderRadius: '6px', cursor: 'pointer'
                                }}
                                onClick={() => { setCollectionStaffFilter('All'); setShowColStaffDropdown(false); }}
                              >
                                <span>All Staff Handlers</span>
                                {isActive && <Check size={12} style={{ color: '#ef4444' }} />}
                              </div>
                            );
                          })()}
                          {staffUsers.map((u) => {
                            const isActive = collectionStaffFilter === u.id.toString();
                            return (
                              <div
                                key={u.id}
                                className="dropdown-item"
                                style={{
                                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                  fontSize: '0.8rem', color: isActive ? '#ef4444' : '#475569',
                                  fontWeight: isActive ? '700' : '500',
                                  backgroundColor: isActive ? '#f8fafc' : 'transparent',
                                  padding: '0.45rem 0.65rem', borderRadius: '6px', cursor: 'pointer'
                                }}
                                onClick={() => { setCollectionStaffFilter(u.id.toString()); setShowColStaffDropdown(false); }}
                              >
                                <span>{u.name}</span>
                                {isActive && <Check size={12} style={{ color: '#ef4444' }} />}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })()}

              </div>
            </div>

            {/* Flat Ledger Table */}
            <div className="delivery-table-desktop" style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden'
            }}>
              <div className="table-container">
                <table className="premium-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc' }}>
                      <th style={{ width: '50px', padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: '700', color: '#475569', textAlign: 'left', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>#</th>
                      {(() => {
                        const renderSortHeader = (label, field) => {
                          const isActive = collectionSortField === field;
                          return (
                            <th
                              style={{
                                padding: '0.75rem 1rem',
                                textAlign: 'left',
                                fontSize: '0.725rem',
                                fontWeight: '700',
                                color: '#475569',
                                cursor: 'pointer',
                                userSelect: 'none',
                                transition: 'all 0.2s ease',
                                backgroundColor: '#f8fafc',
                                borderBottom: '1px solid #e2e8f0',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}
                              onClick={() => handleColSort(field)}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <span>{label}</span>
                                <ArrowUpDown size={11} style={{ color: '#475569', opacity: isActive ? 1 : 0.4, flexShrink: 0 }} />
                              </div>
                            </th>
                          );
                        };
                        return (
                          <>
                            {renderSortHeader('Client Details', 'client')}
                            {renderSortHeader('Location', 'location')}
                            {isAdmin && renderSortHeader('Assigned Handler', 'handler')}
                            {renderSortHeader('Target Amount', 'target')}
                            {renderSortHeader('Collected', 'collected')}
                            {renderSortHeader('Pending Due', 'pending')}
                            {renderSortHeader('Timeline', 'timeline')}
                            {renderSortHeader('Action / Status', 'status')}
                            {isAdmin && (
                              <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: '700', color: '#475569', textAlign: 'center', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delete</th>
                            )}
                          </>
                        );
                      })()}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCollections.length === 0 ? (
                      <tr>
                        <td colSpan={isAdmin ? 10 : 8} style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          No collection ledger entries found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      pagedSortedCollections.map((c, index) => {
                        const isPending = c.status === 'pending';
                        return (
                          <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.15s ease' }}>
                            <td style={{ padding: '0.85rem 1rem', color: '#64748b', fontWeight: '600', fontSize: '0.8rem' }}>
                              {(crEffPage - 1) * CR_PAGE + index + 1}
                            </td>

                            {/* Client info */}
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem' }}>
                              <div style={{ fontWeight: '600', color: '#0f172a' }}>{c.clientName}</div>
                              <div style={{ color: '#64748b', fontSize: '0.725rem', marginTop: '0.05rem' }}>{c.clientPhone}</div>
                              {c.tallyVoucherNo && (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', backgroundColor: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '800', padding: '0.05rem 0.3rem', marginTop: '0.2rem' }}>
                                  Tally Ref: {c.tallyVoucherNo}
                                </div>
                              )}
                            </td>

                            {/* Location */}
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.775rem', color: '#475569', maxWidth: '200px' }}>
                              <span style={{ color: '#475569', lineBreak: 'anywhere' }}>{c.location}</span>
                            </td>

                            {/* Assigned handler (Admin only) */}
                            {isAdmin && (
                              <td style={{ padding: '0.85rem 1rem', color: '#334155', fontWeight: '500', fontSize: '0.8rem' }}>
                                {c.assignedToName}
                              </td>
                            )}

                            {/* Target Amount */}
                            <td style={{ padding: '0.85rem 1rem', color: '#0f172a', fontWeight: '700', fontSize: '0.8rem' }}>
                              ₹{(c.amountToCollect || 0).toLocaleString()}
                            </td>

                            {/* Collected Amount */}
                            <td style={{ padding: '0.85rem 1rem', color: '#10b981', fontWeight: '700', fontSize: '0.8rem' }}>
                              ₹{(c.amountCollected || 0).toLocaleString()}
                            </td>

                            {/* Pending Due */}
                            <td style={{ padding: '0.85rem 1rem', color: (c.amountPending || 0) > 0 ? '#ef4444' : '#64748b', fontWeight: '700', fontSize: '0.8rem' }}>
                              ₹{(c.amountPending || 0).toLocaleString()}
                            </td>

                            {/* Timeline */}
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', color: '#64748b' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <span>Assigned: {c.assignedDate}</span>
                              </div>
                              {!isPending && c.completedDate && (
                                <div style={{ marginTop: '0.15rem', color: '#475569', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <span>Completed: {c.completedDate.split(',')[0]}</span>
                                </div>
                              )}
                            </td>

                            {/* Action / Status */}
                            <td style={{ padding: '0.85rem 1rem' }}>
                              {isPending ? (
                                !isAdmin ? (
                                  <button
                                    type="button"
                                    style={{
                                      backgroundColor: '#10b981',
                                      color: 'white',
                                      border: 'none',
                                      padding: '0.35rem 0.75rem',
                                      borderRadius: '6px',
                                      fontSize: '0.75rem',
                                      fontWeight: '700',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.25rem',
                                      cursor: 'pointer',
                                      height: '30px',
                                      transition: 'all 0.2s'
                                    }}
                                    onClick={() => {
                                      setColReportSuccessMessage('');
                                      setColReportErrorMessage('');
                                      setColAmountCollected('');
                                      setColAmountPending(c.amountToCollect);
                                      setColRemarks('');
                                      setSelectedCollectionForReport(c);
                                      setShowCollectionReportModal(true);
                                    }}
                                  >
                                    <CheckCircle size={12} />
                                    Submit Collection
                                  </button>
                                ) : (
                                  <div style={{ fontWeight: '700', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Pending
                                  </div>
                                )
                              ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                  <div style={{ fontWeight: '700', fontSize: '0.75rem', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Completed
                                  </div>
                                  {c.remarks && c.remarks !== 'None' && (
                                    <div style={{ fontSize: '0.725rem', color: '#64748b', fontStyle: 'italic', maxWidth: '180px', lineBreak: 'anywhere' }} title={c.remarks}>
                                      "{c.remarks}"
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>

                            {/* Delete (Admin only) */}
                            {isAdmin && (
                              <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCollection(c.id)}
                                  style={{
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#ef4444',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    borderRadius: '4px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background-color 0.15s'
                                  }}
                                  title="Delete Assignment"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
                {crTotalPages > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span>{sortedCollections.length} total · Page {crEffPage} of {crTotalPages}</span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button type="button" onClick={() => setCollectionReportPage(p => Math.max(1, p - 1))} disabled={crEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: crEffPage === 1 ? '#f8fafc' : '#fff', color: crEffPage === 1 ? '#cbd5e1' : '#334155', cursor: crEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                      <button type="button" onClick={() => setCollectionReportPage(p => Math.min(crTotalPages, p + 1))} disabled={crEffPage === crTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: crEffPage === crTotalPages ? '#f8fafc' : '#fff', color: crEffPage === crTotalPages ? '#cbd5e1' : '#334155', cursor: crEffPage === crTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile cards for pending/completed collections */}
            <div className="delivery-mobile-cards">
              {sortedCollections.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.82rem' }}>No entries found.</div>
              ) : (
                <div style={{ position: 'relative' }}>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff', marginBottom: '0.5rem' }}>
                    {pagedSortedCollections.map((c) => {
                      const isPending = c.status === 'pending';
                      return (
                        <SwipeableCard key={c.id} snap={72} actions={null}>
                          <div style={{ padding: '0.7rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: '700', fontSize: '0.82rem', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.clientName}</div>
                              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>{c.clientPhone}</div>
                              {isAdmin && <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.assignedToName}</div>}
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                              <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#0f172a' }}>₹{(c.amountToCollect || 0).toLocaleString()}</div>
                              <span style={{ fontSize: '0.62rem', fontWeight: '800', padding: '0.12rem 0.35rem', borderRadius: '4px', display: 'inline-block', marginTop: '0.25rem', backgroundColor: isPending ? '#fef3c7' : '#dcfce7', color: isPending ? '#d97706' : '#16a34a' }}>
                                {isPending ? 'PENDING' : 'COLLECTED'}
                              </span>
                              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.1rem' }}>{c.assignedDate}</div>
                            </div>
                          </div>
                        </SwipeableCard>
                      );
                    })}
                  </div>
                  <div style={{ borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span>{sortedCollections.length} total · Page {crEffPage} of {crTotalPages}</span>
                      {crTotalPages > 1 && (
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button type="button" onClick={() => setCollectionReportPage(p => Math.max(1, p - 1))} disabled={crEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: crEffPage === 1 ? '#f8fafc' : '#fff', color: crEffPage === 1 ? '#cbd5e1' : '#334155', cursor: crEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                          <button type="button" onClick={() => setCollectionReportPage(p => Math.min(crTotalPages, p + 1))} disabled={crEffPage === crTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: crEffPage === crTotalPages ? '#f8fafc' : '#fff', color: crEffPage === crTotalPages ? '#cbd5e1' : '#334155', cursor: crEffPage === crTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            </div>
            )}


          </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'Orders' && (
          <div className="animate-fade-in" style={{ width: '100%', paddingBottom: '5rem', position: 'relative', minHeight: '40vh' }}>
            <div style={{ padding: '0.5rem 0 0.5rem', position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.4rem', height: '44px', borderRadius: '10px', border: '1px solid var(--border-color)', width: '100%', fontSize: '0.875rem', backgroundColor: '#f8fafc' }}
                placeholder="Search by customer or order ID..."
                value={orderSearch}
                onChange={e => setOrderSearch(e.target.value)}
              />
              <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                <Search size={15} />
              </span>
            </div>
            {(() => {
              const filtered = orders.filter(o => {
                const q = orderSearch.toLowerCase();
                return !q || o.customerQuery.toLowerCase().includes(q) || o.orderId.toLowerCase().includes(q);
              });
              if (filtered.length === 0) {
                return <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem', marginTop: '5rem' }}>No orders found.</div>;
              }
              const O_PAGE = 20;
              const oTotalPages = Math.max(1, Math.ceil(filtered.length / O_PAGE));
              const oEffPage = Math.min(orderPage, oTotalPages);
              const pagedOrders = filtered.slice((oEffPage - 1) * O_PAGE, oEffPage * O_PAGE);

              return (
                <div style={{ position: 'relative' }}>
                  <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    {pagedOrders.map(order => (
                      <SwipeableCard
                        key={order.orderId}
                        snap={100}
                        actions={(order.status || 'Pending').toLowerCase() === 'pending' ? (
                          <>
                            <button
                              type="button"
                              style={{ border: 'none', background: '#eff6ff', cursor: 'pointer', padding: '0.55rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              title="Edit Order"
                              onClick={() => handleEditOrderClick(order)}
                            >
                              <Edit2 size={16} color="#3b82f6" />
                            </button>
                            <button
                              type="button"
                              style={{ border: 'none', background: '#fef2f2', cursor: 'pointer', padding: '0.55rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              title="Delete Order"
                              onClick={() => handleDeleteOrderClick(order)}
                            >
                              <Trash2 size={16} color="#ef4444" />
                            </button>
                          </>
                        ) : null}
                      >
                        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem 1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#0f172a' }}>{order.orderId}</div>
                              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.15rem' }}>{order.customerQuery}</div>
                              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.1rem' }}>{order.date} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#ef4444' }}>₹{order.total.toLocaleString()}</div>
                                <div style={{ marginTop: '0.3rem', fontSize: '0.7rem', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: '4px', padding: '0.15rem 0.5rem', fontWeight: '700', textTransform: 'capitalize', textAlign: 'center' }}>{order.status || 'Pending'}</div>
                              </div>
                              
                              {/* Inline Desktop Actions */}
                              {(order.status || 'Pending').toLowerCase() === 'pending' && (
                                <div className="order-desktop-actions" style={{ display: 'flex', gap: '0.3rem', marginLeft: '0.25rem' }}>
                                  <button
                                    type="button"
                                    style={{ border: 'none', background: '#eff6ff', cursor: 'pointer', padding: '0.45rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    title="Edit Order"
                                    onClick={() => handleEditOrderClick(order)}
                                  >
                                    <Edit2 size={13} color="#3b82f6" />
                                  </button>
                                  <button
                                    type="button"
                                    style={{ border: 'none', background: '#fef2f2', cursor: 'pointer', padding: '0.45rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    title="Delete Order"
                                    onClick={() => handleDeleteOrderClick(order)}
                                  >
                                    <Trash2 size={13} color="#ef4444" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </SwipeableCard>
                    ))}
                  </div>
                  {oTotalPages > 1 && (
                    <div style={{ borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden', backgroundColor: '#fff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span>{filtered.length} total · Page {oEffPage} of {oTotalPages}</span>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button type="button" onClick={() => setOrderPage(p => Math.max(1, p - 1))} disabled={oEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: oEffPage === 1 ? '#f8fafc' : '#fff', color: oEffPage === 1 ? '#cbd5e1' : '#334155', cursor: oEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                          <button type="button" onClick={() => setOrderPage(p => Math.min(oTotalPages, p + 1))} disabled={oEffPage === oTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: oEffPage === oTotalPages ? '#f8fafc' : '#fff', color: oEffPage === oTotalPages ? '#cbd5e1' : '#334155', cursor: oEffPage === oTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* --- MASTER TAB --- */}
        {activeTab === 'Master' && isAdmin && (
          <div className="animate-fade-in" style={{ width: '100%', paddingBottom: '3rem' }}>

            {/* Title — shown only when a sub-tab is selected */}
            {masterSubTab && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <button
                  onClick={() => setMasterSubTab(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center', color: '#64748b' }}
                >
                  <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
                </button>
                <h1 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0 }}>
                  {masterSubTab === 'itemMaster' ? 'Item Master' : 'Ledger Master'}
                </h1>
              </div>
            )}

            {/* Sub-tab selector — shown when no sub-tab chosen */}
            {!masterSubTab && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                <h1 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 0.25rem 0' }}>Master</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { key: 'itemMaster', label: 'Item Master', desc: 'View and manage stock items synced from Tally', icon: <Package size={22} /> },
                    { key: 'ledgerMaster', label: 'Ledger Master', desc: 'View and manage ledger accounts synced from Tally', icon: <BookOpen size={22} /> },
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setMasterSubTab(opt.key)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        padding: '1rem 1.25rem', borderRadius: '12px',
                        border: '1.5px solid #e2e8f0', background: '#fff',
                        cursor: 'pointer', textAlign: 'left', width: '100%',
                        transition: 'border-color 0.15s, box-shadow 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(239,68,68,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#fff1f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {opt.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>{opt.label}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.15rem' }}>{opt.desc}</div>
                      </div>
                      <ChevronRight size={16} style={{ marginLeft: 'auto', color: '#94a3b8', flexShrink: 0 }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ITEM MASTER */}
            {masterSubTab === 'itemMaster' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {/* Search + Sync row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input
                      type="text"
                      className="form-input"
                      style={{ paddingLeft: '2.1rem', height: '36px', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%', fontSize: '0.8rem', backgroundColor: '#ffffff' }}
                      placeholder="Search by name, code or group..."
                      value={itemMasterSearch}
                      onChange={e => setItemMasterSearch(e.target.value)}
                    />
                    <span style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                      <Search size={13} />
                    </span>
                  </div>
                  <button
                    type="button"
                    className="master-sync-btn"
                    onClick={handleFetchItemMasterData}
                    style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '0 1rem', fontWeight: '700', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: tallyItemMasterLoading ? 'not-allowed' : 'pointer', height: '36px', flexShrink: 0, opacity: tallyItemMasterLoading ? 0.7 : 1 }}
                    disabled={tallyItemMasterLoading}
                  >
                    {tallyItemMasterLoading ? <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <RefreshCw size={13} />}
                    <span className="master-sync-label">{tallyItemMasterLoading ? 'Syncing...' : 'Sync Tally ERP Items'}</span>
                  </button>
                </div>

                {/* Table / States */}
                {tallyItemMasterLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', color: '#64748b', fontSize: '0.82rem', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                    <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />
                    Fetching items from Tally ERP...
                  </div>
                ) : tallyItemMasterData.length === 0 ? (
                  <div style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem', border: '1px dashed #e2e8f0', borderRadius: '8px', textAlign: 'center' }}>
                    No items found. Click &apos;Sync Tally ERP Items&apos; to fetch.
                  </div>
                ) : (() => {
                  const query = itemMasterSearch.toLowerCase().trim();
                  const filtered = tallyItemMasterData.filter(item =>
                    !query ||
                    item.itemName.toLowerCase().includes(query) ||
                    item.itemCode.toLowerCase().includes(query) ||
                    item.stockGroup.toLowerCase().includes(query)
                  );
                  const IM_PAGE = 20;
                  const imTotalPages = Math.max(1, Math.ceil(filtered.length / IM_PAGE));
                  const imEffPage = Math.min(itemMasterPage, imTotalPages);
                  const pagedItems = filtered.slice((imEffPage - 1) * IM_PAGE, imEffPage * IM_PAGE);
                  const pagination = (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span>{filtered.length} total · Page {imEffPage} of {imTotalPages}</span>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button type="button" onClick={() => setItemMasterPage(p => Math.max(1, p - 1))} disabled={imEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: imEffPage === 1 ? '#f8fafc' : '#fff', color: imEffPage === 1 ? '#cbd5e1' : '#334155', cursor: imEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                        <button type="button" onClick={() => setItemMasterPage(p => Math.min(imTotalPages, p + 1))} disabled={imEffPage === imTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: imEffPage === imTotalPages ? '#f8fafc' : '#fff', color: imEffPage === imTotalPages ? '#cbd5e1' : '#334155', cursor: imEffPage === imTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                      </div>
                    </div>
                  );
                  return (
                    <div>
                      {/* Desktop table */}
                      <div className="delivery-table-desktop" style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                          <thead>
                            <tr style={{ backgroundColor: '#f8fafc' }}>
                              <th style={{ padding: '0.55rem 0.5rem', fontSize: '0.7rem', fontWeight: '700', color: '#475569', textAlign: 'left', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>#</th>
                              {['Item Name', 'Stock Group', 'Unit', 'HSN Code', 'Closing Balance'].map(h => (
                                <th key={h} style={{ padding: '0.55rem 0.75rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: '700', color: '#475569', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {pagedItems.map((item, idx) => (
                              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '0.55rem 0.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.75rem' }}>{(imEffPage - 1) * IM_PAGE + idx + 1}</td>
                                <td style={{ padding: '0.55rem 0.75rem', fontWeight: '600', color: '#0f172a', maxWidth: '260px' }}>{item.itemName}</td>
                                <td style={{ padding: '0.55rem 0.75rem' }}><span style={{ backgroundColor: '#f1f5f9', color: '#334155', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.72rem', fontWeight: '600' }}>{item.stockGroup || '—'}</span></td>
                                <td style={{ padding: '0.55rem 0.75rem', color: '#64748b' }}>{item.unit || '—'}</td>
                                <td style={{ padding: '0.55rem 0.75rem', color: '#64748b', fontFamily: 'monospace' }}>{item.hsnCode || '—'}</td>
                                <td style={{ padding: '0.55rem 0.75rem', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap' }}>{item.currentStock != null ? item.currentStock.toLocaleString() : '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {imTotalPages > 1 && pagination}
                      </div>
                      {/* Mobile cards */}
                      <div className="delivery-mobile-cards" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {pagedItems.map((item, idx) => (
                          <div key={item.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: '700', fontSize: '0.8rem', color: '#0f172a', lineHeight: 1.3, marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.itemName}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span style={{ backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '4px', padding: '0.05rem 0.35rem', fontSize: '0.65rem', fontWeight: '600' }}>{item.stockGroup || 'Primary'}</span>
                                <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontFamily: 'monospace' }}>{item.hsnCode || '—'}</span>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '56px' }}>
                              <div style={{ fontWeight: '800', fontSize: '1.05rem', color: '#ef4444', lineHeight: 1 }}>{item.currentStock != null ? item.currentStock.toLocaleString() : '—'}</div>
                              <div style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', marginTop: '0.1rem' }}>{item.unit || 'Units'}</div>
                            </div>
                          </div>
                        ))}
                        {imTotalPages > 1 && <div style={{ borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>{pagination}</div>}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* LEDGER MASTER */}
            {masterSubTab === 'ledgerMaster' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {/* Search + Sync row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <input
                      type="text"
                      className="form-input"
                      style={{ paddingLeft: '2.1rem', height: '36px', borderRadius: '8px', border: '1px solid var(--border-color)', width: '100%', fontSize: '0.8rem', backgroundColor: '#ffffff' }}
                      placeholder="Search by ledger name or group..."
                      value={ledgerMasterSearch}
                      onChange={e => setLedgerMasterSearch(e.target.value)}
                    />
                    <span style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                      <Search size={13} />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFetchLedgerMasterData}
                    style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', padding: '0 1rem', fontWeight: '700', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: tallyLedgerMasterLoading ? 'not-allowed' : 'pointer', height: '36px', flexShrink: 0, opacity: tallyLedgerMasterLoading ? 0.7 : 1 }}
                    disabled={tallyLedgerMasterLoading}
                  >
                    {tallyLedgerMasterLoading ? <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <RefreshCw size={13} />}
                    <span className="master-sync-label">{tallyLedgerMasterLoading ? 'Syncing...' : 'Sync Tally ERP Ledgers'}</span>
                  </button>
                </div>

                {/* Table / States */}
                {tallyLedgerMasterLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', color: '#64748b', fontSize: '0.82rem', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                    <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />
                    Fetching ledgers from Tally ERP...
                  </div>
                ) : tallyLedgerMasterData.length === 0 ? (
                  <div style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.8rem', border: '1px dashed #e2e8f0', borderRadius: '8px', textAlign: 'center' }}>
                    No ledgers found. Click &apos;Sync Tally ERP Ledgers&apos; to fetch.
                  </div>
                ) : (() => {
                  const q = ledgerMasterSearch.toLowerCase().trim();
                  const filtered = tallyLedgerMasterData.filter(l =>
                    !q || l.ledgerName.toLowerCase().includes(q) || l.ledgerGroup.toLowerCase().includes(q)
                  );
                  const LM_PAGE = 20;
                  const lmTotalPages = Math.max(1, Math.ceil(filtered.length / LM_PAGE));
                  const lmEffPage = Math.min(ledgerMasterPage, lmTotalPages);
                  const pagedLedgers = filtered.slice((lmEffPage - 1) * LM_PAGE, lmEffPage * LM_PAGE);
                  const lmPagination = (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span>{filtered.length} total · Page {lmEffPage} of {lmTotalPages}</span>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button type="button" onClick={() => setLedgerMasterPage(p => Math.max(1, p - 1))} disabled={lmEffPage === 1} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: lmEffPage === 1 ? '#f8fafc' : '#fff', color: lmEffPage === 1 ? '#cbd5e1' : '#334155', cursor: lmEffPage === 1 ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>← Prev</button>
                        <button type="button" onClick={() => setLedgerMasterPage(p => Math.min(lmTotalPages, p + 1))} disabled={lmEffPage === lmTotalPages} style={{ padding: '0.25rem 0.65rem', border: '1px solid #e2e8f0', borderRadius: '6px', background: lmEffPage === lmTotalPages ? '#f8fafc' : '#fff', color: lmEffPage === lmTotalPages ? '#cbd5e1' : '#334155', cursor: lmEffPage === lmTotalPages ? 'default' : 'pointer', fontWeight: '600', fontSize: '0.75rem' }}>Next →</button>
                      </div>
                    </div>
                  );
                  return (
                    <div>
                      {/* Desktop table */}
                      <div className="delivery-table-desktop" style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                          <thead>
                            <tr style={{ backgroundColor: '#f8fafc' }}>
                              <th style={{ padding: '0.55rem 0.5rem', fontSize: '0.7rem', fontWeight: '700', color: '#475569', textAlign: 'left', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>#</th>
                              {['Ledger Name', 'Group', 'Phone', 'GSTIN'].map(h => (
                                <th key={h} style={{ padding: '0.55rem 0.75rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: '700', color: '#475569', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {pagedLedgers.map((l, idx) => (
                              <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '0.55rem 0.5rem', color: '#64748b', fontWeight: '600', fontSize: '0.75rem' }}>{(lmEffPage - 1) * LM_PAGE + idx + 1}</td>
                                <td style={{ padding: '0.55rem 0.75rem', fontWeight: '700', color: '#0f172a' }}>{l.ledgerName}</td>
                                <td style={{ padding: '0.55rem 0.75rem' }}><span style={{ backgroundColor: '#f1f5f9', color: '#334155', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.72rem', fontWeight: '600', whiteSpace: 'nowrap' }}>{l.ledgerGroup || '—'}</span></td>
                                <td style={{ padding: '0.55rem 0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>{l.phone || '—'}</td>
                                <td style={{ padding: '0.55rem 0.75rem', color: '#64748b', fontFamily: 'monospace', fontSize: '0.72rem' }}>{l.gstin || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {lmTotalPages > 1 && lmPagination}
                      </div>
                      {/* Mobile cards */}
                      <div className="delivery-mobile-cards" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {pagedLedgers.map((l, idx) => (
                          <div key={l.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.6rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: '700', fontSize: '0.8rem', color: '#0f172a', lineHeight: 1.3, marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.ledgerName}</div>
                              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                {l.ledgerGroup && <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', borderRadius: '4px', padding: '0.05rem 0.35rem', fontSize: '0.65rem', fontWeight: '600' }}>{l.ledgerGroup}</span>}
                                {l.gstin && <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontFamily: 'monospace' }}>{l.gstin}</span>}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '36px' }}>
                              <div style={{ fontWeight: '700', fontSize: '0.8rem', color: '#64748b' }}>#{(lmEffPage - 1) * LM_PAGE + idx + 1}</div>
                              {l.phone && <div style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: '0.1rem' }}>{l.phone}</div>}
                            </div>
                          </div>
                        ))}
                        {lmTotalPages > 1 && <div style={{ borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>{lmPagination}</div>}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

      </main>
      </div>

      {/* --- EDIT USER MODAL --- */}
      {showEditUserModal && selectedUserForEdit && (
        <div className="modal-overlay" onClick={() => setShowEditUserModal(false)}>
          <div className="modal-content animate-scale-in" style={{ maxWidth: '480px', width: '94%', borderRadius: '16px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '0.85rem 1.25rem 0.7rem' }}>
              <span className="modal-title" style={{ fontSize: '1.1rem', fontWeight: '800' }}>Edit Employee</span>
              <button className="modal-close-btn" onClick={() => setShowEditUserModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body" style={{ maxHeight: '52vh', overflowY: 'auto', padding: '0.75rem 1.25rem' }}>
              {/* Row 1: Name + Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.6rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem' }}>Full Name *</label>
                  <input className="form-input" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Full name" style={{ height: '38px', fontSize: '0.875rem' }} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem' }}>Phone</label>
                  <input className="form-input" type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="Phone number" style={{ height: '38px', fontSize: '0.875rem' }} />
                </div>
              </div>
              {/* Email */}
              <div className="form-group" style={{ marginBottom: '0.6rem' }}>
                <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem' }}>Email Address</label>
                <input className="form-input" type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="Email address" style={{ height: '38px', fontSize: '0.875rem' }} />
              </div>
              {/* Address */}
              <div className="form-group" style={{ marginBottom: '0.6rem' }}>
                <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem' }}>Address</label>
                <textarea className="form-input" value={editAddress} onChange={(e) => setEditAddress(e.target.value)} placeholder="Street address" style={{ height: '56px', resize: 'none', padding: '0.5rem 0.8rem', lineHeight: '1.4', fontSize: '0.875rem' }} />
              </div>
              {/* City + State */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.6rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem' }}>City</label>
                  <input className="form-input" type="text" value={editCity} onChange={(e) => setEditCity(e.target.value)} placeholder="City" style={{ height: '38px', fontSize: '0.875rem' }} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem' }}>State</label>
                  <input className="form-input" type="text" value={editState} onChange={(e) => setEditState(e.target.value)} placeholder="State" style={{ height: '38px', fontSize: '0.875rem' }} />
                </div>
              </div>
              {/* Role */}
              <div className="form-group" style={{ marginBottom: '0.25rem' }}>
                <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem' }}>Role</label>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button type="button" onClick={() => setEditRole('user')} style={{ flex: 1, height: '36px', borderRadius: '8px', fontWeight: '700', fontSize: '0.875rem', backgroundColor: editRole === 'user' ? '#ef4444' : '#ffffff', color: editRole === 'user' ? '#ffffff' : '#64748b', border: editRole === 'user' ? '1px solid #ef4444' : '1px solid #e2e8f0', cursor: 'pointer' }}>Employee</button>
                  <button type="button" onClick={() => setEditRole('admin')} style={{ flex: 1, height: '36px', borderRadius: '8px', fontWeight: '700', fontSize: '0.875rem', backgroundColor: editRole === 'admin' ? '#ef4444' : '#ffffff', color: editRole === 'admin' ? '#ffffff' : '#64748b', border: editRole === 'admin' ? '1px solid #ef4444' : '1px solid #e2e8f0', cursor: 'pointer' }}>Admin</button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowEditUserModal(false)}>Cancel</button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (!editName.trim()) return;
                  setUsers(users.map(u => u.id === selectedUserForEdit.id
                    ? { ...u, name: editName.trim(), email: editEmail.trim(), phone: editPhone.trim(), address: editAddress.trim(), city: editCity.trim(), state: editState.trim(), role: editRole }
                    : u
                  ));
                  setNotifications(prev => [{ id: Date.now(), text: `Updated profile for "${editName.trim()}"`, type: 'info', time: 'Just now' }, ...prev]);
                  setShowEditUserModal(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- RESET PASSWORD MODAL --- */}
      {showResetPasswordModal && selectedUserForReset && (
        <div className="modal-overlay" onClick={() => setShowResetPasswordModal(false)}>
          <div className="modal-content animate-scale-in" style={{ maxWidth: '400px', width: '94%', borderRadius: '16px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '0.85rem 1.25rem 0.7rem' }}>
              <span className="modal-title" style={{ fontSize: '1.1rem', fontWeight: '800' }}>Reset Password</span>
              <button className="modal-close-btn" onClick={() => setShowResetPasswordModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body" style={{ padding: '1rem 1.25rem' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
                Set a new password for <strong style={{ color: '#0f172a' }}>{selectedUserForReset.name}</strong>.
              </p>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.25rem' }}>New Password *</label>
                <input
                  className="form-input"
                  type="password"
                  value={newResetPassword}
                  onChange={(e) => setNewResetPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  style={{ height: '38px', fontSize: '0.875rem' }}
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowResetPasswordModal(false)}>Cancel</button>
              <button
                className="btn"
                style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none' }}
                onClick={() => {
                  if (newResetPassword.trim().length < 6) return;
                  setUsers(users.map(u => u.id === selectedUserForReset.id ? { ...u, password: newResetPassword.trim() } : u));
                  setNotifications(prev => [{ id: Date.now(), text: `Password reset for "${selectedUserForReset.name}"`, type: 'info', time: 'Just now' }, ...prev]);
                  setShowResetPasswordModal(false);
                }}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE EMPLOYEE MODAL --- */}
      {showDeleteConfirmModal && selectedUserForDelete && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirmModal(false)}>
          <div className="modal-content animate-scale-in logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <div className="logout-icon-wrapper" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
                <Trash2 size={24} />
              </div>
              <h3 className="logout-modal-title">Delete Employee?</h3>
              <p className="logout-modal-text">
                <strong>{selectedUserForDelete.name}</strong> will be permanently removed. This cannot be undone.
              </p>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirmModal(false)}>Cancel</button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setUsers(users.filter(u => u.id !== selectedUserForDelete.id));
                  setNotifications(prev => [{ id: Date.now(), text: `Deleted employee "${selectedUserForDelete.name}"`, type: 'info', time: 'Just now' }, ...prev]);
                  setShowDeleteConfirmModal(false);
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE ORDER MODAL --- */}
      {showOrderDeleteModal && selectedOrderForDelete && (
        <div className="modal-overlay" onClick={() => setShowOrderDeleteModal(false)}>
          <div className="modal-content animate-scale-in logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <div className="logout-icon-wrapper" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
                <Trash2 size={24} />
              </div>
              <h3 className="logout-modal-title">Delete Order?</h3>
              <p className="logout-modal-text">
                Order <strong>{selectedOrderForDelete.orderId}</strong> for <strong>{selectedOrderForDelete.customerQuery}</strong> will be permanently removed. This cannot be undone.
              </p>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={() => setShowOrderDeleteModal(false)}>Cancel</button>
              <button
                className="btn btn-danger"
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/orders/${selectedOrderForDelete.orderId}`, {
                      method: 'DELETE'
                    });
                    if (res.ok) {
                      setNotifications(prev => [{
                        id: Date.now(),
                        text: `Deleted order "${selectedOrderForDelete.orderId}"`,
                        type: 'info',
                        time: 'Just now'
                      }, ...prev]);
                      fetchOrders();
                    } else {
                      const data = await res.json();
                      alert(data.error || 'Failed to delete order');
                    }
                  } catch (e) {
                    console.error('Error deleting order:', e);
                    alert('Error deleting order');
                  } finally {
                    setShowOrderDeleteModal(false);
                    setSelectedOrderForDelete(null);
                  }
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- GRANT TALLY EMPLOYEE ACCESS MODAL --- */}
      {showGrantAccessModal && selectedTallyEmployee && (
        <div className="modal-overlay" onClick={() => setShowGrantAccessModal(false)}>
          <div className="modal-content animate-scale-in" style={{ maxWidth: '440px', width: '90%', borderRadius: '16px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '1.25rem 1.5rem 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="modal-title" style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>Grant System Access</span>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>
                  Tally Ledger: <span style={{ fontWeight: '700', color: '#475569' }}>{selectedTallyEmployee.tallyLedger}</span>
                </div>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setShowGrantAccessModal(false)}
                style={{ border: '1.5px solid #0f172a', borderRadius: '6px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer', width: '26px', height: '26px' }}>
                <X size={14} color="#0f172a" strokeWidth={3} />
              </button>
            </div>

            {grantErrorMessage && (
              <div className="login-error" style={{ margin: '0 1.5rem 0.75rem', borderRadius: '8px' }}>
                <AlertTriangle size={14} /><span>{grantErrorMessage}</span>
              </div>
            )}
            {grantSuccessMessage && (
              <div style={{ margin: '0 1.5rem 0.75rem', padding: '0.6rem 0.85rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={14} />{grantSuccessMessage}
              </div>
            )}

            <form onSubmit={handleGrantAccessSubmit}>
              <div className="modal-body" style={{ padding: '0 1.5rem 1.5rem' }}>
                {/* Pre-filled info from Tally */}
                <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.6rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#0f172a' }}>{selectedTallyEmployee.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#0f172a' }}>{selectedTallyEmployee.phone}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#0f172a' }}>{selectedTallyEmployee.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#0f172a' }}>{selectedTallyEmployee.department}</div>
                  </div>
                </div>

                {/* Username */}
                <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Username *</label>
                  <input type="text" className="form-input"
                    style={{ width: '100%', height: '40px', borderRadius: '7px', border: '1px solid #e2e8f0', padding: '0 0.75rem', fontSize: '0.85rem', backgroundColor: '#ffffff' }}
                    placeholder="e.g. vikram.desai"
                    value={grantUsername}
                    onChange={(e) => setGrantUsername(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Password *</label>
                  <input type="password" className="form-input"
                    style={{ width: '100%', height: '40px', borderRadius: '7px', border: '1px solid #e2e8f0', padding: '0 0.75rem', fontSize: '0.85rem', backgroundColor: '#ffffff' }}
                    placeholder="Set login password"
                    value={grantPassword}
                    onChange={(e) => setGrantPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Role */}
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>System Role *</label>
                  <select className="form-input"
                    style={{ width: '100%', height: '40px', borderRadius: '7px', border: '1px solid #e2e8f0', padding: '0 0.75rem', fontSize: '0.85rem', backgroundColor: '#ffffff', cursor: 'pointer' }}
                    value={grantRole}
                    onChange={(e) => setGrantRole(e.target.value)}
                  >
                    <option value="user">Employee (Staff)</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button type="submit"
                  style={{ width: '100%', height: '42px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '0.875rem', cursor: 'pointer', boxShadow: '0 4px 10px rgba(239,68,68,0.25)' }}>
                  Grant System Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- LOGOUT CONFIRMATION POPUP --- */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body" style={{ padding: '2rem 1.5rem 1.5rem' }}>
              <div className="logout-icon-wrapper">
                <LogOut size={28} />
              </div>
              <h3 className="logout-modal-title">Confirm Portal Logout</h3>
              
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={handleLogoutConfirm}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD EMPLOYEE POPUP MODAL --- */}
      {showAddEmployeeModal && (
        <div className="modal-overlay" onClick={() => setShowAddEmployeeModal(false)}>
          <div className="modal-content animate-scale-in" style={{ maxWidth: '520px', width: '94%', borderRadius: '16px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '0.85rem 1.25rem 0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="modal-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>Add Employee</span>
              <button 
                type="button"
                className="modal-close-btn" 
                onClick={() => setShowAddEmployeeModal(false)}
                style={{
                  border: '1.5px solid #0f172a',
                  borderRadius: '6px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  cursor: 'pointer',
                  width: '26px',
                  height: '26px'
                }}
              >
                <X size={14} color="#0f172a" strokeWidth={3} />
              </button>
            </div>
            
            {formErrorMessage && (
              <div className="login-error" style={{ margin: '0 1.25rem 0.5rem', borderRadius: '8px' }}>
                <AlertTriangle size={16} />
                <span>{formErrorMessage}</span>
              </div>
            )}

            <form onSubmit={handleCreateUserSubmit}>
              <div className="modal-body" style={{ maxHeight: '42vh', overflowY: 'auto', padding: '0 1.25rem 0.75rem' }}>
                
                {/* SECTION 1: BASIC INFORMATION */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <h4 style={{
                    color: '#ef4444',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem'
                  }}>
                    Basic Information
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.6rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Enter full name"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                        value={newFullName}
                        onChange={(e) => setNewFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Phone
                      </label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="10-digit mobile number"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '0.6rem' }}>
                    <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Email address"
                      style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '0.6rem' }}>
                    <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      Address
                    </label>
                    <textarea
                      className="form-input"
                      style={{ height: '56px', resize: 'none', padding: '0.5rem 0.8rem', lineHeight: '1.4', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontSize: '0.875rem' }}
                      placeholder="Street address"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        City
                      </label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="City"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        State
                      </label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="State"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                        value={newStateVal}
                        onChange={(e) => setNewStateVal(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: ACCOUNT CREDENTIALS */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem', marginBottom: '0.5rem' }}>
                  <h4 style={{
                    color: '#ef4444',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem'
                  }}>
                    Account Credentials
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.6rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Username *
                      </label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. jai47"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Password *
                      </label>
                      <input 
                        type="password" 
                        className="form-input" 
                        placeholder="Min 6 chars"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* ROLE BUTTON GROUP */}
                  <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                    <label className="form-label" style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      Role
                    </label>
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.25rem' }}>
                      <button
                        type="button"
                        onClick={() => setNewRole('user')}
                        style={{
                          flex: 1,
                          height: '36px',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '0.9rem',
                          backgroundColor: newRole === 'user' ? '#ef4444' : '#ffffff',
                          color: newRole === 'user' ? '#ffffff' : '#64748b',
                          border: newRole === 'user' ? '1px solid #ef4444' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        Employee
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewRole('admin')}
                        style={{
                          flex: 1,
                          height: '36px',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '0.9rem',
                          backgroundColor: newRole === 'admin' ? '#ef4444' : '#ffffff',
                          color: newRole === 'admin' ? '#ffffff' : '#64748b',
                          border: newRole === 'admin' ? '1px solid #ef4444' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: PERMISSIONS (employee only) */}
                {newRole === 'user' && (
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
                    <h4 style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                      Tab Permissions
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {/* Header row */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 48px 52px 40px 48px', gap: '0.25rem', alignItems: 'center', paddingBottom: '0.25rem', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Tab</span>
                        {['View', 'Create', 'Edit', 'Delete'].map(a => (
                          <span key={a} style={{ fontSize: '0.6rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'center' }}>{a}</span>
                        ))}
                      </div>
                      {/* Permission rows */}
                      {['Deliveries', 'Collections', 'Orders', 'Master'].map(tab => (
                        <div key={tab} style={{ display: 'grid', gridTemplateColumns: '1fr 48px 52px 40px 48px', gap: '0.25rem', alignItems: 'center', padding: '0.35rem 0.5rem', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>{tab}</span>
                          {['view', 'create', 'edit', 'delete'].map(action => (
                            <div key={action} style={{ display: 'flex', justifyContent: 'center' }}>
                              <input
                                type="checkbox"
                                checked={newPermissions[tab][action]}
                                onChange={e => setNewPermissions(prev => ({
                                  ...prev,
                                  [tab]: { ...prev[tab], [action]: e.target.checked }
                                }))}
                                style={{ width: '16px', height: '16px', accentColor: '#ef4444', cursor: 'pointer' }}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
              
              <div style={{ padding: '0 1.25rem 1.25rem' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#ef4444',
                    border: 'none',
                    color: 'white',
                    width: '100%',
                    padding: '0.7rem',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
                  }}
                >
                  Create Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ASSIGN DELIVERY TASK POPUP MODAL (ADMIN ONLY) --- */}
      {showAssignModal && isAdmin && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal-content animate-scale-in" style={{ maxWidth: '540px', width: '90%', borderRadius: '20px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '1.5rem 2rem 1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <span className="modal-title" style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={22} color="#ef4444" />
                  Assign Delivery Task
                </span>
                {tallyVoucherRef && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '800', padding: '0.15rem 0.6rem', width: 'fit-content' }}>
                    <Database size={10} /> Tally Ref: {tallyVoucherRef} · ₹{(tallyAmountRef || 0).toLocaleString()}
                  </span>
                )}
              </div>
              <button 
                type="button"
                className="modal-close-btn" 
                onClick={() => setShowAssignModal(false)}
                style={{
                  border: '1.5px solid #0f172a',
                  borderRadius: '6px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  cursor: 'pointer',
                  width: '26px',
                  height: '26px'
                }}
              >
                <X size={14} color="#0f172a" strokeWidth={3} />
              </button>
            </div>

            {assignErrorMessage && (
              <div className="login-error" style={{ margin: '0 2rem 1rem', borderRadius: '8px' }}>
                <AlertTriangle size={16} />
                <span>{assignErrorMessage}</span>
              </div>
            )}

            {assignSuccessMessage && (
              <div className="success-banner" style={{ 
                margin: '0 2rem 1rem', 
                borderRadius: '8px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#10b981',
                padding: '0.6rem 0.85rem',
                fontSize: '0.825rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle size={16} />
                <span>{assignSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleAssignDeliverySubmit}>
              <div className="modal-body" style={{ maxHeight: '64vh', overflowY: 'auto', padding: '0 2rem 1.5rem 2rem' }}>
                
                {/* SECTION 1: CUSTOMER DETAILS */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ 
                    color: '#ef4444', 
                    fontSize: '0.75rem', 
                    fontWeight: '800', 
                    letterSpacing: '0.05em', 
                    textTransform: 'uppercase', 
                    marginBottom: '1rem' 
                  }}>
                    Customer Information
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Customer Name *
                      </label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Enter full name"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', color: '#475569', cursor: 'not-allowed', height: '42px', fontSize: '0.9rem' }}
                        value={assignCustomer}
                        readOnly
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Customer Phone *
                      </label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. +91 99887 76655"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', color: '#475569', cursor: 'not-allowed', height: '42px', fontSize: '0.9rem' }}
                        value={assignPhone}
                        readOnly
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                      Delivery Address *
                    </label>
                    <textarea 
                      className="form-input" 
                      style={{ height: '65px', resize: 'none', padding: '0.6rem 0.8rem', lineHeight: '1.4', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', color: '#475569', cursor: 'not-allowed', fontSize: '0.9rem' }}
                      placeholder="Enter target delivery address in detail"
                      value={assignAddress}
                      readOnly
                      required
                    />
                  </div>
                </div>

                {/* SECTION 2: SHIPMENT & HANDLER DETAILS */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginBottom: '1rem' }}>
                  <h4 style={{ 
                    color: '#ef4444', 
                    fontSize: '0.75rem', 
                    fontWeight: '800', 
                    letterSpacing: '0.05em', 
                    textTransform: 'uppercase', 
                    marginBottom: '1rem' 
                  }}>
                    Shipment & Handler Details
                  </h4>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                      Product Description *
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 24K Gold Kada (25g), Solitaire Pendant..."
                      style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', color: '#475569', cursor: 'not-allowed', height: '42px', fontSize: '0.9rem' }}
                      value={assignProduct}
                      readOnly
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                      Select Staff Handler (Ledger) *
                    </label>
                    <select
                      className="form-input"
                      style={{ borderRadius: '8px', border: '1.5px solid #ef4444', backgroundColor: '#ffffff', height: '42px', fontSize: '0.9rem', padding: '0 0.5rem', fontWeight: '600' }}
                      value={assignStaffId}
                      onChange={(e) => setAssignStaffId(e.target.value)}
                      required
                    >
                      <option value="">-- Choose Employee to Assign --</option>
                      {users.filter(u => u.role !== 'admin' && u.isActive !== false).map(u => (
                        <option key={u.id} value={u.id}>{u.name} (@{u.username})</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                      Special Instructions / Notes
                    </label>
                    <textarea 
                      className="form-input" 
                      style={{ height: '65px', resize: 'none', padding: '0.6rem 0.8rem', lineHeight: '1.4', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', color: '#475569', cursor: 'not-allowed', fontSize: '0.9rem' }}
                      placeholder="Tally voucher notes and references"
                      value={assignNotes}
                      readOnly
                    />
                  </div>
                </div>

              </div>
              
              <div style={{ padding: '0 2rem 2rem 2rem' }}>
                <button 
                  type="submit" 
                  className="btn btn-danger"
                  style={{ 
                    backgroundColor: '#ef4444', 
                    border: 'none', 
                    color: 'white', 
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Plus size={18} />
                  Assign Delivery Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- BULK ASSIGN MODAL --- */}
      {showBulkAssignModal && isAdmin && (
        <div className="modal-overlay" onClick={() => setShowBulkAssignModal(false)}>
          <div className="modal-content animate-scale-in" style={{ maxWidth: '420px', width: 'min(90%, calc(100vw - 2rem))', borderRadius: '16px', padding: 0, overflow: 'visible' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', flexWrap: 'nowrap', gap: '0.5rem', borderRadius: '16px 16px 0 0', backgroundColor: 'var(--bg-card)' }}>
              <span className="modal-title" style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', minWidth: 0, overflow: 'hidden' }}>
                <Link size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                Bulk Assign {selectedVoucherIds.length} Voucher{selectedVoucherIds.length !== 1 ? 's' : ''}
              </span>
              <button type="button" className="modal-close-btn" onClick={() => setShowBulkAssignModal(false)} style={{ border: '1.5px solid #0f172a', borderRadius: '6px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer', width: '26px', height: '26px', flexShrink: 0 }}>
                <X size={14} color="#0f172a" strokeWidth={3} />
              </button>
            </div>
            <form onSubmit={handleBulkAssignSubmit}>
              <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', backgroundColor: 'var(--bg-card)' }}>
                {/* Selected vouchers list — mobile only */}
                <div className="bulk-modal-voucher-list">
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.4rem' }}>Selected Vouchers ({selectedVoucherIds.length})</label>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
                    {selectedVoucherIds.map(id => {
                      const v = tallyData.find(x => x.id === id);
                      if (!v) return null;
                      return (
                        <div key={id} style={{ padding: '0.55rem 0.85rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.voucherNo}</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.partyName}</div>
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#ef4444', flexShrink: 0 }}>₹{v.amount.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Staff dropdown */}
                <div style={{ position: 'relative' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.4rem' }}>Assign to Staff Member</label>
                  <div onClick={() => setShowBulkStaffDropdown(v => !v)}
                    style={{ height: '40px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: '#fff', padding: '0 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem', color: bulkAssignStaffId ? '#0f172a' : '#94a3b8' }}>
                    <span>{bulkAssignStaffId ? users.find(u => u.id.toString() === bulkAssignStaffId)?.name : 'Select staff member...'}</span>
                    <ChevronDown size={16} color="#64748b" style={{ transform: showBulkStaffDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                  </div>
                  {showBulkStaffDropdown && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '2px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', zIndex: 1000, maxHeight: '135px', overflowY: 'auto' }}>
                      {users.filter(u => u.role !== 'admin').map(u => (
                        <div key={u.id}
                          onClick={() => { setBulkAssignStaffId(u.id.toString()); setShowBulkStaffDropdown(false); }}
                          style={{ padding: '0.65rem 0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: bulkAssignStaffId === u.id.toString() ? '#fef2f2' : '#fff', borderBottom: '1px solid #f1f5f9', fontSize: '0.82rem', fontWeight: bulkAssignStaffId === u.id.toString() ? '700' : '500', color: bulkAssignStaffId === u.id.toString() ? '#ef4444' : '#0f172a' }}>
                          <span>{u.name}</span>
                          {bulkAssignStaffId === u.id.toString() && <Check size={14} color="#ef4444" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ padding: '0 1.25rem 1.25rem', backgroundColor: 'var(--bg-card)', borderRadius: '0 0 16px 16px' }}>
                <button type="submit" style={{ width: '100%', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '10px', padding: '0.8rem', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Link size={16} /> Assign {selectedVoucherIds.length} Voucher{selectedVoucherIds.length !== 1 ? 's' : ''}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- BULK ASSIGN COLLECTIONS MODAL --- */}
      {showBulkColAssignModal && isAdmin && (
        <div className="modal-overlay" onClick={() => setShowBulkColAssignModal(false)}>
          <div className="modal-content animate-scale-in" style={{ maxWidth: '420px', width: 'min(90%, calc(100vw - 2rem))', borderRadius: '16px', padding: 0, overflow: 'visible' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', flexWrap: 'nowrap', gap: '0.5rem', borderRadius: '16px 16px 0 0', backgroundColor: 'var(--bg-card)' }}>
              <span className="modal-title" style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', overflow: 'hidden', minWidth: 0 }}>
                <Link size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                Bulk Assign {selectedColVoucherIds.length} Collection{selectedColVoucherIds.length !== 1 ? 's' : ''}
              </span>
              <button type="button" className="modal-close-btn" onClick={() => setShowBulkColAssignModal(false)} style={{ border: '1.5px solid #0f172a', borderRadius: '6px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer', width: '26px', height: '26px', flexShrink: 0, marginLeft: '0.5rem' }}>
                <X size={14} color="#0f172a" strokeWidth={3} />
              </button>
            </div>
            <form onSubmit={handleBulkColAssignSubmit}>
              <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', backgroundColor: 'var(--bg-card)' }}>
                {/* Selected vouchers list — mobile only */}
                <div className="bulk-modal-voucher-list">
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.4rem' }}>Selected Vouchers ({selectedColVoucherIds.length})</label>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
                    {selectedColVoucherIds.map(id => {
                      const v = tallyColData.find(x => x.id === id);
                      if (!v) return null;
                      return (
                        <div key={id} style={{ padding: '0.55rem 0.85rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.voucherNo}</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.partyName}</div>
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#ef4444', flexShrink: 0 }}>₹{v.amount.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Staff dropdown */}
                <div style={{ position: 'relative' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.4rem' }}>Assign to Staff Member</label>
                  <div onClick={() => setShowBulkColStaffDropdown(v => !v)}
                    style={{ height: '40px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: '#fff', padding: '0 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.85rem', color: bulkColAssignStaffId ? '#0f172a' : '#94a3b8' }}>
                    <span>{bulkColAssignStaffId ? users.find(u => u.id.toString() === bulkColAssignStaffId)?.name : 'Select staff member...'}</span>
                    <ChevronDown size={16} color="#64748b" style={{ transform: showBulkColStaffDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                  </div>
                  {showBulkColStaffDropdown && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '2px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', zIndex: 1000, maxHeight: '135px', overflowY: 'auto' }}>
                      {users.filter(u => u.role !== 'admin').map(u => (
                        <div key={u.id}
                          onClick={() => { setBulkColAssignStaffId(u.id.toString()); setShowBulkColStaffDropdown(false); }}
                          style={{ padding: '0.65rem 0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: bulkColAssignStaffId === u.id.toString() ? '#fef2f2' : '#fff', borderBottom: '1px solid #f1f5f9', fontSize: '0.82rem', fontWeight: bulkColAssignStaffId === u.id.toString() ? '700' : '500', color: bulkColAssignStaffId === u.id.toString() ? '#ef4444' : '#0f172a' }}>
                          <span>{u.name}</span>
                          {bulkColAssignStaffId === u.id.toString() && <Check size={14} color="#ef4444" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ padding: '0 1.25rem 1.25rem', backgroundColor: 'var(--bg-card)', borderRadius: '0 0 16px 16px' }}>
                <button type="submit" style={{ width: '100%', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '10px', padding: '0.8rem', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Link size={16} /> Assign {selectedColVoucherIds.length} Collection{selectedColVoucherIds.length !== 1 ? 's' : ''}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRM DELIVERY COMPLETION POPUP --- */}
      {showCompletionModal && selectedDeliveryForCompletion && (
        <div className="modal-overlay" onClick={() => setShowCompletionModal(false)}>
          <div className="modal-content animate-scale-in" style={{ maxWidth: '480px', width: '90%', borderRadius: '20px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0' }}>
              <span className="modal-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} color="#22c55e" />
                Complete Product Handover
              </span>
              <button 
                type="button"
                className="modal-close-btn" 
                onClick={() => setShowCompletionModal(false)}
                style={{
                  border: '1.5px solid #0f172a',
                  borderRadius: '6px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  cursor: 'pointer',
                  width: '26px',
                  height: '26px'
                }}
              >
                <X size={14} color="#0f172a" strokeWidth={3} />
              </button>
            </div>

            <form onSubmit={handleCompleteDeliverySubmit}>
              <div className="modal-body" style={{ maxHeight: '64vh', overflowY: 'auto', padding: '1.5rem' }}>
                
                <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Product Selected</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a' }}>{selectedDeliveryForCompletion.product}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>Assigned to: {selectedDeliveryForCompletion.assignedToName}</div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', margin: 0 }}>
                      Meeting Location Met *
                    </label>
                    <button
                      type="button"
                      onClick={handleFetchLocation}
                      disabled={gpsLoading}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: 0
                      }}
                    >
                      <MapPin size={12} />
                      {gpsLoading ? 'Fetching GPS...' : 'Auto-detect GPS'}
                    </button>
                  </div>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Metro Mall Ground Floor, GPS: 19.123, 72.856"
                    style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                    value={completionLocation}
                    onChange={(e) => setCompletionLocation(e.target.value)}
                    required
                  />
                  <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    Captures exactly where you gave the gold package to the customer.
                  </p>
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.4rem' }}>
                    Completion Date & Time (Captured Automatically)
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', color: '#64748b', height: '42px', fontSize: '0.9rem' }}
                    value={new Date().toLocaleString()}
                    disabled
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.4rem' }}>
                    Handover Notes / Verification Details
                  </label>
                  <textarea 
                    className="form-input" 
                    style={{ height: '70px', resize: 'none', padding: '0.6rem 0.8rem', lineHeight: '1.4', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontSize: '0.9rem' }}
                    placeholder="e.g. Customer signature matches. Identity confirmed."
                    value={completionNotes}
                    onChange={(e) => setCompletionNotes(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-danger" 
                  style={{ width: '100%', height: '44px', fontWeight: '700', borderRadius: '8px', justifyContent: 'center' }}
                >
                  Confirm Delivery Completion
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ASSIGN COLLECTION TASK POPUP MODAL (ADMIN ONLY) --- */}
      {showAssignCollectionModal && isAdmin && (
        <div className="modal-overlay" onClick={() => setShowAssignCollectionModal(false)}>
          <div className="modal-content animate-scale-in" style={{ maxWidth: '540px', width: '90%', borderRadius: '20px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ padding: '1.5rem 2rem 1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="modal-title" style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={22} color="#ef4444" />
                Assign New Collection Task
              </span>
              <button 
                type="button"
                className="modal-close-btn" 
                onClick={() => setShowAssignCollectionModal(false)}
                style={{
                  border: '1.5px solid #0f172a',
                  borderRadius: '6px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  cursor: 'pointer',
                  width: '26px',
                  height: '26px'
                }}
              >
                <X size={14} color="#0f172a" strokeWidth={3} />
              </button>
            </div>

            {colAssignErrorMessage && (
              <div className="login-error" style={{ margin: '0 2rem 1rem', borderRadius: '8px' }}>
                <AlertTriangle size={16} />
                <span>{colAssignErrorMessage}</span>
              </div>
            )}


            <form onSubmit={handleAssignCollectionSubmit}>
              <div className="modal-body" style={{ maxHeight: '64vh', overflowY: 'auto', padding: '0 2rem 1.5rem 2rem' }}>
                
                {/* SECTION 1: CLIENT DETAILS */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ 
                    color: '#ef4444', 
                    fontSize: '0.75rem', 
                    fontWeight: '800', 
                    letterSpacing: '0.05em', 
                    textTransform: 'uppercase', 
                    marginBottom: '1rem' 
                  }}>
                    Client Information
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Client / Store Name *
                      </label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Enter client name"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                        value={colClientName}
                        onChange={(e) => setColClientName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        Client Phone *
                      </label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. +91 98765 12345"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                        value={colClientPhone}
                        onChange={(e) => setColClientPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                      Collection Location / Address *
                    </label>
                    <textarea 
                      className="form-input" 
                      style={{ height: '65px', resize: 'none', padding: '0.6rem 0.8rem', lineHeight: '1.4', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontSize: '0.9rem' }}
                      placeholder="Enter details of target shop or office location"
                      value={colLocation}
                      onChange={(e) => setColLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* SECTION 2: ASSIGNMENT & AMOUNT DETAILS */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginBottom: '1rem' }}>
                  <h4 style={{ 
                    color: '#ef4444', 
                    fontSize: '0.75rem', 
                    fontWeight: '800', 
                    letterSpacing: '0.05em', 
                    textTransform: 'uppercase', 
                    marginBottom: '1rem' 
                  }}>
                    Collection Details
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 1.25rem', marginBottom: '1rem' }}>
                    {/* Row 1: Labels */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', minHeight: '32px' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: 0, display: 'block' }}>
                        Target Amount to Collect (₹)*
                      </label>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', minHeight: '32px' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: 0, display: 'block' }}>
                        Assign Staff Handler*
                      </label>
                    </div>

                    {/* Row 2: Inputs */}
                    <div>
                      <input 
                        type="number" 
                        className="form-input" 
                        placeholder="e.g. 50000"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '42px', fontSize: '0.9rem', width: '100%' }}
                        value={colAmountToCollect}
                        onChange={(e) => setColAmountToCollect(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <select
                        className="form-input"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '42px', fontSize: '0.9rem', padding: '0 0.5rem', width: '100%' }}
                        value={colAssignedToId}
                        onChange={(e) => setColAssignedToId(e.target.value)}
                        required
                      >
                        <option value="">-- Select Employee --</option>
                        {users.filter(u => u.role !== 'admin' && u.isActive !== false).map(u => (
                          <option key={u.id} value={u.id}>{u.name} (@{u.username})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

              </div>
              
              <div style={{ padding: '0 2rem 2rem 2rem' }}>
                <button 
                  type="submit" 
                  className="btn btn-danger"
                  style={{ 
                    backgroundColor: '#ef4444', 
                    border: 'none', 
                    color: 'white', 
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Plus size={18} />
                  Assign Collection Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SUBMIT COLLECTION REPORT POPUP MODAL (STAFF ONLY) --- */}
      {showCollectionReportModal && selectedCollectionForReport && (
        <div className="modal-overlay" onClick={() => setShowCollectionReportModal(false)}>
          <div className="modal-content animate-scale-in" style={{ maxWidth: '480px', width: '90%', borderRadius: '20px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0' }}>
              <span className="modal-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} color="#22c55e" />
                Submit Collection Report
              </span>
              <button 
                type="button"
                className="modal-close-btn" 
                onClick={() => setShowCollectionReportModal(false)}
                style={{
                  border: '1.5px solid #0f172a',
                  borderRadius: '6px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  cursor: 'pointer',
                  width: '26px',
                  height: '26px'
                }}
              >
                <X size={14} color="#0f172a" strokeWidth={3} />
              </button>
            </div>

            {colReportErrorMessage && (
              <div className="login-error" style={{ margin: '1rem 1.5rem 0', borderRadius: '8px' }}>
                <AlertTriangle size={16} />
                <span>{colReportErrorMessage}</span>
              </div>
            )}

            {colReportSuccessMessage && (
              <div className="success-banner" style={{ 
                margin: '1rem 1.5rem 0', 
                borderRadius: '8px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#10b981',
                padding: '0.6rem 0.85rem',
                fontSize: '0.825rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle size={16} />
                <span>{colReportSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleReportCollectionSubmit}>
              <div className="modal-body" style={{ maxHeight: '64vh', overflowY: 'auto', padding: '1.5rem' }}>
                
                <div style={{ backgroundColor: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Client / Store</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a' }}>{selectedCollectionForReport.clientName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>Target: ₹{selectedCollectionForReport.amountToCollect.toLocaleString()}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.4rem', minHeight: '32px', display: 'flex', alignItems: 'flex-end' }}>
                      Amount Collected (₹)*
                    </label>
                    <input 
                      type="number" 
                      className="form-input" 
                      placeholder="e.g. 50000"
                      style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', height: '38px', fontSize: '0.875rem' }}
                      value={colAmountCollected}
                      onChange={(e) => {
                        const val = e.target.value;
                        setColAmountCollected(val);
                        const parsed = parseFloat(val);
                        if (!isNaN(parsed)) {
                          const target = selectedCollectionForReport.amountToCollect;
                          setColAmountPending(Math.max(0, target - parsed));
                        } else {
                          setColAmountPending(selectedCollectionForReport.amountToCollect);
                        }
                      }}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.4rem', minHeight: '32px', display: 'flex', alignItems: 'flex-end' }}>
                      Amt Remaining Pending (₹)
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      style={{ borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', color: '#64748b', height: '42px', fontSize: '0.9rem', fontWeight: '700' }}
                      value={colAmountPending !== '' ? `₹${Number(colAmountPending).toLocaleString()}` : ''}
                      disabled
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', marginBottom: '0.4rem' }}>
                    Remarks / Collection Notes
                  </label>
                  <textarea 
                    className="form-input" 
                    style={{ height: '70px', resize: 'none', padding: '0.6rem 0.8rem', lineHeight: '1.4', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontSize: '0.9rem' }}
                    placeholder="Provide details about cash/cheque collected, pending timeline, etc."
                    value={colRemarks}
                    onChange={(e) => setColRemarks(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-danger" 
                  style={{ width: '100%', height: '44px', fontWeight: '700', borderRadius: '8px', justifyContent: 'center' }}
                >
                  Submit Collection Info
                </button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CREATE ORDER OVERLAY --- */}
      {showCreateOrder && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#fff', zIndex: 200, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
            <span style={{ fontWeight: '800', fontSize: '1rem', color: '#0f172a' }}>{editingOrderId ? 'Edit Order' : 'Create Order'}</span>
            <button type="button" onClick={() => { setShowCreateOrder(false); setEditingOrderId(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}><X size={20} /></button>
          </div>

          <div style={{ flex: 1, padding: '1rem 1.25rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Customer + Date row */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Customer</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: '2.2rem', height: '44px', borderRadius: '10px', border: '1px solid #e2e8f0', width: '100%', fontSize: '0.875rem', backgroundColor: '#f8fafc' }}
                    placeholder="Search customer..."
                    value={orderForm.customerQuery}
                    autoComplete="off"
                    onChange={e => {
                      const v = e.target.value;
                      setOrderForm(f => ({ ...f, customerQuery: v }));
                      setShowCustomerDropdown(v.length >= 1);
                    }}
                    onBlur={() => setTimeout(() => setShowCustomerDropdown(false), 150)}
                  />
                  <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}><Search size={14} /></span>
                  {/* Customer dropdown from ledger master */}
                  {showCustomerDropdown && tallyLedgerMasterData.length > 0 && (() => {
                    const q = orderForm.customerQuery.toLowerCase();
                    const matches = tallyLedgerMasterData.filter(l =>
                      l.ledgerName.toLowerCase().includes(q)
                    ).slice(0, 8);
                    if (matches.length === 0) return null;
                    return (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 6px 20px rgba(0,0,0,0.10)', zIndex: 100, maxHeight: '220px', overflowY: 'auto', marginTop: '4px' }}>
                        {matches.map((l, i) => (
                          <button
                            key={i}
                            type="button"
                            onMouseDown={e => {
                              e.preventDefault();
                              setOrderForm(f => ({ ...f, customerQuery: l.ledgerName }));
                              setShowCustomerDropdown(false);
                            }}
                            style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0.6rem 0.9rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <div>
                              <div style={{ fontWeight: '700', fontSize: '0.82rem', color: '#0f172a' }}>{l.ledgerName}</div>
                              {l.ledgerGroup && <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{l.ledgerGroup}</div>}
                            </div>
                          </button>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
              <div style={{ minWidth: '140px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Date</label>
                <input
                  type="date"
                  className="form-input"
                  style={{ height: '44px', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0 0.85rem', fontSize: '0.875rem', backgroundColor: '#f8fafc', width: '100%' }}
                  value={orderForm.date}
                  onChange={e => setOrderForm(f => ({ ...f, date: e.target.value }))}
                />
              </div>
            </div>

            {/* Add Items section */}
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Add Items</label>
              <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.2rem', height: '44px', borderRadius: '10px', border: '1px solid #e2e8f0', width: '100%', fontSize: '0.875rem', backgroundColor: '#f8fafc' }}
                  placeholder="Search item..."
                  value={orderItemQuery}
                  onChange={e => {
                    const val = e.target.value;
                    setOrderItemQuery(val);
                    if (val.length >= 1) {
                      setShowItemDropdown(true);
                      setOrderItemForm(f => ({ ...f, name: val }));
                    } else {
                      setShowItemDropdown(false);
                      setShowAddItemRow(false);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowItemDropdown(false), 150)}
                  autoComplete="off"
                />
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}><Search size={14} /></span>
                {/* Item dropdown from master data */}
                {showItemDropdown && tallyItemMasterData.length > 0 && (() => {
                  const q = orderItemQuery.toLowerCase();
                  const matches = tallyItemMasterData.filter(item =>
                    item.itemName.toLowerCase().includes(q) ||
                    item.itemCode.toLowerCase().includes(q) ||
                    item.stockGroup.toLowerCase().includes(q)
                  );
                  if (matches.length === 0) return null;
                  return (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0, right: 0,
                      backgroundColor: '#fff', border: '1px solid #e2e8f0',
                      borderRadius: '10px', boxShadow: '0 6px 20px rgba(0,0,0,0.10)',
                      zIndex: 100, maxHeight: '220px', overflowY: 'auto', marginTop: '4px'
                    }}>
                      {matches.map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onMouseDown={e => {
                            e.preventDefault();
                            setOrderItemQuery(item.itemName);
                            setOrderItemForm({ name: item.itemName, qty: 1, rate: item.currentRate || 0, discount: 0 });
                            setShowItemModal(true);
                            setShowItemDropdown(false);
                          }}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            width: '100%', padding: '0.6rem 0.9rem',
                            background: 'none', border: 'none', cursor: 'pointer',
                            textAlign: 'left', borderBottom: '1px solid #f1f5f9',
                            gap: '0.75rem'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '0.82rem', color: '#0f172a' }}>{item.itemName}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.itemCode} · {item.stockGroup}</div>
                          </div>
                          <div style={{ fontWeight: '700', fontSize: '0.82rem', color: '#ef4444', whiteSpace: 'nowrap' }}>
                            ₹{item.currentRate.toLocaleString()}
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Item detail popup modal */}
              {showItemModal && (
                <div className="modal-overlay" onClick={() => setShowItemModal(false)}>
                  <div className="modal-content animate-scale-in" style={{ maxWidth: '380px', width: '94%' }} onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                      <span className="modal-title" style={{ fontSize: '1rem' }}>{orderItemForm.name}</span>
                      <button className="modal-close-btn" onClick={() => setShowItemModal(false)}><X size={16} /></button>
                    </div>
                    <div className="modal-body" style={{ padding: '1.25rem' }}>
                      {(() => {
                        const qty = orderItemForm.qty || 1;
                        const rate = Number(orderItemForm.rate) || 0;
                        const disc = Number(orderItemForm.discount) || 0;
                        const discAmt = (rate * qty * disc) / 100;
                        const total = rate * qty - discAmt;
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                              <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>Qty</label>
                                <input type="number" min="1" className="form-input" style={{ height: '40px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }}
                                  value={orderItemForm.qty}
                                  onChange={e => setOrderItemForm(f => ({ ...f, qty: parseInt(e.target.value) || 1 }))} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>Rate (₹)</label>
                                <input type="number" min="0" className="form-input" style={{ height: '40px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }}
                                  value={orderItemForm.rate}
                                  onChange={e => setOrderItemForm(f => ({ ...f, rate: e.target.value }))} />
                              </div>
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>Discount (%)</label>
                              <input type="number" min="0" max="100" className="form-input" style={{ height: '40px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }}
                                value={orderItemForm.discount}
                                onChange={e => setOrderItemForm(f => ({ ...f, discount: e.target.value }))} />
                            </div>
                            <div style={{ backgroundColor: '#fef2f2', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#64748b' }}>Total</span>
                              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ef4444' }}>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                            </div>
                            <button type="button"
                              onClick={() => {
                                const q = orderItemForm.qty || 1;
                                const r = Number(orderItemForm.rate) || 0;
                                const d = Number(orderItemForm.discount) || 0;
                                const t = r * q - (r * q * d) / 100;
                                setOrderForm(f => ({ ...f, items: [...f.items, { ...orderItemForm, qty: q, rate: r, discount: d, total: t, id: Date.now() }] }));
                                setOrderItemForm({ name: '', qty: 1, rate: '', discount: 0 });
                                setOrderItemQuery('');
                                setShowItemModal(false);
                              }}
                              style={{ width: '100%', height: '42px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}>
                              Add Item
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* Items list */}
              {orderForm.items.length > 0 && (
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                  {orderForm.items.map((item, idx) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', borderBottom: idx < orderForm.items.length - 1 ? '1px solid #f1f5f9' : 'none', backgroundColor: '#fff' }}>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.82rem', color: '#0f172a' }}>{item.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.qty} × ₹{Number(item.rate).toLocaleString()}{item.discount > 0 ? ` · ${item.discount}% off` : ''}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#ef4444' }}>₹{(item.total ?? item.qty * Number(item.rate)).toLocaleString()}</span>
                        <button type="button" onClick={() => setOrderForm(f => ({ ...f, items: f.items.filter(i => i.id !== item.id) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', lineHeight: 1 }}><X size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notes button — above footer */}
          <div style={{ padding: '0 1.25rem 0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <button type="button" onClick={() => setShowOrderNotes(true)} style={{ padding: '0.55rem 1rem', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '8px', color: '#0f172a', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MessageSquare size={14} /> {orderForm.notes ? 'Edit Notes' : 'Add Notes'}
            </button>
            {orderForm.notes && (
              <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{orderForm.notes}</div>
            )}
          </div>

          {/* Footer */}
          <div style={{ position: 'sticky', bottom: 0, backgroundColor: '#fff', borderTop: '1px solid #e2e8f0', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total</div>
              <div style={{ fontWeight: '800', fontSize: '1.05rem', color: '#0f172a' }}>₹{orderForm.items.reduce((s, i) => s + i.qty * Number(i.rate || 0), 0).toLocaleString()}</div>
            </div>
            <button type="button" onClick={() => { setShowCreateOrder(false); setEditingOrderId(null); }} style={{ padding: '0.6rem 0.85rem', background: 'none', border: 'none', color: '#64748b', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
            <button type="button"
              onClick={() => {
                const total = orderForm.items.reduce((s, i) => s + i.qty * Number(i.rate || 0), 0);
                if (editingOrderId) {
                  // EDIT MODE
                  const updatedOrders = orders.map(o => {
                    if (o.orderId === editingOrderId) {
                      return {
                        ...o,
                        customerQuery: orderForm.customerQuery || 'Walk-in',
                        date: orderForm.date,
                        items: orderForm.items,
                        notes: orderForm.notes,
                        total,
                      };
                    }
                    return o;
                  });
                  setOrders(updatedOrders);
                  localStorage.setItem('bj_orders', JSON.stringify(updatedOrders));

                  // Save to database
                  fetch(`/api/orders/${editingOrderId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      customer_query: orderForm.customerQuery || 'Walk-in',
                      order_date: orderForm.date,
                      notes: orderForm.notes,
                      total,
                      items: orderForm.items
                    })
                  })
                    .then(res => {
                      if (res.ok) {
                        fetchOrders();
                      }
                    })
                    .catch(err => console.error('Failed to update order in database:', err));

                  setEditingOrderId(null);
                } else {
                  // CREATE MODE
                  const newOrder = { orderId: `ORD-${Date.now()}`, customerQuery: orderForm.customerQuery || 'Walk-in', date: orderForm.date, items: orderForm.items, notes: orderForm.notes, total, status: 'Pending', createdAt: new Date().toISOString() };
                  const updated = [newOrder, ...orders];
                  setOrders(updated);
                  localStorage.setItem('bj_orders', JSON.stringify(updated));

                  // Save to database
                  fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      order_id: newOrder.orderId,
                      customer_query: newOrder.customerQuery,
                      order_date: newOrder.date,
                      notes: newOrder.notes,
                      total: newOrder.total,
                      items: newOrder.items
                    })
                  })
                    .then(res => {
                      if (res.ok) {
                        fetchOrders();
                      }
                    })
                    .catch(err => console.error('Failed to save order to database:', err));
                }
                setShowCreateOrder(false);
              }}
              style={{ padding: '0.6rem 1.25rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}>
              {editingOrderId ? 'Save Changes' : 'Create Order'}
            </button>
          </div>
        </div>
      )}

      {/* --- ORDER NOTES BOTTOM SHEET --- */}
      {showOrderNotes && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 300, display: 'flex', alignItems: 'flex-end' }} onClick={() => setShowOrderNotes(false)}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px 16px 0 0', width: '100%', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '1rem', color: '#0f172a' }}>Order Notes</span>
              <button type="button" onClick={() => setShowOrderNotes(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>
            <textarea
              rows={5}
              className="form-input"
              style={{ borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0.75rem', fontSize: '0.875rem', resize: 'none', backgroundColor: '#f8fafc', width: '100%' }}
              placeholder="Add any notes for this order..."
              value={orderForm.notes}
              onChange={e => setOrderForm(f => ({ ...f, notes: e.target.value }))}
            />
            <button type="button" onClick={() => setShowOrderNotes(false)} style={{ width: '100%', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', padding: '0.9rem', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer' }}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* ── Orders FAB (outside transform context so position:fixed works) ── */}
      {activeTab === 'Orders' && (
        <button
          type="button"
          onClick={() => { setOrderForm({ customerQuery: '', date: new Date().toISOString().split('T')[0], items: [], notes: '' }); setOrderItemQuery(''); setShowAddItemRow(false); setShowCreateOrder(true); }}
          style={{ position: 'fixed', bottom: '5rem', right: '1.25rem', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#ef4444', color: 'white', border: 'none', boxShadow: '0 4px 16px rgba(239,68,68,0.45)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40 }}
        >
          <Plus size={24} />
        </button>
      )}

      {/* ── Mobile Bottom Navbar (outside transform context so position:fixed works) ── */}
      <nav className="mobile-bottom-nav">
        <button className={`mobile-bottom-nav-item${activeTab === 'Home' ? ' active' : ''}`} onClick={() => setActiveTab('Home')}>
          <Home size={20} />
          <span>Home</span>
        </button>
        {isAdmin && (
          <button className={`mobile-bottom-nav-item${activeTab === 'User' ? ' active' : ''}`} onClick={() => setActiveTab('User')}>
            <UserPlus size={20} />
            <span>Users</span>
          </button>
        )}
        <button className={`mobile-bottom-nav-item${activeTab === 'Deliveries' ? ' active' : ''}`} onClick={() => setActiveTab('Deliveries')}>
          <Package size={20} />
          <span>Deliveries</span>
        </button>
        <button className={`mobile-bottom-nav-item${activeTab === 'Collections' ? ' active' : ''}`} onClick={() => setActiveTab('Collections')}>
          <DollarSign size={20} />
          <span>Collections</span>
        </button>
        <button className={`mobile-bottom-nav-item${activeTab === 'Orders' ? ' active' : ''}`} onClick={() => setActiveTab('Orders')}>
          <ShoppingCart size={20} />
          <span>Orders</span>
        </button>
        {isAdmin && (
          <button className={`mobile-bottom-nav-item${activeTab === 'Master' ? ' active' : ''}`} onClick={() => { setActiveTab('Master'); setMasterSubTab(null); }}>
            <Package size={20} />
            <span>Master</span>
          </button>
        )}
        <button className={`mobile-bottom-nav-item${activeTab === 'Profile' ? ' active' : ''}`} onClick={() => setActiveTab('Profile')}>
          <User size={20} />
          <span>Profile</span>
        </button>
      </nav>

    </>
  );
}

export default App;
