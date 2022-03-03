const AppBase = require('./base.app');
const log = require('../scripts/log-to-console');
const { CASH_IN, CASH_OUT_JURIDICAL, CASH_OUT_NATURAL } = require('../constants/storage-types.constant');

/**
 *
 * This is the main class
 * extends from "Data" and "Amount" classes
 * The main method is ".start()", so by calling this method, the app starts calculation data
 */
module.exports = class App extends AppBase {
  constructor(_data) {
    super();

    this.data = _data;
    this.commissions = [];

    /**
     * As the very first step, we'll calculate all transaction total amounts per week
     */
    this.calculateAmounts(this.data);
  }

  /**
   *
   *
   *
   * @param {*: transaction type, given in JSON files} param0
   * @returns commission fee for cash out (after checking for natural | juridical)
   */
  async cashOut({ user_id, date, user_type, type, operation: { amount } }) {
    switch (user_type) {
      case 'natural': {
        await this.getCashOutNatural();
        return this.cashOutNatural({
          user_id,
          date,
          user_type,
          type,
          operation: { amount },
        });
      }

      case 'juridical': {
        await this.getCashOutJuridical();
        return this.cashOutJuridical({ operation: { amount } });
      }

      default: {
        log(`${user_type} for user [${user_id}] is not supported`, 'red');
        log('Supported user types are ["natural", "juridical"]', 'blue');
        throw new Error('Unsupported user `user_type`');
      }
    }
  }

  /**
   *
   *
   *
   * @param {*: transaction type, given in JSON files} param0
   * @returns commission fee for cash_out transaction, when user is natural
   */
  cashOutNatural({ user_id, date, user_type, type, operation: { amount } }) {
    const totalAmount = this.getUserAmount({ user_id, date, user_type, type });

    // prettier-ignore
    const { percents, week_limit: { amount: weekLimit } } = this.storage.get(CASH_OUT_NATURAL);
    const percentage = percents / 100;

    if (totalAmount > weekLimit) {
      if (amount > weekLimit) {
        return (amount - weekLimit) * percentage;
      }
      return amount * percentage;
    }
    return 0;
  }

  /**
   *
   *
   *
   * @param {*: transaction type, given in JSON files} param0
   * @returns commission fee for cash_out transaction, when user is juridical
   */
  cashOutJuridical({ operation: { amount } }) {
    // prettier-ignore
    const { percents, min: { amount: minAmount } } = this.storage.get(CASH_OUT_JURIDICAL)
    const commission = amount * (percents / 100);

    return Math.max(commission, minAmount);
  }

  /**
   *
   *
   *
   * @param {*: transaction type, given in JSON files} param0
   * @returns commission fee for cash_in transaction (not depended in user type)
   */
  async cashIn({ operation: { amount } }) {
    await this.getCashIn();
    // prettier-ignore
    const { percents, max: { amount: maxAmount } } = this.storage.get(CASH_IN)
    const commission = amount * (percents / 100);

    return Math.min(commission, maxAmount);
  }

  /**
   *
   *
   *
   * @param {number} number
   * @returns manipulates the final fee. in this case, will convert integer number to ceiled float with two decimals
   */
  manipulateFee(number) {
    return number.toFixed(2);
  }

  /**
   *
   *
   *
   * @param {*: transaction type, given in JSON files} param0
   * @returns all commission fees in an array (this.commission)
   */
  async start() {
    for (const item of this.data) {
      switch (item.type) {
        case 'cash_out': {
          const finalFee = await this.cashOut(item);
          this.commissions.push(this.manipulateFee(finalFee));
          break;
        }

        case 'cash_in': {
          const finalFee = await this.cashIn(item);
          this.commissions.push(this.manipulateFee(finalFee));
          break;
        }

        default: {
          log(`${item.type} for user [${item.user_id}] is not supported`, 'red');
          log('Supported transaction types are ["cash_in", "cash_out"]', 'blue');
          throw new Error('Unsupported transaction `type`');
        }
      }
    }

    return this.commissions;
  }
};
