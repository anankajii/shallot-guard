// js/modules/weather.js
import { fetchWeather, parseWeatherData } from '../services/weather-service.js';
import { toast } from '../utils/notifications.js';
import { escHtml } from '../utils/helpers.js';

function analyzeWeatherForShallot(current, forecasts = []) {
  const temp = Number(current?.t ?? 28);
  const hu = Number(current?.hu ?? 75);
  const ws = Number(current?.ws ?? 8);
  const desc = String(current?.weather_desc ?? '').toLowerCase();
  const isRain = /hujan|petir|gerimis/.test(desc) || Number(current?.tp ?? 0) > 0.5;
  const highHumidity = hu >= 85;
  const highWind = ws >= 15;

  // Evaluasi kecocokan aktivitas hari ini
  const activities = [
    {
      name: 'Penyemprotan Daun / Fungisida',
      suitable: !isRain && !highWind,
      status: !isRain && !highWind ? 'Cocok' : 'Tunda',
      badge: !isRain && !highWind ? 'badge-sage' : 'badge-onion',
      reason: isRain
        ? 'Berpotensi hujan — semprotan berisiko tercuci.'
        : highWind
          ? `Angin cukup kencang (${ws} km/j) — semprotan mudah melayang.`
          : 'Cuaca cukup tenang dan tidak hujan, efektif dilakukan pagi (06.00–09.00) atau sore.',
    },
    {
      name: 'Pemupukan Susulan',
      suitable: !isRain || /ringan|gerimis/.test(desc),
      status: /deras|lebat|petir/.test(desc) ? 'Tunda' : 'Cocok',
      badge: /deras|lebat|petir/.test(desc) ? 'badge-onion' : 'badge-sage',
      reason: /deras|lebat|petir/.test(desc)
        ? 'Hujan lebat berisiko melarutkan pupuk dari bedengan.'
        : 'Kondisi mendukung penyerapan nutrisi; pastikan tanah lembap.',
    },
    {
      name: 'Penyiraman / Irigasi',
      suitable: !isRain && temp >= 27,
      status: isRain ? 'Tidak Perlu' : 'Cocok',
      badge: isRain ? 'badge-amber' : 'badge-sage',
      reason: isRain
        ? 'Sudah ada suplai air hujan; fokuskan pada kelancaran drainase parit.'
        : `Suhu ${temp}°C tanpa hujan — lakukan penyiraman secukupnya agar umbi tidak stres kekeringan.`,
    },
    {
      name: 'Sanitasi & Pengawasan Moler',
      suitable: true,
      status: highHumidity || isRain ? 'Prioritas Tinggi' : 'Rutin',
      badge: highHumidity || isRain ? 'badge-amber' : 'badge-sage',
      reason: highHumidity || isRain
        ? `Kelembapan tinggi (${hu}%) meningkatkan risiko spora moler/trotol — periksa daun terinfeksi.`
        : 'Kelembapan terkendali; lakukan pemeriksaan visual rutin pada pangkal batang.',
    },
  ];

  // Ringkasan utama & rekomendasi AI (rule-based berbasis data BMKG)
  let headline = 'Cuaca Mendukung Aktivitas Budidaya Harian';
  let summary = 'Kondisi cuaca aktual BMKG cukup stabil untuk perawatan rutin tanaman bawang merah.';
  const recs = [];

  if (isRain || highHumidity) {
    headline = 'Waspada Kelembapan Tinggi & Potensi Penyakit Jamur';
    summary = `Kondisi ${current?.weather_desc || 'lembap'} dengan kelembapan ${hu}% memicu risiko penyakit moler (Fusarium) dan bercak ungu.`;
    recs.push('Pastikan saluran drainase antar-bedengan bersih agar tidak terjadi genangan air.');
    recs.push('Tunda penyemprotan jika hujan turun; lakukan pengamatan daun pada pagi hari setelah embun kering.');
    recs.push('Segera cabut atau pangkas rumpun yang menunjukkan gejala melintir/layu agar tidak menular.');
  } else {
    recs.push('Manfaatkan kondisi cerah/berawan untuk pemupukan atau penyemprotan preventif pada pagi hari.');
    recs.push('Pantau kelembapan tanah bedengan; lakukan penyiraman ringan bila permukaan tanah mulai mengering.');
  }

  if (highWind) {
    recs.push(`Kecepatan angin mencapai ${ws} km/j — hindari penyemprotan kabut halus dan periksa ajir/penopang tajuk.`);
  }

  const upcomingRain = forecasts.slice(1, 5).some(f => /hujan|petir/.test(String(f.weather_desc || '').toLowerCase()));
  if (upcomingRain) {
    recs.push('Prakiraan periode berikutnya menunjukkan potensi hujan — selesaikan aktivitas lapangan sebelum hujan turun.');
  }

  return { headline, summary, activities, recs };
}

