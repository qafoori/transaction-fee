const AllOf = require('../class.helper')

describe('testing class helper', () => {
  it('should extend multiple classes', () => {
    class A {
      a = 'a'
    }

    class B {
      b = 'b'
    }

    class C extends AllOf(A, B) {}

    const c = new C()

    expect(c.a).toBe('a')
    expect(c.b).toBe('b')
  })
})
