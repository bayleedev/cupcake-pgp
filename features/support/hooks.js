const { After, Before } = require('cucumber')
const path = require('path')
const jetpack = require('fs-jetpack')

const logDir = path.join(__dirname, '../../test/fixtures/home/.cupcake')
const configFile = path.join(__dirname, '../../test/fixtures/home/cupcake-pgp.json')

Before(function (scenario) {
  const files = jetpack.list(logDir) || []
  files.map((file) => {
    const logFile = path.join(logDir, file)
    jetpack.remove(logFile)
  })
  jetpack.remove(configFile)
})

After(function (scenario) {
  const FAILED = scenario.result.status !== 'passed'
  if (FAILED) {
    console.log(this.debug)
    console.log(this.screenshots)
  }
  return this.close().then(() => {
    const files = jetpack.list(logDir) || []
    files.map((file) => {
      const logFile = path.join(logDir, file)
      if (FAILED) {
        console.log(jetpack.read(logFile))
      }
      jetpack.remove(logFile)
    })
    jetpack.remove(configFile)
  })
})
