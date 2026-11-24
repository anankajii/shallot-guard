// js/utils/notifications.js
export function toast(msg, type = 'default', duration = 3000) {
  const root = document.getElementById('toast-root');
  if (!root) return;
  const el = document.createElement('div');
  el.className = `toast${type !== 'default' ? ' ' + type : ''}`;
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; el.style.transition = '0.2s'; setTimeout(() => el.remove(), 200); }, duration);
}

export function confirm(msg) {
  return window.confirm(msg);
}
