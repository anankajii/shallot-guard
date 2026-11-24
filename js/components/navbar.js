// js/components/navbar.js — app top bar
import { getUser } from '../core/state.js';
import { logout } from '../services/auth-service.js';

export function renderNavbar(isAdmin = false) {
  const user = getUser();
  return `
    <header class="app-top">
      <div>
        <b>${isAdmin ? 'Panel Admin' : 'SHALLOTGUARD'}</b>
        <span class="status" style="margin-left:8px">${isAdmin ? 'ADMIN' : 'DEMO ' + (user?.plan?.toUpperCase() ?? '')}</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span>${user?.name ?? ''}</span>
        <button class="btn sm" id="top-logout-btn">Keluar</button>
      </div>
    </header>`;
}

export function bindNavbar() {
  document.getElementById('top-logout-btn')?.addEventListener('click', logout);
}
