// js/modules/farm.js
import { getData, addItem, deleteItem, updateItem } from '../services/firestore-service.js';
import { toast } from '../utils/notifications.js';
import { isPremium } from '../utils/access-control.js';
import { escHtml, money } from '../utils/helpers.js';
import { showModal, closeModal } from './modal-manager.js';

export function initFarms() {
  renderFarmList();
  document.getElementById('add-farm-btn')?.addEventListener('click', () => {
    if (!isPremium() && getData().farms.length >= 1) {
      showPremiumGate('Multi-Lahan'); return;
    }
    showFarmForm();
  });
}

export function renderFarmList() {
  const list = document.getElementById('farms-list');
  if (!list) return;
  const farms = getData().farms;
  if (!farms.length) { list.innerHTML = emptyState('Belum ada lahan', 'Tambah lahan pertama Anda untuk mulai memantau budidaya.'); return; }
  list.innerHTML = farms.map(f => `
    <div class="card hover-lift" style="display:grid;grid-template-columns:1fr auto;gap:1rem;align-items:start">
      <div>
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem">
          <span style="font-size:1.1rem"></span>
          <h3 style="margin:0;font-size:1rem;font-weight:700;color:var(--forest)">${escHtml(f.name)}</h3>
          <span class="badge">${f.area.toLocaleString('id-ID')} m²</span>
        </div>
        <p class="text-sm text-muted" style="margin:0 0 .25rem"> ${escHtml(f.location)}</p>
        <p class="text-sm text-muted" style="margin:0">Tanah: ${escHtml(f.soil)} · Drainase: ${escHtml(f.drainage)}</p>
        ${f.notes ? `<p class="text-sm" style="margin:.5rem 0 0;color:var(--text-secondary)">${escHtml(f.notes)}</p>` : ''}
      </div>
      <div style="display:flex;flex-direction:column;gap:.5rem;align-items:flex-end">
        <button class="btn btn-outline btn-sm" onclick="editFarm('${f.id}')">Edit</button>
        <button class="btn btn-sm" style="background:var(--onion)" onclick="deleteFarm('${f.id}','${escHtml(f.name)}')">Hapus</button>
      </div>
    </div>`).join('');
}

function showFarmForm(existing = null) {
  showModal(`
    <h2>${existing ? 'Edit' : 'Tambah'} Lahan</h2>
    <form id="farm-form">
      <div class="form-group"><label class="form-label">Nama Lahan *</label>
        <input class="form-input" name="name" required value="${existing?.name ?? ''}" placeholder="cth: Lahan Sukomoro Blok A"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Lokasi *</label>
          <input class="form-input" name="location" required value="${existing?.location ?? ''}" placeholder="cth: Sukomoro, Nganjuk"></div>
        <div class="form-group"><label class="form-label">Luas (m²) *</label>
          <input class="form-input" name="area" type="number" required min="1" value="${existing?.area ?? ''}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Jenis Tanah</label>
          <select class="form-select" name="soil">
            <option ${existing?.soil==='Lempung berpasir'?'selected':''}>Lempung berpasir</option>
            <option ${existing?.soil==='Lempung liat'?'selected':''}>Lempung liat</option>
            <option ${existing?.soil==='Pasir'?'selected':''}>Pasir</option>
            <option ${existing?.soil==='Liat'?'selected':''}>Liat</option>
          </select></div>
        <div class="form-group"><label class="form-label">Drainase</label>
          <select class="form-select" name="drainage">
            <option ${existing?.drainage==='Baik'?'selected':''}>Baik</option>
            <option ${existing?.drainage==='Sedang'?'selected':''}>Sedang</option>
            <option ${existing?.drainage==='Perlu perbaikan'?'selected':''}>Perlu perbaikan</option>
          </select></div>
      </div>
      <div class="form-group"><label class="form-label">Catatan</label>
        <textarea class="form-textarea" name="notes" placeholder="Kondisi lahan, catatan khusus...">${existing?.notes ?? ''}</textarea></div>
      <div class="modal-actions">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Batal</button>
        <button type="submit" class="btn">${existing ? 'Simpan Perubahan' : 'Tambah Lahan'}</button>
      </div>
    </form>`);
  document.getElementById('farm-form').onsubmit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    d.area = Number(d.area);
    if (existing) { updateItem('farms', existing.id, d); toast('Lahan berhasil diperbarui.', 'success'); }
    else          { addItem('farms', { ...d, lat: -7.552, lng: 111.898 }); toast('Lahan berhasil ditambahkan.', 'success'); }
    closeModal(); renderFarmList();
  };
}

window.editFarm = (id) => {
  const farm = getData().farms.find(f => f.id === id);
  if (farm) showFarmForm(farm);
};

window.deleteFarm = (id, name) => {
  if (!confirm(`Hapus lahan "${name}"? Data tidak dapat dikembalikan.`)) return;
  deleteItem('farms', id); toast('Lahan dihapus.'); renderFarmList();
};

function showPremiumGate(feature) {
  showModal(`<div class="premium-gate" style="margin:-2rem">
    <h2>Fitur ${feature}</h2>
    <p>Upgrade ke Premium untuk mengelola lebih dari 1 lahan sekaligus.</p>
    <a href="subscription.html" class="btn" style="background:#fff;color:var(--forest)">Lihat Paket Premium</a>
    </div>`);
}

function emptyState(title, desc) {
  return `<div class="empty-state"><div style="font-size:3rem"></div><h3>${title}</h3><p>${desc}</p></div>`;
}
