// js/admin/users.js
import { DEMO_ACCOUNTS } from '../config/app-config.js';

export function renderUsers() {
  return `
    <div class="page-title-row">
      <div><h1>Manajemen Pengguna</h1>
      <p class="hint">Kelola status paket demo. Perubahan dicatat pada audit log.</p></div>
    </div>
    <div class="toolbar"><input id="user-search" placeholder="Cari pengguna..."></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Paket</th><th>Aksi</th></tr></thead>
        <tbody>
          ${Object.entries(DEMO_ACCOUNTS).map(([email, d]) => `
            <tr>
              <td>${d.name}</td><td>${email}</td><td>${d.role}</td>
              <td><span class="status">${d.plan}</span></td>
              <td>${d.role === 'farmer'
                ? `<button class="btn outline sm" data-toggle-plan="${email}">Ubah Paket</button>`
                : '<span class="hint">Dilindungi</span>'}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}
