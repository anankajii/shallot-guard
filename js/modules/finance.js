// js/modules/finance.js
import { getData, addItem, deleteItem } from '../services/firestore-service.js';
import { toast } from '../utils/notifications.js';
import { money, formatDate, escHtml } from '../utils/helpers.js';
import { showModal, closeModal } from './modal-manager.js';

const CATEGORIES = ['Benih','Pupuk','Pestisida','Tenaga kerja','Transportasi','Operasional','Penjualan panen','Lainnya'];

export function initFinance() {
  renderFinanceSummary();
  renderTransactions();
  document.getElementById('add-tx-btn')?.addEventListener('click', showTransactionForm);

  const filter = document.getElementById('finance-filter');
  if (filter) filter.addEventListener('change', renderTransactions);
}

export function renderFinanceSummary() {
  const { finance } = getData();
  const income  = finance.filter(x=>x.type==='Pemasukan').reduce((a,x)=>a+x.amount,0);
  const expense = finance.filter(x=>x.type==='Pengeluaran').reduce((a,x)=>a+x.amount,0);
  const profit  = income - expense;
  _set('finance-income',  money(income));
  _set('finance-expense', money(expense));
  _set('finance-profit',  money(profit));
  const profitEl = document.getElementById('finance-profit');
  if (profitEl) profitEl.style.color = profit >= 0 ? 'var(--leaf)' : 'var(--onion)';
}

export function renderTransactions(filter = '') {
  const list = document.getElementById('tx-list');
  if (!list) return;
  const filterVal = filter || document.getElementById('finance-filter')?.value || '';
  let txs = getData().finance;
  if (filterVal && filterVal !== 'semua') txs = txs.filter(x => x.type === filterVal);
  if (!txs.length) { list.innerHTML = `<tr><td colspan="5" class="empty-state" style="padding:2rem;text-align:center;color:var(--muted)">Belum ada transaksi.</td></tr>`; return; }
  list.innerHTML = txs.map(x=>`
    <tr>
      <td>${formatDate(x.date)}</td>
      <td><span class="badge ${x.type==='Pemasukan'?'badge-success':'badge-danger'}">${x.type}</span></td>
      <td>${escHtml(x.category)}</td>
      <td style="font-weight:600;color:${x.type==='Pemasukan'?'var(--leaf)':'var(--onion)'}">${money(x.amount)}</td>
      <td><button class="btn btn-sm" style="background:var(--onion);padding:4px 10px;font-size:.75rem" onclick="deleteTx('${x.id}')">Hapus</button></td>
    </tr>`).join('');
}

function showTransactionForm() {
  const { farms, cycles } = getData();
  showModal(`
    <h2>Tambah Transaksi</h2>
    <form id="tx-form">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Tanggal *</label>
          <input class="form-input" name="date" type="date" required value="${new Date().toISOString().slice(0,10)}"></div>
        <div class="form-group"><label class="form-label">Jenis *</label>
          <select class="form-select" name="type"><option>Pengeluaran</option><option>Pemasukan</option></select></div>
      </div>
      <div class="form-group"><label class="form-label">Kategori *</label>
        <select class="form-select" name="category">${CATEGORIES.map(c=>`<option>${c}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Nominal (Rp) *</label>
        <input class="form-input" name="amount" type="number" required min="1" placeholder="cth: 500000"></div>
      <div class="form-group"><label class="form-label">Catatan</label>
        <input class="form-input" name="note" placeholder="Opsional"></div>
      <div class="modal-actions">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Batal</button>
        <button type="submit" class="btn">Simpan Transaksi</button>
      </div>
    </form>`);
  document.getElementById('tx-form').onsubmit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    d.amount = Number(d.amount);
    addItem('finance', d);
    toast('Transaksi berhasil disimpan.', 'success');
    closeModal(); renderFinanceSummary(); renderTransactions();
  };
}

window.deleteTx = id => { if(!confirm('Hapus transaksi ini?'))return; deleteItem('finance',id); toast('Transaksi dihapus.'); renderFinanceSummary(); renderTransactions(); };
function _set(id, v) { const el=document.getElementById(id); if(el) el.textContent=v; }
