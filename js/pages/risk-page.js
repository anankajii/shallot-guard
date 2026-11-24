import { requireFarmer } from '../utils/access-control.js';
import { initRiskAnalysis } from '../modules/risk-engine.js';
if (requireFarmer()) initRiskAnalysis();
