const axios = require('axios');
const http  = require('http');
const xml2js = require('xml2js');

const TALLY_URL = `http://${process.env.TALLY_HOST}:${process.env.TALLY_PORT}`;

// Raw GET with body (Tally JSON API requires this)
function tallyJsonGet(headers, body = '{}') {
  return new Promise((resolve, reject) => {
    const buf = Buffer.from(body);
    const opts = {
      hostname: process.env.TALLY_HOST,
      port: parseInt(process.env.TALLY_PORT),
      path: '/',
      method: 'GET',
      headers: { ...headers, 'Content-Length': buf.length },
    };
    const req = http.request(opts, res => {
      let raw = '';
      res.on('data', c => { raw += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); } catch { resolve(raw); }
      });
    });
    req.on('error', reject);
    req.write(buf);
    req.end();
  });
}
const COMPANY   = process.env.TALLY_COMPANY;

const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: false, trim: true });

async function postToTally(xmlBody) {
  const response = await axios.post(TALLY_URL, xmlBody, {
    headers: { 'Content-Type': 'text/xml' },
    timeout: 15000,
  });
  return parser.parseStringPromise(response.data);
}

function val(obj, ...keys) {
  let cur = obj;
  for (const k of keys) {
    if (cur == null) return '';
    cur = cur[k];
  }
  return cur ?? '';
}

// TDL Collection fields may return { _: "text", $: { TYPE: "..." } } — extract just the text
// Also strip Tally control chars (e.g.  prefix on group names)
function txt(v) {
  if (!v) return '';
  const raw = typeof v === 'string' ? v : (v._ ? String(v._) : '');
  return raw.replace(/[\x00-\x1F]/g, '').trim();
}

// Tally $$SysName:XML exports land under EXPORTDATA or IMPORTDATA path
function getMsgs(result) {
  return [].concat(
    val(result, 'ENVELOPE', 'BODY', 'EXPORTDATA', 'REQUESTDATA', 'TALLYMESSAGE') ||
    val(result, 'ENVELOPE', 'BODY', 'IMPORTDATA', 'REQUESTDATA', 'TALLYMESSAGE') ||
    val(result, 'ENVELOPE', 'BODY', 'DATA', 'TALLYMESSAGE') ||
    []
  );
}

function getFYDates() {
  const now = new Date();
  const year = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  return { from: `${year}0401`, to: `${year + 1}0331` };
}

// ── Outstanding Bills Receivable ─────────────────────────────────────────────
async function fetchOutstanding() {
  const data = await tallyJsonGet({
    'content-type': 'application/json',
    'version': '1',
    'Type': 'Data',
    'Id': 'Bills Receivable',
    'tallyrequest': 'export',
  });
  console.log('[fetchOutstanding] RAW:', JSON.stringify(data).slice(0, 300));
  const billdetail = [].concat(
    (data && data.data && data.data.billbody && data.data.billbody.billdetail) ||
    (data && data.data && data.data.billdetail) ||
    (data && data.billbody && data.billbody.billdetail) ||
    (data && data.billdetail) ||
    []
  );
  console.log('[fetchOutstanding] billdetail count:', billdetail.length, billdetail[0] ? JSON.stringify(billdetail[0]).slice(0,80) : '');
  return billdetail.map((bill, i) => {
    const fixed = bill.billfixed || {};
    return {
      id:          `OUT-${Date.now()}-${i}`,
      voucherNo:   fixed.billref   || '',
      voucherDate: fixed.billdate  || '',
      partyName:   fixed.billparty || '',
      partyPhone:  '',
      partyAddress: '',
      amount:          Math.abs(parseFloat(bill.billfinal || 0)),
      openingBalance:  Math.abs(parseFloat(Array.isArray(bill.billop) ? bill.billop[0] : (bill.billop || bill.billfinal || 0))),
      closingBalance:  Math.abs(parseFloat(Array.isArray(bill.billcl) ? bill.billcl[0] : (bill.billcl || 0))),
      dueDate:        bill.billdue    || '',
      daysOverdue:    parseInt(bill.billoverdue || 0),
      ledgerGroup:    'Sundry Debtors',
    };
  }).filter(v => v.partyName && v.amount > 0);
}

// ── Sales Vouchers (Deliveries) ──────────────────────────────────────────────
async function fetchSalesVouchers() {
  const { from, to } = getFYDates();
  const xml = `
<ENVELOPE>
  <HEADER><TALLYREQUEST>Export Data</TALLYREQUEST></HEADER>
  <BODY>
    <EXPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Day Book</REPORTNAME>
        <STATICVARIABLES>
          <SVCURRENTCOMPANY>${COMPANY}</SVCURRENTCOMPANY>
          <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
          <SVFROMDATE>${from}</SVFROMDATE>
          <SVTODATE>${to}</SVTODATE>
        </STATICVARIABLES>
      </REQUESTDESC>
    </EXPORTDATA>
  </BODY>
</ENVELOPE>`.trim();

  const result = await postToTally(xml);
  const msgs = getMsgs(result);

  return msgs
    .filter(m => m && m.VOUCHER && val(m, 'VOUCHER', '$', 'VCHTYPE') === 'Sales')
    .map((m, i) => {
      const v = m.VOUCHER;
      return {
        id:           val(v, '$', 'REMOTEID') || `TV-${Date.now()}-${i}`,
        voucherNo:    val(v, 'VOUCHERNUMBER'),
        voucherDate:  formatTallyDate(val(v, 'DATE')),
        partyName:    val(v, 'PARTYNAME'),
        partyPhone:   '',
        partyAddress: val(v, 'BASICBUYERADDRESS') || '',
        amount:       Math.abs(parseFloat(val(v, 'AMOUNT') || 0)),
        ledgerGroup:  'Sundry Debtors',
      };
    })
    .filter(v => v.partyName && v.amount > 0);
}

