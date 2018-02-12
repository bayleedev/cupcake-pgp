const { After } = require('cucumber')
const path = require('path')
const jetpack = require('fs-jetpack')

const logDir = path.join(__dirname, '../../test/fixtures/home/.cupcake')
const configFile = path.join(__dirname, '../../test/fixtures/home/cupcake-pgp.json')

After(function (scenario) {
  return this.close().then(() => {
    const files = jetpack.list(logDir) || []
    files.map((file) => {
      const logFile = path.join(logDir, file)
      if (scenario.result.status !== 'passed') {
        console.log(jetpack.read(logFile))
      }
      jetpack.remove(logFile)
    })
    jetpack.remove(configFile)
  })
})
