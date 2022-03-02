const AppBase = require('./base.app')
const log = require('../scripts/log-to-console')
const { CASH_IN, CASH_OUT_JURIDICAL, CASH_OUT_NATURAL } = require('../constants/storage-types.constant')

module.exports = class App extends AppBase {
  constructor(_data) {
    super()

    this.data = _data
    this.commissions = []
    this.calculateAmounts(this.data)
  }

  async cashOut(item) {
    switch (item.user_type) {
      case 'natural': {
        await this.getCashOutNatural()
        return this.cashOutNatural(item)
      }

      case 'juridical': {
        await this.getCashOutJuridical()
        return this.cashOutJuridical(item)
      }

      default: {
        log(`${item.user_type} for user [${item.user_id}] is not supported`, 'red')
        log('Supported user types are ["natural", "juridical"]', 'blue')
        throw new Error('Unsupported user `user_type`')
      }
    }
  }

  cashOutNatural(item) {
    // prettier-ignore
    const { operation: { amount } } = item
    const totalAmount = this.getAmount(item)

    // prettier-ignore
    const { percents, week_limit: { amount: weekLimit } } = this.storage.get(CASH_OUT_NATURAL)
    const percentage = percents / 100

    if (totalAmount > weekLimit) {
      if (amount > weekLimit) {
        return ((amount - weekLimit) * percentage).toFixed(2)
      } else {
        return (amount * percentage).toFixed(2)
      }
    } else {
      return (0).toFixed(2)
    }
  }

  cashOutJuridical(item) {
    // prettier-ignore
    const { percents, min: { amount } } = this.storage.get(CASH_OUT_JURIDICAL)
    const fee = item.operation.amount * (percents / 100)

    return Math.max(fee, amount).toFixed(2)
  }

  async cashIn(item) {
    await this.getCashIn()
    const { percents, max } = this.storage.get(CASH_IN)
    const fee = item.operation.amount * (percents / 100)

    return Math.min(fee, max.amount).toFixed(2)
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
}
