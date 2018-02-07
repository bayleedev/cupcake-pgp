const expect = require('chai').expect
const actions = require('../src/actions')

describe('Actions', () => {
  describe('.removeKey', () => {
    it('removes a key that exists', () => {
      const result = actions.removeKey({
        keys: [
          { id: 'one' },
          { id: 'two' },
          { id: 'three' },
        ],
      }, 'two')
      expect(result).to.equal({
        keys: [
          { id: 'one' },
          { id: 'three' },
        ],
      })
    })
  })
})
