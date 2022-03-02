const AppBase = require('./base.app')
const log = require('../scripts/log-to-console')
const storageTypes = require('../constants/storage-types.constant')

module.exports = class App extends AppBase {
  constructor(_data) {
    super()
    this.data = _data
  }

  async cashOut(item) {
    switch (item.user_type) {
      case 'natural': {
        await this.getCashOutNatural()
        this.cashOutNatural(item)
        break
      }

      case 'juridical': {
        await this.getCashOutJuridical()
        this.cashOutJuridical(item)
        break
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
    const { operation: { amount }, user_id, date } = item
    const totalAmount = this.getAmount(user_id, date)

    // prettier-ignore
    const { percents, week_limit: { amount: weekLimit } } = this.storage.get(storageTypes.CASH_OUT_NATURAL)
    const percentage = percents / 100

    if (totalAmount > weekLimit) {
      if (amount > weekLimit) {
        log(((amount - weekLimit) * percentage).toFixed(2), 'magenta')
      } else {
        log((amount * percentage).toFixed(2), 'magenta')
      }
    } else {
      log((0).toFixed(2), 'magenta')
    }
  }

  cashOutJuridical(item) {
    // prettier-ignore
    const { percents, min: { amount } } = this.storage.get(storageTypes.CASH_OUT_JURIDICAL)
    const fee = item.operation.amount * (percents / 100)

    log(Math.max(fee, amount).toFixed(2), 'magenta')
  }

  async cashIn(item) {
    await this.getCashIn()
    const { percents, max } = this.storage.get(storageTypes.CASH_IN)
    const fee = item.operation.amount * (percents / 100)

    log(Math.min(fee, max.amount).toFixed(2), 'magenta')
  }

  async start() {
    for (const item of this.data) {
      if (item.type === 'cash_out' && item.user_type === 'natural') {
        this.calculateAmounts(item.user_id, item.date, item.operation.amount)
      }
    }

    for (const item of this.data) {
      switch (item.type) {
        case 'cash_out': {
          await this.cashOut(item)
          break
        }

        case 'cash_in': {
          await this.cashIn(item)
          break
        }

        default: {
          log(`${item.type} for user [${item.user_id}] is not supported`, 'red')
          log('Supported transaction types are ["cash_in", "cash_out"]', 'blue')
          throw new Error('Unsupported transaction `type`')
        }
      }
    }
  }
}
