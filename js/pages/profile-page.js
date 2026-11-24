import { requireFarmer } from '../utils/access-control.js';
import { getUser } from '../services/auth-service.js';
import { getData, saveData } from '../services/firestore-service.js';
import { toast } from '../utils/notifications.js';

if (requireFarmer()) {
  const user = getUser();
  if (user) {
    const initial = user.name?.[0]?.toUpperCase() ?? '?';
    document.getElementById('profile-avatar').textContent = initial;
    document.getElementById('profile-name-display').textContent = user.name;
    document.getElementById('profile-email-display').textContent = user.email;
    document.getElementById('profile-plan-badge').textContent = user.plan.toUpperCase();
    document.getElementById('profile-name-input').value = user.name;
    document.getElementById('profile-email-input').value = user.email;
    document.getElementById('profile-plan-input').value = user.plan;
  }
  document.getElementById('profile-form')?.addEventListener('submit', e => {
    e.preventDefault();
    toast('Profil diperbarui (demo — Firebase diperlukan untuk perubahan permanen).', 'success');
  });
}
