import kbank from '../src';

describe('kbank-payroll.js require module', () => {
  it('module should have 2 functions: smartPayroll and directCredit', () => {
    const keys = Object.keys(kbank);
    expect(keys.indexOf('smartPayroll')).not.toEqual(-1);
    expect(keys.indexOf('directCredit')).not.toEqual(-1);
  });
});
