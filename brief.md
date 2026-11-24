
# SHALLOTGUARD — FINAL PROTOTYPE BUILD BRIEF

Gunakan struktur folder berikut atau struktur serupa yang lebih baik.

```text
shallotguard/
│
├── index.html
├── login.html
├── register.html
├── forgot-password.html
│
├── pages/
│   ├── dashboard.html
│   ├── farms.html
│   ├── crop-cycles.html
│   ├── journal.html
│   ├── weather.html
│   ├── scanner.html
│   ├── risk-analysis.html
│   ├── recommendations.html
│   ├── consultant.html
│   ├── ar-assistant.html
│   ├── ar-growth.html
│   ├── ar-planner.html
│   ├── ar-learning.html
│   ├── finance.html
│   ├── profit-analyzer.html
│   ├── yield-estimator.html
│   ├── simulator.html
│   ├── market-price.html
│   ├── marketplace.html
│   ├── harvest-trading.html
│   ├── community.html
│   ├── risk-alert.html
│   ├── consultation.html
│   ├── knowledge.html
│   ├── mapping.html
│   ├── subscription.html
│   └── profile.html
│
├── admin/
│   ├── index.html
│   ├── dashboard.html
│   ├── users.html
│   ├── subscriptions.html
│   ├── farms.html
│   ├── crop-cycles.html
│   ├── risk-monitoring.html
│   ├── content.html
│   ├── reports.html
│   ├── settings.html
│   └── audit-logs.html
│
├── css/
│   ├── main.css
│   ├── variables.css
│   ├── components.css
│   ├── landing.css
│   ├── dashboard.css
│   ├── admin.css
│   ├── animations.css
│   └── responsive.css
│
├── js/
│   ├── config/
│   │   └── firebase-config.js
│   │
│   ├── services/
│   │   ├── auth-service.js
│   │   ├── firestore-service.js
│   │   ├── weather-service.js
│   │   └── map-service.js
│   │
│   ├── modules/
│   │   ├── dashboard.js
│   │   ├── farm.js
│   │   ├── crop-cycle.js
│   │   ├── journal.js
│   │   ├── weather.js
│   │   ├── scanner.js
│   │   ├── risk-engine.js
│   │   ├── recommendation.js
│   │   ├── consultant.js
│   │   ├── mapping.js
│   │   ├── finance.js
│   │   ├── simulator.js
│   │   ├── market.js
│   │   ├── community.js
│   │   └── subscription.js
│   │
│   ├── admin/
│   │   ├── admin-dashboard.js
│   │   ├── admin-users.js
│   │   ├── admin-subscriptions.js
│   │   ├── admin-content.js
│   │   └── admin-reports.js
│   │
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   ├── notifications.js
│   │   └── access-control.js
│   │
│   └── app.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── illustrations/
│   └── fonts/
│
├── firebase/
│   ├── firestore.rules
│   └── firestore.indexes.json
│
├── .env.example
├── firebase.json
├── firestore.rules
└── README.md

## 1. Project Overview

Bangun SHALLOTGUARD sebagai responsive web application untuk manajemen budidaya bawang merah.

Tagline:
"Know the Risk. Act Before the Loss."

Wilayah studi kasus:
Kabupaten Nganjuk, Jawa Timur.

Platform harus membantu petani:
- Mengelola lahan.
- Mengelola siklus tanam.
- Mencatat aktivitas budidaya.
- Memantau cuaca.
- Memahami risiko budidaya.
- Mendapatkan rekomendasi tindakan.
- Mengelola keuangan usaha tani.

Fokus pada 7 fitur utama. Jangan mengembangkan modul lain di luar ruang lingkup prototype.

## 2. Technology Stack

Gunakan:
- HTML5
- CSS3
- Vanilla JavaScript
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting
- BMKG API
- Leaflet.js
- OpenStreetMap
- Chart.js
- Lucide Icons

Jangan menggunakan React, Next.js, Vue, Angular, atau backend server sendiri.

Gunakan ES Modules dan struktur JavaScript modular.

## 3. Design Direction

Buat desain profesional, modern, premium, natural, dan memiliki karakter agritech.

Hindari:
- Tampilan dashboard template generik.
- Glassmorphism berlebihan.
- Neon gradient.
- Glow berlebihan.
- Card yang semuanya identik.
- Shadow tebal.
- Dekorasi tidak berguna.

Color palette:
- Forest Green: #183B2B
- Leaf Green: #527A45
- Sage: #DCE8D7
- Cream: #F7F5EF
- White: #FFFFFF
- Soil Brown: #75533D
- Onion Red: #A64B48
- Amber: #D49A3A
- Ink: #202923
- Muted: #748078
- Border: #E4E8E1

Gunakan gradient hijau secara selektif.

Typography:
Inter atau Geist.

Tambahkan animasi ringan:
- Page transitions.
- Scroll reveal.
- Hover effects.
- Modal transitions.
- Animated counters.
- Chart animations.
- Loading skeleton.
- Toast notifications.
- Sidebar transitions.

Pastikan animasi tetap ringan di smartphone dan mendukung prefers-reduced-motion.

## 4. Technology Architecture

Frontend:
HTML + CSS + Vanilla JavaScript.

Backend services:
Firebase Authentication dan Cloud Firestore.

Weather:
BMKG API.

Mapping:
Leaflet + OpenStreetMap.

Charts:
Chart.js.

Hosting:
Firebase Hosting.

Tidak perlu membuat server backend sendiri untuk prototype.

Untuk operasi yang membutuhkan hak istimewa seperti provisioning akun dan perubahan role, gunakan Firebase Admin SDK melalui lingkungan lokal yang aman.

## 5. Main Application Features

Implementasikan hanya 7 fitur utama berikut.

### Feature 1 — Dashboard

Menampilkan:
- Greeting pengguna.
- Status paket Free/Premium.
- Total lahan.
- Siklus tanam aktif.
- Umur tanaman.
- Informasi cuaca.
- Ringkasan risiko.
- Rekomendasi tindakan.
- Aktivitas terbaru.
- Ringkasan keuangan.

Data dashboard harus berasal dari Firestore atau diberi label DEMO DATA.

### Feature 2 — Farm Management & Smart Mapping

Farm Management:
- Tambah lahan.
- Edit lahan.
- Hapus lahan.
- Detail lahan.
- Nama lahan.
- Lokasi.
- Luas lahan.
- Catatan kondisi lahan.

Smart Mapping:
- Interactive map.
- Farm location marker.
- Polygon boundary.
- Area calculation.
- Multi-farm visualization.

Free:
- Maksimal satu lahan.
- Input lokasi dasar.

Premium:
- Multi-lahan.
- Peta interaktif.
- Menggambar batas lahan.
- Perhitungan luas polygon.

Gunakan Leaflet dan penyedia tile yang sesuai ketentuan.

Simpan koordinat dan polygon ke Firestore.

### Feature 3 — Crop Cycle & Farming Journal

Crop Cycle:
- Tambah siklus tanam.
- Edit siklus.
- Varietas.
- Tanggal tanam.
- Luas tanam.
- Jumlah benih.
- Umur tanaman otomatis.
- Status siklus.

Farming Journal:
- Penyiraman.
- Pemupukan.
- Pengendalian OPT.
- Pemeliharaan.
- Panen.
- Catatan dan foto opsional.
- Timeline aktivitas.

### Feature 4 — Smart Weather Intelligence

Gunakan BMKG API.

Contoh endpoint:

https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=KODE_WILAYAH

Dokumentasi:
https://data.bmkg.go.id/prakiraan-cuaca/

Tampilkan data yang tersedia:
- Suhu.
- Kelembapan.
- Kondisi cuaca.
- Kecepatan angin.
- Curah hujan jika tersedia.
- Prakiraan.
- Sumber data.
- Waktu pembaruan.

Gunakan kode wilayah administrasi yang sesuai.

Jangan mengarang kode wilayah atau data cuaca.

Buat:
- Loading state.
- Error state.
- Last updated.
- Cache untuk mengurangi request.

### Feature 5 — AI Risk Analysis & Recommendation

Input:
- Lahan.
- Siklus tanam.
- Umur tanaman.
- Cuaca.
- Laporan petani.
- Observasi tanaman.

Output:
- Risiko rendah.
- Risiko sedang.
- Risiko tinggi.
- Faktor pemicu.
- Penjelasan.
- Rekomendasi tindakan.

Gunakan rule-based engine yang transparan.

Jangan mengarang threshold agronomi tanpa sumber validasi.

Tambahkan upload foto tanaman untuk demonstrasi indikasi kondisi tanaman.

Jika model AI belum tersedia:
- Gunakan simulasi.
- Beri label SIMULASI.
- Jangan mengklaim menggunakan model AI nyata.

Free:
Analisis risiko dasar dan rekomendasi dasar.

Premium:
Analisis lebih terperinci dan kuota fitur lebih besar.

### Feature 6 — Farm Financial Management

Fitur:
- Pencatatan pemasukan.
- Pencatatan pengeluaran.
- Kategori transaksi.
- Tanggal.
- Nominal.
- Catatan.
- Hubungan dengan lahan dan siklus tanam.

Kategori:
- Benih.
- Pupuk.
- Pestisida.
- Tenaga kerja.
- Transportasi.
- Operasional.
- Penjualan panen.

Tampilkan:
- Total pemasukan.
- Total pengeluaran.
- Keuntungan.
- Kerugian.
- Grafik keuangan.

Rumus:

Keuntungan = Total Pemasukan - Total Pengeluaran.

Free:
Pencatatan dan ringkasan keuangan.

Premium:
Analisis lanjutan, estimasi hasil panen, dan What-If Simulator.

### Feature 7 — Subscription & Admin Management

Buat sistem Free dan Premium.

Buat Admin Panel terpisah dengan route `/admin`.

Admin dapat:
- Melihat statistik platform.
- Melihat pengguna.
- Mengubah paket demo.
- Melihat jumlah lahan.
- Melihat siklus tanam.
- Melihat laporan risiko.
- Mengelola konfigurasi demo.

Admin Panel wajib dilindungi dengan otorisasi yang tervalidasi.

Jangan hanya menyembunyikan menu admin di frontend.

## 6. User Roles and Demo Accounts

Siapkan tiga akun demo.

### Admin

Email:
admin@shallotguard.demo

Password:
AdminDemo!2026

Role:
admin

Dashboard:
/admin/dashboard

### Free User

Email:
free@shallotguard.demo

Password:
FreeDemo!2026

Role:
farmer

Plan:
free

Dashboard:
/app/dashboard

### Premium User

Email:
premium@shallotguard.demo

Password:
PremiumDemo!2026

Role:
farmer

Plan:
premium

Dashboard:
/app/dashboard

Buat akun tersebut melalui Firebase Authentication.

Buat dokumen profil di Firestore.

Siapkan data demo masing-masing akun.

Jika Firebase belum dikonfigurasi, siapkan script provisioning dan panduan pembuatan akun manual.

Jangan mengklaim akun sudah aktif sebelum benar-benar dibuat.

Jangan menyimpan password di Firestore.

Password demo hanya untuk prototype.

## 7. Free vs Premium

FREE:
- Dashboard.
- Maksimal satu lahan.
- Crop Cycle.
- Farming Journal.
- Cuaca dasar.
- Analisis risiko dasar.
- Rekomendasi dasar.
- Pencatatan keuangan.
- Ringkasan keuangan.

PREMIUM:
- Seluruh fitur Free.
- Multi-lahan.
- Smart Farm Mapping.
- Polygon boundary.
- Area calculation.
- Multi-farm visualization.
- Advanced risk analysis.
- Kuota upload foto lebih besar.
- Financial analysis.
- Yield estimation.
- What-If Simulator.

ADMIN:
- Admin Panel.
- User management.
- Subscription management.
- Platform statistics.
- Demo configuration.

Jika pengguna Free membuka fitur Premium, tampilkan modal upgrade dengan preview fitur.

Jangan membuat pembayaran palsu.

Perubahan paket pada prototype dilakukan melalui Admin Panel dan diberi label simulasi.

## 8. Firebase Database

Gunakan Cloud Firestore.

Koleksi utama:

users
farms
cropCycles
journals
riskAssessments
recommendations
weatherRecords
financialTransactions
subscriptions
auditLogs

Setiap data pengguna memiliki userId.

Buat Firestore Security Rules:
- Pengguna hanya dapat mengakses data miliknya.
- Pengguna tidak dapat mengubah role sendiri.
- Pengguna tidak dapat mengubah paket sendiri.
- Admin memiliki akses berdasarkan role yang tervalidasi.
- Data sensitif tidak boleh terbuka untuk publik.

Jangan menggunakan:

allow read, write: if true;

Jangan memasukkan service account key ke frontend.

## 9. Routes

Public:
- /
- /login
- /register
- /forgot-password

Farmer:
- /app/dashboard
- /app/farms
- /app/crop-cycles
- /app/journal
- /app/weather
- /app/risk-analysis
- /app/recommendations
- /app/finance
- /app/mapping
- /app/subscription
- /app/profile

Admin:
- /admin/dashboard
- /admin/users
- /admin/subscriptions
- /admin/farms
- /admin/risk-monitoring
- /admin/settings
- /admin/audit-logs

Setiap route harus mempunyai halaman yang sesuai.

## 10. Dashboard Design

Farmer Dashboard:
- Greeting.
- Paket pengguna.
- Ringkasan lahan.
- Siklus tanam aktif.
- Cuaca.
- Risiko.
- Rekomendasi.
- Jurnal terbaru.
- Keuangan.

Admin Dashboard:
- Total pengguna.
- Free users.
- Premium users.
- Total lahan.
- Total siklus tanam.
- Laporan risiko.
- Grafik pertumbuhan pengguna.
- Aktivitas terbaru.

Gunakan data Firestore atau label DEMO DATA.

## 11. User Experience

Semua fitur harus mempunyai interaksi yang berfungsi.

Implementasikan:
- Form validation.
- Search.
- Filter.
- Modal.
- Toast.
- Confirmation dialog.
- Loading state.
- Empty state.
- Error state.
- Success state.

Jangan gunakan href="#" sebagai navigasi.

Jangan menggunakan browser alert sebagai feedback utama.

## 12. Responsive Design

Mobile-first.

Pastikan:
- Smartphone.
- Tablet.
- Laptop.
- Desktop.

Tidak ada horizontal overflow.

Gunakan sidebar desktop dan mobile navigation.

Tabel harus tetap nyaman digunakan di layar kecil.

Peta harus tetap interaktif pada smartphone.

## 13. Performance

- Gunakan JavaScript modular.
- Hindari library tidak diperlukan.
- Lazy-load gambar.
- Optimalkan aset.
- Cache API.
- Gunakan pagination.
- Debounce search.
- Hindari query Firestore berulang.
- Gunakan animasi ringan.

## 14. Project Structure

Buat struktur modular yang memisahkan:

- HTML pages.
- CSS.
- JavaScript config.
- Firebase services.
- Weather services.
- Mapping services.
- Application modules.
- Admin modules.
- Assets.

Sediakan:
- README.md
- firebase.json
- firestore.rules
- firestore.indexes.json
- .env.example jika diperlukan.

## 15. Execution Priority

PHASE 1:
- Inspect repository.
- Design system.
- Landing page.
- Responsive layout.

PHASE 2:
- Firebase setup.
- Authentication.
- Tiga akun demo.
- Role management.

PHASE 3:
- Dashboard.
- Farm Management.
- Crop Cycle.
- Farming Journal.

PHASE 4:
- BMKG integration.
- Risk Analysis.
- Recommendation.

PHASE 5:
- Finance.
- Mapping.
- Free/Premium access.

PHASE 6:
- Admin Panel.

PHASE 7:
- Testing.
- Responsive review.
- Performance review.
- Deployment.

## 16. Acceptance Criteria

- Login dan logout berjalan.
- Tiga akun demo dapat digunakan setelah provisioning.
- Dashboard menampilkan data yang sesuai.
- CRUD lahan berfungsi.
- CRUD siklus tanam berfungsi.
- CRUD jurnal berfungsi.
- Umur tanaman dihitung otomatis.
- BMKG API dapat dipanggil dan ditampilkan.
- Analisis risiko memberikan penjelasan.
- Rekomendasi dapat diperbarui statusnya.
- Keuangan menghitung pemasukan dan pengeluaran.
- Peta dapat menampilkan marker.
- Premium dapat menggambar polygon.
- Luas polygon dihitung.
- Free tidak dapat membuka fitur Premium.
- Admin dapat mengelola paket demo.
- Admin Panel terlindungi.
- Firestore Rules aktif.
- Semua halaman responsif.
- Semua tombol berfungsi.
- Tidak ada halaman kosong.
- Tidak ada error JavaScript yang belum diselesaikan.

## 17. Final Deliverables

Berikan:
1. Website prototype.
2. Landing page.
3. Login dan register.
4. Farmer dashboard.
5. Admin dashboard.
6. Tujuh fitur utama.
7. Firebase integration.
8. BMKG integration.
9. Smart Farm Mapping.
10. Free/Premium access control.
11. Tiga akun demo.
12. Demo data.
13. Firestore Rules.
14. README.
15. Firebase setup guide.
16. Deployment guide.
17. Daftar fitur simulasi.

## FINAL INSTRUCTION

Bangun SHALLOTGUARD sebagai prototype agritech yang ringan, menarik, dan benar-benar interaktif.

Jangan memperluas ruang lingkup di luar tujuh fitur utama.

Prioritaskan alur:
Daftarkan Lahan → Buat Siklus Tanam → Pantau Cuaca → Analisis Risiko → Rekomendasi → Evaluasi Keuangan.

Pastikan pengalaman Admin, Free, dan Premium dapat didemonstrasikan dengan jelas.

