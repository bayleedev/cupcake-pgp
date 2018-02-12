const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const KEYS = require('./keys')

Given(/^the app is launched$/, function () {
  return this.open()
})

When('I have Teddy Bear as a friend', function () {
  return this.addFriendPage().then(() => {
    return this.addKey(KEYS.TEDDY.PUBLIC)
  }).then(() => {
    return this.friendsList('Teddy Bear')
  }).then((matchedFriends) => {
    expect(matchedFriends.length).to.eql(1)
  })
})

When('I add Teddy Bear\'s public key', function () {
  return this.addKey(KEYS.TEDDY.PUBLIC)
})

When('I add Teddy Bear\'s private key', { timeout: 10 * 1000 }, function () {
  return this.addKey(KEYS.TEDDY.PRIVATE)
})

When('I delete Teddy Bear\'s key', function () {
  return this.removeKey('Teddy Bear')
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

Then(/I should have ([0-9]+) friends? named "(.*)"/, function (expectedCountStr, expectedName) {
  const expectedCount = parseInt(expectedCountStr, 10)
  return this.friendsList(expectedName).then((matchedFriends) => {
    expect(matchedFriends.length).to.eql(expectedCount)
  })
})
