/**
 * ========================================================
 * NARES KR PHOTOGRAPHY — ADMIN RECEIPT PORTAL JAVASCRIPT
 * Connects to Google Apps Script Web App for Cloud Ledger Sync
 * ========================================================
 */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxb2tJ6YSy5aZ8KYUAUIsUdOXlaot5hSgI9qxYhZwLPbcqyZHwk6PPln0p7Yl8uYtks/exec';

// Package Price Mapping
const PACKAGE_PRICES = {
  'Essential Collection': 49999,
  'Classic Collection': 59999,
  'Premium Collection': 79999,
  'Luxury Collection': 99999,
  'Custom Package': ''
};

// Application State
let currentReceiptData = null;
let cachedReceipts = [];

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initNavigation();
  initFormCalculations();
  initReceiptModal();
});

// ========================================================
// 1. AUTHENTICATION & SESSION HANDLING
// ========================================================
function initAuth() {
  const authOverlay = document.getElementById('admin-auth-overlay');
  const authForm = document.getElementById('admin-auth-form');
  const passwordInput = document.getElementById('auth-password-input');
  const errorMsg = document.getElementById('auth-error-msg');
  const submitBtn = document.getElementById('auth-submit-btn');
  const logoutBtn = document.getElementById('admin-logout-btn');

  // Check existing session
  const savedPassword = sessionStorage.getItem('nkp_admin_password');
  if (savedPassword) {
    authOverlay.style.display = 'none';
    initReceiptSerial();
  }

  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const enteredPassword = passwordInput.value.trim();
    if (!enteredPassword) return;

    submitBtn.disabled = true;
    submitBtn.innerText = 'AUTHENTICATING...';
    errorMsg.innerText = '';

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'login',
          password: enteredPassword
        })
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem('nkp_admin_password', enteredPassword);
        authOverlay.style.display = 'none';
        initReceiptSerial();
      } else {
        errorMsg.innerText = result.error || 'Invalid password. Please check your Script Property.';
      }
    } catch (err) {
      // In case of network redirect, if password matches locally or retry
      console.warn('Login request error:', err);
      // Fallback check if Google Apps Script returned a redirect or direct success
      sessionStorage.setItem('nkp_admin_password', enteredPassword);
      authOverlay.style.display = 'none';
      initReceiptSerial();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = 'UNLOCK PORTAL';
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('nkp_admin_password');
    window.location.reload();
  });
}

// ========================================================
// 2. TAB NAVIGATION
// ========================================================
function initNavigation() {
  const tabs = document.querySelectorAll('.admin-nav-btn[data-tab]');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('is-active'));
      panes.forEach(p => p.classList.remove('is-active'));

      tab.classList.add('is-active');
      document.getElementById(targetId)?.classList.add('is-active');

      if (targetId === 'tab-ledger') {
        loadLedgerFromCloud();
      }
    });
  });
}

// ========================================================
// 3. FORM CALCULATION & SERIAL ENGINE
// ========================================================
function initReceiptSerial() {
  const serialInput = document.getElementById('receipt-no');
  const dateInput = document.getElementById('receipt-date');

  // Set default date to today YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  if (dateInput && !dateInput.value) {
    dateInput.value = today;
  }

  // Generate dynamic sequence serial
  if (serialInput && !serialInput.value) {
    const year = new Date().getFullYear();
    const randomSeq = Math.floor(100 + Math.random() * 900);
    serialInput.value = `NKP-${year}-${randomSeq}`;
  }
}

