describe('testing prototypes config', () => {

  it('should append a prototype for calculating week number of year to the `Date` object', () => {
    require('./prototypes.config')
    expect(new Date().getWeekNumber()).toBeDefined()
  })


  it('should calculate week number of year', () => {
    require('./environments.config')
    const week1Number = new Date('2016-01-05').getWeekNumber()
    const week2Number = new Date('2016-02-15').getWeekNumber()
    expect(week1Number).toEqual(1)
    expect(week2Number).toEqual(7)
  })
})