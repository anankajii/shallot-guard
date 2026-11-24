// js/features/finance/finance.js
import { getSummary } from '../../services/finance-service.js';
import { state } from '../../core/state.js';
import { money } from '../../core/utils.js';

export function renderFinance() {
  const { income, expense, profit } = getSummary();
  return `
    <div class="page-title-row">
      <div><h1>Keuangan Usaha Tani</h1>
      <p class="hint">Transaksi demonstrasi disimpan lokal pada mode preview.</p></div>
      <button class="btn" data-add="transaction">+ Transaksi</button>
    </div>
    <div class="stat-grid">
      <div class="stat"><span>Pemasukan</span><b>${money(income)}</b></div>
      <div class="stat"><span>Pengeluaran</span><b>${money(expense)}</b></div>
      <div class="stat"><span>Keuntungan</span><b>${money(profit)}</b></div>
    </div>
    <div class="table-wrap" style="margin-top:20px">
      <table>
        <thead><tr><th>Tanggal</th><th>Jenis</th><th>Kategori</th><th>Nominal</th><th></th></tr></thead>
        <tbody>
          ${state.finance.map((x, i) => `
            <tr>
              <td>${x.date}</td><td>${x.type}</td><td>${x.category}</td>
              <td>${money(x.amount)}</td>
              <td><button class="btn outline sm" data-delete="transaction:${i}">Hapus</button></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}
