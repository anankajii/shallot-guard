// js/services/weather-service.js
// Mengambil prakiraan cuaca dari BMKG berdasarkan kode ADM4
// Jika CORS/network gagal, gunakan data demo realistis agar fitur tetap dapat digunakan

const BMKG_BASE = 'https://api.bmkg.go.id/publik/prakiraan-cuaca';
const CACHE_KEY = 'sg-weather-cache';
const CACHE_TTL = 3 * 60 * 60 * 1000; // 3 jam

/** Peta kode ADM4 → nama lokasi (untuk demo fallback) */
const ADM4_NAMES = {
  '35.18.08.2001': { desa: 'Sukomoro', kecamatan: 'Sukomoro', kotkab: 'Nganjuk' },
  '35.18.07.2001': { desa: 'Bagor',    kecamatan: 'Bagor',    kotkab: 'Nganjuk' },
  '35.18.11.2001': { desa: 'Rejoso',   kecamatan: 'Rejoso',   kotkab: 'Nganjuk' },
  '35.18.10.2001': { desa: 'Gondang',  kecamatan: 'Gondang',  kotkab: 'Nganjuk' },
};

/** Buat data demo yang realistis berdasarkan waktu sekarang */
function buildDemoData(adm4Code) {
  const lokasi = ADM4_NAMES[adm4Code] ?? {
    desa: 'Demo Lokasi', kecamatan: 'Kecamatan', kotkab: 'Nganjuk',
  };

  const hour = new Date().getHours();
  const slots = [
    { h: 0,  t: 26, hu: 86, ws: 5,  weather_desc: 'Berawan',          tp: 0,   tcc: 70 },
    { h: 3,  t: 25, hu: 88, ws: 4,  weather_desc: 'Berawan',          tp: 0,   tcc: 75 },
    { h: 6,  t: 27, hu: 84, ws: 6,  weather_desc: 'Cerah Berawan',    tp: 0,   tcc: 55 },
    { h: 9,  t: 30, hu: 76, ws: 9,  weather_desc: 'Cerah Berawan',    tp: 0,   tcc: 45 },
    { h: 12, t: 32, hu: 70, ws: 12, weather_desc: 'Cerah',            tp: 0,   tcc: 25 },
    { h: 15, t: 31, hu: 73, ws: 11, weather_desc: 'Hujan Ringan',     tp: 1.2, tcc: 80 },
    { h: 18, t: 28, hu: 82, ws: 7,  weather_desc: 'Hujan Sedang',     tp: 3.5, tcc: 90 },
    { h: 21, t: 27, hu: 85, ws: 5,  weather_desc: 'Berawan Tebal',    tp: 0.3, tcc: 85 },
  ];

  const startIdx = slots.findIndex(s => s.h >= hour);
  const idx = startIdx === -1 ? 0 : startIdx;
  const ordered = [...slots.slice(idx), ...slots.slice(0, idx)];

  const today = new Date();
  const forecasts = ordered.map((s, i) => {
    const dt = new Date(today);
    dt.setHours(s.h, 0, 0, 0);
    if (s.h < hour && i > 0) dt.setDate(dt.getDate() + 1);
    return {
      local_datetime: dt.toISOString().replace('T', ' ').slice(0, 16),
      t: s.t, hu: s.hu, ws: s.ws, tp: s.tp, tcc: s.tcc,
      weather_desc: s.weather_desc,
    };
  });

  return { lokasi, data: [{ cuaca: [forecasts] }], _isDemo: true };
}

/**
 * Ambil prakiraan cuaca dari BMKG.
 * Jika gagal karena CORS/network, kembalikan data demo realistis.
 * @param {string} adm4Code - Kode ADM4 format XX.XX.XX.XXXX
 */
export async function fetchWeather(adm4Code) {
  if (!adm4Code) throw new Error('Kode ADM4 diperlukan.');
  const clean = adm4Code.trim();

  // Cek cache
  try {
    const cache = JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}');
    if (cache[clean] && Date.now() - cache[clean].ts < CACHE_TTL) {
      return { ...cache[clean].data, fromCache: true };
    }
  } catch { /* ignore */ }

  try {
    const res = await fetch(`${BMKG_BASE}?adm4=${encodeURIComponent(clean)}`);
    if (!res.ok) throw new Error(`BMKG HTTP ${res.status}`);
    const json = await res.json();

    // Simpan cache
    try {
      const cache = JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}');
      cache[clean] = { ts: Date.now(), data: json };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch { /* ignore */ }

    return json;
  } catch (err) {
    // Fallback demo — BMKG sering CORS ketika diakses dari localhost
    console.warn('[WeatherService] BMKG tidak terjangkau, pakai data demo:', err.message);
    return buildDemoData(clean);
  }
}

/** Alias backward compat */
export const fetchBmkg = fetchWeather;

/**
 * Parse respons BMKG menjadi { lokasi, forecasts[], isDemo }
 */
export function parseWeatherData(json) {
  const lokasi   = json?.lokasi ?? {};
  const list     = json?.data?.[0]?.cuaca?.flat() ?? [];
  const isDemo   = Boolean(json?._isDemo);
  return { lokasi, forecasts: list.slice(0, 8), isDemo };
}
