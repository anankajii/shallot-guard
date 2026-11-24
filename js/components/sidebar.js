// js/components/sidebar.js
import { getUser } from '../core/state.js';
import { logout } from '../services/auth-service.js';

const FARMER_MODULES = [
  ['dashboard',         'Dashboard',           '▦'],
  ['farms',             'Lahan Saya',          '⌖'],
  ['crop-cycles',       'Siklus Tanam',        '◷'],
  ['journal',           'Jurnal Digital',      '▤'],
  ['weather',           'Cuaca Cerdas',        ''],
  ['risk-analysis',     'Analisis Risiko',     '△'],
  ['recommendations',   'Rekomendasi',         ''],
  ['finance',           'Keuangan',            'Rp'],
  ['mapping',           'Peta Lahan',          '⌖'],
  ['subscription',      'Paket',               ''],
  ['profile',           'Profil',              '◯'],
];

const ADMIN_MODULES = [
  ['dashboard',         'Dashboard'],
  ['users',             'Pengguna'],
  ['subscriptions',     'Langganan'],
  ['farms',             'Lahan'],
  ['crop-cycles',       'Siklus Tanam'],
  ['risk-monitoring',   'Monitoring Risiko'],
  ['content',           'Konten'],
  ['reports',           'Laporan'],
  ['settings',          'Pengaturan'],
  ['audit-logs',        'Audit Logs'],
];

export function renderSidebar(isAdmin = false) {
  const user = getUser();
  const prefix = isAdmin ? '/admin' : '/app';
  const modules = isAdmin ? ADMIN_MODULES : FARMER_MODULES;
  const currentId = location.hash.split('/').pop();

  return `
    <aside class="side">
      <a class="brand" href="index.html">SHALLOT<b>GUARD</b></a>
      <small>${isAdmin ? 'Administrasi' : 'Aplikasi Petani'}</small>
      ${modules.map(([id, name, icon = '•']) => `
        <a href="#${prefix}/${id}" data-id="${id}" class="${currentId === id ? 'active' : ''}">
          ${icon} ${name}
        </a>`).join('')}
      <small>Akun</small>
      <a href="#/app/profile">◯ ${user?.name ?? ''}</a>
      <a href="#" id="logout-btn">↪ Keluar</a>
    </aside>`;
}

export function bindSidebar() {
  document.getElementById('logout-btn')?.addEventListener('click', e => {
    e.preventDefault();
    logout();
  });
}
