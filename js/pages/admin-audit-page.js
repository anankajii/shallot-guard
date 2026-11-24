import { requireAdmin } from '../utils/access-control.js';
import { getData, saveData } from '../services/firestore-service.js';
import { toast } from '../utils/notifications.js';

if (requireAdmin()) {
  function render() {
    const { audit } = getData();
    const tbody = document.getElementById('audit-tbody');
    if (!tbody) return;
    tbody.innerHTML = audit.length
      ? audit.map(a => `<tr><td class="log-time">${a.time}</td><td class="text-sm">${a.actor}</td><td class="log-action">${a.action}</td></tr>`).join('')
      : '<tr><td colspan="3" class="text-muted text-sm" style="padding:2rem;text-align:center">Belum ada aktivitas tercatat.</td></tr>';
  }
  render();
  document.getElementById('clear-audit-btn')?.addEventListener('click', () => {
    if (!confirm('Bersihkan semua audit log?')) return;
    const s = getData();
    s.audit = [];
    saveData(s);
    render();
    toast('Audit log dibersihkan.', 'success');
  });
}
