const Storage = require('../helpers/storage.helper')

module.exports = class Amount extends Storage {
  makeKey({ user_id, date, user_type, type }) {
    const weekNumber = new Date(date).getWeekNumber()
    return `user=${user_id}, week=${weekNumber}, userType=${user_type}, transaction=${type}`
  }

  getAmount(data) {
    const key = this.makeKey(data)
    return this.storage.get(key)
  }

  calculateAmounts(data) {
    for (const item of data) {
      const key = this.makeKey(item)
      const { amount } = item.operation

      if (this.storage.has(key)) {
        const total = this.storage.get(key) + amount
        this.storage.set(key, total)
      } else {
        this.storage.set(key, amount)
      }
    }
  }
}
