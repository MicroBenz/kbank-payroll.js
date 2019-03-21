module.exports = {
  getConfig: () => ({
    companyName: 'TMT Marketplace Pte. Ltd.',
    accountNumber: '1234567890',
    date: new Date('02, 22 2019'),
  }),
  getSampleTransactions: () => [
    { name: 'Nontapat Piyamongkol', amount: 6370, accountNumber: '4371992192' },
    { name: 'Tananan Tangthanachaikul', amount: 3700, accountNumber: '4371992192' },
    { name: 'Kunakorn Test', amount: 12500, accountNumber: '4371992192' },
    { name: 'Peerapong Hongchaipat', amount: 3670, accountNumber: '4371992192' },
    { name: 'Manuswee Thepwhat', amount: 6770, accountNumber: '4371992192' },
    { name: 'Kanrayanin Poonsin', amount: 2770, accountNumber: '4371992192' },
    { name: 'Amorntest Ched', amount: 1970, accountNumber: '4371992192' },
    { name: 'Noppon Test', amount: 8970, accountNumber: '4371992192' },
  ],
};
