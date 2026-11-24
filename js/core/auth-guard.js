// js/core/auth-guard.js
import { getUser } from './state.js';

export function requireAuth(redirectTo = '/login') {
  if (!getUser()) {
    location.hash = redirectTo;
    return false;
  }
  return true;
}

export function requireAdmin(redirectTo = '/app/dashboard') {
  if (!getUser()) { location.hash = '/login'; return false; }
  if (getUser().role !== 'admin') { location.hash = redirectTo; return false; }
  return true;
}

export function requireFarmer(redirectTo = '/admin/dashboard') {
  if (!getUser()) { location.hash = '/login'; return false; }
  if (getUser().role === 'admin') { location.hash = redirectTo; return false; }
  return true;
}
