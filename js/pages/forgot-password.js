// js/pages/forgot-password.js
document.getElementById('forgot-form').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('forgot-message');
  msg.textContent = 'Simulasi: tautan reset akan dikirim oleh Firebase setelah konfigurasi aktif.';
});
