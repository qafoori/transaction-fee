require('../../configs/prototypes.config');
const Amount = require('../amount.app');
const data = require('../__mocks__/_amount.mock.json');

const amount = new Amount();
const expectedKeys = {
  cashInNatural: 'user=1, week=1, userType=natural, transaction=cash_in',
  cashInJuridical: 'user=2, week=1, userType=juridical, transaction=cash_in',
  cashOutNatural: 'user=1, week=1, userType=natural, transaction=cash_out',
  cashOutJuridical: 'user=2, week=1, userType=juridical, transaction=cash_out',
};

describe('testing `Amount` class', () => {
  describe('testing `makeKey` method', () => {
    it('should make a unique key [natural & cash_in]', () => {
      const key = amount.makeKey(data[0]);
      expect(key).toBe(expectedKeys.cashInNatural);
    });

    it('should make a unique key [juridical & cash_out]', () => {
      const key = amount.makeKey(data[1]);
      expect(key).toBe(expectedKeys.cashOutJuridical);
    });

    it('should make a unique key [natural & cash_out]', () => {
      const key = amount.makeKey(data[2]);
      expect(key).toBe(expectedKeys.cashOutNatural);
    });

    it('should make a unique key [juridical & cash_in]', () => {
      const key = amount.makeKey(data[3]);
      expect(key).toBe(expectedKeys.cashInJuridical);
    });
  });

  describe('testing `getUserAmount` & `calculateAmounts` & `calculateUserAmount` method', () => {
    it('should calculate one user total amounts per weeks', () => {
      const newAmount = new Amount();
      newAmount.calculateUserAmount(data[2]);
      expect(newAmount.getUserAmount(data[2])).toEqual(30000);
    });

    it('should result in expected map object', () => {
      const expectedResult = new Map([
        [expectedKeys.cashInNatural, 200],
        [expectedKeys.cashInJuridical, 1000000],
        [expectedKeys.cashOutNatural, 30000],
        [expectedKeys.cashOutJuridical, 300],
      ]);
      amount.calculateAmounts(data);
      expect(amount.storage).toEqual(expectedResult);
    });
  });
});
