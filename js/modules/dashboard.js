// js/modules/dashboard.js
import { getData } from '../services/firestore-service.js';
import { getUser } from '../services/auth-service.js';
import { money, ageDays, formatDate } from '../utils/helpers.js';

export function initDashboard() {
  const data = getData();
  const user = getUser();

  // Greeting
  const greetEl = document.getElementById('dash-greeting');
  if (greetEl) {
    const hr = new Date().getHours();
    const prefix = hr < 12 ? 'Selamat pagi' : hr < 18 ? 'Selamat siang' : 'Selamat malam';
    greetEl.textContent = `${prefix}, ${user?.name?.split(' ')[0] ?? 'Petani'}!`;
  }

  // Plan badge
  const planEl = document.getElementById('dash-plan');
  if (planEl) {
    planEl.className = `badge badge-${user?.plan ?? 'free'}`;
    planEl.textContent = (user?.plan ?? 'free').toUpperCase();
  }

  // Stats
  const activeCycles = data.cycles.filter(c => c.status === 'Aktif');
  const latestCycle  = activeCycles[0];
  _setStat('stat-farms',    data.farms.length);
  _setStat('stat-cycles',   activeCycles.length);
  _setStat('stat-age',      latestCycle ? ageDays(latestCycle.plantDate) + ' HST' : '—');

  // Finance summary
  const income  = data.finance.filter(x=>x.type==='Pemasukan').reduce((a,x)=>a+x.amount,0);
  const expense = data.finance.filter(x=>x.type==='Pengeluaran').reduce((a,x)=>a+x.amount,0);
  _setStat('stat-profit', money(income - expense));

  // Recent journals
  const jList = document.getElementById('dash-journals');
  if (jList) {
    jList.innerHTML = data.journals.slice(0, 4).map(j => `
      <div class="tl-item">
        <div class="tl-dot"></div>
        <div class="tl-body">
          <div class="tl-title">${j.type}</div>
          <div class="tl-date">${formatDate(j.date)}</div>
          <div class="tl-note">${j.note}</div>
        </div>
      </div>`).join('') || '<p class="text-sm text-muted" style="padding:1rem">Belum ada catatan jurnal.</p>';
  }

  // Finance mini
  const incEl = document.getElementById('dash-income');
  const expEl = document.getElementById('dash-expense');
  if (incEl) incEl.textContent = money(income);
  if (expEl) expEl.textContent = money(expense);
}

function _setStat(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
