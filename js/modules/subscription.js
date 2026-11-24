// js/modules/subscription.js
import { getUser } from '../services/auth-service.js';
import { toast } from '../utils/notifications.js';

export function initSubscription() {
  const user = getUser();
  const planEl = document.getElementById('current-plan');
  if (planEl) { planEl.className = `badge badge-${user?.plan??'free'}`; planEl.textContent = (user?.plan??'free').toUpperCase(); }
  document.getElementById('upgrade-btn')?.addEventListener('click', () =>
    toast('Simulasi: Hubungi admin untuk upgrade paket demo.', 'warning'));
}
