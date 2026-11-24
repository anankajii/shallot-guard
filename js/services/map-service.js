// js/services/map-service.js
export function initLeafletMap(containerId, center = [-7.552, 111.898], zoom = 13) {
  if (!window.L) return null;
  const map = L.map(containerId, { zoomControl: true }).setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);
  return map;
}

export function addMarker(map, lat, lng, popupHtml = '') {
  if (!window.L || !map) return null;
  const marker = L.marker([lat, lng]).addTo(map);
  if (popupHtml) marker.bindPopup(popupHtml).openPopup();
  return marker;
}

export function calcPolygonAreaM2(latlngs) {
  if (!latlngs?.length) return 0;
  const lat0 = latlngs.reduce((s, p) => s + p.lat, 0) / latlngs.length * Math.PI / 180;
  const pts = latlngs.map(p => [p.lng * 111320 * Math.cos(lat0), p.lat * 110540]);
  return Math.abs(pts.reduce((s, p, i) => { const q = pts[(i+1)%pts.length]; return s + p[0]*q[1] - q[0]*p[1]; }, 0)) / 2;
}
