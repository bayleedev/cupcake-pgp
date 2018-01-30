import { readFileSync } from 'fs'
import { homedir } from 'os'
import jetpack from 'fs-jetpack'
import path from 'path'
import Logger from '../util/logger'

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
    this.data.friends.push(publicKey)
    return Promise.resolve()
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
