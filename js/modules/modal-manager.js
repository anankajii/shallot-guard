// js/modules/modal-manager.js — shared modal helper
export function showModal(html) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true">${html}</div>`;
  overlay.addEventListener('click', e => { if(e.target===overlay) closeModal(); });
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  const el = document.getElementById('modal-overlay');
  if (el) { el.remove(); document.body.style.overflow = ''; }
}

window.closeModal = closeModal;
