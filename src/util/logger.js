const winston = require('winston')
const RotateTransport = require('winston-daily-rotate-file')
const jetpack = require('fs-jetpack')
const util = require('util')
const path = require('path')
const { homedir } = require('os')

const home = process.env.CUPCAKE_HOME || homedir()
const logDir = path.join(home, '.cupcake')

jetpack.dir(logDir)

const Logger = new winston.Logger({
  level: 'debug',
  exitOnError: false,
  transports: [
    new RotateTransport({
      filename: 'cupcake.log',
      dirname: logDir,
      maxFiles: 3,
    }),
  ],
})

Logger.error = (message, error) => {
  Logger.log('error', message, { error: util.inspect(error) })
}

module.exports = Logger
