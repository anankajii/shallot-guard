// js/admin/audit-logs.js
import { state } from '../core/state.js';

export function renderAuditLogs() {
  return `
    <div class="page-title-row">
      <div><h1>Audit Logs</h1>
      <p class="hint">Aktivitas penting pada prototype.</p></div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Waktu</th><th>Aktor</th><th>Aksi</th></tr></thead>
        <tbody>
          ${state.audit.length
            ? state.audit.map(a => `<tr><td>${a.time}</td><td>${a.actor}</td><td>${a.action}</td></tr>`).join('')
            : '<tr><td colspan="3" class="empty">Belum ada aktivitas tercatat.</td></tr>'}
        </tbody>
      </table>
    </div>`;
}
