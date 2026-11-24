// js/features/risk-analysis/risk-analysis.js
import { analyzeRisk } from '../../services/risk-service.js';

export function renderRiskAnalysis() {
  return `
    <div class="page-title-row">
      <div><h1>Analisis Risiko</h1>
      <p class="hint">Rule-based demo transparan; threshold bukan rekomendasi agronomi tervalidasi.</p></div>
    </div>
    <div class="card">
      <div class="form-row">
        <label>Observasi Lapangan</label>
        <select id="risk-observe">
          <option value="low">Tidak ada gejala penting</option>
          <option value="medium">Daun lembap / perubahan ringan</option>
          <option value="high">Gejala menyebar / genangan terlihat</option>
        </select>
      </div>
      <button class="btn" id="risk-run-btn">Analisis Risiko</button>
      <div id="risk-result" class="hint" style="margin-top:18px">Pilih observasi lalu analisis.</div>
    </div>`;
}

export function bindRiskAnalysis() {
  document.getElementById('risk-run-btn')?.addEventListener('click', () => {
    const obs = document.getElementById('risk-observe')?.value ?? 'low';
    const result = analyzeRisk(obs);
    const ts = new Date().toLocaleString('id-ID');
    document.getElementById('risk-result').innerHTML = `
      <div class="card" style="margin-top:0;border-left:4px solid var(--${obs === 'high' ? 'onion' : obs === 'medium' ? 'amber' : 'leaf'})">
        <span class="status ${result.cls}">Risiko ${result.label}</span>
        <h3 style="margin-top:8px">Faktor pemicu</h3>
        <p>${result.msg}<br><small style="color:var(--muted)">Dianalisis ${ts}</small></p>
      </div>`;
  });
}
