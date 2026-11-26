# Log Pengembangan Sistem — SHALLOTGUARD

**Proyek:** ShallotGuard v1 (Agritech Budidaya Bawang Merah — Kab. Nganjuk)  
**Teknologi:** HTML5, CSS3 (Tailwind CLI + Custom CSS), Vanilla JavaScript (ES Modules), Leaflet.js, API BMKG (ADM4)  
**Repositori:** `https://github.com/anankajii/shallot-guard.git` (`main`)

---

## Ringkasan Pembagian Peran

- **Peran Pengembang (Saya):** Merancang arsitektur aplikasi dari awal, membangun struktur halaman utama (landing page, autentikasi, dashboard petani, dan panel admin), menyusun logika bisnis inti (manajemen lahan, siklus tanam, jurnal, keuangan, paket langganan), mengintegrasikan dasar peta Leaflet & endpoint BMKG, melakukan pengujian lokal di browser, serta menentukan kebijakan produk (termasuk pembukaan akses terbatas di paket Free).
- **Peran AI (Asisten Teknis — Sebagian Tahap):** Membantu mempercepat beberapa bagian teknis tertentu, seperti migrasi ikon emoji ke SVG Lucide agar seragam, perbaikan layout responsif/navbar mobile, penambahan modul simulasi AI (analisis warna foto kanvas, heatmap poligon lahan, rekomendasi cuaca berbasis parameter BMKG), serta membantu pelacakan bug teknis tertentu.

---

## Linimasa Pengembangan

### 1. Inisialisasi & Fondasi Sistem (Dikerjakan Mandiri)
**Fokus:** Membangun kerangka dasar aplikasi web statis tanpa framework berat agar ringan diakses petani.

- **Saya:**
  - Merancang konsep produk **ShallotGuard** khusus budidaya bawang merah Nganjuk dengan pemisahan peran **Petani** dan **Admin**.
  - Membuat struktur direktori proyek (`pages/`, `admin/`, `partials/`, `css/`, `js/services/`, `js/pages/`, `js/utils/`).
  - Menyusun sistem penyimpanan data lokal (`localStorage` key `sg-state`) beserta akun demo (`Free`, `Premium`, `Admin`) di `js/config/app-config.js` dan `js/services/firestore-service.js`.
  - Membangun halaman utama (`index.html`), komponen header/footer (`partials/header.html`, `partials/footer.html`), serta alur login, registrasi, dan lupa kata sandi (`login.html`, `register.html`, `forgot-password.html`).
  - Mengembangkan modul utama petani: Dashboard, Lahan Saya (`farms.html`), Siklus Tanam (`crop-cycles.html`), Jurnal (`journal.html`), Analisis Risiko (`risk-analysis.html`), Rekomendasi (`recommendations.html`), Keuangan (`finance.html`), Paket (`subscription.html`), dan Profil (`profile.html`), serta halaman manajemen Admin (`admin/*.html`).

---

### 2. Perapian Tampilan, Login & Penyeragaman Ikon SVG
**Fokus:** Memastikan tampilan autentikasi rapi di desktop maupun mobile serta mengganti ikon teks/emoji dengan SVG yang konsisten.

- **Saya:**
  - Mengatur ulang tata letak halaman `login.html`, `register.html`, dan `forgot-password.html` serta mengecek tampilan di ukuran layar ponsel.
  - Memutuskan untuk menyeragamkan seluruh ikon antarmuka menggunakan ikon vektor SVG (Lucide) agar tampilan konsisten di semua perangkat.
- **AI (Bantuan Sebagian):**
  - Membantu merapikan CSS responsif 2-kolom pada `css/login.css` serta menambahkan toggle visibilitas kata sandi.
  - Membantu mengganti simbol emoji pada sidebar (`pages/*.html`, `admin/*.html`), `stat-card`, dan `widget-title` dengan SVG inline yang seragam.

---

### 3. Pengembangan Fitur Analisis Foto Tanaman
**Fokus:** Menyediakan fitur unggah foto dan kamera langsung untuk memeriksa indikasi gejala pada daun atau umbi bawang merah.

- **Saya:**
  - Menyiapkan konsep fitur pemindaian foto gejala penyakit (seperti moler/trotol), alur pencatatan ke jurnal tanam, serta menyiapkan data sampel dummy untuk uji coba.
  - Melakukan uji coba di browser lokal dan menemukan kendala awal saat halaman belum merender riwayat dengan benar.
- **AI (Bantuan Sebagian):**
  - Membantu menyusun logika ekstraksi spektrum warna kanvas (`js/services/photo-analysis-service.js`) dan integrasi akses kamera WebRTC + fallback input file di `js/pages/photo-analysis-page.js`.
  - Membantu menemukan dan memperbaiki bug penamaan fungsi `escapeHtml` → `escHtml` yang menyebabkan skrip halaman terhenti.

