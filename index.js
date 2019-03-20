const dayjs = require('dayjs');
const { padStart, padEnd: lodashPadEnd } = require('lodash');

dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A');

const defaultConfig = {
  date: Date.now(),
};

const padEnd = (str, length) => lodashPadEnd(str, length).substr(0, length);

function getAmount(amount) {
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

function smartPayroll(transactions = [], config) {
  if (!config.companyName) {
    throw new Error('config is invalid! companyName is required');
  }
  if (!config.accountNumber) {
    throw new Error('config is invalid! accountNumber is required');
  }
  if (!validateTransactions(transactions)) {
    throw new Error('transactions is invalid');
  }
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  };
  const totalAmount = getTotalAmount(transactions);
  const header = `HPCT                000000              ${mergedConfig.accountNumber} ${padStart(totalAmount, 15, 0)} ${dayjs(mergedConfig.date, 'DD-MM-YYYY').format('YYMMDD')}                         TMT Marketplace Pte. Ltd.                         ${dayjs(mergedConfig.date, 'DD-MM-YYYY').format('YYMMDD')}${padStart(transactions.length, 18, 0)}N     \n`;
  const transactionString = transactions
    .map((transaction, idx) => {
      return `D${padStart(idx + 1, 6, '0')}              ${transaction.accountNumber} ${padStart(getAmount(transaction.amount), 15, '0')} ${dayjs(mergedConfig.date, 'DD-MM-YYYY').format('YYMMDD')}                         ${padEnd(transaction.name, 50)}${dayjs(mergedConfig.date, 'DD-MM-YYYY').format('YYMMDD')}                                                                                                                                                                                                                                                                                                                                                                `;
    })
    .join('\n');
  return `${header}${transactionString}`;
}

function directCredit(transactions = []) {
  return transactions;
}

module.exports = {
  smartPayroll,
  directCredit,
};
