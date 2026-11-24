// js/admin/admin-users.js
import { DEMO_ACCOUNTS } from '../config/app-config.js';
import { updateUserPlan } from '../services/auth-service.js';
import { logAudit } from '../services/firestore-service.js';
import { toast } from '../utils/notifications.js';
import { debounce, escHtml } from '../utils/helpers.js';

export function initAdminUsers() {
  renderUsersTable();
  const search = document.getElementById('user-search');
  if (search) search.addEventListener('input', debounce(renderUsersTable, 250));
}

function renderUsersTable(query = '') {
  const tbody = document.getElementById('users-tbody');
  if (!tbody) return;
  const q = query || document.getElementById('user-search')?.value.toLowerCase() || '';
  const entries = Object.entries(DEMO_ACCOUNTS).filter(([email, d]) =>
    !q || email.includes(q) || d.name.toLowerCase().includes(q) || d.role.includes(q));
  tbody.innerHTML = entries.map(([email, d]) => `
    <tr>
      <td>${escHtml(d.name)}</td>
      <td class="text-sm">${escHtml(email)}</td>
      <td><span class="badge">${d.role}</span></td>
      <td><span class="badge badge-${d.plan}">${d.plan}</span></td>
      <td>
        ${d.role !== 'admin' ? `
          <select class="form-select" style="font-size:.8rem;padding:5px 8px;width:auto"
            onchange="toggleUserPlan('${email}', this.value)">
            <option value="free" ${d.plan==='free'?'selected':''}>Free</option>
            <option value="premium" ${d.plan==='premium'?'selected':''}>Premium</option>
          </select>` : '<span class="text-xs text-muted">Dilindungi</span>'}
      </td>
    </tr>`).join('') || `<tr><td colspan="5" class="text-muted text-sm" style="padding:1rem;text-align:center">Tidak ada pengguna ditemukan.</td></tr>`;
}

window.toggleUserPlan = (email, plan) => {
  DEMO_ACCOUNTS[email].plan = plan;
  updateUserPlan(email, plan);
  logAudit(`Admin mengubah paket ${email} → ${plan}`, 'admin@shallotguard.demo');
  toast(`Paket ${email} diubah ke ${plan} (simulasi).`, 'success');
  renderUsersTable();
};
