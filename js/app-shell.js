// js/app-shell.js — shared shell init for farmer pages
import { getUser } from './services/auth-service.js';
import { initScrollReveal } from './utils/helpers.js';

const user = getUser();
if (user) {
  const name = user.name ?? '';
  const initial = name[0]?.toUpperCase() ?? '?';
  document.getElementById('user-initial').textContent = initial;
  document.getElementById('user-name').textContent = name;
  document.getElementById('user-plan').textContent = user.plan?.toUpperCase() ?? '';
  document.getElementById('topbar-user-name').textContent = name;
}

// Logout
document.getElementById('logout-btn')?.addEventListener('click', () => {
  import('./services/auth-service.js').then(m => m.logout());
});

// Hamburger
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

initScrollReveal();
