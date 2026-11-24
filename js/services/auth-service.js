// js/services/auth-service.js
import { DEMO_ACCOUNTS } from '../config/app-config.js';

const STATE_KEY = 'sg-state';

function loadState() {
  try { return JSON.parse(localStorage.getItem(STATE_KEY) || '{}'); } catch { return {}; }
}

function saveState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

export function getUser() {
  return loadState().user ?? null;
}

export function login(email, password) {
  const acc = DEMO_ACCOUNTS[email?.trim().toLowerCase()];
  if (!acc || acc.password !== password) return false;
  const state = loadState();
  state.user = { email: email.trim().toLowerCase(), name: acc.name, role: acc.role, plan: acc.plan };
  saveState(state);
  return true;
}

export function logout() {
  const state = loadState();
  state.user = null;
  saveState(state);
  // Work from any depth: pages/, admin/, or root
  const depth = location.pathname.split('/').filter(Boolean).length;
  const prefix = depth >= 2 ? '../' : '';
  location.href = prefix + 'login.html';
}

export function updateUserPlan(email, newPlan) {
  // Admin-only demo: update in DEMO_ACCOUNTS mirror + current session
  const state = loadState();
  if (state.user?.email === email) state.user.plan = newPlan;
  saveState(state);
}
