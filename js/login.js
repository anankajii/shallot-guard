// js/login.js — login page controller
import { login } from './services/auth-service.js';

const form    = document.getElementById('login-form');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
  e.preventDefault();
  const email    = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (login(email, password)) {
    const { role } = JSON.parse(localStorage.getItem('sg-state') || '{}').user ?? {};
    location.href = role === 'admin' ? 'app.html#/admin/dashboard' : 'app.html#/app/dashboard';
  } else {
    message.textContent = 'Email atau password demo tidak cocok.';
  }
});
