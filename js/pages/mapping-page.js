// js/pages/mapping-page.js
import { requireFarmer, isPremium } from '../utils/access-control.js';
import { getData, updateItem, addItem } from '../services/firestore-service.js';
import { initLeafletMap, addMarker, calcPolygonAreaM2, generatePolygonHeatmapZones } from '../services/map-service.js';
import { toast } from '../utils/notifications.js';
import { escHtml } from '../utils/helpers.js';

if (requireFarmer()) {
  const noticeEl = document.getElementById('free-plan-notice');
  const workspaceEl = document.getElementById('mapping-workspace');

  if (noticeEl) noticeEl.style.display = isPremium() ? 'none' : 'block';
  if (workspaceEl) workspaceEl.style.display = 'block';
  initProMapping();
}

function initProMapping() {
  window.addEventListener('load', () => {
    const mapContainer = document.getElementById('farm-map');
    if (!window.L) {
      mapContainer.innerHTML = '<p class="text-muted text-sm" style="padding:2rem">Peta tidak tersedia. Leaflet gagal dimuat.</p>';
      return;
    }

    const data = getData();
    const farms = data.farms || [];
    let selectedFarm = farms[0] || { id: 'f1', name: 'Lahan Sukomoro Demo', location: 'Sukomoro, Nganjuk', lat: -7.552, lng: 111.898, drainage: 'Baik' };

    const farmSelect = document.getElementById('map-farm-select');
    const areaEl = document.getElementById('polygon-area');
    const analyzeBtn = document.getElementById('analyze-polygon-btn');
    const saveBtn = document.getElementById('save-polygon-btn');
    const clearBtn = document.getElementById('clear-polygon-btn');
    const drawBtn = document.getElementById('polygon-draw-btn');
    const demoBtn = document.getElementById('polygon-demo-btn');
    const aiResultEl = document.getElementById('polygon-ai-result');
    const listEl = document.getElementById('map-farm-list');

    if (farmSelect) {
      const prem = isPremium();
      farmSelect.innerHTML = farms.length
        ? farms.map((f, idx) => `<option value="${escHtml(f.id)}" ${!prem && idx > 0 ? 'disabled' : ''}>${escHtml(f.name)} — ${escHtml(f.location)}${!prem && idx > 0 ? ' (Premium)' : ''}</option>`).join('')
        : '<option value="f1">Lahan Sukomoro Demo</option>';
    }

    if (listEl) {
      listEl.innerHTML = farms.map(f => {
        const areaText = f.polygonAreaM2 ? ` · Poligon: ${Math.round(f.polygonAreaM2).toLocaleString('id-ID')} m²` : '';
        return `<div style="padding:.5rem 0;border-bottom:1px solid var(--border)"><strong>${escHtml(f.name)}</strong> — ${escHtml(f.location)}${areaText}</div>`;
      }).join('') || 'Belum ada lahan.';
    }

    const center = [selectedFarm.lat ?? -7.552, selectedFarm.lng ?? 111.898];
    const map = initLeafletMap('farm-map', center, 16);
    if (!map) return;

    farms.forEach(f => addMarker(map, f.lat ?? -7.552, f.lng ?? 111.898, `<b>${escHtml(f.name)}</b><br>${escHtml(f.location)}`));

    const drawnLayer = new L.FeatureGroup().addTo(map);
    const heatmapLayer = new L.LayerGroup().addTo(map);
    let currentLatLngs = null;
    let lastSummary = null;

    function updateAreaLabel(latlngs) {
      if (!latlngs?.length) {
        areaEl.textContent = 'Belum digambar';
        analyzeBtn.disabled = true;
        saveBtn.disabled = true;
        return;
      }
      const m2 = calcPolygonAreaM2(latlngs);
      const ha = (m2 / 10000).toFixed(2);
      areaEl.textContent = `${Math.round(m2).toLocaleString('id-ID')} m² (${ha} ha)`;
      analyzeBtn.disabled = false;
      saveBtn.disabled = false;
    }

    function setPolygon(latlngs, fit = false) {
      drawnLayer.clearLayers();
      heatmapLayer.clearLayers();
      currentLatLngs = latlngs;
      if (latlngs?.length) {
        const poly = L.polygon(latlngs, {
          color: '#facc15',
          weight: 2.5,
          fillColor: '#22c55e',
          fillOpacity: 0.12,
        }).addTo(drawnLayer);
        if (fit) map.fitBounds(poly.getBounds(), { padding: [30, 30] });
      }
      updateAreaLabel(latlngs);
    }

    function runAiPolygonAnalysis() {
      if (!currentLatLngs?.length) {
        toast('Gambar poligon lahan terlebih dahulu.', 'error');
        return;
      }
      heatmapLayer.clearLayers();
      const { cells, summary } = generatePolygonHeatmapZones(currentLatLngs, selectedFarm);
      lastSummary = summary;

      cells.forEach(c => {
        L.rectangle(c.bounds, {
          stroke: false,
          fillColor: c.color,
          fillOpacity: 0.52,
          interactive: false,
        }).addTo(heatmapLayer);
      });

      summary.zoneLabels.forEach(lbl => {
        L.marker(lbl.pos, {
          interactive: false,
          icon: L.divIcon({
            className: '',
            html: `<div class="zone-callout" style="color:${lbl.tone}">${escHtml(lbl.title)}</div>`,
            iconSize: null,
          }),
        }).addTo(heatmapLayer);
      });

      aiResultEl.innerHTML = `
        <div class="card" style="border-color:var(--forest)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem;margin-bottom:.75rem">
            <div>
              <span class="badge badge-sage">SIMULASI ANALISIS AI SPASIAL</span>
              <h3 style="font-size:1.05rem;font-weight:700;color:var(--forest);margin:.45rem 0 .2rem">${escHtml(selectedFarm.name)}</h3>
              <span class="text-xs text-muted">Luas terukur: <strong>${Math.round(summary.areaM2).toLocaleString('id-ID')} m²</strong> (${summary.areaHa.toFixed(2)} ha)</span>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-bottom:1rem">
            <div style="background:rgba(22,163,74,.1);padding:.6rem;border-radius:var(--r-md);text-align:center">
              <div class="text-xs text-muted">Sehat</div>
              <strong style="color:#15803d;font-size:1.05rem">${summary.healthyPct}%</strong>
            </div>
            <div style="background:rgba(234,179,8,.14);padding:.6rem;border-radius:var(--r-md);text-align:center">
              <div class="text-xs text-muted">Waspada</div>
              <strong style="color:#a16207;font-size:1.05rem">${summary.moderatePct}%</strong>
            </div>
            <div style="background:rgba(220,38,38,.1);padding:.6rem;border-radius:var(--r-md);text-align:center">
              <div class="text-xs text-muted">Risiko</div>
              <strong style="color:#b91c1c;font-size:1.05rem">${summary.riskPct}%</strong>
            </div>
          </div>

          <div style="background:var(--surface-low);padding:.75rem;border-radius:var(--r-md);margin-bottom:1rem;font-size:.8125rem">
            <span class="text-muted">Estimasi Kebutuhan Benih:</span>
            <strong style="color:var(--forest)">±${summary.seedEstimateKg.toLocaleString('id-ID')} kg</strong>
          </div>

          <div style="margin-bottom:1rem">
            <div class="text-xs font-semibold" style="color:var(--forest);margin-bottom:.4rem">Rekomendasi Zona AI (Simulasi):</div>
            <ul style="margin:0;padding-left:1.15rem;display:flex;flex-direction:column;gap:.35rem;font-size:.8125rem;color:var(--ink)">
              ${summary.recommendations.map(r => `<li>${escHtml(r)}</li>`).join('')}
            </ul>
          </div>

          <button class="btn btn-outline btn-sm btn-wide" id="save-map-journal-btn" type="button">${isPremium() ? 'Catat Analisis Poligon ke Jurnal' : 'Catat ke Jurnal (Premium)'}</button>
        </div>
      `;

      document.getElementById('save-map-journal-btn')?.addEventListener('click', () => {
        if (!isPremium()) {
          toast('Catat analisis poligon ke Jurnal tersedia di Paket Premium.', 'info');
          return;
        }
        if (!lastSummary) return;
        const d = getData();
        const cycleId = d.cycles?.[0]?.id || 'c1';
        addItem('journals', {
          cycleId,
          date: new Date().toISOString().slice(0, 10),
          type: 'Pemetaan AI',
          note: `[Simulasi Peta AI - ${selectedFarm.name}] Luas ${Math.round(lastSummary.areaM2)} m². Sehat ${lastSummary.healthyPct}%, Waspada ${lastSummary.moderatePct}%, Risiko ${lastSummary.riskPct}%.`,
          photo: null,
        });
        toast('Hasil analisis poligon dicatat ke Jurnal.', 'success');
      });

      toast('Simulasi analisis AI poligon selesai.', 'success');
    }

    if (selectedFarm.polygon?.length) {
      const pts = selectedFarm.polygon.map(([lat, lng]) => ({ lat, lng }));
      setPolygon(pts, true);
    }

    farmSelect?.addEventListener('change', () => {
      const found = getData().farms.find(f => f.id === farmSelect.value);
      if (!found) return;
      selectedFarm = found;
      map.setView([found.lat ?? -7.552, found.lng ?? 111.898], 16);
      if (found.polygon?.length) {
        setPolygon(found.polygon.map(([lat, lng]) => ({ lat, lng })), true);
      } else {
        setPolygon(null);
      }
    });

    if (window.L.Draw) {
      drawBtn?.addEventListener('click', () => {
        new L.Draw.Polygon(map, {
          shapeOptions: { color: '#facc15', weight: 2.5 },
        }).enable();
        toast('Klik titik-titik batas lahan di peta untuk menggambar poligon.', 'info');
      });

      map.on(L.Draw.Event.CREATED, e => {
        const latlngs = e.layer.getLatLngs()[0].map(p => ({ lat: p.lat, lng: p.lng }));
        setPolygon(latlngs, false);
        runAiPolygonAnalysis();
      });
    }

    demoBtn?.addEventListener('click', () => {
      const cLat = selectedFarm.lat ?? -7.552;
      const cLng = selectedFarm.lng ?? 111.898;
      const demoPoly = [
        { lat: cLat + 0.0011, lng: cLng - 0.0014 },
        { lat: cLat + 0.0015, lng: cLng + 0.0010 },
        { lat: cLat + 0.0002, lng: cLng + 0.0018 },
        { lat: cLat - 0.0012, lng: cLng + 0.0009 },
        { lat: cLat - 0.0010, lng: cLng - 0.0015 },
      ];
      setPolygon(demoPoly, true);
      runAiPolygonAnalysis();
    });

    analyzeBtn?.addEventListener('click', runAiPolygonAnalysis);

    saveBtn?.addEventListener('click', () => {
      if (!isPremium()) {
        toast('Simpan Poligon permanen tersedia di Paket Premium.', 'info');
        return;
      }
      if (!currentLatLngs?.length) return;
      const areaM2 = calcPolygonAreaM2(currentLatLngs);
      updateItem('farms', selectedFarm.id, {
        polygon: currentLatLngs.map(p => [p.lat, p.lng]),
        polygonAreaM2: areaM2,
      });
      toast(`Poligon untuk ${selectedFarm.name} disimpan.`, 'success');
    });

    clearBtn?.addEventListener('click', () => {
      setPolygon(null);
      lastSummary = null;
      toast('Poligon direset.', 'info');
    });
  });
}
