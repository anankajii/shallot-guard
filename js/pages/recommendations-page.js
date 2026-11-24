import { requireFarmer } from '../utils/access-control.js';
import { toast } from '../utils/notifications.js';
if (requireFarmer()) {
  document.getElementById('rec-done-1')?.addEventListener('click', () => {
    toast('Rekomendasi ditandai selesai.', 'success');
    document.getElementById('rec-done-1').disabled = true;
    document.getElementById('rec-done-1').textContent = ' Selesai';
  });
}
