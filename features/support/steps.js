const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

Given(/^the app is launched$/, function () {
  return this.open()
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
