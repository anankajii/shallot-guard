// js/utils/access-control.js
import { getUser } from '../services/auth-service.js';

function rootPrefix() {
  // pages/ and admin/ are one level deep from root
  const depth = location.pathname.replace(/\/+$/, '').split('/').filter(Boolean).length;
  return depth >= 2 ? '../' : '';
}

export function requireAuth() {
  if (!getUser()) { location.href = rootPrefix() + 'login.html'; return false; }
  return true;
}

export function requireAdmin() {
  const u = getUser();
  if (!u) { location.href = rootPrefix() + 'login.html'; return false; }
  if (u.role !== 'admin') { location.href = rootPrefix() + 'pages/dashboard.html'; return false; }
  return true;
}

export function requireFarmer() {
  const u = getUser();
  if (!u) { location.href = rootPrefix() + 'login.html'; return false; }
  if (u.role === 'admin') { location.href = rootPrefix() + 'admin/dashboard.html'; return false; }
  return true;
}

export function isPremium() {
  const u = getUser();
  return u?.plan === 'premium' || u?.plan === 'admin';
}

export function isFree() {
  return getUser()?.plan === 'free';
}
