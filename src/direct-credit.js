const dayjs = require('dayjs');

const utils = require('./utils');

module.exports = function directCredit(transactions = [], config) {
  if (!config.companyName) {
    throw new Error('config is invalid! companyName is required');
  }
  if (!config.accountNumber) {
    throw new Error('config is invalid! accountNumber is required');
  }
  if (!utils.validateTransactions(transactions)) {
    throw new Error('transactions is invalid');
  }
  const mergedConfig = {
    ...utils.getDefaultConfig(),
    ...config,
  };
  const totalAmount = utils.getTotalAmount(transactions);
  const header = `HDCT                000000              ${mergedConfig.accountNumber} ${utils.padStart(totalAmount, 15, 0)} ${dayjs(mergedConfig.date).format('YYMMDD')}                         TMT Marketplace Pte. Ltd.                         ${dayjs(mergedConfig.date).format('YYMMDD')}${utils.padStart(transactions.length, 18, 0)}N     \n`;
  const transactionString = transactions
    .map((transaction, idx) => {
      return `D${utils.padStart(idx + 1, 6, '0')}              ${transaction.accountNumber} ${utils.padStart(utils.getAmountString(transaction.amount), 15, '0')} ${dayjs(mergedConfig.date).format('YYMMDD')}                         ${utils.padEnd(transaction.name, 50)}${dayjs(mergedConfig.date).format('YYMMDD')}000000                                                                                                                                                                                                                                                                                                                                                          `;
    })
    .join('\n');
  return `${header}${transactionString}`;
};
