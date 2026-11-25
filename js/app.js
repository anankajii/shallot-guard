// js/app.js — SPA orchestrator (ES Module)
// Semua fitur diimport dari modul masing-masing. File ini hanya mengatur routing,
// render shell, dan bind event global. Tidak ada logika fitur di sini.

import { state, save, getUser, isPremium } from './core/state.js';
import { toast }   from './core/notifications.js';
import { $, $$ }   from './core/utils.js';
import { money }   from './core/utils.js';
import { logout }  from './services/auth-service.js';

// ── Feature renderers ──────────────────────────────────────────
import { renderDashboard }        from './features/dashboard/dashboard.js';
import { renderFarms }            from './features/farms/farms.js';
import { renderCycles }           from './features/crop-cycles/crop-cycles.js';
import { renderJournal }          from './features/journal/journal.js';
import { renderWeather,  bindWeather }         from './features/weather/weather.js';
import { renderRiskAnalysis, bindRiskAnalysis } from './features/risk-analysis/risk-analysis.js';
import { renderRecommendations, bindRecommendations } from './features/recommendations/recommendations.js';
import { renderFinance }          from './features/finance/finance.js';
import { renderMapping, bindMapping } from './features/mapping/mapping.js';
import { renderSubscription, bindSubscription } from './features/subscription/subscription.js';

// ── Admin renderers ────────────────────────────────────────────
import { renderAdminDashboard }   from './admin/admin-dashboard.js';
import { renderUsers }            from './admin/users.js';
import { renderAdminSubscriptions } from './admin/subscriptions.js';
import { renderAuditLogs }        from './admin/audit-logs.js';

// ── Sidebar / navbar ───────────────────────────────────────────
import { renderSidebar, bindSidebar } from './components/sidebar.js';
import { renderNavbar,  bindNavbar  } from './components/navbar.js';
import { openModal, closeModal }      from './components/modal.js';

// ══════════════════════════════════════════════════════════════
// FARMER MODULE LIST (sidebar)
// ══════════════════════════════════════════════════════════════
const FARMER_MODULES = [
  ['dashboard', 'Dashboard'], ['farms', 'Lahan Saya'],
  ['crop-cycles', 'Siklus Tanam'], ['journal', 'Jurnal Digital'],
  ['weather', 'Cuaca Cerdas'], ['risk-analysis', 'Analisis Risiko'],
  ['recommendations', 'Rekomendasi'], ['finance', 'Keuangan'],
  ['mapping', 'Peta Lahan'], ['subscription', 'Paket'], ['profile', 'Profil'],
];

const ADMIN_MODULES = [
  ['dashboard',       'Dashboard'],
  ['users',           'Pengguna'],
  ['subscriptions',   'Langganan'],
  ['farms',           'Lahan'],
  ['crop-cycles',     'Siklus Tanam'],
  ['risk-monitoring', 'Monitoring Risiko'],
  ['content',         'Konten'],
  ['reports',         'Laporan'],
  ['settings',        'Pengaturan'],
  ['audit-logs',      'Audit Logs'],
];

// ══════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════
function nav(path) { location.hash = path; }

function ageDays(d) { return Math.max(0, Math.floor((Date.now() - new Date(d)) / 86400000)); }

function log(action) {
  state.audit.unshift({ time: new Date().toLocaleString('id-ID'), action, actor: getUser()?.email ?? 'system' });
  save();
}

