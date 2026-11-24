import { requireFarmer } from '../utils/access-control.js';
import { initDashboard } from '../modules/dashboard.js';
if (requireFarmer()) initDashboard();
