<<<<<<< HEAD
# SHALLOTGUARD Prototype

Static Vanilla HTML/CSS/JavaScript prototype for managing shallot farming in Kabupaten Nganjuk. It uses hash routes so the complete experience runs without a backend in **DEMO MODE**.

## Run

```bash
cd D:/shallotguardv1
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Demo accounts (local DEMO MODE)

| Account | Email | Password | Route |
|---|---|---|---|
| Admin | admin@shallotguard.demo | AdminDemo!2026 | `#/admin/dashboard` |
| Free Farmer | free@shallotguard.demo | FreeDemo!2026 | `#/app/dashboard` |
| Premium Farmer | premium@shallotguard.demo | PremiumDemo!2026 | `#/app/dashboard` |

Demo data and interactions are persisted in this browser's LocalStorage. Clear site data to reset it.

## Firebase setup

1. Create a Firebase project; enable **Email/Password** and Google provider in Authentication.
2. Fill `js/config/firebase-config.js` with the Firebase web config; do not store an Admin SDK key in this repo.
3. Install Firebase CLI and deploy rules: `firebase use PROJECT_ID && firebase deploy --only firestore:rules`.
4. For real account provisioning, locally install `firebase-admin`, set `GOOGLE_APPLICATION_CREDENTIALS` to a secure untracked service-account JSON, then run `node provision-demo.mjs`.
5. Deploy hosting with `firebase deploy --only hosting`.

The frontend stays in DEMO MODE until an Auth/Firestore client implementation is connected to the populated config. This avoids falsely claiming that demo credentials are live Firebase users before Firebase is configured.

## Weather / BMKG

Weather is only requested after a valid ADM4 code is manually supplied. The app displays an error when the request fails and never substitutes fake weather data. BMKG endpoint: `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=KODE_WILAYAH`.

## Simulation labels

- Disease scanner: image input and outcome are an explicitly labelled simulation; no model is executed.
- Consultant: responses are from a demo local knowledge base.
- AR modules: interactive previews; no WebAR/3D model.
- Market price, charts, statistics, products, and offers: labelled demo data.
- Premium mapping: visual demo preview; production polygon drawing requires Leaflet + Leaflet.draw integration.
- Subscription changes: admin simulation; no payment gateway.

## Security

`firestore.rules` denies public access, prevents farmers changing their own role/plan, scopes owner data, and grants admin operations only from trusted user data/custom claims. Validate and test these rules in Firebase Emulator before production.
=======
# shallot-guard
>>>>>>> a838bda66e0cc889370e368ee12140852eab2a0a
