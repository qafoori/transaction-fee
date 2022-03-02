const ApiCaller = require("../helpers/fetch.helper");
const Storage = require("../helpers/storage.helper");
const APIs = require("../constants/api.constant");
const storageTypes = require("../constants/storage-types.constant");

module.exports = class Data extends Storage {
  static instance() {
    return new Data();
  }

  async getCashIn() {
    try {
      const savedData = this.get(storageTypes.CASH_IN);

      if (savedData) {
        // console.log('savedData: ', savedData)
        return savedData;
      } else {
        const { data } = await ApiCaller(APIs.CASH_IN);
        // console.log("fetch getCashIn", savedData);
        this.put(storageTypes.CASH_IN, data);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCashOutNatural() {
    try {
      const savedData = this.get(storageTypes.CASH_OUT_NATURAL);

      if (savedData) {
        // console.log('savedData: ', savedData)
        return savedData;
      } else {
        const { data } = await ApiCaller(APIs.CASH_OUT_NATURAL);
        // console.log("fetch getCashOutNatural", savedData);
        this.put(storageTypes.CASH_OUT_NATURAL, data);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCashOutJuridical() {
    try {
      const savedData = this.get(storageTypes.CASH_OUT_JURIDICAL);

      if (savedData) {
        // console.log("savedData: ", savedData);
        return savedData;
      } else {
        const { data } = await ApiCaller(APIs.CASH_OUT_JURIDICAL);
        // console.log("fetch getCashOutJuridical", savedData);
        this.put(storageTypes.CASH_OUT_JURIDICAL, data);
      }
    } catch (err) {
      throw new Error(err);
    }
  }
};
