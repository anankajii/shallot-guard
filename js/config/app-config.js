// js/config/app-config.js
export const APP = {
  name: 'SHALLOTGUARD',
  version: '1.0.0',
  demo: true,
};

export const DEMO_ACCOUNTS = {
  'admin@shallotguard.demo':   { password: 'AdminDemo!2026',   name: 'Administrator SHALLOTGUARD', role: 'admin',  plan: 'admin'   },
  'free@shallotguard.demo':    { password: 'FreeDemo!2026',    name: 'Demo Petani Free',           role: 'farmer', plan: 'free'    },
  'premium@shallotguard.demo': { password: 'PremiumDemo!2026', name: 'Demo Petani Premium',        role: 'farmer', plan: 'premium' },
};

export const ROUTES = {
  admin:   '/admin/dashboard',
  farmer:  '/app/dashboard',
  login:   '/login',
  landing: '/',
};
