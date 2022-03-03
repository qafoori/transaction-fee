describe('testing add environment variables to the `global` object', () => {
  it('should add `API_BASE_URL` to the `global` object', () => {
    require('../set-environments.config');
    expect(process.env.API_BASE_URL).toBeDefined();
  });
});
