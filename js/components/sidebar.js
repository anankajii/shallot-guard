// js/components/sidebar.js
import { getUser } from '../core/state.js';
import { logout } from '../services/auth-service.js';
import { ICONS } from '../assets/icons.js';

const FARMER_MODULES = [
  ['dashboard',         'Dashboard',          'dashboard'],
  ['farms',             'Lahan Saya',          'home'],
  ['mapping',           'Peta Lahan',          'map'],
  ['crop-cycles',       'Siklus Tanam',        'home'],
  ['weather',           'Prakiraan Cuaca',     'home'],
  ['risk-analysis',     'Analisis Risiko',     'alert'],
  ['recommendations',   'Rekomendasi',         'home'],
  ['finance',           'Keuangan',            'home'],
  ['journal',           'Catatan',             'home'],
  ['subscription',      'Paket',               'home'],
  ['profile',           'Profil',              'users'],
];

const ADMIN_MODULES = [
  ['dashboard',       'Dashboard'],
  ['users',           'Pengguna'],
  ['subscriptions',   'Langganan'],
  ['content',         'Konten'],
  ['reports',         'Laporan'],
  ['settings',        'Pengaturan'],
  ['audit-logs',      'Audit Logs'],
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
      ${modules.map(([id, name, iconKey = 'home']) => {
        const svg = ICONS[iconKey] || '<span>•</span>';
        return `
        <a href="#${prefix}/${id}" data-id="${id}" class="${currentId === id ? 'active' : ''}">
          <span class="icon-svg">${svg}</span> ${name}
        </a>`;
      }).join('')}
      <small>Akun</small>
      <a href="#/app/profile"><span class="icon-svg">${ICONS.users}</span> ${user?.name ?? ''}</a>
      <a href="#" id="logout-btn"><span class="icon-svg">${ICONS.logOut}</span> Keluar</a>
    </aside>`;
}

export function bindSidebar() {
  document.getElementById('logout-btn')?.addEventListener('click', e => {
    e.preventDefault();
    logout();
  });
}
