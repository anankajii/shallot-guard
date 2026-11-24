// js/modules/crop-cycle.js
import { getData, addItem, deleteItem, updateItem } from '../services/firestore-service.js';
import { toast } from '../utils/notifications.js';
import { ageDays, formatDate, escHtml } from '../utils/helpers.js';
import { showModal, closeModal } from './modal-manager.js';

export function initCropCycles() {
  renderCycles();
  document.getElementById('add-cycle-btn')?.addEventListener('click', showCycleForm);
}

export function renderCycles() {
  const list = document.getElementById('cycles-list');
  if (!list) return;
  const { cycles, farms } = getData();
  if (!cycles.length) { list.innerHTML = emptyState('Belum ada siklus tanam'); return; }
  list.innerHTML = cycles.map(c => {
    const farm = farms.find(f => f.id === c.farmId);
    const age  = ageDays(c.plantDate);
    const phase = age < 15 ? 'Vegetatif Awal' : age < 30 ? 'Anakan' : age < 50 ? 'Pembentukan Umbi' : age < 65 ? 'Pematangan' : 'Siap Panen';
    return `
      <div class="card hover-lift">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;flex-wrap:wrap">
          <div style="flex:1;min-width:200px">
            <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;flex-wrap:wrap">
              <h3 style="margin:0;font-size:1rem;font-weight:700;color:var(--forest)">${escHtml(c.name)}</h3>
              <span class="badge ${c.status==='Aktif'?'badge-success':'badge-free'}">${c.status}</span>
            </div>
            <p class="text-sm text-muted" style="margin:0 0 .25rem"> ${escHtml(c.variety)} · ${c.area.toLocaleString('id-ID')} m²</p>
            <p class="text-sm text-muted" style="margin:0 0 .5rem"> Tanam: ${formatDate(c.plantDate)} · ${farm ? escHtml(farm.name) : 'Tanpa lahan'}</p>
            <div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
              <span class="badge badge-premium">${age} HST</span>
              <span class="text-sm text-leaf" style="font-weight:600">${phase}</span>
            </div>
          </div>
          <div style="display:flex;gap:.5rem">
            <button class="btn btn-outline btn-sm" onclick="editCycle('${c.id}')">Edit</button>
            <button class="btn btn-sm" style="background:var(--onion)" onclick="deleteCycle('${c.id}')">Hapus</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function showCycleForm(existing = null) {
  const { farms } = getData();
  showModal(`
    <h2>${existing ? 'Edit' : 'Tambah'} Siklus Tanam</h2>
    <form id="cycle-form">
      <div class="form-group"><label class="form-label">Nama Siklus *</label>
        <input class="form-input" name="name" required value="${existing?.name ?? 'Musim Tanam'}" placeholder="cth: Musim Tanam I 2026"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Lahan</label>
          <select class="form-select" name="farmId">
            <option value="">— Pilih lahan —</option>
            ${farms.map(f=>`<option value="${f.id}" ${existing?.farmId===f.id?'selected':''}>${escHtml(f.name)}</option>`).join('')}
          </select></div>
        <div class="form-group"><label class="form-label">Varietas *</label>
          <select class="form-select" name="variety">
            <option ${existing?.variety==='Tajuk Nganjuk'?'selected':''}>Tajuk Nganjuk</option>
            <option ${existing?.variety==='Bauji'?'selected':''}>Bauji</option>
            <option ${existing?.variety==='Bima Brebes'?'selected':''}>Bima Brebes</option>
            <option ${existing?.variety==='Batu Ijo'?'selected':''}>Batu Ijo</option>
          </select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Tanggal Tanam *</label>
          <input class="form-input" name="plantDate" type="date" required value="${existing?.plantDate ?? ''}"></div>
        <div class="form-group"><label class="form-label">Luas Tanam (m²) *</label>
          <input class="form-input" name="area" type="number" required min="1" value="${existing?.area ?? ''}"></div>
      </div>
      <div class="form-group"><label class="form-label">Jumlah Benih (kg)</label>
        <input class="form-input" name="seeds" type="number" min="0" step="0.1" value="${existing?.seeds ?? ''}"></div>
      <div class="form-group"><label class="form-label">Status</label>
        <select class="form-select" name="status">
          <option ${existing?.status==='Aktif'?'selected':''}>Aktif</option>
          <option ${existing?.status==='Selesai'?'selected':''}>Selesai</option>
          <option ${existing?.status==='Gagal'?'selected':''}>Gagal</option>
        </select></div>
      <div class="modal-actions">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Batal</button>
        <button type="submit" class="btn">${existing ? 'Simpan' : 'Tambah Siklus'}</button>
      </div>
    </form>`);
  document.getElementById('cycle-form').onsubmit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    d.area = Number(d.area); d.seeds = Number(d.seeds) || 0;
    if (existing) { updateItem('cycles', existing.id, d); toast('Siklus diperbarui.', 'success'); }
    else          { addItem('cycles', d); toast('Siklus ditambahkan.', 'success'); }
    closeModal(); renderCycles();
  };
}

window.editCycle   = id => { const c = getData().cycles.find(x=>x.id===id); if(c) showCycleForm(c); };
window.deleteCycle = id => { if(!confirm('Hapus siklus tanam ini?')) return; deleteItem('cycles',id); toast('Siklus dihapus.'); renderCycles(); };
function emptyState(t) { return `<div class="empty-state"><div style="font-size:3rem"></div><h3>${t}</h3><p>Tambah siklus tanam untuk mulai mencatat budidaya.</p></div>`; }
