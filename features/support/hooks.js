const { After } = require('cucumber')
const path = require('path')
const { homedir } = require('os')
const jetpack = require('fs-jetpack')

const logDir = path.join(homedir(), '.cupcake')

After(function (scenario) {
  return this.close().then(() => {
    if (scenario.result.status === 'passed') return
    const files = jetpack.list(logDir) || []
    files.map((file) => {
      const logFile = path.join(logDir, file)
      console.log(jetpack.read(logFile))
    })
  })
})
