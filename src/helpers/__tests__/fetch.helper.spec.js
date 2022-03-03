const ApiCaller = require('../fetch.helper')
const exampleApiConfig = { url: 'https://reqres.in/api/products/', config: { method: 'get' } }

describe('testing fetch helper', () => {
  it('should fetch api', async () => {
    const result = await ApiCaller(exampleApiConfig)
    expect(result).toBeDefined()
  })
})
