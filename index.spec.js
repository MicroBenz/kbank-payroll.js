const kbank = require('./index');

describe('Normal case', () => {
  it('should return nothing', () => {
    expect(kbank()).toEqual(undefined);
  });

  it('should return 3', () => {
    expect(kbank(3)).toEqual(3);
  });
});
