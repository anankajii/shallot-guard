import { requireFarmer } from '../utils/access-control.js';
import { initSubscription } from '../modules/subscription.js';
if (requireFarmer()) initSubscription();
