import kbank from '../src';

describe('Error Handling', () => {
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
      kbank.smartPayroll([{ name: 'John Doe' }], {
        companyName: 'TMT Marketplace Pte. Ltd.',
        accountNumber: '1234567890',
        date: new Date('02, 22 2019'),
      });
    } catch (e) {
      expect(e.message).toBe('transactions is invalid');
    }
  });
});
