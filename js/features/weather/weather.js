// js/features/weather/weather.js
import { fetchBmkg } from '../../services/weather-service.js';

export function renderWeather() {
  return `
    <div class="page-title-row">
      <div><h1>Cuaca Cerdas</h1>
      <p class="hint">Sumber: BMKG. Data aktual membutuhkan kode ADM4 desa/kelurahan yang valid.</p></div>
    </div>
    <div class="card">
      <span class="status risk">Koneksi API belum dikonfigurasi</span>
      <h3>Prakiraan untuk lokasi lahan</h3>
      <div class="toolbar" style="margin-top:16px">
        <input id="adm4-input" placeholder="Kode ADM4 BMKG" style="flex:1">
        <button class="btn" id="bmkg-fetch-btn">Ambil Prakiraan</button>
      </div>
      <div id="weather-result" class="hint">Belum ada data aktual.</div>
    </div>`;
}

export function bindWeather() {
  const btn = document.getElementById('bmkg-fetch-btn');
  console.log('[bindWeather] button found:', btn);
  
  btn?.addEventListener('click', async () => {
    const code = document.getElementById('adm4-input')?.value.trim();
    const output = document.getElementById('weather-result');
    console.log('[weather] clicked, code:', code);
    
    if (!code) { output.textContent = 'Masukkan kode ADM4 valid terlebih dahulu.'; return; }
    output.textContent = 'Mengambil data BMKG…';
    try {
      console.log('[weather] fetching BMKG data for:', code);
      const data = await fetchBmkg(code);
      console.log('[weather] data received:', data);
      output.innerHTML = `<span class="status">DATA AKTUAL BMKG</span>
        <pre style="white-space:pre-wrap;max-height:220px;overflow:auto;margin-top:10px">${
          JSON.stringify(data?.data?.[0] ?? data, null, 2).slice(0, 2800)
        }</pre>`;
    } catch (err) {
      console.error('[weather] error:', err);
      output.textContent = 'Data BMKG gagal diambil. ' + err.message;
    }
  });
}