// ══════════════════════════════════════════════════════════════
// FORM MODALS
// ══════════════════════════════════════════════════════════════
const FORM_TEMPLATES = {
  farm: `<h2>Tambah Lahan</h2>
    <form data-form="farm">
      <div class="form-row"><label>Nama lahan</label><input required name="name"></div>
      <div class="form-row"><label>Lokasi</label><input required name="location" placeholder="Rejoso, Nganjuk"></div>
      <div class="form-row"><label>Luas (m²)</label><input required type="number" name="area"></div>
      <div class="form-row"><label>Jenis tanah</label><input name="soil" value="Lempung berpasir"></div>
      <div class="form-row"><label>Drainase</label>
        <select name="drainage"><option>Baik</option><option>Sedang</option><option>Perlu perbaikan</option></select>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn outline" data-close>Batal</button>
        <button class="btn">Simpan Lahan</button>
      </div>
    </form>`,

  cycle: `<h2>Tambah Siklus Tanam</h2>
    <form data-form="cycle">
      <div class="form-row"><label>Nama siklus</label><input name="name" required value="Bawang Merah"></div>
      <div class="form-row"><label>Varietas</label><input name="variety" required></div>
      <div class="form-row"><label>Tanggal tanam</label><input name="date" type="date" required></div>
      <div class="form-row"><label>Luas tanam (m²)</label><input name="area" type="number" required></div>
      <div class="modal-actions">
        <button type="button" class="btn outline" data-close>Batal</button>
        <button class="btn">Simpan Siklus</button>
      </div>
    </form>`,

  journal: `<h2>Catat Jurnal</h2>
    <form data-form="journal">
      <div class="form-row"><label>Tanggal</label><input name="date" type="date" required></div>
      <div class="form-row"><label>Aktivitas</label>
        <select name="type">
          <option>Penyiraman</option><option>Pemupukan</option>
          <option>Pengendalian OPT</option><option>Pemeliharaan</option><option>Panen</option>
        </select>
      </div>
      <div class="form-row"><label>Catatan</label><textarea name="note" required></textarea></div>
      <div class="modal-actions">
        <button type="button" class="btn outline" data-close>Batal</button>
        <button class="btn">Simpan Catatan</button>
      </div>
    </form>`,

  transaction: `<h2>Tambah Transaksi</h2>
    <form data-form="transaction">
      <div class="form-row"><label>Tanggal</label><input name="date" type="date" required></div>
      <div class="form-row"><label>Jenis</label>
        <select name="type"><option>Pengeluaran</option><option>Pemasukan</option></select>
      </div>
      <div class="form-row"><label>Kategori</label><input name="category" required placeholder="Benih / Panen"></div>
      <div class="form-row"><label>Nominal</label><input name="amount" type="number" required></div>
      <div class="form-row"><label>Catatan</label><input name="note"></div>
      <div class="modal-actions">
        <button type="button" class="btn outline" data-close>Batal</button>
        <button class="btn">Simpan Transaksi</button>
      </div>
    </form>`,
};

function showFormModal(kind) {
  if (FORM_TEMPLATES[kind]) openModal(FORM_TEMPLATES[kind]);
}

function premiumGate(feature) {
  if (isPremium()) return false;
  openModal(`
    <span class="pill" style="color:var(--leaf)">Premium Feature</span>
    <h2>${feature}</h2>
    <p>Fitur ini tersedia untuk pengguna SHALLOTGUARD Premium.</p>
    <div class="modal-actions">
      <button class="btn outline" data-close>Tutup</button>
      <button class="btn" id="goto-sub">Lihat Paket Premium</button>
    </div>`);
  document.getElementById('goto-sub')?.addEventListener('click', () => {
    closeModal(); nav('/app/subscription');
  });
  return true;
}

