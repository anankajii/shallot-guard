// js/pages/photo-analysis-page.js
import { requireFarmer, isPremium } from '../utils/access-control.js';
import { getData, addItem, deleteItem } from '../services/firestore-service.js';
import { createDemoSampleDataUrl, extractColorMetrics, analyzePlantPhoto } from '../services/photo-analysis-service.js';
import { toast } from '../utils/notifications.js';
import { escHtml } from '../utils/helpers.js';

if (requireFarmer()) {
  const gateEl = document.getElementById('premium-gate');
  const workspaceEl = document.getElementById('photo-analysis-workspace');

  if (!isPremium()) {
    gateEl.style.display = 'block';
    workspaceEl.style.display = 'none';
  } else {
    gateEl.style.display = 'none';
    workspaceEl.style.display = 'grid';
    initPhotoWorkspace();
  }
}

function initPhotoWorkspace() {
  const fileInput = document.getElementById('photo-file-input');
  const cameraFileInput = document.getElementById('camera-file-input');
  const uploadBtn = document.getElementById('upload-photo-btn');
  const openCameraBtn = document.getElementById('open-camera-btn');
  const cameraPanel = document.getElementById('camera-panel');
  const cameraVideo = document.getElementById('camera-video');
  const captureBtn = document.getElementById('capture-photo-btn');
  const closeCameraBtn = document.getElementById('close-camera-btn');
  const dropZone = document.getElementById('photo-dropzone');
  const previewWrap = document.getElementById('photo-preview-wrap');
  const previewImg = document.getElementById('photo-preview-img');
  const partSelect = document.getElementById('photo-part');
  const cycleSelect = document.getElementById('photo-cycle');
  const noteInput = document.getElementById('photo-note');
  const runBtn = document.getElementById('run-photo-btn');
  const resultEl = document.getElementById('photo-result');
  const historyEl = document.getElementById('photo-history');

  let currentImageSrc = '';
  let lastResult = null;
  let activeStream = null;

  // Populate crop cycles dropdown
  const data = getData();
  if (cycleSelect) {
    const opts = (data.cycles || []).map(c => `<option value="${escHtml(c.id)}">${escHtml(c.name)} (${escHtml(c.variety)})</option>`);
    cycleSelect.innerHTML = `<option value="">Umum / Tanpa siklus</option>` + opts.join('');
  }

  function stopCamera() {
    if (activeStream) {
      activeStream.getTracks().forEach(t => t.stop());
      activeStream = null;
    }
    if (cameraVideo) cameraVideo.srcObject = null;
    if (cameraPanel) cameraPanel.style.display = 'none';
  }

  function setPreviewImage(src) {
    currentImageSrc = src;
    previewImg.src = src;
    previewWrap.style.display = 'block';
    runBtn.disabled = false;
  }

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      toast('Pilih file gambar yang valid (JPG, PNG, WebP).', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);
  }

  uploadBtn?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', e => handleFile(e.target.files?.[0]));
  cameraFileInput?.addEventListener('change', e => handleFile(e.target.files?.[0]));

  openCameraBtn?.addEventListener('click', async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      cameraFileInput?.click();
      return;
    }
    try {
      stopCamera();
      activeStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      cameraVideo.srcObject = activeStream;
      cameraPanel.style.display = 'block';
    } catch {
      toast('Kamera browser tidak tersedia/diizinkan. Membuka pemilih kamera perangkatâ€¦', 'info');
      cameraFileInput?.click();
    }
  });

  closeCameraBtn?.addEventListener('click', stopCamera);

  captureBtn?.addEventListener('click', () => {
    if (!cameraVideo || !cameraVideo.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = cameraVideo.videoWidth;
    canvas.height = cameraVideo.videoHeight;
    canvas.getContext('2d').drawImage(cameraVideo, 0, 0);
    setPreviewImage(canvas.toDataURL('image/jpeg', 0.9));
    stopCamera();
    toast('Foto berhasil diambil dari kamera.', 'success');
  });

  dropZone?.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--leaf)';
    dropZone.style.background = 'var(--sage)';
  });
  dropZone?.addEventListener('dragleave', () => {
    dropZone.style.borderColor = 'var(--border)';
    dropZone.style.background = 'var(--surface-low)';
  });
  dropZone?.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--border)';
    dropZone.style.background = 'var(--surface-low)';
    handleFile(e.dataTransfer.files?.[0]);
  });

  function runAnalysis() {
    if (!currentImageSrc || !previewImg.complete) {
      toast('Unggah foto tanaman atau pilih contoh demo terlebih dahulu.', 'error');
      return;
    }
    const metrics = extractColorMetrics(previewImg);
    const result = analyzePlantPhoto(metrics, {
      part: partSelect.value,
      note: noteInput.value,
    });
    lastResult = result;

    // Save to history (keep thumbnail lightweight)
    addItem('photoAnalyses', {
      date: new Date().toISOString().slice(0, 10),
      cycleId: cycleSelect.value,
      part: result.part,
      indication: result.indication,
      severity: result.severity,
      score: result.score,
      metrics: result.metrics,
      explanation: result.explanation,
      recommendations: result.recommendations,
      thumbnail: currentImageSrc.length <= 150000 ? currentImageSrc : '',
    });

    renderResult(result);
    renderHistory();
    toast('Analisis foto simulasi selesai.', 'success');
  }

  // Quick demo sample buttons: load sample & auto-run analysis
  document.querySelectorAll('[data-demo-sample]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-demo-sample');
      const dataUrl = createDemoSampleDataUrl(key);
      previewImg.onload = () => {
        previewImg.onload = null;
        runAnalysis();
      };
      setPreviewImage(dataUrl);
    });
  });

  runBtn?.addEventListener('click', runAnalysis);

  function severityBadgeClass(item) {
    if (item.statusClass) return item.statusClass;
    if (item.severity === 'Tinggi') return 'badge-onion';
    if (item.severity === 'Sedang') return 'badge-amber';
    return 'badge-sage';
  }

  function renderResult(r) {
    const recs = r.recommendations || [];
    const metrics = r.metrics || { healthyPct: 0, yellowPct: 0, necroticPct: 0 };
    resultEl.innerHTML = `
      <div class="card" style="border-color:var(--forest);margin-bottom:1rem">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.75rem;flex-wrap:wrap;margin-bottom:.75rem">
          <div>
            <span class="badge ${severityBadgeClass(r)}">${escHtml(r.severity)}</span>
            <h3 style="font-size:1.05rem;font-weight:700;color:var(--forest);margin:.5rem 0 .25rem">${escHtml(r.indication)}</h3>
            <span class="text-xs text-muted">Kecocokan Visual Simulasi: <strong>${r.score}%</strong> Â· Bagian: ${escHtml(r.part || 'daun')}</span>
          </div>
          <span class="badge badge-sage">SIMULASI</span>
        </div>

        <p class="text-sm" style="color:var(--ink);margin:0 0 1rem;line-height:1.55">${escHtml(r.explanation || 'Indikasi berdasarkan distribusi warna visual kanvas.')}</p>

        <div style="background:var(--surface-low);padding:.875rem;border-radius:var(--r-md);margin-bottom:1rem">
          <div class="text-xs font-semibold" style="color:var(--forest);margin-bottom:.5rem">Distribusi Spektrum Warna Kanvas</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;font-size:.78rem">
            <div><span class="text-muted">Hijau Sehat:</span> <strong>${metrics.healthyPct}%</strong></div>
            <div><span class="text-muted">Kuning/Klorosis:</span> <strong>${metrics.yellowPct}%</strong></div>
            <div><span class="text-muted">Cokelat/Ungu:</span> <strong>${metrics.necroticPct}%</strong></div>
          </div>
        </div>

        ${recs.length ? `
        <div style="margin-bottom:1rem">
          <div class="text-xs font-semibold" style="color:var(--forest);margin-bottom:.4rem">Rekomendasi Tindakan:</div>
          <ul style="margin:0;padding-left:1.15rem;display:flex;flex-direction:column;gap:.35rem;font-size:.825rem;color:var(--ink)">
            ${recs.map(item => `<li>${escHtml(item)}</li>`).join('')}
          </ul>
        </div>` : ''}

        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
          <button class="btn btn-outline btn-sm" id="save-to-journal-btn" type="button">Catat ke Jurnal Tanam</button>
        </div>
      </div>
    `;

    document.getElementById('save-to-journal-btn')?.addEventListener('click', () => {
      if (!lastResult) return;
      const d = getData();
      const targetCycle = cycleSelect.value || d.cycles?.[0]?.id || 'c1';
      addItem('journals', {
        cycleId: targetCycle,
        date: new Date().toISOString().slice(0, 10),
        type: 'Observasi Foto',
        note: `[Simulasi Foto - ${lastResult.severity}] ${lastResult.indication} (${lastResult.score}%). ${noteInput.value ? 'Catatan: ' + noteInput.value : ''}`.trim(),
        photo: null,
      });
      toast('Hasil analisis dicatat ke Jurnal.', 'success');
    });
  }

  function renderHistory() {
    const items = getData().photoAnalyses || [];
    if (!items.length) {
      historyEl.innerHTML = '<p class="text-sm text-muted" style="margin:0">Belum ada riwayat analisis foto.</p>';
      return;
    }
    historyEl.innerHTML = items.slice(0, 8).map(item => `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding:.65rem 0;border-bottom:1px solid var(--border)">
        <button type="button" data-view-photo="${escHtml(item.id)}" style="display:flex;align-items:center;gap:.75rem;min-width:0;background:none;border:none;padding:0;text-align:left;cursor:pointer;flex:1">
          ${item.thumbnail
            ? `<img src="${item.thumbnail}" alt="Thumbnail analisis" style="width:44px;height:44px;object-fit:cover;border-radius:var(--r-sm);border:1px solid var(--border);flex-shrink:0">`
            : `<div style="width:44px;height:44px;border-radius:var(--r-sm);background:var(--sage);display:flex;align-items:center;justify-content:center;color:var(--forest);font-size:.7rem;font-weight:700;flex-shrink:0">IMG</div>`
          }
          <div style="min-width:0">
            <div class="text-sm font-semibold" style="color:var(--forest);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(item.indication)}</div>
            <div class="text-xs text-muted">${escHtml(item.date)} Â· ${escHtml(item.severity)} (${item.score}%)</div>
          </div>
        </button>
        <button class="btn btn-ghost btn-sm" data-delete-photo="${escHtml(item.id)}" type="button" aria-label="Hapus riwayat">Hapus</button>
      </div>
    `).join('');

    historyEl.querySelectorAll('[data-view-photo]').forEach(btn => {
      btn.addEventListener('click', () => {
        const found = (getData().photoAnalyses || []).find(x => x.id === btn.getAttribute('data-view-photo'));
        if (found) {
          lastResult = found;
          renderResult(found);
        }
      });
    });

    historyEl.querySelectorAll('[data-delete-photo]').forEach(btn => {
      btn.addEventListener('click', () => {
        deleteItem('photoAnalyses', btn.getAttribute('data-delete-photo'));
        renderHistory();
        toast('Riwayat analisis dihapus.', 'info');
      });
    });
  }

  renderHistory();
  const initialItems = getData().photoAnalyses || [];
  if (initialItems.length) {
    lastResult = initialItems[0];
    renderResult(initialItems[0]);
  }
}
