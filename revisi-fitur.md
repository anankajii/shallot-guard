
## Struktur File dan Modularisasi Kode (WAJIB)

Jangan menumpuk seluruh kode HTML, CSS, dan JavaScript dalam satu file besar. Pisahkan file berdasarkan halaman, fitur, dan tanggung jawab agar proyek mudah dikembangkan, diperbaiki, dan dipelihara.

Gunakan HTML, CSS, Vanilla JavaScript (ES Modules), tanpa React, Vue, Next.js, atau framework frontend lainnya.

### Struktur direktori yang disarankan

```text
shallotguard/
├── index.html
├── login.html
├── register.html
├── forgot-password.html
│
├── app/
│   ├── dashboard.html
│   ├── farms.html
│   ├── crop-cycles.html
│   ├── journal.html
│   ├── weather.html
│   ├── risk-analysis.html
│   ├── recommendations.html
│   ├── finance.html
│   ├── mapping.html
│   ├── subscription.html
│   └── profile.html
│
├── admin/
│   ├── dashboard.html
│   ├── users.html
│   ├── subscriptions.html
│   ├── farms.html
│   ├── risk-monitoring.html
│   ├── settings.html
│   └── audit-logs.html
│
├── assets/
│   ├── images/
│   └── icons/
│
├── css/
│   ├── base/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   └── typography.css
│   │
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── forms.css
│   │   ├── modal.css
│   │   ├── sidebar.css
│   │   └── notifications.css
│   │
│   ├── layouts/
│   │   ├── landing.css
│   │   ├── auth.css
│   │   ├── farmer-layout.css
│   │   └── admin-layout.css
│   │
│   └── features/
│       ├── dashboard.css
│       ├── farms.css
│       ├── crop-cycles.css
│       ├── journal.css
│       ├── weather.css
│       ├── risk-analysis.css
│       ├── recommendations.css
│       ├── finance.css
│       ├── mapping.css
│       └── subscription.css
│
├── js/
│   ├── config/
│   │   ├── firebase-config.js
│   │   └── app-config.js
│   │
│   ├── core/
│   │   ├── router.js
│   │   ├── auth-guard.js
│   │   ├── permissions.js
│   │   ├── firestore.js
│   │   ├── notifications.js
│   │   └── utils.js
│   │
│   ├── services/
│   │   ├── auth-service.js
│   │   ├── weather-service.js
│   │   ├── risk-service.js
│   │   ├── finance-service.js
│   │   └── map-service.js
│   │
│   ├── components/
│   │   ├── sidebar.js
│   │   ├── navbar.js
│   │   ├── modal.js
│   │   ├── toast.js
│   │   └── chart.js
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   │   └── dashboard.js
│   │   ├── farms/
│   │   │   └── farms.js
│   │   ├── crop-cycles/
│   │   │   └── crop-cycles.js
│   │   ├── journal/
│   │   │   └── journal.js
│   │   ├── weather/
│   │   │   └── weather.js
│   │   ├── risk-analysis/
│   │   │   └── risk-analysis.js
│   │   ├── recommendations/
│   │   │   └── recommendations.js
│   │   ├── finance/
│   │   │   └── finance.js
│   │   ├── mapping/
│   │   │   └── mapping.js
│   │   └── subscription/
│   │       └── subscription.js
│   │
│   └── admin/
│       ├── admin-dashboard.js
│       ├── users.js
│       ├── subscriptions.js
│       └── audit-logs.js
│
├── firestore.rules
├── firebase.json
├── README.md
└── .gitignore
```

### Aturan modularisasi

1. Setiap halaman HTML hanya berisi struktur halaman dan pemanggilan file CSS/JS yang dibutuhkan.
2. CSS global seperti warna, typography, reset, dan komponen umum ditempatkan di direktori tersendiri.
3. CSS khusus fitur ditempatkan dalam file masing-masing. Hindari satu file CSS yang menampung semua halaman.
4. JavaScript setiap fitur harus memiliki modul sendiri.
5. Fungsi yang digunakan bersama ditempatkan di `core/`, `components/`, atau `services/`, bukan diduplikasi.
6. Gunakan ES Modules (`import` dan `export`) dengan pembagian tanggung jawab yang jelas.
7. Pisahkan logika Firebase, autentikasi, Firestore, BMKG, pemetaan, dan analisis risiko dari kode tampilan.
8. Jangan membuat satu file JavaScript raksasa yang menangani seluruh fitur.
9. Hindari duplikasi kode sidebar, navbar, modal, toast, dan komponen umum.
10. Pastikan setiap modul memiliki fungsi dan tanggung jawab yang jelas serta mudah diuji.
11. Gunakan nama file dan folder yang konsisten, deskriptif, dan menggunakan `kebab-case`.
12. Jangan membuat terlalu banyak file kecil tanpa alasan. Modularisasi harus tetap praktis dan proporsional.

### Ketentuan integrasi

- Pastikan seluruh path HTML, CSS, JavaScript, gambar, dan modul import benar.
- Pastikan semua halaman tetap dapat berjalan melalui Firebase Hosting.
- Gunakan konfigurasi Firebase terpusat.
- Jangan menaruh Firebase Admin SDK atau service account key di frontend.
- Pastikan navigasi antarhalaman, autentikasi, dan proteksi role tetap berjalan.
- Setelah membuat atau mengubah modul, uji kembali fitur yang bergantung pada modul tersebut.
- Jangan mengorbankan konsistensi desain atau fungsionalitas demi pemisahan file.

**Prioritas:** kode harus mudah dibaca, dipahami, diperbaiki, dan dikembangkan. Setiap fitur harus bisa dikerjakan atau diperbarui tanpa mengganggu fitur lain.
```

Dengan struktur ini, misalnya ketika ingin mengubah fitur pemetaan, agent cukup mengerjakan `mapping.html`, `mapping.css`, `mapping.js`, dan `map-service.js` tanpa perlu membongkar seluruh kode aplikasi.

**Catatan:** struktur di atas adalah panduan, bukan berarti agent harus membuat semua file kosong sejak awal. Buat file sesuai kebutuhan implementasi dan pastikan setiap file benar-benar digunakan.