import { requireAdmin } from '../utils/access-control.js';
import { initAdminDashboard } from '../admin/admin-dashboard.js';
if (requireAdmin()) initAdminDashboard();
