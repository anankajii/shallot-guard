// js/pages/register.js
import { state, save } from '../core/state.js';

document.getElementById('register-form').addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const msg  = document.getElementById('register-message');
  state.user = { name: data.name, email: data.email, role: 'farmer', plan: 'free' };
  save();
  msg.textContent = 'Akun demo dibuat. Mengalihkan…';
  setTimeout(() => { location.href = 'app.html#/app/dashboard'; }, 800);
});
