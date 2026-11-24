// js/features/farms/farms.js
import { state } from '../../core/state.js';

export function renderFarms() {
  return `
    <div class="page-title-row">
      <div><h1>Lahan Saya</h1>
      <p class="hint">Data lahan berasal dari input pengguna — bukan pengukuran otomatis.</p></div>
      <button class="btn" data-add="farm">+ Tambah Lahan</button>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px">
      ${state.farms.map((f, i) => `
        <article class="card">
          <span class="status">${f.area} m²</span>
          <h3>${f.name}</h3>
          <p>${f.location}<br>Tanah: ${f.soil}<br>Drainase: ${f.drainage}</p>
          <button class="btn outline sm" style="margin-top:12px" data-delete="farm:${i}">Hapus</button>
        </article>`).join('')}
    </div>`;
}
