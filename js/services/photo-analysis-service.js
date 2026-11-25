// js/services/photo-analysis-service.js
// Simulasi analisis visual foto tanaman bawang merah berbasis distribusi warna kanvas.
// Catatan: Tidak menjalankan model AI/ML; hasil merupakan indikasi simulasi visual.

const SAMPLE_CONFIGS = {
  healthy: {
    label: 'Daun Tajuk Sehat',
    bg: '#2f4f2f',
    base: '#4d7c3f',
    spots: '#6ca357',
    spotCount: 8,
  },
  purple_blotch: {
    label: 'Bercak Ungu (Simulasi)',
    bg: '#3f5232',
    base: '#5a7840',
    spots: '#6b2d3e',
    spotCount: 22,
  },
  moler: {
    label: 'Gejala Layu / Moler (Simulasi)',
    bg: '#5c5332',
    base: '#b89b3e',
    spots: '#7a4b2a',
    spotCount: 18,
  },
};

export function createDemoSampleDataUrl(sampleKey = 'purple_blotch') {
  const cfg = SAMPLE_CONFIGS[sampleKey] || SAMPLE_CONFIGS.purple_blotch;
  const canvas = document.createElement('canvas');
  canvas.width = 360;
  canvas.height = 240;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = cfg.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gambar beberapa helai daun bawang merah sintetis
  for (let i = 0; i < 6; i++) {
    const x = 45 + i * 52;
    ctx.strokeStyle = cfg.base;
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, 230);
    ctx.quadraticCurveTo(x + (i % 2 ? 18 : -18), 120, x + (i % 2 ? -10 : 12), 25);
    ctx.stroke();
  }

  // Gambar bercak gejala
  for (let i = 0; i < cfg.spotCount; i++) {
    const sx = 35 + ((i * 53) % 290);
    const sy = 35 + ((i * 37) % 175);
    const rx = 5 + (i % 7);
    const ry = 3 + (i % 5);
    ctx.fillStyle = cfg.spots;
    ctx.beginPath();
    ctx.ellipse(sx, sy, rx, ry, (i * 0.5) % Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas.toDataURL('image/png');
}

export function extractColorMetrics(imgElement) {
  const canvas = document.createElement('canvas');
  const size = 96;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgElement, 0, 0, size, size);

  const { data } = ctx.getImageData(0, 0, size, size);
  let healthy = 0;
  let yellow = 0;
  let necrotic = 0;
  const total = size * size;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (g > r + 12 && g > b + 10) {
      healthy++;
    } else if (r > 130 && g > 110 && b < 110) {
      yellow++;
    } else if (r > g + 8 && r > b) {
      necrotic++;
    }
  }

  return {
    healthyPct: Math.round((healthy / total) * 100),
    yellowPct: Math.round((yellow / total) * 100),
    necroticPct: Math.round((necrotic / total) * 100),
  };
}

export function analyzePlantPhoto(metrics, { part = 'daun', note = '' } = {}) {
  const { healthyPct, yellowPct, necroticPct } = metrics;
  const noteLower = note.toLowerCase();

  let indication = 'Kondisi Visual Relatif Sehat';
  let severity = 'Rendah';
  let statusClass = 'badge-sage';
  let score = Math.max(10, Math.min(95, 100 - healthyPct));
  let explanation = 'Dominasi spektrum hijau pada sampel foto menunjukkan jaringan daun berada dalam kondisi cukup baik.';
  let recommendations = [
    'Pertahankan jadwal pengamatan rutin setiap 2–3 hari pada pagi hari.',
    'Jaga kebersihan gulma di sekitar bedengan agar sirkulasi udara optimal.',
  ];

  if (necroticPct >= 22 || noteLower.includes('bercak') || noteLower.includes('ungu')) {
    indication = 'Indikasi Bercak Ungu / Trotol (Alternaria porri)';
    severity = necroticPct >= 35 ? 'Tinggi' : 'Sedang';
    statusClass = severity === 'Tinggi' ? 'badge-onion' : 'badge-amber';
    score = Math.min(92, Math.max(58, 48 + necroticPct));
    explanation = `Terdeteksi rasio piksel gelap/kemerahan-cokelat (${necroticPct}%) yang mengindikasikan potensi bercak nekrotik pada ${part}.`;
    recommendations = [
      'Pangkas dan musnahkan bagian daun yang menunjukkan bercak berat agar spora tidak menyebar.',
      'Hindari penyiraman overhead (curah) pada sore hari yang memicu kelembapan daun berkepanjangan.',
      'Konsultasikan hasil indikasi ini dengan penyuluh pertanian (PPL) sebelum aplikasi fungisida.',
    ];
  } else if (yellowPct >= 25 || noteLower.includes('layu') || noteLower.includes('moler') || noteLower.includes('kuning')) {
    indication = 'Indikasi Layu Fusarium / Moler (Fusarium oxysporum)';
    severity = yellowPct >= 40 ? 'Tinggi' : 'Sedang';
    statusClass = severity === 'Tinggi' ? 'badge-onion' : 'badge-amber';
    score = Math.min(90, Math.max(54, 45 + yellowPct));
    explanation = `Dominasi spektrum kuning/klorosis (${yellowPct}%) pada ${part} sering berkaitan dengan gejala awal pelintiran atau gangguan perakaran.`;
    recommendations = [
      'Periksa kondisi drainase parit bedengan dan pastikan tidak ada genangan air.',
      'Cabut rumpun yang sudah terinfeksi parah beserta tanah di sekitarnya agar tidak menular.',
      'Catat lokasi blok terindikasi di Jurnal dan konsultasikan dengan penyuluh setempat.',
    ];
  } else if (part === 'umbi' && healthyPct < 20) {
    indication = 'Indikasi Pemeriksaan Mutu Umbi';
    severity = 'Sedang';
    statusClass = 'badge-amber';
    score = 62;
    explanation = 'Sampel foto berfokus pada umbi; periksa secara manual apakah ada jaringan lunak atau pangkal berjamur.';
    recommendations = [
      'Pastikan pengeringan pascapanen dilakukan di tempat teduh dengan sirkulasi udara baik.',
      'Pisahkan umbi yang memar atau berair dari tumpukan simpan.',
    ];
  }

  return {
    indication,
    severity,
    statusClass,
    score,
    explanation,
    recommendations,
    metrics,
    part,
  };
}
