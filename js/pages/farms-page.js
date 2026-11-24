import { requireFarmer } from '../utils/access-control.js';
import { initFarms } from '../modules/farm.js';
if (requireFarmer()) initFarms();
