// js/features/mapping/mapping.js
import { isPremium, state, save } from '../../core/state.js';
import { toast } from '../../core/notifications.js';
import { initMap, calcPolygonArea } from '../../services/map-service.js';

export function renderMapping(openPremiumGate) {
  if (!isPremium()) {
    setTimeout(() => openPremiumGate('Smart Farm Mapping'), 0);
    return `<div class="page-title-row"><div><h1>Peta Lahan</h1>
      <p class="hint">Peta dan batas polygon untuk pengguna Premium.</p></div></div>`;
  }
  return `
    <div class="page-title-row">
      <div><h1>Peta Lahan</h1>
      <p class="hint">Area polygon adalah estimasi, bukan pengukuran survei resmi.</p></div>
      <button class="btn" id="save-map-btn">Simpan batas demo</button>
    </div>
    <div id="farm-map" class="map" style="height:400px;border-radius:12px"></div>
    <div class="card" style="margin-top:16px">
      <h3>Lahan Rejoso A</h3>
      <p>Estimasi batas polygon: <b id="polygon-area">Belum digambar</b></p>
      <button class="btn outline sm" id="polygon-draw-btn" style="margin-top:10px">Aktifkan gambar polygon</button>
    </div>`;
}

export function bindMapping() {
  const mapEl = document.getElementById('farm-map');
  if (!mapEl) return;

  const map = initMap('farm-map');
  if (!map) return;

  const drawn = new L.FeatureGroup();
  map.addLayer(drawn);
  const areaEl = document.getElementById('polygon-area');

  const updateArea = layer => {
    const coords = layer.getLatLngs()[0];
    const area = calcPolygonArea(coords);
    state.mapPolygon = coords.map(p => [p.lat, p.lng]);
    state.mapArea = area;
    if (areaEl) areaEl.textContent = `${area.toLocaleString('id-ID', { maximumFractionDigits: 0 })} m²`;
  };

  if (state.mapPolygon?.length) {
    const layer = L.polygon(state.mapPolygon);
    drawn.addLayer(layer);
    updateArea(layer);
  }

  map.on(L.Draw.Event.CREATED, e => {
    drawn.clearLayers();
    drawn.addLayer(e.layer);
    updateArea(e.layer);
    toast('Polygon dibuat. Tekan Simpan untuk menyimpan.');
  });

  document.getElementById('polygon-draw-btn')?.addEventListener('click', () =>
    new L.Draw.Polygon(map, { allowIntersection: false }).enable());

  document.getElementById('save-map-btn')?.addEventListener('click', () => {
    if (!state.mapPolygon) { toast('Gambar polygon terlebih dahulu.'); return; }
    save();
    toast('Batas polygon demo disimpan.');
  });
}
