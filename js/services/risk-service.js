// js/services/risk-service.js
const RISK_RULES = {
  low:    { label: 'Rendah',  cls: '',      msg: 'Tidak ada gejala penting dicatat.' },
  medium: { label: 'Sedang',  cls: 'risk',  msg: 'Observasi kelembapan atau perubahan ringan membutuhkan pemeriksaan.' },
  high:   { label: 'Tinggi',  cls: 'high',  msg: 'Gejala menyebar atau genangan dicatat — dokumentasikan dan konsultasikan.' },
};

export function analyzeRisk(observation) {
  return RISK_RULES[observation] ?? RISK_RULES.low;
}
