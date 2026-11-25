// js/features/weather/weather.js
import { fetchBmkg } from '../../services/weather-service.js';

export function renderWeather() {
  return `
    <div class="page-title-row">
      <div><h1>Cuaca Cerdas</h1>
      <p class="hint">Sumber: BMKG. Data aktual membutuhkan kode ADM4 desa/kelurahan yang valid.</p></div>
    </div>
    <div class="card">
      <h3>Prakiraan untuk lokasi lahan</h3>
      <div class="toolbar" style="margin-top:16px">
        <input id="adm4-input" placeholder="Contoh: 35.07.14.2001" style="flex:1" value="35.07.14.2001">
        <button class="btn" id="bmkg-fetch-btn" type="button">Ambil Prakiraan</button>
      </div>
      <div id="weather-result" style="margin-top:16px"></div>
    </div>`;
}

export function bindWeather() {
  const btn = document.getElementById('bmkg-fetch-btn');
  if (!btn) { console.error('Button not found'); return; }
  
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const code = document.getElementById('adm4-input')?.value?.trim();
    const output = document.getElementById('weather-result');
    
    if (!code) { 
      output.innerHTML = '<p style="color:red">Masukkan kode ADM4 valid.</p>'; 
      return; 
    }
    
    output.innerHTML = '<p>Mengambil data BMKG…</p>';
    try {
      const data = await fetchBmkg(code);
      output.innerHTML = `<span class="status">✓ DATA BMKG</span>
        <pre style="white-space:pre-wrap;max-height:300px;overflow:auto;margin-top:10px;font-size:0.8rem">${
          JSON.stringify(data?.data?.[0] ?? data, null, 2).slice(0, 3000)
        }</pre>`;
    } catch (err) {
      output.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
    }
  });
}
