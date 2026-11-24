// js/features/subscription/subscription.js
import { getUser, isPremium } from '../../core/state.js';

export function renderSubscription() {
  const user = getUser();
  return `
    <div class="page-title-row">
      <div><h1>Paket &amp; Langganan</h1>
      <p class="hint">Perubahan paket prototype dilakukan oleh Admin; tidak ada payment gateway.</p></div>
    </div>
    <div class="grid" style="grid-template-columns:1fr 1fr;gap:20px;max-width:680px">
      <article class="card plan">
        <span class="status">${user?.plan === 'free' ? 'PAKET SAAT INI' : 'Free'}</span>
        <h3>Free</h3>
        <p>1 lahan, jurnal, cuaca dasar, risiko dasar, keuangan, komunitas.</p>
      </article>
      <article class="card plan premium">
        <span class="status">${isPremium() ? 'PAKET SAAT INI' : 'Premium'}</span>
        <h3>Premium</h3>
        <p>Multi-lahan, peta, analisis lanjut, simulator usaha, AR, kuota lebih besar.</p>
        ${!isPremium() ? '<button class="btn" id="upgrade-btn" style="margin-top:12px">Lihat proses upgrade</button>' : ''}
      </article>
    </div>`;
}

export function bindSubscription() {
  document.getElementById('upgrade-btn')?.addEventListener('click', () => {
    import('../../core/notifications.js').then(({ toast }) =>
      toast('Simulasi: Hubungi admin untuk perubahan paket demo.'));
  });
}
