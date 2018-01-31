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
    this.data = {
      friends: [],
      profiles: [],
    }
    this.read()
  }

  // public keys
  get friends () {
    return this.data.friends
  }

  // Private keys
  get profiles () {
    return this.data.profiles
  }

  addFriend (publicKey) {
    return PGP.readKey(publicKey).then((data) => {
      const id = data.keys[0].primaryKey.fingerprint
      const keyType = data.keys[0].primaryKey.tag
      const names = data.keys[0].users.map((user) => user.userId.userid)
      if (keyType !== PGP.keyTypes.publicKey) {
        if (keyType === PGP.keyTypes.secretKey) {
          throw new Error('Error: Input was not a public key, it was a private key.')
        } else {
          throw new Error('Error: Input was not a public key.')
        }
      }
      const added = this.data.friends.find((friend) => {
        return friend.id === id
      })
      if (added) {
        throw new Error('Error: This friend has already been added.')
      }
      this.data.friends.push({
        id,
        publicKey,
        names,
      })
    })
  }

  removeFriend (publicKey) {
    this.data.friends = this.data.friends.filter((key) => {
      return publicKey !== key
    })
    return Promise.resolve()
  }

  read () {
    if (this.newConfig) return
    try {
      this.data = jetpack.read(this.file, 'json') || this.data
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
      content: this.data,
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
