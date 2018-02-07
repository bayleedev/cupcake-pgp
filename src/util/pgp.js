const openpgp = require('openpgp')

class PGP {
  keyTypes = {
    secretKey: openpgp.enums.packet.secretKey,
    publicKey: openpgp.enums.packet.publicKey,
  }

  constructor () {
    openpgp.initWorker({ path: '/openpgp.worker.js' })
    openpgp.config.show_version = false
    openpgp.config.show_comment = false
  }

  readKey (key) {
    return new Promise((resolve, reject) => {
      const data = openpgp.key.readArmored(key)
      if (data.err && data.err[0]) {
        return reject(new Error(data.err[0]))
      }
      return resolve(data)
    })
  }
}

export default new PGP()