// ══════════════════════════════════════════════════════════════
// SHELL RENDERER (sidebar + navbar wrapper)
// ══════════════════════════════════════════════════════════════
function renderShell(isAdmin) {
  if (!getUser()) { nav('/login'); location.href = 'login.html'; return false; }
  if (isAdmin && getUser().role !== 'admin') { nav('/app/dashboard'); return false; }
  if (!isAdmin && getUser().role === 'admin') { nav('/admin/dashboard'); return false; }

  const modules = isAdmin ? ADMIN_MODULES : FARMER_MODULES;
  const prefix  = isAdmin ? '/admin' : '/app';
  const curId   = location.hash.split('/').pop();

  document.getElementById('app').innerHTML = `
    <div class="app">
      <aside class="side">
        <a class="brand" href="index.html">SHALLOT<b>GUARD</b></a>
        <small>${isAdmin ? 'Administrasi' : 'Aplikasi Petani'}</small>
        ${modules.map(([id, name]) =>
          `<a href="#${prefix}/${id}" data-id="${id}" class="${curId === id ? 'active' : ''}">${name}</a>`
        ).join('')}
        <small>Akun</small>
        <a href="#/app/profile">${getUser().name}</a>
        <a href="#" id="logout-btn">Keluar</a>
      </aside>
      <main class="content">
        <header class="app-top">
          <div>
            <b>${isAdmin ? 'Panel Admin' : 'SHALLOTGUARD'}</b>
            <span class="status" style="margin-left:8px">${isAdmin ? 'ADMIN' : 'DEMO ' + getUser().plan.toUpperCase()}</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            ${getUser().name}
            <button class="btn sm" id="top-logout-btn">Keluar</button>
          </div>
        </header>
        <nav class="mobile-nav">
          ${modules.slice(0, 8).map(([id, name]) =>
            `<a href="#${prefix}/${id}">${name}</a>`).join('')}
        </nav>
        <div class="page" id="page"></div>
      </main>
    </div>`;

  document.getElementById('logout-btn')?.addEventListener('click', e => { e.preventDefault(); logout(); location.href = 'login.html'; });
  document.getElementById('top-logout-btn')?.addEventListener('click', () => { logout(); location.href = 'login.html'; });
  return true;
}

// ══════════════════════════════════════════════════════════════
// FARMER PAGE RENDERERS (misc pages not in feature modules)
// ══════════════════════════════════════════════════════════════
function renderProfile() {
  const u = getUser();
  return `
    <div class="page-title-row"><div><h1>Profil</h1><p class="hint">Perubahan profil demo tersimpan lokal.</p></div></div>
    <div class="card" style="max-width:480px">
      <form id="profile-form">
        <div class="form-row"><label>Nama</label><input name="name" value="${u.name}" required></div>
        <div class="form-row"><label>Email</label><input value="${u.email}" disabled></div>
        <div class="form-row"><label>Paket</label><input value="${u.plan}" disabled></div>
        <button class="btn" style="margin-top:4px">Simpan Profil</button>
      </form>
    </div>`;
}

function renderAdminGeneric(id) {
  const dataMap = {
    farms:            ['Monitoring Lahan',      'Pemilik, lokasi umum, dan luas lahan demo.',
                        state.farms.map(x => [x.name, x.location, x.area + ' m²'])],
    'crop-cycles':    ['Monitoring Siklus',      'Pantau varietas, tanggal tanam, umur, dan status.',
                        state.cycles.map(x => [x.name, x.variety, ageDays(x.date) + ' hari'])],
    'risk-monitoring':['Risk Monitoring',        'Laporan risiko demo yang menunggu atau telah terverifikasi.',
                        state.alerts.map(x => [x.type, x.location, x.status])],
    content:          ['Content Management',    'Kelola artikel dan materi demo.',
                        [['Observasi dini gangguan', 'Knowledge', 'Published'], ['Drainase lahan', 'Guide', 'Published']]],
    reports:          ['Reports',               'Ekspor CSV sederhana untuk data demo.',
                        [['Pengguna', '3', 'Demo'], ['Lahan', state.farms.length, 'Demo'], ['Siklus', state.cycles.length, 'Demo']]],
    settings:         ['System Settings',       'Perubahan disimpan lokal pada mode demo.', []],
    'audit-logs':     ['Audit Logs',            'Aktivitas penting pada prototype.',
                        state.audit.map(x => [x.time, x.actor, x.action])],
  };

  const info = dataMap[id];
  if (!info) return `<div class="page-title-row"><div><h1>${id}</h1></div></div><p class="hint">Halaman dalam pengembangan.</p>`;

  if (id === 'settings') {
    return `<div class="page-title-row"><div><h1>${info[0]}</h1><p class="hint">${info[1]}</p></div></div>
      <div class="card" style="max-width:480px">
        <form id="settings-form">
          <div class="form-row"><label>Nama platform</label><input name="platform" value="SHALLOTGUARD"></div>
          <div class="form-row"><label>Kontak</label><input name="contact" value="demo@shallotguard.local"></div>
          <div class="form-row"><label>Sumber cuaca</label><input value="BMKG API" disabled></div>
          <button class="btn">Simpan Pengaturan</button>
        </form>
      </div>`;
  }

  const csvBtn = id === 'reports' ? '<button class="btn" id="csv-btn">Ekspor CSV</button>' : '';
  return `<div class="page-title-row"><div><h1>${info[0]}</h1><p class="hint">${info[1]}</p></div>${csvBtn}</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Item</th><th>Detail</th><th>Status</th></tr></thead>
        <tbody>
          ${info[2].length
            ? info[2].map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')
            : '<tr><td colspan="3" class="empty">Belum ada data.</td></tr>'}
        </tbody>
      </table>
    </div>`;
}

