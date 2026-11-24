import { requireAdmin } from '../utils/access-control.js';
import { DEMO_ACCOUNTS } from '../config/app-config.js';
import { toast } from '../utils/notifications.js';
import { logAudit } from '../services/firestore-service.js';
import { escHtml } from '../utils/helpers.js';

if (requireAdmin()) {
  const tbody = document.getElementById('subs-tbody');
  if (tbody) {
    tbody.innerHTML = ['free@shallotguard.demo', 'premium@shallotguard.demo'].map(email => {
      const d = DEMO_ACCOUNTS[email];
      return `<tr>
        <td>${escHtml(email)}</td>
        <td><span class="badge badge-${d.plan}">${d.plan}</span></td>
        <td><span class="badge badge-success">active</span></td>
        <td>1 Nov 2026</td>
        <td><button class="btn btn-outline btn-sm" onclick="toggleSub('${escHtml(email)}')">Ubah Status</button></td>
      </tr>`;
    }).join('');
  }
  window.toggleSub = email => {
    toast(`Simulasi: status ${email} diubah.`, 'success');
    logAudit(`Admin mengubah status ${email}`, 'admin@shallotguard.demo');
  };
}
