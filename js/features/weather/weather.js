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
      <div id="weather-logs" style="margin-top:16px;padding:12px;background:rgba(0,0,0,.05);border-radius:var(--r-md);font-size:0.8125rem;max-height:200px;overflow-y:auto;font-family:monospace;color:var(--muted)"></div>
    </div>`;
}

function addLog(msg) {
  const logsDiv = document.getElementById('weather-logs');
  if (!logsDiv) return;
  const time = new Date().toLocaleTimeString('id-ID');
  const line = document.createElement('div');
  line.textContent = `[${time}] ${msg}`;
  logsDiv.insertBefore(line, logsDiv.firstChild);
  if (logsDiv.children.length > 20) logsDiv.removeChild(logsDiv.lastChild);
}

export function bindWeather() {
  const btn = document.getElementById('bmkg-fetch-btn');
  addLog('Button binding...');
  
  btn?.addEventListener('click', async () => {
    const code = document.getElementById('adm4-input')?.value.trim();
    const output = document.getElementById('weather-result');
    addLog(`Button clicked, code: ${code || '(empty)'}`);
    
    if (!code) { 
      output.textContent = 'Masukkan kode ADM4 valid terlebih dahulu.'; 
      addLog('ERROR: Code is empty');
      return; 
    }
    output.textContent = 'Mengambil data BMKG…';
    try {
      addLog(`Fetching BMKG data for: ${code}`);
      const data = await fetchBmkg(code);
      addLog(`Data received: ${data?.lokasi?.desa || 'unknown'}`);
      output.innerHTML = `<span class="status">DATA AKTUAL BMKG</span>
        <pre style="white-space:pre-wrap;max-height:220px;overflow:auto;margin-top:10px">${
          JSON.stringify(data?.data?.[0] ?? data, null, 2).slice(0, 2800)
        }</pre>`;
    } catch (err) {
      addLog(`ERROR: ${err.message}`);
      output.textContent = 'Data BMKG gagal diambil. ' + err.message;
    }
  });
}
