import { requireFarmer } from '../utils/access-control.js';
import { initWeather } from '../modules/weather.js';
if (requireFarmer()) initWeather();
