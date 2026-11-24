/**
 * landing/sparkline.js
 * Menggambar ulang sparkline SVG dinamika sporulasi di Hero Console mockup.
 * Data adalah ilustrasi — bukan feed real-time.
 */

const SPORULATION_DATA = [45, 38, 30, 15, 40, 20, 28]; // nilai Y (semakin kecil = semakin tinggi di SVG)

function drawSparkline(svgSelector) {
  const svg = document.querySelector(svgSelector);
  if (!svg) return;

  const W = 300, H = 60;
  const minVal = Math.min(...SPORULATION_DATA);
  const maxVal = Math.max(...SPORULATION_DATA);
  const range = maxVal - minVal || 1;

  const points = SPORULATION_DATA.map((v, i) => {
    const x = (i / (SPORULATION_DATA.length - 1)) * W;
    const y = H - ((v - minVal) / range) * (H * 0.8) - H * 0.1;
    return [x, y];
  });

  // Buat path string dengan kurva Bezier
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }

  const linePath = svg.querySelector('path:first-child') || document.createElementNS('http://www.w3.org/2000/svg', 'path');
  linePath.setAttribute('d', d);
  linePath.setAttribute('fill', 'none');
  linePath.setAttribute('stroke', 'currentColor');
  linePath.setAttribute('stroke-width', '2.5');
  linePath.setAttribute('stroke-linecap', 'round');

  // Area fill
  const areaPath = svg.querySelectorAll('path')[1] || document.createElementNS('http://www.w3.org/2000/svg', 'path');
  areaPath.setAttribute('d', `${d} L${W},${H} L0,${H} Z`);
  areaPath.setAttribute('fill', 'currentColor');
  areaPath.setAttribute('fill-opacity', '0.12');

  if (!svg.contains(linePath)) svg.appendChild(linePath);
  if (!svg.contains(areaPath)) svg.appendChild(areaPath);

  // Titik puncak
  const peakIndex = SPORULATION_DATA.indexOf(minVal); // nilai Y paling kecil = puncak
  const [px, py] = points[peakIndex];
  let circle = svg.querySelector('circle');
  if (!circle) {
    circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    svg.appendChild(circle);
  }
  circle.setAttribute('cx', px);
  circle.setAttribute('cy', py);
  circle.setAttribute('r', '4');
  circle.classList.add('fill-onion-red');
}

document.addEventListener('DOMContentLoaded', () => {
  drawSparkline('[data-sparkline]');
});
