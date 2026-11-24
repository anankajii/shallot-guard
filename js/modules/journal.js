// js/modules/journal.js
import { getData, addItem, deleteItem } from '../services/firestore-service.js';
import { toast } from '../utils/notifications.js';
import { formatDate, escHtml } from '../utils/helpers.js';
import { showModal, closeModal } from './modal-manager.js';

const TYPES = ['Penyiraman','Pemupukan','Pengendalian OPT','Pemeliharaan','Panen','Pengamatan','Lainnya'];
const ICONS = { Penyiraman:'', Pemupukan:'', 'Pengendalian OPT':'', Pemeliharaan:'', Panen:'', Pengamatan:'', Lainnya:'' };

export function initJournal() {
  renderJournal();
  document.getElementById('add-journal-btn')?.addEventListener('click', showJournalForm);

  // Filter
  const filter = document.getElementById('journal-filter');
  if (filter) filter.addEventListener('change', renderJournal);
}

export function renderJournal() {
  const list = document.getElementById('journal-list');
  if (!list) return;
  const filter = document.getElementById('journal-filter')?.value ?? '';
  let entries = getData().journals;
  if (filter) entries = entries.filter(j => j.type === filter);
  if (!entries.length) { list.innerHTML = `<div class="empty-state"><div style="font-size:3rem"></div><h3>Belum ada catatan</h3><p>Catat aktivitas budidaya harian Anda.</p></div>`; return; }
  list.innerHTML = `<div class="timeline">${entries.map(j=>`
    <div class="tl-item">
      <div class="tl-dot">${ICONS[j.type]??''}</div>
      <div class="tl-body">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:.5rem;flex-wrap:wrap">
          <div class="tl-title">${escHtml(j.type)}</div>
          <button class="btn btn-sm" style="background:var(--onion);padding:4px 10px;font-size:.75rem" onclick="deleteJournal('${j.id}')">Hapus</button>
        </div>
        <div class="tl-date">${formatDate(j.date)}</div>
        <div class="tl-note">${escHtml(j.note)}</div>
        ${j.photo ? `<img src="${j.photo}" style="max-width:200px;border-radius:8px;margin-top:.5rem" alt="Foto aktivitas">` : ''}
      </div>
    </div>`).join('')}</div>`;
}

function showJournalForm() {
  const { cycles } = getData();
  showModal(`
    <h2>Catat Aktivitas</h2>
    <form id="journal-form">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Tanggal *</label>
          <input class="form-input" name="date" type="date" required value="${new Date().toISOString().slice(0,10)}"></div>
        <div class="form-group"><label class="form-label">Jenis Aktivitas *</label>
          <select class="form-select" name="type">${TYPES.map(t=>`<option>${t}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label class="form-label">Siklus Tanam</label>
        <select class="form-select" name="cycleId">
          <option value="">— Pilih siklus —</option>
          ${cycles.map(c=>`<option value="${c.id}">${escHtml(c.name)}</option>`).join('')}
        </select></div>
      <div class="form-group"><label class="form-label">Catatan *</label>
        <textarea class="form-textarea" name="note" required placeholder="Deskripsikan aktivitas yang dilakukan..."></textarea></div>
      <div class="modal-actions">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Batal</button>
        <button type="submit" class="btn">Simpan Catatan</button>
      </div>
    </form>`);
  document.getElementById('journal-form').onsubmit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    addItem('journals', { ...d, photo: null });
    toast('Catatan berhasil disimpan.', 'success');
    closeModal(); renderJournal();
  };
}

window.deleteJournal = id => { if(!confirm('Hapus catatan ini?'))return; deleteItem('journals',id); toast('Catatan dihapus.'); renderJournal(); };