export function initWeather() {
  const input = document.getElementById('adm4-input');
  const btn = document.getElementById('fetch-weather-btn');
  const output = document.getElementById('weather-output');

  async function loadWeather(code) {
    const clean = (code || '').trim();
    if (!clean) {
      toast('Masukkan kode wilayah ADM4 BMKG terlebih dahulu.', 'error');
      return;
    }

    btn.disabled = true;
    output.innerHTML = '<div class="card"><p class="text-sm text-muted" style="margin:0">Mengambil prakiraan aktual dari BMKG…</p></div>';

    try {
      const json = await fetchWeather(clean);
      const { lokasi, forecasts, isDemo } = parseWeatherData(json);

      if (!forecasts.length) {
        output.innerHTML = '<div class="card" style="border-color:var(--onion)"><p class="text-sm" style="color:var(--onion);margin:0">Data prakiraan BMKG tidak ditemukan untuk kode ADM4 tersebut. Pastikan format kode benar (contoh: 35.18.08.2001).</p></div>';
        return;
      }

      const current = forecasts[0];
      const ai = analyzeWeatherForShallot(current, forecasts);
      const locName = [lokasi.desa, lokasi.kecamatan, lokasi.kotkab].filter(Boolean).join(', ') || clean;

      // Simpan ringkasan untuk dashboard
      try {
        localStorage.setItem('sg-last-weather', JSON.stringify({
          adm4: clean,
          location: locName,
          temp: current.t,
          humidity: current.hu,
          desc: current.weather_desc,
          headline: ai.headline,
          updatedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        }));
      } catch {}

      output.innerHTML = `
        <div class="card" style="margin-bottom:1.25rem;border-color:var(--forest)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:.75rem;margin-bottom:1rem">
            <div>
              <span class="badge ${isDemo ? 'badge-amber' : 'badge-sage'}">${isDemo ? 'DATA DEMO (BMKG tidak terjangkau)' : json.fromCache ? 'DATA AKTUAL BMKG (CACHE)' : 'DATA AKTUAL BMKG'}</span>
              <h3 style="font-size:1.15rem;font-weight:700;color:var(--forest);margin:.45rem 0 .2rem">${escHtml(locName)}</h3>
              <span class="text-xs text-muted">Waktu prakiraan: ${escHtml(current.local_datetime || 'Saat ini')}</span>
            </div>
            <div style="text-align:right">
              <div style="font-size:1.75rem;font-weight:700;color:var(--forest);line-height:1">${escHtml(current.t)}°C</div>
              <div class="text-xs text-muted">${escHtml(current.weather_desc || '—')}</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem">
            <div style="background:var(--surface-low);padding:.75rem;border-radius:var(--r-md)">
              <div class="text-xs text-muted">Kelembapan</div>
              <strong style="color:var(--forest);font-size:1rem">${escHtml(current.hu)}%</strong>
            </div>
            <div style="background:var(--surface-low);padding:.75rem;border-radius:var(--r-md)">
              <div class="text-xs text-muted">Kecepatan Angin</div>
              <strong style="color:var(--forest);font-size:1rem">${escHtml(current.ws)} km/j</strong>
            </div>
            <div style="background:var(--surface-low);padding:.75rem;border-radius:var(--r-md)">
              <div class="text-xs text-muted">Tutupan Awan</div>
              <strong style="color:var(--forest);font-size:1rem">${escHtml(current.tcc ?? '—')}%</strong>
            </div>
          </div>
        </div>

        <div class="card" style="margin-bottom:1.25rem;border-color:var(--leaf);background:linear-gradient(135deg,#fff 0%,var(--surface-low) 100%)">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin-bottom:.6rem">
            <span class="badge badge-sage">REKOMENDASI AI CUACA HARI INI</span>
            <span class="text-xs text-muted">Analisis berbasis parameter BMKG</span>
          </div>
          <h3 style="font-size:1.05rem;font-weight:700;color:var(--forest);margin:0 0 .35rem">${escHtml(ai.headline)}</h3>
          <p class="text-sm" style="color:var(--ink);margin:0 0 1rem;line-height:1.55">${escHtml(ai.summary)}</p>

          <div class="text-xs font-semibold" style="color:var(--forest);margin-bottom:.5rem">Cuaca Hari Ini Cocok Untuk:</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1rem">
            ${ai.activities.map(act => `
              <div style="background:#fff;border:1px solid var(--border);border-radius:var(--r-md);padding:.75rem">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;margin-bottom:.3rem">
                  <strong style="font-size:.825rem;color:var(--forest)">${escHtml(act.name)}</strong>
                  <span class="badge ${act.badge}">${escHtml(act.status)}</span>
                </div>
                <p class="text-xs text-muted" style="margin:0;line-height:1.45">${escHtml(act.reason)}</p>
              </div>
            `).join('')}
          </div>

          <div class="text-xs font-semibold" style="color:var(--forest);margin-bottom:.4rem">Rekomendasi Tindakan Hari Ini:</div>
          <ul style="margin:0;padding-left:1.15rem;display:flex;flex-direction:column;gap:.35rem;font-size:.825rem;color:var(--ink)">
            ${ai.recs.map(r => `<li>${escHtml(r)}</li>`).join('')}
          </ul>
        </div>

        <div class="card">
          <h4 style="font-size:.9rem;font-weight:700;color:var(--forest);margin:0 0 .85rem">Prakiraan Periode Berikutnya (BMKG)</h4>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:.75rem">
            ${forecasts.map(f => `
              <div style="background:var(--surface-low);border:1px solid var(--border);border-radius:var(--r-md);padding:.75rem">
                <div class="text-xs text-muted">${escHtml(String(f.local_datetime || '').slice(11, 16) || '—')} WIB</div>
                <div style="font-size:1.1rem;font-weight:700;color:var(--forest);margin:.2rem 0">${escHtml(f.t)}°C</div>
                <div class="text-xs" style="color:var(--ink)">${escHtml(f.weather_desc || '—')}</div>
                <div class="text-xs text-muted" style="margin-top:.25rem">RH ${escHtml(f.hu)}% · Angin ${escHtml(f.ws)} km/j</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      toast('Prakiraan BMKG & rekomendasi AI berhasil dimuat.', 'success');
    } catch (err) {
      output.innerHTML = `<div class="card" style="border-color:var(--onion)"><p class="text-sm" style="color:var(--onion);margin:0">Gagal mengambil data BMKG: ${escHtml(err.message)}. Periksa kode ADM4 atau koneksi internet Anda.</p></div>`;
      toast('Gagal mengambil data BMKG.', 'error');
    } finally {
      btn.disabled = false;
    }
  }

  btn?.addEventListener('click', () => loadWeather(input?.value));

  document.querySelectorAll('[data-adm4]').forEach(preset => {
    preset.addEventListener('click', () => {
      const code = preset.getAttribute('data-adm4');
      if (input) input.value = code;
      loadWeather(code);
    });
  });

  // Muat otomatis jika pernah ada kode terakhir atau pakai default Sukomoro jika input ada isinya
  const saved = (() => { try { return JSON.parse(localStorage.getItem('sg-last-weather') || 'null'); } catch { return null; } })();
  if (saved?.adm4 && input) {
    input.value = saved.adm4;
    loadWeather(saved.adm4);
  }
}
