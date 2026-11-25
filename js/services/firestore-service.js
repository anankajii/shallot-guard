// js/services/firestore-service.js
// Firestore integration — uses demo localStorage fallback when Firebase not configured.

import { firebaseEnabled } from '../config/firebase-config.js';

const KEY = 'sg-state';

export function getState() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

export function setState(patch) {
  const s = getState();
  Object.assign(s, patch);
  localStorage.setItem(KEY, JSON.stringify(s));
}

function ensureDefaults(state) {
  state.farms    ??= [{ id:'f1', name:'Lahan Sukomoro Demo', location:'Sukomoro, Nganjuk', area:1200, soil:'Lempung berpasir', drainage:'Baik', lat:-7.552, lng:111.898, notes:'Data demo awal.' }];
  state.cycles   ??= [{ id:'c1', farmId:'f1', name:'Musim Tanam I 2026', variety:'Tajuk Nganjuk', plantDate:'2026-10-18', area:1200, seeds:60, status:'Aktif' }];
  state.journals ??= [
    { id:'j1', cycleId:'c1', date:'2026-11-20', type:'Pemupukan',  note:'KNO3 aplikasi kedua, dosis 15 kg/ha.', photo:null },
    { id:'j2', cycleId:'c1', date:'2026-11-18', type:'Penyiraman', note:'Drainase terpantau baik pasca hujan.', photo:null },
  ];
  state.finance  ??= [
    { id:'t1', farmId:'f1', cycleId:'c1', date:'2026-10-20', type:'Pengeluaran', category:'Benih',       amount:1800000, note:'60 kg benih varietas Tajuk' },
    { id:'t2', farmId:'f1', cycleId:'c1', date:'2026-11-05', type:'Pengeluaran', category:'Pupuk',       amount:620000,  note:'Pupuk dasar NPK' },
    { id:'t3', farmId:'f1', cycleId:'c1', date:'2026-11-18', type:'Pengeluaran', category:'Tenaga kerja',amount:900000,  note:'Pemupukan susulan' },
    { id:'t4', farmId:'f1', cycleId:'c1', date:'2026-12-22', type:'Pemasukan',   category:'Penjualan panen', amount:7800000, note:'Proyeksi panen demo' },
  ];
  state.risks    ??= [];
  state.photoAnalyses ??= [
    {
      id: 'pa1',
      date: '2026-11-22',
      cycleId: 'c1',
      part: 'daun',
      indication: 'Indikasi Bercak Ungu / Trotol (Alternaria porri)',
      severity: 'Sedang',
      score: 74,
      metrics: { healthyPct: 52, yellowPct: 19, necroticPct: 26 },
      explanation: 'Terdeteksi rasio piksel gelap/kemerahan-cokelat (26%) yang mengindikasikan potensi bercak nekrotik pada daun (Data Dummy).',
      recommendations: [
        'Pangkas bagian daun yang berbercak berat agar spora tidak menyebar.',
        'Hindari penyiraman overhead pada sore hari.',
        'Konsultasikan dengan PPL setempat sebelum aplikasi fungisida.',
      ],
      thumbnail: '',
    },
    {
      id: 'pa2',
      date: '2026-11-19',
      cycleId: 'c1',
      part: 'daun',
      indication: 'Kondisi Visual Relatif Sehat',
      severity: 'Rendah',
      score: 18,
      metrics: { healthyPct: 82, yellowPct: 10, necroticPct: 5 },
      explanation: 'Dominasi spektrum hijau (82%) pada sampel foto menunjukkan jaringan daun dalam kondisi baik (Data Dummy).',
      recommendations: [
        'Pertahankan jadwal pengamatan rutin setiap 2–3 hari.',
        'Jaga kebersihan gulma di sekitar bedengan.',
      ],
      thumbnail: '',
    },
  ];
  state.alerts   ??= [{ id:'a1', type:'Kelembapan tinggi', location:'Sukomoro', status:'Terverifikasi', date:'2026-11-20' }];
  state.audit    ??= [];
  state.settings ??= {};
  return state;
}

export function getData() {
  return ensureDefaults(getState());
}

export function saveData(patch) {
  setState(patch);
}

export function addItem(collection, item) {
  const s = getData();
  s[collection] = s[collection] ?? [];
  item.id = item.id || Date.now().toString(36);
  s[collection].unshift(item);
  saveData(s);
  return item;
}

export function updateItem(collection, id, patch) {
  const s = getData();
  const idx = (s[collection] ?? []).findIndex(x => x.id === id);
  if (idx === -1) return false;
  s[collection][idx] = { ...s[collection][idx], ...patch };
  saveData(s);
  return true;
}

export function deleteItem(collection, id) {
  const s = getData();
  s[collection] = (s[collection] ?? []).filter(x => x.id !== id);
  saveData(s);
}

export function logAudit(action, actor) {
  const s = getData();
  s.audit = s.audit ?? [];
  s.audit.unshift({ id: Date.now().toString(36), time: new Date().toLocaleString('id-ID'), action, actor });
  if (s.audit.length > 100) s.audit = s.audit.slice(0, 100);
  saveData(s);
}
