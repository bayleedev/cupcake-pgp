import { readFileSync } from 'fs'
import { homedir } from 'os'
import jetpack from 'fs-jetpack'
import path from 'path'
import Logger from '../util/logger'
import PGP from '../util/pgp'

class KeyRing {
  constructor (file) {
    this.file = file
    this.failed = false
    this.keys = []
    this.read()
  }

  hasPrivateKey () {
    return !!this.keys.find((key) => {
      return key.privateKey
    })
  }

  addKey (key) {
    return PGP.readKey(key).then((data) => {
      let publicKey, privateKey, isEncrypted = false
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

      const added = this.keys.find((key) => {
        return key.id === id &&
          key.publicKey === publicKey &&
          key.privateKey === privateKey
      })
      if (added) {
        throw new Error('Warning: You have already added this key.')
      }

      this.keys.push({
        id,
        isEncrypted,
        privateKey,
        publicKey,
        names,
      })
    })
  }

  removeFriend (id) {
    this.keys = this.keys.filter((key) => {
      return key.id !== id
    })
    return Promise.resolve()
  }

  read () {
    if (this.newConfig) return
    try {
      const data = jetpack.read(this.file, 'json')
      if (data && data.keys) {
        this.keys = data.keys
      }
    } catch (e) {
      Logger.error('Cannot read configuration', e)
      this.failed = true
    }
  }

  save () {
    if (this.writing) return
    this.writing = true
    jetpack.fileAsync(this.file, {
      mode: '600',
      content: {
        keys: this.keys,
      },
    }).then(() => {
      this.writing = false
    }, (e) => {
      Logger.error('Cannot save configuration', e)
    })
  }
}

const configFile = path.join(homedir(), 'cupcake-pgp.json')
const keyring = new KeyRing(configFile)

setInterval(() => {
  keyring.save()
}, 1000)

export default keyring
