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
const hamburger = document.getElementById('hamburger-btn');
const closeSidebar = () => {
  sidebar?.classList.remove('open');
  overlay?.classList.remove('show');
  hamburger?.setAttribute('aria-expanded', 'false');
};
hamburger?.addEventListener('click', () => {
  const open = sidebar?.classList.toggle('open');
  overlay?.classList.toggle('show', open);
  hamburger.setAttribute('aria-expanded', String(open));
});
overlay?.addEventListener('click', closeSidebar);
sidebar?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeSidebar));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });
