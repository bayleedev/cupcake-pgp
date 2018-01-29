const EventEmitter = require('events')
const worker = new Worker('/pgp-sw.js')

/**
var client = new PGPClient();

// Encode some data
client.send('encode', '---begin---').then((data) => {
  console.log('----', data)
}).catch((e) => {
  console.log('error', e)
})

// Cause an error by calling a method that's not found
client.send('rawr', '---begin---').then((data) => {
  console.log('----', data)
}).catch((e) => {
  console.log('error', e)
})
*/
class PGPClient extends EventEmitter {
  constructor () {
    super()
    this.prevId = 0
    this.ready = false
    worker.onmessage = ({ data }) => {
      if (data.id) {
        return this.emit(data.id, data)
      }
      if (data.status) {
        return this.emit(data.status, data)
      }
    }
    this.once('ready', () => {
      this.ready = true
    })
  }

  send (action, payload) {
    if (!this.ready) {
      return new Promise((resolve) => {
        setTimeout(resolve, 100)
      }).then(() => {
        return this.send(action, payload)
      })
    }
    return new Promise((resolve, reject) => {
      const id = ++this.prevId
      worker.postMessage({ id, action, payload })
      this.once(id, (data) => {
        if (data.status === 'complete') {
          resolve(data.payload)
        } else {
          reject(new Error(data.payload))
        }
      })
    })
  }
}

export default PGPClient