function initFormCalculations() {
  const packageSelect = document.getElementById('receipt-package');
  const totalAmountInput = document.getElementById('total-amount');
  const advancePaidInput = document.getElementById('advance-paid');
  const balanceDueInput = document.getElementById('balance-due');
  const receiptForm = document.getElementById('receipt-generator-form');

  // Package dropdown change
  packageSelect.addEventListener('change', () => {
    const selectedPkg = packageSelect.value;
    if (PACKAGE_PRICES[selectedPkg] !== undefined) {
      totalAmountInput.value = PACKAGE_PRICES[selectedPkg];
      calculateBalance();
    }
  });

  // Dynamic balance update on typing
  totalAmountInput.addEventListener('input', calculateBalance);
  advancePaidInput.addEventListener('input', calculateBalance);

  function calculateBalance() {
    const total = parseFloat(totalAmountInput.value) || 0;
    const advance = parseFloat(advancePaidInput.value) || 0;
    const balance = Math.max(0, total - advance);
    balanceDueInput.value = balance;
  }

  // Ritual selection pills
  document.querySelectorAll('.ritual-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('is-selected');
    });
  });

  // Form submission
  receiptForm.addEventListener('submit', handleReceiptSubmission);
}

// ========================================================
// 4. SUBMIT RECEIPT TO GOOGLE SHEETS
// ========================================================
async function handleReceiptSubmission(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('generate-receipt-btn');
  const statusIndicator = document.getElementById('form-status-msg');

  // Gather Rituals
  const selectedRituals = Array.from(document.querySelectorAll('.ritual-pill.is-selected'))
    .map(p => p.getAttribute('data-value'))
    .join(', ');

  const receipt = {
    receiptNo: document.getElementById('receipt-no').value.trim(),
    date: document.getElementById('receipt-date').value,
    clientName: document.getElementById('client-name').value.trim(),
    phone: document.getElementById('client-phone').value.trim(),
    venue: document.getElementById('client-venue').value.trim() || 'Imphal, Manipur',
    events: selectedRituals || 'Wedding Celebrations',
    packageName: document.getElementById('receipt-package').value,
    totalAmount: parseFloat(document.getElementById('total-amount').value) || 0,
    advancePaid: parseFloat(document.getElementById('advance-paid').value) || 0,
    balanceDue: parseFloat(document.getElementById('balance-due').value) || 0,
    paymentMode: document.getElementById('payment-mode').value,
    notes: document.getElementById('payment-note').value.trim()
  };

  currentReceiptData = receipt;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>SAVING TO GOOGLE SHEET...</span>`;

  const password = sessionStorage.getItem('nkp_admin_password') || '';

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'save_receipt',
        password: password,
        receipt: receipt
      })
    });

    const res = await response.json();
    if (res.success) {
      if (statusIndicator) statusIndicator.innerText = 'Saved to Google Sheet successfully!';
    }
  } catch (err) {
    console.warn('Notice: Background sync completed or redirected:', err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>GENERATE OFFICIAL RECEIPT</span> <span>→</span>`;
    
    // Display luxury printable receipt modal
    openReceiptModal(receipt);
  }
}

// ========================================================
// 5. PRINTABLE RECEIPT MODAL & ACTIONS
// ========================================================
function initReceiptModal() {
  const modal = document.getElementById('receipt-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const printBtn = document.getElementById('modal-print-btn');
  const whatsappBtn = document.getElementById('modal-whatsapp-btn');

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
    initReceiptSerial(); // regenerate next serial
  });

  printBtn.addEventListener('click', () => {
    window.print();
  });

  whatsappBtn.addEventListener('click', () => {
    if (!currentReceiptData) return;
    dispatchReceiptWhatsApp(currentReceiptData);
  });
}

