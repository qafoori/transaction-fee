const ApiCaller = require('../helpers/fetch.helper');
const Storage = require('../helpers/storage.helper');
const log = require('../scripts/log-to-console');
const { CASH_IN, CASH_OUT_JURIDICAL, CASH_OUT_NATURAL } = require('../constants/storage-types.constant');
const { CASH_IN_API, CASH_OUT_JURIDICAL_API, CASH_OUT_NATURAL_API } = require('../constants/api.constant');

/**
 *
 * This class will fetch necessary data from APIs
 * In the main app (../index.js) we will check if API data is needed or not
 * for example, if we had a transaction which has type of "cash_in", then we will
 * fetch it's data from API
 */
module.exports = class Data extends Storage {
  /**
   *
   * Fetch "cash_in" data from api and store in storage
   */
  async getCashIn() {
    try {
      const savedData = this.get(CASH_IN);

      if (!savedData) {
        log('Fetching "cash_in" data from API...', 'blue');
        const data = await ApiCaller(CASH_IN_API);
        this.put(CASH_IN, data);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   *
   * Fetch "cash_out_natural" data from api and store in storage
   */
  async getCashOutNatural() {
    try {
      const savedData = this.get(CASH_OUT_NATURAL);

      if (!savedData) {
        log('Fetching "cash_out_natural" data from API...', 'blue');
        const data = await ApiCaller(CASH_OUT_NATURAL_API);
        this.put(CASH_OUT_NATURAL, data);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   *
   * Fetch "cash_out_juridical" data from api and store in storage
   */
  async getCashOutJuridical() {
    try {
      const savedData = this.get(CASH_OUT_JURIDICAL);

      if (!savedData) {
        log('Fetching "cash_out_juridical" data from API...', 'blue');
        const data = await ApiCaller(CASH_OUT_JURIDICAL_API);
        this.put(CASH_OUT_JURIDICAL, data);
      }
    } catch (err) {
      throw new Error(err);
    }
  }
};
