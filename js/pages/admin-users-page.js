import { requireAdmin } from '../utils/access-control.js';
import { initAdminUsers } from '../admin/admin-users.js';
if (requireAdmin()) initAdminUsers();
