
# SHALLOTGUARD
## FINAL AGENT BUILD BRIEF — WEB PROTOTYPE

**Project:** SHALLOTGUARD  
**Tagline:** Know the Risk. Act Before the Loss.  
**Platform:** Responsive Web Application  
**Version:** Prototype v1.0  
**Development:** Vanilla HTML, CSS, JavaScript  
**Primary Region:** Kabupaten Nganjuk, Jawa Timur, Indonesia

---

# 1. ROLE AND MAIN OBJECTIVE

Bertindak sebagai Senior Frontend Developer, UI/UX Designer, dan Web Application Engineer.

Tugas utama adalah membangun website SHALLOTGUARD secara langsung di repository yang tersedia.

SHALLOTGUARD merupakan platform digital agritech untuk membantu petani bawang merah mengelola lahan, siklus tanam, informasi cuaca, risiko budidaya, rekomendasi tindakan, serta keuangan usaha tani.

Bangun website sebagai prototype yang memiliki tampilan profesional dan seluruh modul utama dapat didemonstrasikan.

## Instruksi utama

1. Gunakan HTML, CSS, dan Vanilla JavaScript.
2. Jangan menggunakan React, Next.js, Vue, Angular, Laravel, atau framework frontend lainnya.
3. Jangan membuat backend server sendiri.
4. Gunakan Firebase untuk authentication dan database.
5. Gunakan BMKG API untuk informasi cuaca.
6. Gunakan Leaflet dan OpenStreetMap untuk peta.
7. Buat halaman Admin Panel secara terpisah.
8. Implementasikan seluruh 24 modul SHALLOTGUARD.
9. Buat tiga akun demo: Admin, Free, dan Premium.
10. Seluruh fitur harus mempunyai alur interaksi yang dapat diuji.
11. Fitur yang belum memiliki API atau model AI boleh menggunakan simulasi yang jelas diberi label.
12. Jangan membuat tombol dekoratif yang tidak berfungsi.
13. Prioritaskan performa dan kompatibilitas smartphone.

Jangan hanya membuat landing page atau dashboard template.

Hasil akhir harus berupa website prototype yang dapat digunakan untuk presentasi dan demonstrasi kompetisi.

---

# 2. PRODUCT IDENTITY

## Nama Produk

SHALLOTGUARD

## Tagline

Know the Risk. Act Before the Loss.

## Deskripsi Produk

SHALLOTGUARD merupakan platform digital pertanian bawang merah yang membantu petani mengelola aktivitas budidaya, memahami potensi risiko, memperoleh rekomendasi tindakan, serta memantau perkembangan dan kondisi keuangan usaha tani.

## Target Pengguna

1. Petani bawang merah.
2. Ketua kelompok tani.
3. Penyuluh pertanian.
4. Ahli pertanian.
5. Penjual produk pertanian.
6. Pembeli hasil panen.
7. Administrator platform.

## Wilayah Studi Kasus

Kabupaten Nganjuk, Jawa Timur.

Contoh wilayah:
- Rejoso.
- Sukomoro.
- Bagor.
- Gondang.

## Prinsip Produk

- Berfokus pada solusi digital, bukan perangkat IoT.
- Tidak menggunakan ESP32, LoRa, sensor tanah, gateway, atau aktuator.
- Kondisi lahan diperoleh melalui input dan observasi pengguna.
- Data cuaca berasal dari BMKG.
- Analisis risiko harus memiliki penjelasan.
- Hasil AI merupakan indikasi, bukan diagnosis mutlak.
- Bedakan data aktual, input manual, estimasi, dan simulasi.

Jangan mengklaim sistem dapat mengukur kondisi tanah secara otomatis.

---

# 3. TECHNOLOGY STACK

Gunakan teknologi berikut.

| Teknologi | Penggunaan |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Styling, layout, responsive, animasi |
| Vanilla JavaScript | Logika dan interaksi aplikasi |
| Firebase Authentication | Google Login dan autentikasi |
| Cloud Firestore | Database |
| Firebase Hosting | Deployment website |
| BMKG API | Prakiraan cuaca |
| Leaflet.js | Peta interaktif |
| OpenStreetMap | Tile peta |
| Chart.js | Grafik dan visualisasi data |
| Lucide | Icon |
| LocalStorage | Preferensi UI dan cache sementara |

Tidak perlu menggunakan framework frontend.

Gunakan JavaScript modular agar kode mudah dipelihara.

## Ketentuan

- Gunakan ES Modules.
- Pisahkan konfigurasi Firebase.
- Pisahkan service API.
- Pisahkan logika setiap modul.
- Gunakan reusable components berbasis JavaScript jika diperlukan.
- Hindari satu file JavaScript yang terlalu besar.
- Jangan menaruh seluruh HTML aplikasi dalam satu file yang sulit dipelihara.

---

