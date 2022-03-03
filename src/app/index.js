const AppBase = require('./base.app');
const log = require('../scripts/log-to-console');
const { CASH_IN, CASH_OUT_JURIDICAL, CASH_OUT_NATURAL } = require('../constants/storage-types.constant');

module.exports = class App extends AppBase {
  constructor(_data) {
    super();

    this.data = _data;
    this.commissions = [];
    this.calculateAmounts(this.data);
  }

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

  cashOutNatural({ user_id, date, user_type, type, operation: { amount } }) {
    const totalAmount = this.getUserAmount({ user_id, date, user_type, type });

    // prettier-ignore
    const { percents, week_limit: { amount: weekLimit } } = this.storage.get(CASH_OUT_NATURAL);
    const percentage = percents / 100;

    if (totalAmount > weekLimit) {
      if (amount > weekLimit) {
        return ((amount - weekLimit) * percentage).toFixed(2);
      }
      return (amount * percentage).toFixed(2);
    }
    return (0).toFixed(2);
  }

  cashOutJuridical({ operation: { amount } }) {
    // prettier-ignore
    const { percents, min: { amount: minAmount } } = this.storage.get(CASH_OUT_JURIDICAL)
    const commission = amount * (percents / 100);

    return Math.max(commission, minAmount).toFixed(2);
  }

  async cashIn({ operation: { amount } }) {
    await this.getCashIn();
    // prettier-ignore
    const { percents, max: { amount: maxAmount } } = this.storage.get(CASH_IN)
    const commission = amount * (percents / 100);

    return Math.min(commission, maxAmount).toFixed(2);
  }

  async start() {
    for (const item of this.data) {
      switch (item.type) {
        case 'cash_out': {
          this.commissions.push(await this.cashOut(item))
          break
        }

        case 'cash_in': {
          this.commissions.push(await this.cashIn(item))
          break
        }

        default: {
          log(`${item.type} for user [${item.user_id}] is not supported`, 'red')
          log('Supported transaction types are ["cash_in", "cash_out"]', 'blue')
          throw new Error('Unsupported transaction `type`')
        }
      }
    }

    return this.commissions
  }
};
