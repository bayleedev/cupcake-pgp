import jetpack from 'fs-jetpack'
import { homedir } from 'os'
import path from 'path'

import PGP from './util/pgp'

const configFile = path.join(homedir(), 'cupcake-pgp.json')

const actions = () => ({
  loadKeys () {
    return jetpack.existsAsync(configFile).then((exists) => {
      if (!exists) {
        return { keys: [] }
      }
      return jetpack.readAsync(configFile, 'json').then((data) => {
        if (!data || !data.keys) {
          throw new Error('Invalid configuration file.')
        }
        return {
          keys: data.keys,
        }
      })
    })
  },

  saveKeys ({ keys }) {
    return jetpack.fileAsync(configFile, {
      mode: '600',
      content: { keys },
    })
  },

  removeKey ({ keys }, id) {
    return {
      keys: keys.filter((key) => {
        return key.id !== id
      }),
    }
  },

  addKey ({ keys: oldKeys }, newKey) {
    const keys = oldKeys.slice(0)
    return PGP.readKey(newKey).then((data) => {
      let publicKey
      let privateKey
      let isEncrypted = false
      const id = data.keys[0].primaryKey.fingerprint
      const keyType = data.keys[0].primaryKey.tag
      const names = data.keys[0].users.map((user) => user.userId.userid)

      switch (keyType) {
        case PGP.keyTypes.publicKey:
          publicKey = data.keys[0].armor()
          break
        case PGP.keyTypes.secretKey:
          privateKey = data.keys[0].armor()
          publicKey = data.keys[0].toPublic().armor()
          isEncrypted = !data.keys[0].primaryKey.isDecrypted
          break
        default:
          throw new Error('Error: Unrecognized input.')
      }

      const currentIndex = keys.findIndex((key) => {
        return key.id === id
      })

      if (currentIndex === -1) {
        keys.push({ id, isEncrypted, privateKey, publicKey, names })
      } else {
        const currentKey = keys[currentIndex]
        keys[currentIndex] = {
          id,
          isEncrypted: currentKey.isEncrypted || isEncrypted,
          privateKey: currentKey.privateKey || privateKey,
          publicKey,
          names,
        }
      }

      return { keys }
    })
  },
})

export default actions
