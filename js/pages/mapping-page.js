import { requireFarmer, isPremium } from '../utils/access-control.js';
import { getData, saveData } from '../services/firestore-service.js';
import { initLeafletMap, addMarker, calcPolygonAreaM2 } from '../services/map-service.js';
import { toast } from '../utils/notifications.js';

if (requireFarmer()) {
  if (isPremium()) {
    document.getElementById('premium-mapping-tools').style.display = 'block';
    document.getElementById('save-polygon-btn').style.display = 'flex';
  }

  // Wait for Leaflet CDN
  window.addEventListener('load', () => {
    if (!window.L) {
      document.getElementById('farm-map').innerHTML = '<p class="text-muted text-sm" style="padding:2rem">Peta tidak tersedia. Leaflet gagal dimuat.</p>';
      return;
    }
    const data = getData();
    const farm = data.farms[0];
    const center = farm ? [farm.lat ?? -7.552, farm.lng ?? 111.898] : [-7.552, 111.898];
    const map = initLeafletMap('farm-map', center, 14);
    if (!map) return;
    data.farms.forEach(f => addMarker(map, f.lat ?? -7.552, f.lng ?? 111.898, `<b>${f.name}</b><br>${f.location}`));

    // Render farm list
    const listEl = document.getElementById('map-farm-list');
    if (listEl) listEl.innerHTML = data.farms.map(f => `<div style="padding:.5rem 0;border-bottom:1px solid var(--border)">${f.name} — ${f.location}</div>`).join('') || 'Belum ada lahan.';

    if (isPremium() && window.L.Draw) {
      const drawn = new L.FeatureGroup().addTo(map);
      const areaEl = document.getElementById('polygon-area');
      document.getElementById('polygon-draw-btn')?.addEventListener('click', () => new L.Draw.Polygon(map).enable());
      map.on(L.Draw.Event.CREATED, e => {
        drawn.clearLayers();
        drawn.addLayer(e.layer);
        const area = calcPolygonAreaM2(e.layer.getLatLngs()[0]);
        if (areaEl) areaEl.textContent = `${area.toLocaleString('id-ID', { maximumFractionDigits: 0 })} m²`;
        const s = getData();
        s.mapPolygon = e.layer.getLatLngs()[0].map(p => [p.lat, p.lng]);
        s.mapArea = area;
        saveData(s);
        toast('Polygon digambar. Klik Simpan untuk menyimpan.', 'success');
      });
      document.getElementById('save-polygon-btn')?.addEventListener('click', () => {
        toast('Polygon berhasil disimpan.', 'success');
      });
    }
  });
}
