const dayjs = require('dayjs');
const { padStart, padEnd: lodashPadEnd } = require('lodash');

dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A');

const defaultConfig = {
  date: Date.now(),
};

const padEnd = (str, length) => lodashPadEnd(str, length).substr(0, length);

function getTotalAmount(transactions) {
  const totalAmount = transactions
    .reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
  return (totalAmount * 100).toFixed(0);
}

function smartPayroll(transactions = [], config) {
  if (!config.companyName) {
    throw new Error('config is invalid! companyName is required');
  }
  if (!config.accountNumber) {
    throw new Error('config is invalid! accountNumber is required');
  }
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  };
  const totalAmount = getTotalAmount(transactions);
  const header = `HPCT                000000              ${mergedConfig.accountNumber} ${padStart(totalAmount, 15, 0)} ${dayjs(mergedConfig.date, 'DD-MM-YYYY').format('YYMMDD')}                         TMT Marketplace Pte. Ltd.                         ${dayjs(mergedConfig.date, 'DD-MM-YYYY').format('YYMMDD')}${padStart(transactions.length, 18, 0)}N     \n`;
  return header;
}

function directCredit(transactions = []) {
  return transactions;
}

module.exports = {
  smartPayroll,
  directCredit,
};
