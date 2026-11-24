import { requireFarmer } from '../utils/access-control.js';
import { initFinance } from '../modules/finance.js';
if (requireFarmer()) initFinance();
