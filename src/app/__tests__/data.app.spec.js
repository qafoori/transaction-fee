require('../../configs');
const Data = require('../data.app');
const { CASH_IN, CASH_OUT_JURIDICAL, CASH_OUT_NATURAL } = require('../../constants/storage-types.constant');

const data = new Data();

describe('testing `Data` class', () => {
  it('should fetch `cash in` data from API', async () => {
    await data.getCashIn();
    expect(data.get(CASH_IN)).toBeDefined();
  });

  it('should fetch `cash out natural` data from API', async () => {
    await data.getCashOutNatural();
    expect(data.get(CASH_OUT_NATURAL)).toBeDefined();
  });

  it('should fetch `cash out juridical` data from API', async () => {
    await data.getCashOutJuridical();
    expect(data.get(CASH_OUT_JURIDICAL)).toBeDefined();
  });
});
