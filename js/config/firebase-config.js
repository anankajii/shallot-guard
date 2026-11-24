// Salin ke firebase-config.local.js atau isi variabel pada Firebase Hosting.
// Jangan masukkan service-account JSON atau kredensial Admin SDK di browser.
export const firebaseConfig={
  apiKey:'',authDomain:'',projectId:'',storageBucket:'',messagingSenderId:'',appId:''
};
export const firebaseEnabled=Object.values(firebaseConfig).every(Boolean);