// ══════════════════════════════════════════════════════════════
// BIND GLOBAL EVENTS (after every render)
// ══════════════════════════════════════════════════════════════
function bindPage() {
  // Navigation buttons
  $$('[data-nav]').forEach(b => { b.onclick = () => nav(b.dataset.nav); });
  $$('[data-close]').forEach(b => { b.onclick = () => closeModal(); });
  $$('[data-add]').forEach(b  => { b.onclick = () => showFormModal(b.dataset.add); });
  $$('[data-done]').forEach(b => { b.onclick = () => toast(b.dataset.done); });

  // Delete buttons
  $$('[data-delete]').forEach(b => {
    b.onclick = () => {
      const [type, i] = b.dataset.delete.split(':');
      const keyMap = { farm: 'farms', cycle: 'cycles', journal: 'journals', transaction: 'finance' };
      state[keyMap[type]]?.splice(+i, 1);
      save(); toast('Data dihapus.'); render();
    };
  });

  // Form submits inside modals
  $$('[data-form]').forEach(form => {
    form.onsubmit = e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const type = form.dataset.form;
      if (type === 'farm') {
        if (!isPremium() && state.farms.length >= 1) {
          closeModal(); premiumGate('Multi-lahan'); return;
        }
        state.farms.push({ ...data, area: +data.area });
      }
      if (type === 'cycle')       state.cycles.push({ ...data, area: +data.area, status: 'Aktif' });
      if (type === 'journal')     state.journals.unshift(data);
      if (type === 'transaction') state.finance.unshift({ ...data, amount: +data.amount });
      save(); closeModal(); toast('Data tersimpan.'); render();
    };
  });

  // Profile form
  const profileForm = $('#profile-form');
  if (profileForm) {
    profileForm.onsubmit = e => {
      e.preventDefault();
      getUser().name = new FormData(profileForm).get('name');
      save(); toast('Profil disimpan.'); render();
    };
  }

  // Admin settings form
  const settingsForm = $('#settings-form');
  if (settingsForm) {
    settingsForm.onsubmit = e => {
      e.preventDefault();
      state.settings = Object.fromEntries(new FormData(settingsForm));
      save(); log('Admin menyimpan pengaturan platform'); toast('Pengaturan demo disimpan.');
    };
  }

  // Admin CSV export
  const csvBtn = $('#csv-btn');
  if (csvBtn) {
    csvBtn.onclick = () => {
      const rows = [['Jenis','Nilai','Status'],['Pengguna','3','Demo'],
        ['Lahan', state.farms.length, 'Demo'], ['Siklus', state.cycles.length, 'Demo']];
      const blob = new Blob([rows.map(r => r.join(',')).join('\n')], { type: 'text/csv' });
      const a = Object.assign(document.createElement('a'), {
        href: URL.createObjectURL(blob), download: 'shallotguard-report-demo.csv',
      });
      a.click(); log('Admin mengekspor CSV laporan demo');
    };
  }

  // Admin toggle plan
  $$('[data-toggle-plan]').forEach(b => {
    b.onclick = () => {
      const { DEMO_ACCOUNTS } = window.__sg_config ?? {};
      toast('Simulasi: paket pengguna diperbarui (Firebase diperlukan untuk perubahan nyata).');
      log(`Admin mengubah paket ${b.dataset.togglePlan}`);
    };
  });

  // Admin upgrade simulation
  $('#upgrade-btn')?.addEventListener('click', () =>
    toast('Simulasi: Hubungi admin untuk perubahan paket demo.'));

  // Search filters
  for (const [inputId, selector] of [
    ['user-search', 'tbody tr'],
    ['product-search', '.product'],
    ['knowledge-search', '#knowledge .card'],
  ]) {
    const el = $(`#${inputId}`);
    if (el) {
      el.oninput = () => $$(`${selector}`).forEach(x => {
        x.style.display = x.textContent.toLowerCase().includes(el.value.toLowerCase()) ? '' : 'none';
      });
    }
  }
}

