// js/services/map-service.js
export function initLeafletMap(containerId, center = [-7.552, 111.898], zoom = 16) {
  if (!window.L) return null;
  const map = L.map(containerId, { zoomControl: true }).setView(center, zoom);

  const satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { attribution: 'Tiles © Esri', maxNativeZoom: 17, maxZoom: 18, detectRetina: true }
  );
  const osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '© OpenStreetMap contributors', maxNativeZoom: 19, maxZoom: 19, detectRetina: true }
  );

  satellite.addTo(map);
  L.control.layers({ 'Satelit (Esri)': satellite, 'Peta Jalan (OSM)': osm }, null, { position: 'topright' }).addTo(map);
  return map;
}

export function addMarker(map, lat, lng, popupHtml = '') {
  if (!window.L || !map) return null;
  const marker = L.marker([lat, lng]).addTo(map);
  if (popupHtml) marker.bindPopup(popupHtml);
  return marker;
}

export function calcPolygonAreaM2(latlngs) {
  if (!latlngs?.length) return 0;
  const lat0 = (latlngs.reduce((s, p) => s + p.lat, 0) / latlngs.length) * Math.PI / 180;
  const pts = latlngs.map(p => [p.lng * 111320 * Math.cos(lat0), p.lat * 110540]);
  return Math.abs(pts.reduce((s, p, i) => {
    const q = pts[(i + 1) % pts.length];
    return s + p[0] * q[1] - q[0] * p[1];
  }, 0)) / 2;
}

export function pointInPolygon(lat, lng, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].lat, yi = poly[i].lng;
    const xj = poly[j].lat, yj = poly[j].lng;
    const intersect = ((yi > lng) !== (yj > lng)) &&
      (lat < (xj - xi) * (lng - yi) / ((yj - yi) || 1e-12) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

export function generatePolygonHeatmapZones(polyLatLngs, farm = {}) {
  const areaM2 = calcPolygonAreaM2(polyLatLngs);
  const areaHa = areaM2 / 10000;
  const lats = polyLatLngs.map(p => p.lat);
  const lngs = polyLatLngs.map(p => p.lng);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);

  const gridN = 14;
  const dLat = (maxLat - minLat) / gridN || 0.0001;
  const dLng = (maxLng - minLng) / gridN || 0.0001;
  const drainagePenalty = /buruk|tergenang/i.test(farm.drainage || '') ? 0.18 : 0;

  const cells = [];
  const clusters = { healthy: [], moderate: [], risk: [] };

  for (let r = 0; r < gridN; r++) {
    for (let c = 0; c < gridN; c++) {
      const cLat = minLat + (r + 0.5) * dLat;
      const cLng = minLng + (c + 0.5) * dLng;
      if (!pointInPolygon(cLat, cLng, polyLatLngs)) continue;

      const nx = c / gridN;
      const ny = r / gridN;
      const stressField =
        Math.exp(-((nx - 0.48) ** 2 + (ny - 0.52) ** 2) / 0.045) * 0.72 +
        Math.sin(nx * 5.2) * Math.cos(ny * 4.4) * 0.16 +
        drainagePenalty;

      let level = 'healthy';
      let color = '#16a34a';
      if (stressField >= 0.58) {
        level = 'risk';
        color = '#dc2626';
      } else if (stressField >= 0.34) {
        level = 'moderate';
        color = '#eab308';
      }

      const bounds = [
        [minLat + r * dLat, minLng + c * dLng],
        [minLat + (r + 1) * dLat, minLng + (c + 1) * dLng],
      ];
      cells.push({ bounds, level, color, center: [cLat, cLng] });
      clusters[level].push([cLat, cLng]);
    }
  }

  const total = cells.length || 1;
  const healthyPct = Math.round((clusters.healthy.length / total) * 100);
  const moderatePct = Math.round((clusters.moderate.length / total) * 100);
  const riskPct = Math.max(0, 100 - healthyPct - moderatePct);

  const avgPoint = pts => pts.length
    ? [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length]
    : null;

  const zoneLabels = [];
  const hPt = avgPoint(clusters.healthy);
  const mPt = avgPoint(clusters.moderate);
  const rPt = avgPoint(clusters.risk);
  if (hPt) zoneLabels.push({ pos: hPt, title: `Zona Sehat (${healthyPct}%)`, tone: '#166534' });
  if (mPt) zoneLabels.push({ pos: mPt, title: `Waspada (${moderatePct}%)`, tone: '#92400e' });
  if (rPt) zoneLabels.push({ pos: rPt, title: `Prioritas (${riskPct}%)`, tone: '#991b1b' });

  const seedEstimateKg = Math.round(areaM2 * 0.1);

  const recommendations = [
    riskPct > 15
      ? `Prioritaskan inspeksi lapangan pada zona merah (${riskPct}% area) untuk cek genangan parit atau gejala awal layu fusarium.`
      : 'Area risiko tinggi relatif terkendali; lakukan pemantauan rutin pada titik tengah bedengan.',
    moderatePct > 20
      ? `Evaluasi kelembapan daun & kebutuhan pemupukan susulan pada zona kuning (${moderatePct}% area).`
      : 'Distribusi kesuburan zona transisi terpantau stabil.',
    `Estimasi kebutuhan benih untuk luas ${Math.round(areaM2).toLocaleString('id-ID')} m² adalah ±${seedEstimateKg.toLocaleString('id-ID')} kg (asumsi 1 ton/ha).`,
  ];

  return {
    cells,
    summary: {
      areaM2,
      areaHa,
      healthyPct,
      moderatePct,
      riskPct,
      seedEstimateKg,
      zoneLabels,
      recommendations,
    },
  };
}
