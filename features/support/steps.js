const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const KEYS = require('./keys')

Given(/^the app is launched$/, function () {
  return this.open()
})

Given('I am on the {string} page', function (string) {
  return this.addFriendPage()
})

When('I add Teddy\'s public key', function () {
  this.addKey(KEYS.TEDDY.PUBLIC)
})

When('I add Teddy\'s private key', function () {
  this.addKey(KEYS.TEDDY.PRIVATE)
})

Then(/^the app is visible$/, function () {
  return this.isWindowVisible().then((res) => {
    expect(res).to.eql(true)
  })
})

Then(/^I have no accessibility warnings$/, function () {
  return this.accessibility().then((response) => {
    if (response.results.length > 0) {
      expect(JSON.stringify(response.results[0])).to.eql('meow')
    }
    expect(response.results.length).to.eql(0)
  })
})

Then('I should have {int} friend', function (count) {
  return this.friendCount().then((friendCount) => {
    expect(friendCount).to.eql(count)
  })
})
