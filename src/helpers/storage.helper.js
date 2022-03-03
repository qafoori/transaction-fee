module.exports = class Storage {
  constructor() {
    this.storage = new Map();
  }

  put(key, value) {
    this.storage.set(key, value);
    return this.storage;
  }

  get(key) {
    return this.storage.get(key) || null;
  }

  safePut(key, value) {
    if (!this.get(key)) {
      this.put(key, value);
    }
    return this.storage;
  }

  has(key) {
    return this.storage.has(key);
  }
};
