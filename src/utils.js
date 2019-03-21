const { padStart, padEnd: lodashPadEnd } = require('lodash');

function getDefaultConfig() {
  return {
    date: Date.now(),
  };
}

function getAmountString(amount) {
  return (amount * 100).toFixed(0);
}

function getTotalAmount(transactions) {
  const totalAmount = transactions
    .reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
  return (totalAmount * 100).toFixed(0);
}

function validateTransactions(transactions) {
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

function padEnd(str, length) {
  return lodashPadEnd(str, length).substr(0, length);
}

module.exports = {
  getDefaultConfig,
  getAmountString,
  getTotalAmount,
  validateTransactions,
  padStart,
  padEnd,
};