# 4. PROJECT STRUCTURE

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
```

Struktur boleh disesuaikan selama pemisahan modul, halaman, dan layanan tetap jelas.

---

# 5. VISUAL DESIGN SYSTEM

Buat desain yang modern, profesional, natural, premium, dan memiliki identitas agritech.

Jangan membuat website terlihat seperti template dashboard AI generik.

## 5.1 Color Palette

Gunakan palet warna berikut.

| Nama | Hex |
|---|---|
| Forest Green | #183B2B |
| Leaf Green | #527A45 |
| Sage | #DCE8D7 |
| Cream | #F7F5EF |
| White | #FFFFFF |
| Soil Brown | #75533D |
| Onion Red | #A64B48 |
| Amber | #D49A3A |
| Ink | #202923 |
| Muted | #748078 |
| Border | #E4E8E1 |

## 5.2 Gradient

Gunakan gradient secara selektif.

Contoh:
- Hero: Forest Green menuju Leaf Green.
- Premium highlight: Forest Green menuju Leaf Green dengan pencahayaan halus.
- Background section: Cream menuju Sage.
- CTA: Forest Green dengan sedikit variasi tonal.

Jangan menggunakan gradient pada setiap card.

Hindari:
- Neon gradient.
- Ungu-biru generik.
- Glow berlebihan.
- Glassmorphism di seluruh komponen.
- Background blob tanpa tujuan.
- Shadow tebal.

## 5.3 Typography

Gunakan:
- Inter.
- Geist.
- Font sans-serif modern lainnya.

Gunakan hierarki typography yang jelas.

## 5.4 Visual Character

Gunakan:
- Foto pertanian bawang merah.
- Ilustrasi agrikultur yang relevan.
- Grafik yang sederhana.
- Icon profesional.
- Border tipis.
- Radius 10–16px.
- Spacing yang konsisten.

Jangan menggunakan emoji sebagai icon utama.

---

# 6. ANIMATION SYSTEM

Website harus memiliki animasi yang menarik tetapi tetap ringan.

Gunakan CSS Animation, CSS Transition, dan Intersection Observer.

Animasi yang diharapkan:

1. Smooth page transition.
2. Landing page scroll reveal.
3. Hero text entrance animation.
4. Floating decorative elements secara subtil.
5. Sidebar transition.
6. Dropdown animation.
7. Modal entrance and exit.
8. Animated counters.
9. Chart animation.
10. Hover interaction pada tombol dan card.
11. Loading skeleton.
12. Toast notification.
13. Timeline progress animation.
14. Map panel transition.
15. Premium feature reveal.
16. Button loading states.

Ketentuan:
- Animasi tidak boleh mengganggu penggunaan.
- Jangan menggunakan animasi berat.
- Jangan menyebabkan layout bergeser.
- Gunakan transform dan opacity jika memungkinkan.
- Dukung prefers-reduced-motion.
- Pastikan performa smartphone tetap baik.

---

# 7. LANDING PAGE

Route: `/`

Buat landing page profesional dengan bagian:

1. Navbar.
2. Hero section.
3. Problem statement.
4. Solution.
5. How it works.
6. Main features.
7. Smart Farming preview.
8. Smart Farm Mapping preview.
9. Free vs Premium.
10. Roadmap.
11. CTA.
12. Footer.

## Hero Content

Headline:

"Kenali Risiko Budidaya Sebelum Menjadi Kerugian."

Subheadline:

"Kelola budidaya bawang merah dengan informasi cuaca, analisis risiko, pemetaan lahan, dan rekomendasi tindakan dalam satu platform."

CTA:
- Mulai Sekarang.
- Jelajahi Fitur.

Hero harus memiliki visual yang kuat.

Jangan hanya membuat teks dan dua tombol di tengah halaman.

Gunakan foto pertanian bawang merah dan gradient hijau yang halus.

---

# 8. AUTHENTICATION

Gunakan Firebase Authentication.

Metode:
- Google Sign-In.
- Email and Password.
- Logout.
- Forgot Password.

Halaman:
- Login.
- Register.
- Forgot Password.

## Alur

1. Pengguna membuka website.
2. Pengguna login atau register.
3. Firebase melakukan autentikasi.
4. Sistem memeriksa role pengguna.
5. Sistem memeriksa status paket.
6. Pengguna diarahkan ke dashboard sesuai role.

## Role

- admin
- farmer
- group_leader
- expert
- seller
- buyer

Untuk prototype, akun demo utama adalah:
- admin
- free
- premium

## Security

- Jangan menyimpan password di Firestore.
- Gunakan Firebase Authentication.
- Jangan menyimpan service account key di frontend.
- Jangan mempercayai role dari LocalStorage.
- Role harus diverifikasi melalui data tepercaya dan Firestore Security Rules atau custom claims.
- Halaman admin tidak boleh hanya dilindungi dengan menyembunyikan menu.
- Semua operasi sensitif harus memiliki validasi otorisasi.

---

# 9. DEMO ACCOUNTS

Buat tiga akun demo yang dapat digunakan saat presentasi.

Gunakan Firebase Authentication Email/Password untuk akun demo.

## Akun 1 — Admin

```text
Role: admin
Email: admin@shallotguard.demo
Password: AdminDemo!2026
Dashboard: /admin/dashboard
```

Hak akses:
- Mengakses Admin Panel.
- Melihat statistik platform.
- Mengelola pengguna.
- Mengubah status paket.
- Mengelola konten.
- Melihat laporan.
- Mengelola konfigurasi demo.
- Melihat audit log.

## Akun 2 — Free User

```text
Role: farmer
Plan: free
Email: free@shallotguard.demo
Password: FreeDemo!2026
Dashboard: /app/dashboard
```

Hak akses:
- Mengelola satu lahan demo.
- Mengelola siklus tanam.
- Membuat jurnal.
- Melihat informasi cuaca.
- Mengakses analisis risiko dasar.
- Mengakses rekomendasi dasar.
- Mengelola keuangan.
- Mengakses fitur gratis.

Fitur Premium harus menampilkan preview dan informasi upgrade.

## Akun 3 — Premium User

```text
Role: farmer
Plan: premium
Email: premium@shallotguard.demo
Password: PremiumDemo!2026
Dashboard: /app/dashboard
```

Hak akses:
- Seluruh fitur Free.
- Multi-lahan.
- Smart Farm Mapping.
- Analisis risiko lanjutan.
- AI Scanner dengan kuota demo lebih besar.
- AI Consultant dengan kuota demo lebih besar.
- What-If Business Simulator.
- Analisis keuangan lanjutan.
- Visualisasi peta risiko.
- Fitur Premium lainnya.

## Ketentuan pembuatan akun demo

Jangan hanya membuat tombol demo yang mengganti tampilan role.

Akun harus benar-benar dapat digunakan untuk login.

Jika Firebase sudah dikonfigurasi:
1. Buat akun melalui Firebase Authentication.
2. Buat dokumen profil pada Firestore.
3. Atur role dan plan.
4. Isi data demo yang sesuai.
5. Pastikan hak akses setiap akun berfungsi.

Pembuatan akun dapat menggunakan Firebase Admin SDK melalui script provisioning yang dijalankan di lingkungan lokal yang aman, atau dibuat manual melalui Firebase Console.

Jangan pernah memasukkan service account key ke frontend atau repository publik.

Jika konfigurasi Firebase belum tersedia:
- Siapkan script provisioning.
- Buat petunjuk setup.
- Jangan mengklaim akun sudah aktif.
- Sediakan mode preview lokal dengan label DEMO MODE.

**PENTING:** Ketiga password di atas hanya untuk demonstrasi. Jangan digunakan sebagai password produksi.

---

# 10. USER APPLICATION

Gunakan layout aplikasi dengan:
- Sidebar desktop.
- Mobile navigation.
- Topbar.
- Profile menu.
- Notification center.
- Main content area.
- Breadcrumb.
- Page title.

Routes utama:

```text
/app/dashboard
/app/farms
/app/crop-cycles
/app/journal
/app/weather
/app/scanner
/app/risk-analysis
/app/recommendations
/app/consultant
/app/ar-assistant
/app/ar-growth
/app/ar-planner
/app/ar-learning
/app/finance
/app/profit-analyzer
/app/yield-estimator
/app/simulator
/app/market-price
/app/marketplace
/app/harvest-trading
/app/community
/app/risk-alert
/app/consultation
/app/knowledge
/app/mapping
/app/subscription
/app/profile
```

Semua route harus memiliki halaman yang sesuai.

---

# 11. FINAL FEATURE LIST — 24 MODULES

Implementasikan seluruh 24 modul berikut.

## A. Farm Management

### 1. My Farm Management

Fitur:
- Tambah lahan.
- Edit lahan.
- Hapus lahan.
- Detail lahan.
- Nama lahan.
- Lokasi.
- Luas.
- Jenis tanah berdasarkan input.
- Kondisi drainase berdasarkan observasi.
- Catatan.

Free:
- Maksimal satu lahan demo.

Premium:
- Multi-lahan.

### 2. Crop Cycle Management

Fitur:
- Tambah siklus tanam.
- Edit siklus tanam.
- Hapus siklus tanam.
- Varietas.
- Tanggal tanam.
- Luas tanam.
- Jumlah benih.
- Umur tanaman otomatis.
- Status siklus.
- Riwayat siklus.

### 3. Digital Farming Journal

Fitur:
- Catatan penyiraman.
- Pemupukan.
- Pengendalian OPT.
- Pemeliharaan.
- Panen.
- Foto.
- Timeline aktivitas.
- Filter dan pencarian.

---

## B. AI Farming Intelligence

### 4. Smart Weather Intelligence

Integrasi BMKG API.

Data:
- Suhu.
- Kelembapan.
- Kondisi cuaca.
- Curah hujan jika tersedia.
- Kecepatan angin jika tersedia.
- Prakiraan harian.
- Waktu pembaruan.
- Sumber data.

Tampilkan prakiraan sesuai lokasi lahan.

Gunakan kode administrasi wilayah yang sesuai dengan dokumentasi BMKG.

Contoh endpoint:

```text
https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=KODE_WILAYAH
```

Jangan mengarang data cuaca.

Jika API gagal:
- Tampilkan error state.
- Tampilkan waktu pembaruan terakhir jika tersedia.
- Jangan menganggap data lama sebagai data terbaru.

### 5. AI Plant Disease Scanner

Fitur:
- Upload foto tanaman.
- Preview foto.
- Validasi gambar.
- Tombol analisis.
- Hasil indikasi.
- Confidence jika model mendukung.
- Penjelasan.
- Riwayat scan.

Untuk prototype jika model AI belum tersedia:
- Buat mode simulasi.
- Beri label "Simulasi".
- Jangan mengklaim prediksi berasal dari model AI nyata.

### 6. AI Crop Risk Prediction

Input:
- Lahan.
- Siklus tanam.
- Umur tanaman.
- Data cuaca.
- Observasi petani.
- Laporan gejala.

Output:
- Risiko rendah.
- Risiko sedang.
- Risiko tinggi.
- Faktor pemicu.
- Penjelasan.
- Waktu analisis.
- Sumber data.

Gunakan rule-based engine yang transparan.

Jangan mengarang threshold agronomi yang belum tervalidasi.

### 7. AI Action Recommendation

Output:
- Judul rekomendasi.
- Alasan.
- Urgensi.
- Langkah tindakan.
- Status.
- Riwayat.

Status:
- Belum dilakukan.
- Sedang dilakukan.
- Selesai.

Jangan memberikan dosis pestisida tanpa referensi yang dapat dipertanggungjawabkan.

### 8. AI Farming Consultant

Fitur:
- Chat interface.
- Pertanyaan budidaya.
- Jawaban berbasis knowledge base.
- Riwayat percakapan.
- Saran tindak lanjut.

Jika tidak ada API AI:
- Gunakan FAQ atau knowledge base lokal.
- Beri label bahwa jawaban berasal dari basis pengetahuan demo.
- Jangan mengklaim menggunakan model AI eksternal.

---

## C. Augmented Reality

### 9. AR Smart Field Assistant

Fitur:
- Panduan pemeriksaan tanaman.
- Akses kamera jika didukung.
- Overlay informasi.
- Panduan pengamatan.

Jika WebAR belum tersedia, buat preview interaktif.

### 10. AR Growth Visualization

Fitur:
- Visualisasi fase pertumbuhan bawang merah.
- Model atau ilustrasi 3D.
- Informasi fase pertumbuhan.

Jika model 3D belum tersedia, gunakan ilustrasi interaktif.

### 11. AR Field Layout Planner

Fitur:
- Simulasi tata letak lahan.
- Visualisasi bedengan.
- Input ukuran.
- Preview layout.

### 12. AR Farming Learning Center

Fitur:
- Materi edukasi.
- Ilustrasi.
- Panduan visual.
- Simulasi pembelajaran.

---

## D. Farm Business & Financial

### 13. Farm Financial Management

Fitur:
- Pemasukan.
- Pengeluaran.
- Kategori transaksi.
- Tanggal.
- Nominal.
- Catatan.
- Lahan.
- Siklus tanam.
- Riwayat transaksi.

Kategori biaya:
- Benih.
- Pupuk.
- Pestisida.
- Tenaga kerja.
- Transportasi.
- Operasional lainnya.

### 14. Profit & Cost Analyzer

Fitur:
- Total pemasukan.
- Total pengeluaran.
- Keuntungan.
- Kerugian.
- Biaya produksi.
- Break Even Point.
- Grafik.

Rumus:

```text
Keuntungan = Total Pemasukan - Total Pengeluaran
```

### 15. Harvest & Yield Estimator

Fitur:
- Input luas lahan.
- Input estimasi produktivitas.
- Estimasi hasil panen.
- Catatan hasil panen aktual.
- Perbandingan estimasi dan aktual.

Semua estimasi harus menampilkan asumsi yang digunakan.

### 16. What-If Business Simulator

Fitur:
- Simulasi perubahan harga jual.
- Simulasi perubahan hasil panen.
- Simulasi perubahan biaya.
- Perkiraan pendapatan.
- Perkiraan keuntungan.
- Perbandingan skenario.

Sediakan beberapa skenario:
- Optimistis.
- Normal.
- Pesimistis.
- Custom.

---

## E. Market & Agribusiness

### 17. Smart Market Price Intelligence

Fitur:
- Harga bawang merah.
- Wilayah.
- Satuan.
- Sumber data.
- Tanggal pembaruan.
- Grafik perubahan harga.

Jangan membuat harga palsu seolah-olah berasal dari API real-time.

Jika menggunakan data demo, beri label.

### 18. Agricultural Marketplace

Fitur:
- Daftar produk.
- Detail produk.
- Kategori.
- Harga.
- Penjual.
- Pencarian.
- Filter.
- Preview produk.

### 19. Harvest Trading & Buyer Connection

Fitur:
- Penawaran hasil panen.
- Detail penawaran.
- Volume panen.
- Harga penawaran.
- Lokasi.
- Status penawaran.
- Informasi pembeli.

Untuk prototype, cukup buat alur penawaran dan minat pembeli tanpa pembayaran nyata.

---

## F. Community & Collaboration

### 20. Farmer Community

Fitur:
- Feed komunitas.
- Buat posting.
- Komentar.
- Kategori diskusi.
- Profil pengguna.

### 21. Community Risk Alert

Fitur:
- Laporan kejadian.
- Jenis gangguan.
- Lokasi.
- Tanggal.
- Deskripsi.
- Status verifikasi.
- Peta laporan.

Bedakan laporan belum diverifikasi dan sudah diverifikasi.

### 22. Expert & Agricultural Consultation

Fitur:
- Daftar ahli atau penyuluh demo.
- Profil ahli.
- Topik konsultasi.
- Ajukan konsultasi.
- Status permintaan.
- Riwayat konsultasi.

---

## G. Knowledge & Education

### 23. Digital Farming Knowledge Center

Fitur:
- Artikel.
- Kategori.
- Panduan budidaya.
- Informasi hama.
- Informasi penyakit.
- Edukasi pemupukan.
- Edukasi pengelolaan lahan.
- Pencarian materi.

Konten demo harus diberi sumber atau label materi demonstrasi.

---

## H. Platform Administration

### 24. Admin & Business Management

Fitur ini wajib memiliki Admin Panel tersendiri.

Route:

```text
/admin/dashboard
/admin/users
/admin/subscriptions
/admin/farms
/admin/crop-cycles
/admin/risk-monitoring
/admin/content
/admin/reports
/admin/settings
/admin/audit-logs
```

---

# 12. ADMIN PANEL

Admin Panel merupakan bagian penting dari prototype.

Buat layout yang berbeda dari dashboard petani tetapi tetap konsisten dengan identitas visual SHALLOTGUARD.

Gunakan:
- Sidebar admin.
- Topbar.
- Breadcrumb.
- Data table.
- Search.
- Filter.
- Chart.
- Status badges.
- Modal.
- Confirmation dialog.

## 12.1 Admin Dashboard

Tampilkan:

- Total pengguna.
- Total petani Free.
- Total pengguna Premium.
- Total lahan.
- Total siklus tanam.
- Total laporan risiko.
- Total konsultasi.
- Aktivitas terbaru.
- Grafik pertumbuhan pengguna.
- Distribusi paket pengguna.

Semua angka harus berasal dari data Firestore atau diberi label demo.

## 12.2 User Management

Admin dapat:

- Melihat pengguna.
- Mencari pengguna.
- Filter role.
- Filter status.
- Melihat detail pengguna.
- Mengubah paket Free/Premium.
- Mengaktifkan atau menonaktifkan akses jika sistem mendukung.
- Melihat tanggal pendaftaran.

Perubahan role admin harus dibatasi dan tidak dapat dilakukan oleh pengguna biasa.

## 12.3 Subscription Management

Admin dapat:

- Melihat daftar langganan.
- Melihat paket pengguna.
- Mengubah status paket demo.
- Melihat tanggal mulai.
- Melihat tanggal berakhir.
- Mengelola paket.
- Mengelola batas kuota demo.

Status:
- Free.
- Premium.
- Expired.
- Suspended.

Untuk prototype tidak perlu payment gateway.

Jangan mengklaim pembayaran sungguhan sudah tersedia.

## 12.4 Farm Management

Admin dapat:
- Melihat daftar lahan.
- Melihat pemilik lahan.
- Melihat lokasi.
- Melihat luas.
- Melihat siklus tanam terkait.

Jangan menampilkan koordinat presisi kepada admin yang tidak memiliki kebutuhan atau otorisasi.

## 12.5 Crop Cycle Monitoring

Admin dapat:
- Melihat daftar siklus tanam.
- Melihat varietas.
- Melihat tanggal tanam.
- Melihat umur tanaman.
- Melihat status siklus.

## 12.6 Risk Monitoring

Admin dapat:
- Melihat laporan risiko.
- Filter wilayah.
- Filter kategori risiko.
- Melihat faktor pemicu.
- Melihat waktu laporan.
- Melihat status verifikasi.

## 12.7 Content Management

Admin dapat mengelola:
- Artikel.
- Knowledge Center.
- Materi edukasi.
- Informasi pengumuman.
- Konten halaman.

## 12.8 Reports

Admin dapat melihat:
- Statistik pengguna.
- Statistik lahan.
- Statistik siklus tanam.
- Statistik penggunaan fitur.
- Distribusi Free dan Premium.
- Aktivitas platform.

Sediakan ekspor CSV sederhana jika memungkinkan.

## 12.9 System Settings

Admin dapat mengatur:
- Nama platform.
- Informasi kontak.
- Konfigurasi paket demo.
- Batas kuota demo.
- Pengaturan konten.
- Informasi sumber cuaca.

Jangan membuat halaman settings yang tidak benar-benar menyimpan perubahan.

## 12.10 Audit Logs

Catat aktivitas penting:
- Login admin.
- Perubahan paket.
- Perubahan role.
- Pengelolaan pengguna.
- Perubahan konten.
- Perubahan pengaturan.

---

# 13. SMART FARM MAPPING — PREMIUM

Gunakan Leaflet.js dan OpenStreetMap.

Dokumentasi:
- https://leafletjs.com/
- https://www.openstreetmap.org/

Fitur:

1. Interactive Farm Map.
2. Farm Location Pin.
3. Draw Farm Boundary.
4. Polygon Area Calculation.
5. Multiple Farm Mapping.
6. Satellite View jika provider imagery tersedia.
7. Nearby Agricultural Locations jika sumber datanya tersedia.
8. Farm Distance Estimation.
9. Map-based Risk Visualization.

## Map Interaction

Petani dapat:
- Memilih lokasi lahan.
- Menambahkan marker.
- Menggambar polygon.
- Mengedit polygon.
- Menghapus polygon.
- Melihat luas hasil perhitungan.
- Menyimpan koordinat.
- Melihat beberapa lahan dalam satu peta.

Simpan:
- Latitude.
- Longitude.
- Polygon coordinates.
- Estimated area.
- Map provider.
- Updated at.

Gunakan satuan meter persegi dan hektare.

Jangan mengklaim luas polygon sebagai pengukuran survei resmi.

## Free vs Premium

Free:
- Input lokasi manual.
- Menampilkan informasi lokasi dasar.

Premium:
- Interactive mapping.
- Polygon boundary.
- Area calculation.
- Multi-farm map.
- Map-based risk visualization.

## Map Security

- Jangan mengekspos informasi lokasi presisi secara publik.
- Batasi akses data peta berdasarkan pemilik lahan.
- Gunakan tile provider sesuai ketentuan.
- Jangan melakukan scraping tile OpenStreetMap.
- Jangan menganggap OpenStreetMap menyediakan citra satelit.

---

# 14. BMKG WEATHER INTEGRATION

Gunakan API prakiraan cuaca BMKG.

Contoh endpoint:

```text
https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=KODE_WILAYAH
```

Dokumentasi:
https://data.bmkg.go.id/prakiraan-cuaca/

Implementasikan:
- Weather fetch service.
- Loading state.
- Error state.
- Last updated.
- Data source.
- Data parsing.
- Weather cards.
- Weather charts.

Data yang dapat ditampilkan jika tersedia:
- Suhu.
- Kelembapan.
- Kondisi cuaca.
- Kecepatan angin.
- Tutupan awan.
- Curah hujan atau indikator terkait jika tersedia.

Gunakan kode wilayah administrasi desa/kelurahan sesuai format BMKG.

Buat pilihan lokasi yang mudah digunakan.

Jangan menebak kode wilayah.

Jika API tidak tersedia:
- Tampilkan informasi bahwa data gagal diambil.
- Jangan membuat data cuaca palsu.

Gunakan cache dengan batas waktu yang wajar untuk mengurangi permintaan berulang.

---

# 15. FIREBASE DATABASE

Gunakan Cloud Firestore.

Struktur koleksi yang disarankan:

```text
users/{uid}
farms/{farmId}
cropCycles/{cycleId}
journals/{journalId}
weatherRecords/{recordId}
riskAssessments/{assessmentId}
recommendations/{recommendationId}
plantScans/{scanId}
financialTransactions/{transactionId}
harvestRecords/{harvestId}
marketPrices/{priceId}
products/{productId}
orders/{orderId}
harvestOffers/{offerId}
communityPosts/{postId}
riskReports/{reportId}
consultations/{consultationId}
knowledgeContent/{contentId}
notifications/{notificationId}
subscriptions/{subscriptionId}
auditLogs/{logId}
```

Setiap dokumen harus memiliki field kepemilikan yang sesuai.

Contoh users:

```json
{
  "uid": "firebase-auth-uid",
  "name": "Demo Farmer",
  "email": "free@shallotguard.demo",
  "role": "farmer",
  "plan": "free",
  "createdAt": "server timestamp"
}
```

Contoh farms:

```json
{
  "userId": "firebase-auth-uid",
  "name": "Lahan Rejoso",
  "location": "Rejoso, Nganjuk",
  "latitude": -7.5,
  "longitude": 112.0,
  "area": 1200,
  "areaUnit": "m2",
  "createdAt": "server timestamp"
}
```

Koordinat di atas hanya contoh struktur, bukan koordinat lahan sebenarnya.

## Firestore Rules

Buat Firestore Security Rules.

Ketentuan:
- Pengguna hanya mengakses data miliknya.
- Admin memiliki akses sesuai role yang tervalidasi.
- Pengguna tidak boleh mengubah role sendiri.
- Pengguna tidak boleh mengubah plan Premium sendiri.
- Pengguna tidak boleh mengubah kuota sendiri.
- Data publik hanya dapat dibaca sesuai kebutuhan.
- Data sensitif tidak boleh terbuka untuk semua pengguna.

Jangan menggunakan rules terbuka seperti:

```text
allow read, write: if true;
```

Jangan mengandalkan JavaScript frontend sebagai satu-satunya sistem keamanan.

Untuk perubahan role dan provisioning akun, gunakan Firebase Admin SDK di lingkungan tepercaya.

---

# 16. FREE AND PREMIUM SUBSCRIPTION

Buat sistem pembatasan fitur.

## Free Plan

- Satu lahan.
- Siklus tanam.
- Jurnal.
- Cuaca dasar.
- Analisis risiko dasar.
- Rekomendasi dasar.
- Scanner dengan kuota demo terbatas.
- Keuangan.
- Knowledge Center.
- Komunitas.
- Notifikasi dasar.

## Premium Plan

Seluruh Free, ditambah:

- Multi-lahan.
- Smart Farm Mapping.
- Polygon boundary.
- Area calculation.
- Multi-farm map.
- Advanced risk analysis.
- Scanner dengan kuota lebih besar.
- AI Consultant dengan kuota lebih besar.
- What-If Simulator.
- Advanced financial analysis.
- Advanced market intelligence.
- AR features.
- Advanced reports.

## Premium Gate

Jika pengguna Free membuka fitur Premium:

Tampilkan modal:

"Fitur ini tersedia untuk pengguna SHALLOTGUARD Premium."

Isi modal:
- Nama fitur.
- Penjelasan manfaat.
- Preview visual.
- Daftar keuntungan Premium.
- Tombol "Lihat Paket Premium".

Jangan hanya menampilkan halaman kosong.

## Subscription Logic

Simpan status paket di Firestore.

Contoh:

```json
{
  "plan": "premium",
  "status": "active",
  "startedAt": "server timestamp",
  "expiresAt": null
}
```

Untuk prototype, admin dapat mengubah paket pengguna.

Jangan mengimplementasikan pembayaran palsu.

Jika belum ada payment gateway, jelaskan bahwa perubahan paket merupakan simulasi admin.

---

# 17. DEMO DATA

Buat data demo yang realistis untuk presentasi.

## Demo Free User

Nama:
Demo Petani Free

Lahan:
Lahan Rejoso Demo

Luas:
1200 m2

Siklus:
Bawang Merah Demo

Tanggal tanam:
Gunakan tanggal demonstrasi yang konsisten.

Data:
- Beberapa jurnal budidaya.
- Beberapa transaksi.
- Riwayat cuaca demo jika API gagal.
- Contoh analisis risiko.
- Rekomendasi tindakan.

Semua data buatan harus memiliki penanda demo.

## Demo Premium User

Nama:
Demo Petani Premium

Lahan:
- Lahan Rejoso A.
- Lahan Sukomoro B.
- Lahan Bagor C.

Buat:
- Beberapa siklus tanam.
- Jurnal aktivitas.
- Riwayat keuangan.
- Polygon lahan demo.
- Contoh visualisasi peta.
- Analisis risiko.
- Rekomendasi.
- Contoh simulasi bisnis.

## Demo Admin

Admin dapat melihat agregasi data demo dari kedua akun tersebut.

Jangan membuat angka demo seolah-olah merupakan statistik petani nyata di Kabupaten Nganjuk.

---

# 18. DASHBOARD DESIGN

## Farmer Dashboard

Tampilkan:
- Greeting pengguna.
- Status paket Free/Premium.
- Total lahan.
- Siklus tanam aktif.
- Umur tanaman.
- Cuaca.
- Risiko.
- Rekomendasi.
- Aktivitas terbaru.
- Keuangan.
- Quick actions.

Buat dashboard dengan hierarki informasi yang jelas.

Jangan memenuhi halaman dengan card identik.

## Admin Dashboard

Tampilkan:
- Total users.
- Free users.
- Premium users.
- Total farms.
- Total crop cycles.
- Risk reports.
- Consultation requests.
- User growth chart.
- Subscription distribution.
- Recent activities.

Admin Panel harus memiliki identitas dan navigasi yang jelas.

---

# 19. USER EXPERIENCE

Semua halaman harus memiliki:

- Loading state.
- Empty state.
- Error state.
- Success state.
- Form validation.
- Toast notification.
- Confirmation dialog.
- Search dan filter jika relevan.
- Responsive layout.

Jangan gunakan browser alert sebagai sistem notifikasi utama.

Gunakan modal dan toast yang konsisten.

Semua tombol harus bekerja.

Jangan gunakan href="#" sebagai placeholder navigasi.

---

# 20. RESPONSIVE DESIGN

Website harus mobile-first.

Target:
- Smartphone.
- Tablet.
- Laptop.
- Desktop.

Ketentuan:
- Sidebar desktop.
- Bottom navigation atau mobile drawer.
- Tidak ada horizontal overflow.
- Form mudah digunakan.
- Tombol mudah disentuh.
- Tabel dapat di-scroll atau diubah menjadi card pada smartphone.
- Grafik responsif.
- Peta tetap dapat digunakan pada layar kecil.

---

# 21. PERFORMANCE

Karena menggunakan Vanilla JavaScript, jaga aplikasi tetap ringan.

Ketentuan:
- Jangan mengimpor library yang tidak diperlukan.
- Hindari library animasi berat.
- Lazy-load gambar.
- Gunakan ukuran gambar yang sesuai.
- Hindari query Firestore berulang.
- Cache data yang sesuai.
- Gunakan pagination untuk data besar.
- Gunakan debounce pada search.
- Hindari rendering DOM berulang yang tidak perlu.
- Jangan mengunduh seluruh data sekaligus.
- Gunakan CSS dan JavaScript modular.

---

# 22. API AND CONFIGURATION

Siapkan konfigurasi Firebase.

File:

`js/config/firebase-config.js`

Gunakan konfigurasi dari Firebase Console.

Contoh environment/configuration:

```text
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
```

Catatan:
Firebase Web API key bukan pengganti sistem keamanan. Keamanan data harus diterapkan melalui Firestore Rules dan konfigurasi Firebase.

Untuk Firebase Hosting, gunakan konfigurasi yang kompatibel dengan static website.

Siapkan:
- firebase.json
- firestore.rules
- firestore.indexes.json
- README.md

Jangan menaruh service account JSON di frontend.

---

# 23. ADMIN PROVISIONING

Siapkan cara membuat akun demo.

Gunakan salah satu metode:

A. Firebase Console:
- Membuat tiga akun Authentication.
- Membuat dokumen users.
- Menentukan role dan plan.

B. Firebase Admin SDK:
- Buat script provisioning lokal.
- Gunakan service account hanya di lingkungan lokal yang aman.
- Buat user Authentication.
- Buat dokumen profil.
- Set custom claims jika diperlukan.
- Seed data demo.

Script provisioning tidak boleh dijalankan di browser.

Jika belum ada konfigurasi Firebase, buat panduan manual dan jangan mengklaim akun sudah berhasil dibuat.

Pastikan akun demo dapat login dan diarahkan ke dashboard yang sesuai.

---

# 24. TESTING AND ACCEPTANCE CRITERIA

Website dinyatakan berhasil jika:

## Authentication
- Google Login berfungsi.
- Email/password login berfungsi.
- Logout berfungsi.
- User diarahkan berdasarkan role.
- Akun demo dapat digunakan jika Firebase telah dikonfigurasi.

## Free User
- Dapat mengakses dashboard.
- Dapat mengelola lahan sesuai batas.
- Dapat membuat siklus tanam.
- Dapat membuat jurnal.
- Dapat melihat cuaca.
- Dapat mengakses analisis risiko dasar.
- Dapat mencatat keuangan.
- Tidak dapat mengakses fitur Premium tanpa hak akses.

## Premium User
- Dapat mengakses seluruh fitur Free.
- Dapat mengakses multi-lahan.
- Dapat menggunakan Smart Farm Mapping.
- Dapat menggambar polygon.
- Dapat menggunakan simulasi bisnis.
- Dapat mengakses fitur Premium lainnya.

## Admin
- Dapat membuka Admin Panel.
- Dapat melihat statistik.
- Dapat melihat pengguna.
- Dapat mengubah paket demo.
- Dapat mengelola konten.
- Dapat melihat laporan.
- Dapat melihat audit logs.
- Tidak ada pengguna biasa yang dapat membuka fungsi admin.

## BMKG
- API dapat diakses.
- Data berhasil diparsing.
- Sumber ditampilkan.
- Waktu pembaruan ditampilkan.
- Error ditangani.

## Mapping
- Peta tampil.
- Marker dapat dibuat.
- Polygon dapat digambar.
- Luas dapat dihitung.
- Data polygon dapat disimpan.
- Akses Premium berjalan.

## General
- Semua navigasi bekerja.
- Semua tombol berfungsi.
- Form tervalidasi.
- Tidak ada halaman kosong.
- Tidak ada error JavaScript yang belum diselesaikan.
- Website responsif.
- Animasi tidak mengganggu performa.
- Firestore Rules tidak terbuka untuk publik.

---

# 25. EXECUTION ORDER

Kerjakan secara berurutan.

## PHASE 1 — FOUNDATION

- Inspect repository.
- Buat struktur project.
- Siapkan HTML.
- Siapkan CSS.
- Siapkan JavaScript modules.
- Siapkan design system.
- Implementasikan landing page.
- Implementasikan animasi.

## PHASE 2 — AUTHENTICATION

- Firebase initialization.
- Google Sign-In.
- Email/password.
- Login.
- Register.
- Logout.
- Role routing.
- Demo accounts.

## PHASE 3 — APPLICATION CORE

- Dashboard petani.
- Farm Management.
- Crop Cycle Management.
- Digital Farming Journal.
- Profile.

## PHASE 4 — WEATHER AND INTELLIGENCE

- BMKG integration.
- Weather dashboard.
- Rule-based risk engine.
- Recommendations.
- Scanner demo.
- Consultant demo.

## PHASE 5 — BUSINESS FEATURES

- Financial Management.
- Profit Analyzer.
- Yield Estimator.
- What-If Simulator.
- Market Price.
- Marketplace.
- Harvest Trading.

## PHASE 6 — MAPPING AND PREMIUM

- Leaflet.
- OpenStreetMap.
- Farm marker.
- Polygon.
- Area calculation.
- Premium access control.
- Subscription management.

## PHASE 7 — COMMUNITY AND AR

- Community.
- Risk Alert.
- Expert Consultation.
- Knowledge Center.
- AR Assistant.
- AR Growth.
- AR Planner.
- AR Learning Center.

## PHASE 8 — ADMIN PANEL

- Admin dashboard.
- User management.
- Subscription management.
- Farm monitoring.
- Crop cycle monitoring.
- Risk monitoring.
- Content management.
- Reports.
- Settings.
- Audit logs.

## PHASE 9 — TESTING

- Authentication testing.
- Role testing.
- Free/Premium access testing.
- Firestore testing.
- BMKG testing.
- Mapping testing.
- Responsive testing.
- Performance testing.
- Browser console inspection.

---

# 26. FINAL DELIVERABLES

Setelah implementasi selesai, berikan:

1. Website yang dapat dijalankan.
2. Landing page.
3. Login dan register.
4. Dashboard petani.
5. Dashboard Premium.
6. Admin Panel.
7. Seluruh 24 modul.
8. Firebase integration.
9. BMKG integration.
10. Smart Farm Mapping.
11. Free/Premium access control.
12. Tiga akun demo.
13. Data demo.
14. Firestore Rules.
15. Script provisioning jika diperlukan.
16. README.md.
17. Panduan Firebase setup.
18. Panduan deployment Firebase Hosting.
19. Daftar fitur simulasi.
20. Daftar fitur yang membutuhkan integrasi tambahan.

---

# 27. FINAL INSTRUCTIONS

Prioritaskan kualitas implementasi, pengalaman pengguna, dan konsistensi visual.

Jangan membuat website yang hanya terlihat bagus pada screenshot.

Setiap modul harus mempunyai halaman, interaksi, dan alur yang jelas.

Seluruh fitur harus dapat didemonstrasikan.

Untuk fitur yang belum memiliki layanan backend atau AI:
- Buat simulasi yang realistis.
- Gunakan data demo.
- Berikan label simulasi.
- Jangan membuat klaim palsu.

Pastikan Admin, Free, dan Premium memiliki pengalaman penggunaan yang berbeda.

Admin harus memiliki panel tersendiri.

Free harus dapat menggunakan fitur dasar.

Premium harus dapat mengakses fitur lanjutan.

**Target akhir: SHALLOTGUARD harus terlihat seperti produk agritech profesional yang siap didemonstrasikan dalam kompetisi, dibangun dengan teknologi web sederhana, ringan, dan mudah dikembangkan.**
