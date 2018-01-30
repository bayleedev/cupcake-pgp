import { readFileSync } from 'fs'
import { homedir } from 'os'
import jetpack from 'fs-jetpack'

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
      this.data = jetpack.read(this.file, 'json')
    } catch (e) {
      // TODO logging
      this.failed = true
    }
  }

  save () {
    if (this.writing) return
    this.writing = true
    jetpack.fileAsync(this.file, {
      mode: '700',
      content: this.data,
    }).then(() => {
      this.writing = false
    }, (e) => {
      // TODO logging
      this.writing = false
    })
  }
}

const configFile = `${homedir()}/cupcake-pgp.json`
const keyring = new KeyRing(configFile)

setInterval(() => {
  keyring.save()
}, 1000)

export default keyring