---

### 4. Peta Lahan Satelit & Poligon AI
**Fokus:** Membuat peta satelit tempat petani dapat menggambar batas poligon lahannya sendiri dan melihat simulasi zona kesehatan tanaman.

- **Saya:**
  - Memilih penggunaan peta satelit berbasis **Leaflet.js** + **Esri World Imagery** dan menentukan format interaksi poligon lahan sesuai referensi desain.
  - Menguji fitur zoom peta di wilayah pedesaan dan mencatat masalah munculnya pesan *"Map data not available"* saat diperbesar maksimal.
- **AI (Bantuan Sebagian):**
  - Membantu mengintegrasikan `Leaflet.draw`, perhitungan luas poligon ($m^2$ dan hektar), serta simulasi generator grid heatmap zona hijau/kuning/merah di `js/services/map-service.js`.
  - Mengatasi masalah zoom dengan menyetel `maxNativeZoom: 17`, `maxZoom: 18`, dan `detectRetina: true` agar tile peta tetap tampil tanpa error saat diperbesar.

---

### 5. Integrasi Cuaca Cerdas (API BMKG ADM4) & Rekomendasi AI
**Fokus:** Menampilkan prakiraan cuaca aktual BMKG berdasarkan kode wilayah ADM4 lengkap dengan rekomendasi aktivitas budidaya harian.

- **Saya:**
  - Mengintegrasikan endpoint resmi BMKG (`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=...`) dan menentukan wilayah cepat untuk daerah Nganjuk (Sukomoro, Bagor, Rejoso, Gondang).
  - Menguji fitur tombol ambil prakiraan dan melaporkan kondisi tombol yang belum merespons saat dijalankan di lingkungan lokal.
- **AI (Bantuan Sebagian):**
  - Membantu membuat fungsi analisis cuaca rule-based (`analyzeWeatherForShallot` di `js/modules/weather.js`) untuk menilai kecocokan penyemprotan, pemupukan, irigasi, dan pengawasan moler.
  - Memperbaiki ketidaksesuaian nama ekspor (`fetchBmkg` vs `fetchWeather`) di `js/services/weather-service.js` serta menambahkan fallback data demo otomatis apabila akses BMKG terblokir CORS/offline.

---

### 6. Perbaikan Navbar Mobile & Penyesuaian Akses Paket Free
**Fokus:** Memastikan seluruh menu bisa diakses di layar HP dan membuka fitur Analisis Foto & Peta Lahan secara terbatas untuk pengguna Free.

- **Saya:**
  - Melakukan peninjauan langsung tampilan mobile dan menemukan bahwa banyak fitur di navbar/sidebar sulit dibuka pada layar ponsel.
  - Menetapkan kebijakan agar **Analisis Foto Tanaman** dan **Peta Lahan** tidak dikunci penuh, melainkan **dibuka untuk pengguna Free dengan batasan tertentu** serta menghapus label/badge `PRO` di sidebar.
- **AI (Bantuan Sebagian):**
  - Mengidentifikasi penyebab tombol hamburger tidak muncul di mobile (kalah spesifisitas CSS antara `.app-topbar .hamburger` di `css/dashboard.css` dan `.hamburger` di `css/responsive.css`), mengganti properti non-standar `inset-x: 0` menjadi `left: 0; right: 0`, serta menambahkan tombol **Menu** pada bilah navigasi bawah via `js/app-shell.js`.
  - Menyesuaikan `pages/photo-analysis.html`, `pages/mapping.html`, `js/pages/photo-analysis-page.js`, dan `js/pages/mapping-page.js` agar pengguna Free dapat langsung mengakses fitur dengan batas kuota (maksimal 2 riwayat foto & pemetaan 1 lahan pertama, tanpa simpan permanen ke jurnal).

---

## Status Terkini

- **Fitur Utama Petani:** Dashboard, Lahan, Siklus Tanam, Jurnal, Cuaca Cerdas BMKG (ADM4 + AI), Analisis Risiko, Analisis Foto, Peta Lahan Poligon, Rekomendasi, Keuangan, Paket, Profil — **Aktif**.
- **Panel Admin:** Dashboard, Manajemen Pengguna, Lahan, Pemantauan Risiko, Langganan, Log Audit, Pengaturan — **Aktif**.
- **Responsivitas Mobile:** Tombol hamburger topbar, drawer sidebar, dan tombol Menu di bottom bar sudah terhubung penuh.
- **Pemeriksaan Sintaks JS:** Seluruh modul JS yang dimodifikasi telah lolos pengecekan `node --check`.
