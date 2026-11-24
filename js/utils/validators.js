// js/utils/validators.js
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(pw) {
  return pw && pw.length >= 8;
}

export function validateRequired(val) {
  return val !== null && val !== undefined && String(val).trim().length > 0;
}

export function validatePositiveNumber(val) {
  return !isNaN(val) && Number(val) > 0;
}
