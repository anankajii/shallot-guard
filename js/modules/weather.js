// js/modules/weather.js
import { fetchWeather, parseWeatherData } from '../services/weather-service.js';
import { toast } from '../utils/notifications.js';
import { debounce } from '../utils/helpers.js';

const COND_ICON = { 'Cerah':'','Cerah Berawan':'','Berawan':'','Hujan Ringan':'','Hujan Sedang':'','Hujan Lebat':'','Hujan Petir':'' };

export function initWeather() {
  const btn   = document.getElementById('fetch-weather-btn');
  const input = document.getElementById('adm4-input');
  if (btn) btn.addEventListener('click', () => loadWeather(input?.value?.trim()));
  if (input) input.addEventListener('keydown', e => { if(e.key==='Enter') loadWeather(input.value.trim()); });
}

async function loadWeather(code) {
  const output = document.getElementById('weather-output');
  if (!code) { toast('Masukkan kode ADM4 terlebih dahulu.', 'error'); return; }
  if (!output) return;
  output.innerHTML = `<div class="loading-overlay"><div class="spinner"></div><span style="margin-left:.75rem;color:var(--muted)">Memuat data BMKG…</span></div>`;
  try {
    const raw  = await fetchWeather(code);
    const { lokasi, forecasts } = parseWeatherData(raw);
    output.innerHTML = renderWeatherResult(lokasi, forecasts, raw.fromCache);
  } catch (err) {
    output.innerHTML = `<div class="card" style="border-color:var(--onion);background:#fdf2f2;padding:1.25rem">
      <p style="color:var(--onion);font-weight:600;margin:0 0 .5rem">Gagal memuat data BMKG</p>
      <p class="text-sm text-muted" style="margin:0">${err.message}. Pastikan kode ADM4 valid dan koneksi internet tersedia.</p>
    </div>`;
  }
}

function renderWeatherResult(lokasi, forecasts, fromCache) {
  const loc = [lokasi.desa, lokasi.kecamatan, lokasi.kotkab].filter(Boolean).join(', ') || 'Lokasi tidak diketahui';
  if (!forecasts.length) return `<div class="card"><p class="text-muted">Tidak ada data prakiraan tersedia.</p></div>`;
  const first = forecasts[0];
  return `
    <div class="card" style="margin-bottom:1rem">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <div>
          <p class="text-sm text-muted" style="margin:0 0 .25rem"> ${loc}</p>
          ${fromCache ? '<span class="badge badge-info text-xs">Dari cache</span>' : '<span class="badge badge-success text-xs">Data terbaru</span>'}
        </div>
        <span class="text-xs text-muted">Sumber: BMKG</span>
      </div>
      <div class="weather-grid">
        <div class="weather-item"><div class="label">Suhu</div><div class="val">${first.t ?? '—'}°C</div></div>
        <div class="weather-item"><div class="label">Kelembapan</div><div class="val">${first.hu ?? '—'}%</div></div>
        <div class="weather-item"><div class="label">Cuaca</div><div class="val">${COND_ICON[first.weather_desc]??''} ${first.weather_desc ?? '—'}</div></div>
        <div class="weather-item"><div class="label">Angin</div><div class="val">${first.ws ?? '—'} km/j ${first.wd ?? ''}</div></div>
      </div>
    </div>
    <h4 style="font-size:.875rem;font-weight:600;color:var(--forest);margin:0 0 .75rem">Prakiraan 24 Jam</h4>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.75rem">
      ${forecasts.slice(1).map(f=>`
        <div class="card card-tight card-flat" style="text-align:center;background:var(--surface-low)">
          <div style="font-size:1.5rem">${COND_ICON[f.weather_desc]??''}</div>
          <div class="text-xs text-muted" style="margin:.25rem 0">${f.local_datetime?.slice(11,16) ?? '—'}</div>
          <div style="font-weight:700;color:var(--forest)">${f.t ?? '—'}°C</div>
          <div class="text-xs text-muted">${f.hu ?? '—'}% RH</div>
        </div>`).join('')}
    </div>`;
}
