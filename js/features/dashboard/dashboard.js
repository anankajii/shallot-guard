// js/features/dashboard/dashboard.js
import { state } from '../../core/state.js';
import { getUser } from '../../core/state.js';
import { money } from '../../core/utils.js';
import { navigate } from '../../core/router.js';

export function renderDashboard() {
  const user = getUser();
  const total = state.finance.reduce((a, x) => a + (x.type === 'Pemasukan' ? x.amount : -x.amount), 0);
  const activeCycles = state.cycles.filter(x => x.status === 'Aktif').length;
  return `
    <div class="page-title-row">
      <div><h1>Selamat datang, ${user?.name?.split(' ').slice(-1) ?? ''}</h1>
      <p class="hint">Ringkasan data demonstrasi untuk budidaya hari ini.</p></div>
    </div>
    <div class="stat-grid">
      <div class="stat"><span>Total Lahan</span><b>${state.farms.length}</b></div>
      <div class="stat"><span>Siklus Aktif</span><b>${activeCycles}</b></div>
      <div class="stat"><span>Risiko Hari Ini</span><b style="color:var(--amber)">Sedang</b></div>
      <div class="stat"><span>Saldo Proyeksi</span><b>${money(total)}</b></div>
    </div>
    <div class="layout" style="margin-top:18px">
      <section>
        <div class="card">
          <span class="pill" style="color:var(--leaf)">Tindakan prioritas</span>
          <h3>Periksa daun dan drainase setelah potensi hujan.</h3>
          <p>Analisis menggunakan observasi demo dan data cuaca; bukan diagnosis agronomi.</p>
          <button class="btn" style="margin-top:14px" data-nav="/app/recommendations">Lihat rekomendasi</button>
        </div>
      </section>
      <aside>
        <div class="card">
          <h3>Cuaca · BMKG</h3>
          <p><b>Memuat saat dibuka</b><br>Prakiraan aktual hanya ditampilkan bila API BMKG dapat diakses.</p>
          <button class="btn outline" style="margin-top:12px" data-nav="/app/weather">Buka Cuaca</button>
        </div>
        <div class="card" style="margin-top:14px">
          <h3>Aksi cepat</h3>
          <div class="list" style="margin-top:10px">
            <button class="btn outline" data-add="journal">+ Catat jurnal</button>
            <button class="btn outline" data-add="farm">+ Tambah lahan</button>
          </div>
        </div>
      </aside>
    </div>`;
}
