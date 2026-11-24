// js/admin-shell.js — shell init for admin pages
import { getUser } from './services/auth-service.js';

const user = getUser();
if (user) {
  document.getElementById('user-initial').textContent = user.name?.[0]?.toUpperCase() ?? 'A';
  document.getElementById('user-name').textContent = user.name ?? 'Admin';
}

document.getElementById('logout-btn')?.addEventListener('click', () => {
  import('./services/auth-service.js').then(m => m.logout());
});

const sidebar = document.getElementById('app-sidebar');
const overlay = document.getElementById('sidebar-overlay');
document.getElementById('hamburger-btn')?.addEventListener('click', () => {
  sidebar?.classList.toggle('open');
  overlay?.classList.toggle('show');
});
overlay?.addEventListener('click', () => {
  sidebar?.classList.remove('open');
  overlay?.classList.remove('show');
});
