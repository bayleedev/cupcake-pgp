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

  gotoPage (nextPath) {
    return this.app.client.getUrl().then((url) => {
      const nextUrl = url.replace(/index.html.*/, `index.html#${nextPath}`)
      return this.app.client.url(nextUrl)
    })
  }

  addFriendPage () {
    return this.gotoPage('/addFriend')
  }

  addKey (key) {
    return this.app.client.setValue('textarea', key).then(() => {
      return this.app.client.click('button')
    })
  }

  friendCount () {
    return this.gotoPage('/friends').then(() => {
      return this.app.client.$$('ul.friends .friend')
    }).then((elements) => {
      return elements.length
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
