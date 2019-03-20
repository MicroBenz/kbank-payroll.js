const dayjs = require('dayjs');
const kbank = require('./index');

describe('import module', () => {
  it('should have 2 functions: smartPayroll and directCredit', () => {
    const keys = Object.keys(kbank);
    expect(keys.indexOf('smartPayroll')).not.toEqual(-1);
    expect(keys.indexOf('directCredit')).not.toEqual(-1);
  });
});

const failConfig = {

};

const config = {
  companyName: 'TMT Marketplace Pte. Ltd.',
  accountNumber: '1234567890',
  date: new Date('02, 22 2019'),
};

describe('Smart Payroll', () => {
  it('should correct, with only header', () => {
    const res = kbank.smartPayroll([], config);
    const header = 'HPCT                000000              1234567890 000000000000000 190222                         TMT Marketplace Pte. Ltd.                         190222000000000000000000N     \n';
    expect(res.split('\n')).toHaveLength(2);
    expect(res).toEqual(header);
  });

  it('should correct', () => {
    const res = kbank.smartPayroll([
      { name: 'Tananan Tangthanachaikul', amount: 63700, accountNumber: '1234567890' },
      { name: 'Nontapat Piyamongkol', amount: 12000, accountNumber: '0123456789' },
    ], config);
    expect(res.split('\n')).toHaveLength(2);
    const [header, content] = res.split('\n');
    expect(header).toEqual('HPCT                000000              1234567890 000000007570000 190222                         TMT Marketplace Pte. Ltd.                         190222000000000000000002N     ');
  });

  it('should throw error without company name', () => {
    try {
      kbank.smartPayroll([], failConfig);
    } catch (e) {
      expect(e.message).toBe('config is invalid! companyName is required');
    }
  });
});

describe('Direct Credit', () => {

});
