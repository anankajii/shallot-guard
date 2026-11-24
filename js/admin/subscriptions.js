// js/admin/subscriptions.js
import { DEMO_ACCOUNTS } from '../config/app-config.js';

export function renderAdminSubscriptions() {
  return `
    <div class="page-title-row">
      <div><h1>Subscription Management</h1>
      <p class="hint">Tidak ada pembayaran nyata; status adalah simulasi admin.</p></div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Pengguna</th><th>Paket</th><th>Status</th><th>Mulai</th><th>Aksi</th></tr></thead>
        <tbody>
          ${['free@shallotguard.demo', 'premium@shallotguard.demo'].map(email => {
            const d = DEMO_ACCOUNTS[email];
            return `<tr>
              <td>${email}</td><td>${d.plan}</td>
              <td><span class="status">active</span></td>
              <td>1 Nov 2026</td>
              <td><button class="btn outline sm" data-toggle-plan="${email}">Ubah status</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}
