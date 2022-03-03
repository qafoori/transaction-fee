const Storage = require('../helpers/storage.helper');

/**
 *
 * Calculates total amounts of user(s) and stores them in it's
 * storage after grouping the results by a uniq key
 */
module.exports = class Amount extends Storage {
  /**
   *
   *
   *
   * @param {{user_id: number, date: string, user_type: "natural" | "juridical", type: "cash_out" | "cash_in"}} param0
   * @returns a uniq key made by transaction data
   */
  makeKey({ user_id, date, user_type, type }) {
    const weekNumber = new Date(date).getWeekNumber();
    return `user=${user_id}, week=${weekNumber}, userType=${user_type}, transaction=${type}`;
  }

  /**
   *
   *
   *
   * @param {{user_id: number, date: string, user_type: "natural" | "juridical", type: "cash_out" | "cash_in"}} param0
   * @returns stored total amount for this user in the storage
   */
  getUserAmount({ user_id, date, user_type, type }) {
    const key = this.makeKey({ user_id, date, user_type, type });
    return this.storage.get(key);
  }

  /**
   *
   *
   *
   * @param {{user_id: number, date: string, user_type: "natural" | "juridical", type: "cash_out" | "cash_in", operation: { amount: number }}} param0
   */
  calculateUserAmount({ user_id, date, user_type, type, operation: { amount } }) {
    const key = this.makeKey({ user_id, date, user_type, type });

    if (this.storage.has(key)) {
      const total = this.storage.get(key) + amount;
      this.storage.set(key, total);
    } else {
      this.storage.set(key, amount);
    }
  }

  /**
   *
   *
   *
   * @param {data: {array of transactions}} data
   */
  calculateAmounts(data) {
    for (const item of data) {
      this.calculateUserAmount(item);
    }
  }
};