// ══════════════════════════════════════════════════════════════
// ROUTER
// ══════════════════════════════════════════════════════════════
function render() {
  const path = location.hash.slice(1) || '/';

  if (path === '/logout') {
    logout(); location.href = 'login.html'; return;
  }

  if (path === '/' || path === '') {
    location.href = 'index.html'; return;
  }

  if (path === '/login') {
    location.href = 'login.html'; return;
  }
  if (path === '/register') {
    location.href = 'register.html'; return;
  }
  if (path === '/forgot-password') {
    location.href = 'forgot-password.html'; return;
  }

  const parts = path.split('/');     // ['', 'app'|'admin', 'page-id']
  const section = parts[1];
  const pageId  = parts[2] ?? 'dashboard';

  if (section === 'app') {
    if (!renderShell(false)) return;
    renderFarmerPage(pageId);
  } else if (section === 'admin') {
    if (!renderShell(true)) return;
    renderAdminPage(pageId);
  } else {
    location.href = 'index.html';
  }

  bindPage();
}

function renderFarmerPage(id) {
  const page = $('#page');
  if (!page) return;

  const renderMap = {
    dashboard:       renderDashboard,
    farms:           renderFarms,
    'crop-cycles':   renderCycles,
    journal:         renderJournal,
    weather:         () => { const h = renderWeather(); setTimeout(bindWeather, 0); return h; },
    'risk-analysis': () => { const h = renderRiskAnalysis(); setTimeout(bindRiskAnalysis, 0); return h; },
    recommendations: () => { const h = renderRecommendations(); setTimeout(bindRecommendations, 0); return h; },
    finance:         renderFinance,
    mapping:         () => { const h = renderMapping(premiumGate); setTimeout(bindMapping, 0); return h; },
    subscription:    () => { const h = renderSubscription(); setTimeout(bindSubscription, 0); return h; },
    profile:         renderProfile,
  };

  const renderer = renderMap[id] ?? renderDashboard;
  page.innerHTML = renderer();
}

function renderAdminPage(id) {
  const page = $('#page');
  if (!page) return;

  const adminMap = {
    dashboard:    renderAdminDashboard,
    users:        renderUsers,
    subscriptions: renderAdminSubscriptions,
    farms:        () => `<div class="page-title-row"><h1>Lahan Semua Petani</h1></div><div class="widget" style="padding:var(--sp-6)"><p>Daftar lahan: ${state.farms.length} total</p><table class="data-table" style="width:100%;border-collapse:collapse"><tr style="border-bottom:1px solid var(--border)"><th style="text-align:left;padding:var(--sp-3)">Nama</th><th style="text-align:left;padding:var(--sp-3)">Lokasi</th><th style="text-align:left;padding:var(--sp-3)">Luas (m²)</th><th style="text-align:left;padding:var(--sp-3)">Petani</th></tr>${state.farms.map(f => `<tr style="border-bottom:1px solid var(--border)"><td style="padding:var(--sp-3)">${f.name}</td><td style="padding:var(--sp-3)">${f.location}</td><td style="padding:var(--sp-3)">${f.area}</td><td style="padding:var(--sp-3)">${f.owner || 'Demo'}</td></tr>`).join('')}</table></div>`,
    'audit-logs': renderAuditLogs,
  };

  const renderer = adminMap[id] ?? (() => renderAdminGeneric(id));
  page.innerHTML = renderer();
}

// ══════════════════════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════════════════════
window.addEventListener('hashchange', render);
render();
