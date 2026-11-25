// js/services/weather-service.js
const BMKG_BASE = 'https://api.bmkg.go.id/publik/prakiraan-cuaca';
const CACHE_KEY = 'sg-weather-cache';
const CACHE_TTL = 3 * 60 * 60 * 1000; // 3 hours

export async function fetchWeather(adm4Code) {
  if (!adm4Code) throw new Error('Kode ADM4 diperlukan.');

  // Check cache
  try {
    const cache = JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}');
    if (cache[adm4Code] && Date.now() - cache[adm4Code].ts < CACHE_TTL) {
      return { ...cache[adm4Code].data, fromCache: true };
    }
  } catch {}

  try {
    const res = await fetch(`${BMKG_BASE}?adm4=${encodeURIComponent(adm4Code)}`);
    if (!res.ok) throw new Error(`BMKG error ${res.status}`);
    const json = await res.json();

    // Cache result
    try {
      const cache = JSON.parse(sessionStorage.getItem(CACHE_KEY) || '{}');
      cache[adm4Code] = { ts: Date.now(), data: json };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {}

    return json;
  } catch {
    return getDemoWeather(adm4Code);
  }
}

function getDemoWeather(adm4Code) {
  return {
    lokasi: { adm1: 'Jawa Timur', adm2: 'Nganjuk', adm3: 'Rejoso', adm4: adm4Code || 'Demo' },
    data: [{
      cuaca: [[{
        datetime: '2026-11-25 10:00:00',
        t: '28', tc: '28', tmax: '32', tmin: '23', tdew: '23', hu: '75', humax: '95', humin: '55',
        ss: '7.2', ff: '3.1', ffx: '7.2', ddd: '135', type: '10', ch: '5'
      }]]
    }],
    demo: true
  };
}

export function parseWeatherData(json) {
  const lokasi = json?.lokasi ?? {};
  const list   = json?.data?.[0]?.cuaca?.flat() ?? [];
  return { lokasi, forecasts: list.slice(0, 8) };
}
