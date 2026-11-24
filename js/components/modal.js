// js/components/modal.js
import { $, $$ } from '../core/utils.js';

export function openModal(htmlContent) {
  const existing = $('.modal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend',
    `<div class="modal"><div class="modal-box">${htmlContent}</div></div>`);
  bindModalClose();
}

export function closeModal() {
  $('.modal')?.remove();
}

function bindModalClose() {
  $$('[data-close]').forEach(btn => { btn.onclick = closeModal; });
  $('.modal')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
}
