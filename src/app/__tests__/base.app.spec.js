const AppBase = require('../base.app')

describe('testing app base class', () => {
  it('should contain extended classes methods and properties', () => {
    const appBase = new AppBase()

    expect(appBase.getCashIn).toBeDefined()
    expect(appBase.makeKey).toBeDefined()
  })
})