// js/features/recommendations/recommendations.js
import { toast } from '../../core/notifications.js';

export function renderRecommendations() {
  return `
    <div class="page-title-row">
      <div><h1>Rekomendasi</h1>
      <p class="hint">Rekomendasi umum demo tanpa dosis pestisida.</p></div>
    </div>
    <div class="list">
      <article class="card">
        <span class="status risk">Urgensi sedang</span>
        <h3>Inspeksi drainase dan daun</h3>
        <p><b>Alasan:</b> kelembapan dan observasi daun dapat meningkatkan risiko gangguan.<br>
        <b>Langkah:</b> 1) cek genangan, 2) dokumentasikan gejala, 3) konsultasikan bila menyebar.</p>
        <button class="btn" style="margin-top:12px" data-done="Rekomendasi ditandai selesai">Tandai selesai</button>
      </article>
      <article class="card" style="margin-top:0">
        <span class="status">Rutin</span>
        <h3>Perbarui jurnal budidaya</h3>
        <p>Catatan kegiatan membuat evaluasi siklus lebih mudah dilakukan.</p>
        <button class="btn" style="margin-top:12px" data-done="Rekomendasi sedang dilakukan">Mulai tindakan</button>
      </article>
    </div>`;
}

export function bindRecommendations() {
  document.querySelectorAll('[data-done]').forEach(btn => {
    btn.addEventListener('click', () => toast(btn.dataset.done));
  });
}
