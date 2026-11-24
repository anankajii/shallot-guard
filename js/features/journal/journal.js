// js/features/journal/journal.js
import { state } from '../../core/state.js';

export function renderJournal() {
  return `
    <div class="page-title-row">
      <div><h1>Jurnal Digital</h1>
      <p class="hint">Simpan aktivitas penting pada timeline budidaya.</p></div>
      <button class="btn" data-add="journal">+ Catatan Baru</button>
    </div>
    <div class="list">
      ${state.journals.map((j, i) => `
        <article class="item">
          <div><h4>${j.type}</h4><p>${j.date} · ${j.note}</p></div>
          <button class="btn outline sm" data-delete="journal:${i}">Hapus</button>
        </article>`).join('')}
    </div>`;
}
