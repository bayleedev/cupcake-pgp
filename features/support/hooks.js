const { After } = require('cucumber')

After(function () {
  return this.close()
})
