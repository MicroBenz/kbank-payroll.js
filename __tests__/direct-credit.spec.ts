import fs from 'fs';
import kbank from '../src';
import utils from './test-utils';

describe('Direct Credit', () => {
  it('should correct, with only header', () => {
    const res = kbank.directCredit([], utils.getConfig());
    const header = 'HDCT                000000              1234567890 000000000000000 190222                         TMT Marketplace Pte. Ltd.                         190222000000000000000000N     \n';
    expect(res.split('\n')).toHaveLength(2);
    expect(res).toEqual(header);
  });

  it('should correct', () => {
    const res = kbank.directCredit(
      utils.getSampleTransactions(),
      { ...utils.getConfig(), date: new Date('03, 21 2019') },
    );
    const file = fs.readFileSync(`${__dirname}/direct-credit.testcase.txt`).toString();
    expect(res).toEqual(file);
  });

  it('should correct, amount send in as string', () => {
    const res = kbank.directCredit(
      utils.getSampleTransactionStringAmount(),
      { ...utils.getConfig(), date: new Date('03, 21 2019') },
    );
    const file = fs.readFileSync(`${__dirname}/direct-credit.testcase.2.txt`).toString();
    expect(res).toEqual(file);
  });
});
