// js/modules/risk-engine.js
import { getData } from '../services/firestore-service.js';
import { ageDays } from '../utils/helpers.js';

const RULES = [
  { id:'r1', name:'Kelembapan Kritis Pagi', check: i => i.humidity >= 90, weight: 35, advice:'Bilas daun dengan air tawar bersih sebelum 07.00. Tunda semprot kimia.' },
  { id:'r2', name:'Fase Pembentukan Umbi', check: i => { const a=i.plantAge; return a>=31&&a<=50; }, weight: 20, advice:'Prioritaskan pupuk kalium (KNO3). Hindari nitrogen berlebih.' },
  { id:'r3', name:'Curah Hujan Tinggi',    check: i => i.rainfall >= 20, weight: 30, advice:'Periksa drainase. Hindari semprot saat daun basah.' },
  { id:'r4', name:'Suhu Malam Rendah',     check: i => i.tempMin < 20, weight: 15, advice:'Risiko embun pagi meningkat. Pantau kelembapan dini hari.' },
  { id:'r5', name:'Observasi Gejala',      check: i => i.observation !== 'none', weight: 40, advice:'Dokumentasikan gejala. Isolasi tanaman bergejala jika memungkinkan.' },
];

export function runRiskAnalysis(inputs) {
  const triggered = RULES.filter(r => r.check(inputs));
  const score = triggered.reduce((s, r) => s + r.weight, 0);
  const level = score === 0 ? 'low' : score < 45 ? 'medium' : 'high';
  const labels = { low: 'Rendah', medium: 'Sedang', high: 'Tinggi' };
  return {
    level, score,
    label: labels[level],
    factors: triggered,
    advice: triggered.map(r => r.advice),
    timestamp: new Date().toLocaleString('id-ID'),
  };
}

export function initRiskAnalysis() {
  const btn = document.getElementById('run-risk-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const humidity    = Number(document.getElementById('risk-humidity')?.value ?? 70);
    const rainfall    = Number(document.getElementById('risk-rainfall')?.value ?? 0);
    const tempMin     = Number(document.getElementById('risk-tempmin')?.value ?? 24);
    const observation = document.getElementById('risk-observation')?.value ?? 'none';
    const { cycles } = getData();
    const plantAge = cycles.find(c=>c.status==='Aktif') ? ageDays(cycles.find(c=>c.status==='Aktif').plantDate) : 0;

    const result = runRiskAnalysis({ humidity, rainfall, tempMin, observation, plantAge });
    renderRiskResult(result);
  });
}

function renderRiskResult(r) {
  const out = document.getElementById('risk-output');
  if (!out) return;
  const colors = { low:'var(--leaf)', medium:'var(--amber)', high:'var(--onion)' };
  out.innerHTML = `
    <div class="card" style="border-left:4px solid ${colors[r.level]};margin-top:1.5rem">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <div>
          <span class="badge ${r.level==='low'?'badge-success':r.level==='medium'?'badge-warning':'badge-danger'}">${r.label} — Skor ${r.score}</span>
          <p class="text-xs text-muted" style="margin:.25rem 0 0">Dianalisis ${r.timestamp} · <em>SIMULASI rule-based</em></p>
        </div>
      </div>
      ${r.factors.length ? `
        <h4 style="font-size:.875rem;font-weight:700;color:var(--forest);margin:0 0 .75rem">Faktor Pemicu</h4>
        <ul style="margin:0 0 1rem;padding-left:1.25rem;display:flex;flex-direction:column;gap:.35rem">
          ${r.factors.map(f=>`<li class="text-sm"><strong>${f.name}</strong></li>`).join('')}
        </ul>
        <h4 style="font-size:.875rem;font-weight:700;color:var(--forest);margin:0 0 .75rem">Rekomendasi Tindakan</h4>
        <div style="display:flex;flex-direction:column;gap:.5rem">
          ${r.advice.map(a=>`<div style="display:flex;align-items:flex-start;gap:.5rem;font-size:.875rem"><span style="color:var(--leaf);font-weight:700;flex-shrink:0">→</span>${a}</div>`).join('')}
        </div>` :
        `<p class="text-sm" style="color:var(--leaf);font-weight:600"> Tidak ada faktor risiko kritis terdeteksi. Lanjutkan pemantauan rutin.</p>`}
    </div>`;
  out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
