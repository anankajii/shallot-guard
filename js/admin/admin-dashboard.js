// js/admin/admin-dashboard.js
import { getData } from '../services/firestore-service.js';
import { DEMO_ACCOUNTS } from '../config/app-config.js';

export function initAdminDashboard() {
  const { farms, cycles, alerts, audit } = getData();
  const accounts = Object.values(DEMO_ACCOUNTS);
  _set('admin-total-users',   accounts.length);
  _set('admin-free-users',    accounts.filter(a=>a.plan==='free').length);
  _set('admin-premium-users', accounts.filter(a=>a.plan==='premium').length);
  _set('admin-total-farms',   farms.length);
  _set('admin-total-cycles',  cycles.length);
  _set('admin-risk-reports',  alerts.length);

  const actList = document.getElementById('admin-activity');
  if (actList) {
    actList.innerHTML = audit.slice(0,8).map(a=>`
      <div class="list-item">
        <div class="list-item-icon"></div>
        <div style="flex:1"><div class="text-sm font-semibold">${a.action}</div>
          <div class="text-xs text-muted">${a.actor} · ${a.time}</div></div>
      </div>`).join('') || '<p class="text-sm text-muted" style="padding:1rem">Belum ada aktivitas.</p>';
  }
}

function _set(id, v) { const el=document.getElementById(id); if(el) el.textContent=v; }
