import { requireFarmer } from '../utils/access-control.js';
import { initCropCycles } from '../modules/crop-cycle.js';
if (requireFarmer()) initCropCycles();
