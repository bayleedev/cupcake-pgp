const { setWorldConstructor } = require('cucumber')
const { Application } = require('spectron')
const path = require('path')

const appPath = path.join(__dirname, '../../')

class World {
  constructor () {
    this.app = new Application({
      path: require('electron'),
      args: ['--noDevServer', path.join(__dirname, '..', '..')]
    })
  }

  open () {
    return this.app.start()
  }

  isWindowVisible () {
    return this.app.browserWindow.isVisible()
  }

  accessibility () {
    return this.app.client.auditAccessibility()
  }

  close () {
    if (this.app) {
      return this.app.stop()
    }
    return Promise.resolve()
  }
}

setWorldConstructor(World)
