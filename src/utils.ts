import { padStart, padEnd as lodashPadEnd } from 'lodash';
import { ITransaction } from './types';

export function getDefaultConfig() {
  return {
    date: new Date(),
  };
}

export function getAmountString(amount: number | string): string {
  return (Number(amount) * 100).toFixed(0);
}

export function getTotalAmount(transactions: ITransaction[]): string {
  const totalAmount = transactions
    .reduce((prev, curr) => {
      return prev + Number(curr.amount);
    }, 0);
  return (totalAmount * 100).toFixed(0);
}

export function validateTransactions(transactions: ITransaction[]): boolean {
  if (!Array.isArray(transactions)) return false;
  const filtered = transactions.filter((transaction) => {
    if (!transaction.name || transaction.name.length <= 0) {
      return true;
    }
    if (!transaction.amount || transaction.amount <= 0) {
      return true;
    }
    if (!transaction.accountNumber || transaction.accountNumber.length !== 10) {
      return true;
    }
    return false;
  });
  return filtered.length === 0;
}

export function padEnd(str: string, length: number): string {
  return lodashPadEnd(str, length).substr(0, length);
}

export default {
  getDefaultConfig,
  getAmountString,
  getTotalAmount,
  validateTransactions,
  padStart,
  padEnd,
};
