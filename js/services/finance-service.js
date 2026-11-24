// js/services/finance-service.js
import { state } from '../core/state.js';

export function getSummary() {
  const income  = state.finance.filter(x => x.type === 'Pemasukan').reduce((a, x) => a + x.amount, 0);
  const expense = state.finance.filter(x => x.type === 'Pengeluaran').reduce((a, x) => a + x.amount, 0);
  return { income, expense, profit: income - expense };
}

export function addTransaction(data) {
  state.finance.unshift({ ...data, amount: Number(data.amount) });
}
