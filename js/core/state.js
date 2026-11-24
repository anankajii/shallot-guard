// js/core/state.js — localStorage-backed demo state
const KEY = 'sg-state';

const defaults = {
  user: null,
  farms: [{ name: 'Lahan Rejoso Demo', location: 'Rejoso, Nganjuk', area: 1200, soil: 'Lempung berpasir', drainage: 'Baik' }],
  cycles: [{ name: 'Bawang Merah Demo', variety: 'Bima Brebes', date: '2026-10-18', area: 1200, status: 'Aktif' }],
  journals: [
    { date: '2026-11-20', type: 'Pemupukan',   note: 'Pemantauan dan pencatatan demo.' },
    { date: '2026-11-18', type: 'Penyiraman',  note: 'Drainase terpantau baik.' },
  ],
  finance: [
    { date: '2026-11-02', type: 'Pengeluaran', category: 'Benih',       amount: 1800000, note: 'Data demo' },
    { date: '2026-11-18', type: 'Pengeluaran', category: 'Tenaga kerja', amount: 900000,  note: 'Data demo' },
    { date: '2026-12-22', type: 'Pemasukan',   category: 'Panen',       amount: 7800000, note: 'Proyeksi demo' },
  ],
  posts:  [{ name: 'Sari, Rejoso', text: 'Bagaimana kondisi drainase setelah hujan minggu ini?', comments: 2 }],
  offers: [],
  alerts: [{ type: 'Kelembapan tinggi', location: 'Rejoso', status: 'Terverifikasi', date: '20 Nov 2026' }],
  audit:  [],
  settings: {},
  mapPolygon: null,
  mapArea: null,
};

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { ...defaults, ...saved };
  } catch { return { ...defaults }; }
}

export const state = load();

export function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function getUser() { return state.user; }
export function isPremium() { return state.user?.plan === 'premium'; }
