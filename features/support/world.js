const { setWorldConstructor } = require('cucumber')
const { Application } = require('spectron')
const path = require('path') 
const appPath = path.join(__dirname, '../../')

function wait (time) {
  return () => {
    return new Promise((resolve) => {
      setTimeout(resolve, time)
    })
  }
}

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

  friendsPage () {
    return this.gotoPage('/friends')
  }

  addKey (key) {
    return this.addFriendPage().then(() => {
      return this.app.client.setValue('textarea', key)
    }).then(() => {
      return this.app.client.click('button')
    }).then(wait(1000))
  }

  friendsList (filterName) {
    return this.friendsPage().then(() => {
      return this.app.client.execute((findName) => {
        const friends = [...document.querySelectorAll('.friends .friend')]
        return friends.map((friend) => {
          const names = [...friend.querySelectorAll('.name')]
          return {
            names: names.map((name) => {
              return name.innerText
            })
          }
        })
      })
    }).then(({ value: friends }) => {
      return friends.filter(({ names }) => {
        return names.filter((name) => {
          return name.match(filterName)
        }).length > 0
      })
    })
  }

  removeKey (findName) {
    return this.gotoPage('/friends').then(() => {
      return this.app.client.execute((findName) => {
        document.querySelectorAll('ul.friends .friend').forEach((friend) => {
          friend.querySelectorAll('.name').forEach((el) => {
            if (el.innerText.match(findName)) {
              friend.classList.add('clickMe')
            }
          })
        })
      }, findName)
    }).then(() => {
      return this.app.client.click('.clickMe .delete')
    }).then(wait(1000))
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
