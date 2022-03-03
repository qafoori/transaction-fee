describe('testing dotenv package configuration', () => {
  it('should store environment variables in the global.env object', () => {
    require('../environments.config')
    const { DOTENV_LOADED } = process.env
    expect(DOTENV_LOADED).toBeTruthy()
  })
})