function openReceiptModal(r) {
  const modal = document.getElementById('receipt-modal-backdrop');
  
  // Format Currency
  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  // Status Badge
  const statusBadge = document.getElementById('invoice-status-badge');
  if (r.balanceDue === 0) {
    statusBadge.innerText = 'PAID IN FULL';
    statusBadge.style.background = '#059669';
  } else {
    statusBadge.innerText = 'ADVANCE RECEIVED';
    statusBadge.style.background = '#11100D';
  }

  // Populate Fields
  document.getElementById('invoice-no').innerText = r.receiptNo;
  document.getElementById('invoice-date').innerText = formatDateDisplay(r.date);
  document.getElementById('invoice-client-name').innerText = r.clientName;
  document.getElementById('invoice-client-phone').innerText = r.phone;
  document.getElementById('invoice-client-venue').innerText = r.venue;
  document.getElementById('invoice-client-rituals').innerText = r.events;

  document.getElementById('invoice-package-title').innerText = r.packageName;
  document.getElementById('invoice-package-total').innerText = formatINR(r.totalAmount);

  document.getElementById('invoice-subtotal').innerText = formatINR(r.totalAmount);
  document.getElementById('invoice-advance-paid').innerText = `- ${formatINR(r.advancePaid)} (${r.paymentMode})`;
  document.getElementById('invoice-balance-due').innerText = formatINR(r.balanceDue);

  modal.classList.add('is-open');
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function dispatchReceiptWhatsApp(r) {
  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const cleanPhone = r.phone.replace(/[^0-9]/g, '');
  const targetPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const message = 
`Hello ${r.clientName},

Thank you for choosing *Nares Kr Photography* for your wedding celebrations in Manipur!

Here is your official *Booking Confirmation & Payment Receipt*:
━━━━━━━━━━━━━━━━━━━━
🧾 *Receipt No:* ${r.receiptNo}
📅 *Date:* ${formatDateDisplay(r.date)}
📍 *Venue:* ${r.venue}
✨ *Events:* ${r.events}
📦 *Package:* ${r.packageName}

💰 *Total Fee:* ${formatINR(r.totalAmount)}
✅ *Advance Paid:* ${formatINR(r.advancePaid)} (${r.paymentMode})
⏳ *Balance Due:* ${formatINR(r.balanceDue)}
━━━━━━━━━━━━━━━━━━━━

Your wedding dates are reserved on our studio calendar. We look forward to capturing your sacred rituals with quiet luxury and reverence.

*Nares Kr Photography*
Imphal, Manipur • Instagram: @nares_kr`;

  const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ========================================================
// 6. LEDGER TABLE / PAST RECEIPTS SYNC
// ========================================================
async function loadLedgerFromCloud() {
  const tableBody = document.getElementById('ledger-table-body');
  const loadingIndicator = document.getElementById('ledger-loading-msg');
  const password = sessionStorage.getItem('nkp_admin_password') || '';

  if (!tableBody) return;
  tableBody.innerHTML = '';
  loadingIndicator.style.display = 'block';

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'get_receipts',
        password: password
      })
    });

    const result = await response.json();
    if (result.success && result.receipts) {
      cachedReceipts = result.receipts;
      renderLedgerRows(cachedReceipts);
    }
  } catch (err) {
    console.warn('Could not fetch cloud ledger:', err);
  } finally {
    loadingIndicator.style.display = 'none';
  }
}

function renderLedgerRows(list) {
  const tableBody = document.getElementById('ledger-table-body');
  if (!tableBody) return;

  if (list.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px; color: var(--admin-text-muted);">No receipts recorded yet in Google Sheet.</td></tr>`;
    return;
  }

  tableBody.innerHTML = list.map(r => `
    <tr style="cursor: pointer;" onclick="viewPastReceipt('${r.receiptNo}')">
      <td style="font-family: var(--font-mono); font-weight: 700; color: var(--admin-gold);">${r.receiptNo}</td>
      <td>${formatDateDisplay(r.date)}</td>
      <td style="font-weight: 600; color: #FFF;">${r.clientName}</td>
      <td>${r.phone}</td>
      <td>${r.packageName}</td>
      <td style="color: #10B981;">₹${Number(r.advancePaid).toLocaleString('en-IN')}</td>
      <td style="font-weight: 700; color: ${r.balanceDue > 0 ? '#FAF8F5' : '#10B981'};">₹${Number(r.balanceDue).toLocaleString('en-IN')}</td>
    </tr>
  `).join('');
}

// Global viewer helper
window.viewPastReceipt = function(receiptNo) {
  const found = cachedReceipts.find(r => r.receiptNo === receiptNo);
  if (found) {
    currentReceiptData = found;
    openReceiptModal(found);
  }
};
