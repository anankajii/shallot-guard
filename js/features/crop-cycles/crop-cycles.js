// js/features/crop-cycles/crop-cycles.js
import { state } from '../../core/state.js';
import { ageDays } from '../../core/utils.js';

export function renderCycles() {
  return `
    <div class="page-title-row">
      <div><h1>Siklus Tanam</h1>
      <p class="hint">Umur tanaman dihitung dari tanggal tanam.</p></div>
      <button class="btn" data-add="cycle">+ Tambah Siklus</button>
    </div>
    <div class="list">
      ${state.cycles.map((c, i) => `
        <article class="item">
          <div>
            <h4>${c.name} · ${c.variety}</h4>
            <p>Ditanam ${c.date} · Umur ${ageDays(c.date)} hari · ${c.area} m²</p>
          </div>
          <span class="status">${c.status}</span>
          <button class="btn outline sm" data-delete="cycle:${i}">Hapus</button>
        </article>`).join('')}
    </div>`;
}
