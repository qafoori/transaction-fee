const Storage = require('../helpers/storage.helper');

module.exports = class Amount extends Storage {
  makeKey({ user_id, date, user_type, type }) {
    const weekNumber = new Date(date).getWeekNumber();
    return `user=${user_id}, week=${weekNumber}, userType=${user_type}, transaction=${type}`;
  }

  getUserAmount({ user_id, date, user_type, type }) {
    const key = this.makeKey({ user_id, date, user_type, type });
    return this.storage.get(key);
  }

  calculateUserAmount({ user_id, date, user_type, type, operation: { amount } }) {
    const key = this.makeKey({ user_id, date, user_type, type });

    if (this.storage.has(key)) {
      const total = this.storage.get(key) + amount;
      this.storage.set(key, total);
    } else {
      this.storage.set(key, amount);
    }
  }

  calculateAmounts(data) {
    for (const item of data) {
      this.calculateUserAmount(item)
    }
  }
};
