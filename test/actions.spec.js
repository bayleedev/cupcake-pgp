import { expect } from 'chai'
import actions from '../src/actions'

describe('Actions', () => {
  describe('.removeKey', () => {
    it('removes a key that exists', () => {
      const result = actions().removeKey({
        keys: [
          { id: 'one' },
          { id: 'two' },
          { id: 'three' },
        ],
      }, 'two')
      expect(result).to.deep.equal({
        keys: [
          { id: 'one' },
          { id: 'three' },
        ],
      })
    })
  })
})
