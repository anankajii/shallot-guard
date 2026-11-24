import { requireFarmer } from '../utils/access-control.js';
import { initJournal } from '../modules/journal.js';
if (requireFarmer()) initJournal();
