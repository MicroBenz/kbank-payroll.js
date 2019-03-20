const fs = require('fs');
const kbank = require('./index');

describe('import module', () => {
  it('should have 2 functions: smartPayroll and directCredit', () => {
    const keys = Object.keys(kbank);
    expect(keys.indexOf('smartPayroll')).not.toEqual(-1);
    expect(keys.indexOf('directCredit')).not.toEqual(-1);
  });
});

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
    expect(res.split('\n')).toHaveLength(3);
    const [header, ...content] = res.split('\n');
    expect(header).toEqual('HPCT                000000              1234567890 000000007570000 190222                         TMT Marketplace Pte. Ltd.                         190222000000000000000002N     ');
    expect(content.join('\n')).toEqual(`D000001              1234567890 000000006370000 190222                         Tananan Tangthanachaikul                          190222                                                                                                                                                                                                                                                                                                                                                                
D000002              0123456789 000000001200000 190222                         Nontapat Piyamongkol                              190222                                                                                                                                                                                                                                                                                                                                                                `);
  });

  it('should correct with "almost" real-case', () => {
    const res = kbank.smartPayroll([
      { name: 'Nontapat Piyamongkol', amount: 6370, accountNumber: '4371992192' },
      { name: 'Tananan Tangthanachaikul', amount: 3700, accountNumber: '4371992192' },
      { name: 'Kunakorn Test', amount: 12500, accountNumber: '4371992192' },
      { name: 'Peerapong Hongchaipat', amount: 3670, accountNumber: '4371992192' },
      { name: 'Manuswee Thepwhat', amount: 6770, accountNumber: '4371992192' },
      { name: 'Kanrayanin Poonsin', amount: 2770, accountNumber: '4371992192' },
      { name: 'Amorntest Ched', amount: 1970, accountNumber: '4371992192' },
      { name: 'Noppon Test', amount: 8970, accountNumber: '4371992192' },
    ], { ...config, date: new Date('03, 21 2019') });
    const file = fs.readFileSync(`${__dirname}/test-cases/smart-payroll.txt`).toString();
    expect(res).toEqual(file);
  });
  it('should throw error without company name', () => {
    try {
      kbank.smartPayroll([], {});
    } catch (e) {
      expect(e.message).toBe('config is invalid! companyName is required');
    }
  });

  it('should throw error without account number in config', () => {
    try {
      kbank.smartPayroll([], { companyName: 'John Company' });
    } catch (e) {
      expect(e.message).toBe('config is invalid! accountNumber is required');
    }
  });

  it('should throw error if some transaction missing required data', () => {
    try {
      kbank.smartPayroll([{ name: 'John Doe' }], config);
    } catch (e) {
      expect(e.message).toBe('transactions is invalid');
    }
  });
});

describe('Direct Credit', () => {

});
