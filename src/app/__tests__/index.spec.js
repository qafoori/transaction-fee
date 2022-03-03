const App = require('../index')
const data = require('../__mocks__/_index.app.mock.json')
require('../../configs')

describe('testing `App` class', () => {
  it('should start the app and return commission fees', async () => {
    const expectedResults = ['0.06', '0.90', '87.00', '3.00', '0.30', '0.30', '5.00', '0.00', '0.00']
    const app = new App(data)
    const result = await app.start()
    expect(result).toEqual(expectedResults)
  })

  it('should calculate cash in commission fee', async () => {
    const app = new App([])
    const result = await app.cashIn(data[0])
    expect(result).toBe('0.06')
  })

  it('should calculate cash out commission fee for juridical user', async () => {
    const app = new App([])
    const result = await app.cashOut(data[1])
    expect(result).toBe('0.90')
  })

  it('should calculate cash out commission fee for natural user with the total amount of MORE than given total amount in a week', async () => {
    const app = new App(data)
    const result = await app.cashOut(data[2])
    expect(result).toBe('87.00')
  })

  it('should calculate cash out commission fee for natural user with the total amount of LESS than given total amount in a week', async () => {
    const app = new App(data)
    const result = await app.cashOut(data[8])
    expect(result).toBe('0.00')
  })
})
