const ApiCaller = require('../helpers/fetch.helper')
const Storage = require('../helpers/storage.helper')
const log = require('../scripts/log-to-console')
const { CASH_IN, CASH_OUT_JURIDICAL, CASH_OUT_NATURAL } = require('../constants/storage-types.constant')
const { CASH_IN_API, CASH_OUT_JURIDICAL_API, CASH_OUT_NATURAL_API } = require('../constants/api.constant')

module.exports = class Data extends Storage {
  async getCashIn() {
    try {
      const savedData = this.get(CASH_IN)

      if (!savedData) {
        log('Fetching "cash_in" data from API...', 'blue')
        const data = await ApiCaller(CASH_IN_API)
        this.put(CASH_IN, data)
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async getCashOutNatural() {
    try {
      const savedData = this.get(CASH_OUT_NATURAL)

      if (!savedData) {
        log('Fetching "cash_out_natural" data from API...', 'blue')
        const data = await ApiCaller(CASH_OUT_NATURAL_API)
        this.put(CASH_OUT_NATURAL, data)
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async getCashOutJuridical() {
    try {
      const savedData = this.get(CASH_OUT_JURIDICAL)

      if (!savedData) {
        log('Fetching "cash_out_juridical" data from API...', 'blue')
        const data = await ApiCaller(CASH_OUT_JURIDICAL_API)
        this.put(CASH_OUT_JURIDICAL, data)
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}
