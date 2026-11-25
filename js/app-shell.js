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
const toggleSidebar = () => {
  const open = sidebar?.classList.toggle('open');
  overlay?.classList.toggle('show', open);
  hamburger?.setAttribute('aria-expanded', String(Boolean(open)));
};
hamburger?.addEventListener('click', toggleSidebar);
overlay?.addEventListener('click', closeSidebar);
sidebar?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeSidebar));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

// Tambah tombol "Semua" di mobile bottom nav agar seluruh fitur di sidebar mudah dibuka
const mobileNavItems = document.querySelector('.mobile-nav-bar .nav-items');
if (mobileNavItems && sidebar && !mobileNavItems.querySelector('.mobile-menu-trigger')) {
  const menuBtn = document.createElement('button');
  menuBtn.type = 'button';
  menuBtn.className = 'mobile-menu-trigger';
  menuBtn.setAttribute('aria-label', 'Buka semua menu fitur');
  menuBtn.innerHTML = '<span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg></span><span>Menu</span>';
  menuBtn.addEventListener('click', toggleSidebar);
  mobileNavItems.appendChild(menuBtn);
}

initScrollReveal();
