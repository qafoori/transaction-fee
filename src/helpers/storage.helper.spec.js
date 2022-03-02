const Storage = require('./storage.helper')

describe('testing storage helper', () => {
  it('should put and get data in storage', () => {
    const storage = new Storage()
    storage.put('key', 'value')
    expect(storage.get('key')).toBe('value')
  })
 
  it('should put data in storage only if that is not already exist', () => {
    const storage = new Storage()
    storage.put('key', 'value')
    storage.safePut('key', 'newValue')
    expect(storage.get('key')).toBe('value')
  })

  it('should check if data is exist in storage', () => {
    const storage = new Storage()
    storage.put('key', 'value')
    expect(storage.has('key')).toBeTruthy()
    expect(storage.has('key2')).toBeFalsy()
  })
})
