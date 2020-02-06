import fs from 'fs';
import kbank from '../src';
import utils from './test-utils';

describe('Smart Payroll', () => {
  it('should correct, with only header', () => {
    const res = kbank.smartPayroll([], utils.getConfig());
    const header = 'HPCT                000000              1234567890 000000000000000 190222                         TMT Marketplace Pte. Ltd.                         190222000000000000000000N     \n';
    expect(res.split('\n')).toHaveLength(2);
    expect(res).toEqual(header);
  });

  it('should correct', () => {
    const res = kbank.smartPayroll(
      utils.getSampleTransactions(),
      { ...utils.getConfig(), date: new Date('03, 21 2019') },
    );
    const file = fs.readFileSync(`${__dirname}/smart-payroll.testcase.txt`).toString();
    expect(res).toEqual(file);
  });
});