// ── Receipt Vouchers (Collections) ──────────────────────────────────────────
async function fetchReceiptVouchers() {
  const { from, to } = getFYDates();
  const xml = `
<ENVELOPE>
  <HEADER><TALLYREQUEST>Export Data</TALLYREQUEST></HEADER>
  <BODY>
    <EXPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Day Book</REPORTNAME>
        <STATICVARIABLES>
          <SVCURRENTCOMPANY>${COMPANY}</SVCURRENTCOMPANY>
          <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
          <SVFROMDATE>${from}</SVFROMDATE>
          <SVTODATE>${to}</SVTODATE>
        </STATICVARIABLES>
      </REQUESTDESC>
    </EXPORTDATA>
  </BODY>
</ENVELOPE>`.trim();

  const result = await postToTally(xml);
  const msgs = getMsgs(result);

  return msgs
    .filter(m => m && m.VOUCHER && val(m, 'VOUCHER', '$', 'VCHTYPE') === 'Receipt')
    .map((m, i) => {
      const v = m.VOUCHER;
      return {
        id:           val(v, '$', 'REMOTEID') || `TC-${Date.now()}-${i}`,
        voucherNo:    val(v, 'VOUCHERNUMBER'),
        voucherDate:  formatTallyDate(val(v, 'DATE')),
        partyName:    val(v, 'PARTYNAME'),
        partyPhone:   '',
        partyAddress: '',
        description:  '',
        amount:       Math.abs(parseFloat(val(v, 'AMOUNT') || 0)),
        ledgerGroup:  'Sundry Debtors',
      };
    })
    .filter(v => v.partyName && v.amount > 0);
}

// ── Stock Items (Item Master) ─────────────────────────────────────────────────
async function fetchStockItems() {
  const data = await tallyJsonGet({
    'content-type': 'application/json',
    'version':      '1',
    'tallyrequest': 'export',
    'type':         'collection',
    'id':           'ABSItemColl',
  });

  // Response: { status:"1", data: { collection: [...] } }
  const items = [].concat(
    (data && data.data && data.data.collection) ||
    (data && data.collection) ||
    []
  );
  console.log('[fetchStockItems] count:', items.length);

  function jval(field) {
    if (!field) return '';
    if (typeof field === 'string') return field.trim();
    return String(field.value || '').trim();
  }

  function parseQty(s) {
    return parseFloat(String(s || '').replace(/[^0-9.\-]/g, '')) || 0;
  }

  function getHsn(item) {
    // prefer top-level hsn, fall back to hsndetails[0].hsncode
    if (item.hsn) return jval(item.hsn);
    const details = [].concat(item.hsndetails || []);
    if (details[0] && details[0].hsncode) return jval(details[0].hsncode);
    return '';
  }

  return items.map((item, i) => {
    const name = (item.metadata && item.metadata.name) || `ITEM-${i}`;
    return {
      tally_id:      `IM-${i + 1}`,
      item_code:     name.replace(/\s+/g, '-').toUpperCase().slice(0, 50),
      item_name:     name.trim(),
      stock_group:   txt(jval(item.parent)),
      unit:          txt(jval(item.baseunits)),
      hsn_code:      getHsn(item),
      opening_rate:  0,
      current_rate:  0,
      opening_stock: parseQty(jval(item.openingbalance)),
      current_stock: parseQty(jval(item.closingbalance)),
    };
  }).filter(i => i.item_name);
}

// ── Ledger Accounts (Ledger Master) ──────────────────────────────────────────
async function fetchLedgers() {
  const data = await tallyJsonGet({
    'content-type': 'application/json',
    'version':      '1',
    'tallyrequest': 'export',
    'type':         'collection',
    'id':           'list of ledgers',
  });

  // Response: { status:"1", data: { collection: [...] } }
  const ledgers = [].concat(
    (data && data.data && data.data.collection) ||
    (data && data.collection) ||
    []
  );
  console.log('[fetchLedgers] count:', ledgers.length);

  return ledgers.map((l, i) => {
    const name = (l.metadata && l.metadata.name) || `LDG-${i}`;
    return {
      tally_id:        `LM-${i + 1}`,
      ledger_name:     name.trim(),
      ledger_group:    '',
      phone:           '',
      address:         '',
      gstin:           '',
      opening_balance: 0,
      current_balance: 0,
      balance_type:    'Dr',
    };
  }).filter(l => l.ledger_name);
}

// ── Helper ────────────────────────────────────────────────────────────────────
function formatTallyDate(raw) {
  if (!raw || raw.length !== 8) return raw || '';
  const y = raw.slice(0, 4), m = raw.slice(4, 6), d = raw.slice(6, 8);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m) - 1]} ${parseInt(d)}, ${y}`;
}

module.exports = { fetchOutstanding, fetchSalesVouchers, fetchReceiptVouchers, fetchStockItems, fetchLedgers };
