const Storage = require('../helpers/storage.helper')

module.exports = class Amount extends Storage {
  makeKey(userId, date) {
    const weekNumber = new Date(date).getWeekNumber()
    return `user:${userId}/week:${weekNumber}`
  }

  getAmount(userId, date) {
    const key = this.makeKey(userId, date)
    return this.storage.get(key)
  }

  calculateAmounts(userId, date, amount) {
    const key = this.makeKey(userId, date)

    if (this.storage.has(key)) {
      const total = this.storage.get(key) + amount
      this.storage.set(key, total)
    } else {
      this.storage.set(key, amount)
    }
  }
}
