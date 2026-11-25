// js/services/weather-service.js
const BMKG_BASE = 'https://api.bmkg.go.id/publik/prakiraan-cuaca';
const CACHE_KEY = 'sg-weather-cache';
const CACHE_TTL = 3 * 60 * 60 * 1000; // 3 hours

export async function fetchBmkg(adm4Code) {
  if (!adm4Code) throw new Error('Kode ADM4 diperlukan.');

  // Check cache
  try {
    const cache = JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}');
    if (cache[adm4Code] && Date.now() - cache[adm4Code].ts < CACHE_TTL) {
      return { ...cache[adm4Code].data, fromCache: true };
    }
  } catch {}

  const res = await fetch(`${BMKG_BASE}?adm4=${encodeURIComponent(adm4Code)}`);
  if (!res.ok) throw new Error(`BMKG error ${res.status} — Verifikasi kode ADM4 format: XX.XX.XX.XXXX`);
  const json = await res.json();

  // Cache result
  try {
    const cache = JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}');
    cache[adm4Code] = { ts: Date.now(), data: json };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {}

  return json;
}

export function parseWeatherData(json) {
  const lokasi = json?.lokasi ?? {};
  const list   = json?.data?.[0]?.cuaca?.flat() ?? [];
  return { lokasi, forecasts: list.slice(0, 8) };
}
