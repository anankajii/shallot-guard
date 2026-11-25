// js/features/risk-analysis/risk-analysis.js
import { isPremium } from '../../core/state.js';
import { analyzeRisk } from '../../services/risk-service.js';

export function renderRiskAnalysis(openPremiumGate) {
  console.log('[risk-analysis] isPremium:', isPremium());
  if (!isPremium()) {
    setTimeout(() => openPremiumGate('Analisis Foto Tanaman'), 0);
    return `<div class="page-title-row"><div><h1>Analisis Risiko</h1>
      <p class="hint">Akun bukan premium. Upgrade untuk akses fitur.</p></div></div>`;
  }
  
  return `
    <div class="page-title-row">
      <div><h1>Analisis Foto Tanaman</h1>
      <p class="hint">Unggah foto untuk deteksi dini penyakit dan rekomendasi penanganan.</p></div>
    </div>
    <div class="card">
      <div class="form-row">
        <label>Unggah Foto Tanaman</label>
        <input type="file" id="photo-upload" accept="image/*" style="padding:var(--sp-3);border:1px dashed var(--border);border-radius:var(--r-md);cursor:pointer">
      </div>
      <div id="photo-preview" style="margin-top:12px;display:none">
        <img id="preview-img" style="max-width:100%;max-height:300px;border-radius:var(--r-md);margin-bottom:12px">
      </div>
      <button class="btn" id="analyze-btn" disabled>Analisis Foto</button>
      <div id="analysis-result" class="hint" style="margin-top:18px">Unggah foto tanaman untuk mulai.</div>
    </div>`;
}

export function bindRiskAnalysis() {
  const fileInput = document.getElementById('photo-upload');
  const preview = document.getElementById('photo-preview');
  const previewImg = document.getElementById('preview-img');
  const analyzeBtn = document.getElementById('analyze-btn');
  const resultDiv = document.getElementById('analysis-result');
  
  fileInput?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = ev => {
      previewImg.src = ev.target?.result;
      preview.style.display = 'block';
      analyzeBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  });
  
  analyzeBtn?.addEventListener('click', () => {
    const filename = fileInput?.files?.[0]?.name?.toLowerCase() ?? '';
    const result = classifyPlantHealth(filename);
    const ts = new Date().toLocaleString('id-ID');
    resultDiv.innerHTML = `
      <div class="card" style="margin-top:0;border-left:4px solid var(--${result.status === 'sehat' ? 'leaf' : result.status === 'waspada' ? 'amber' : 'onion'})">
        <span class="status ${result.status}">Status: ${result.label}</span>
        <h3 style="margin-top:8px">${result.title}</h3>
        <p>${result.recommendation}<br><small style="color:var(--muted)">Dianalisis ${ts}</small></p>
      </div>`;
  });
}

function classifyPlantHealth(filename) {
  if (filename.includes('sehat') || filename.includes('healthy')) {
    return { status: 'sehat', label: 'Sehat', title: 'Tanaman Sehat', recommendation: 'Lanjutkan program pemeliharaan rutin. Tingkatkan nutrisi untuk hasil optimal.' };
  }
  if (filename.includes('penyakit') || filename.includes('disease') || filename.includes('busuk')) {
    return { status: 'kritis', label: 'Kritis', title: 'Penyakit Terdeteksi', recommendation: 'Isolasi tanaman yang sakit. Aplikasikan fungisida sesuai rekomendasi Dinas PHT setempat.' };
  }
  return { status: 'waspada', label: 'Waspada', title: 'Tanda Awal Gangguan', recommendation: 'Monitor intensitas tinggi. Tingkatkan drainase dan sirkulasi udara di area tanaman.' };
}
