postMessage({
  status: 'ready',
})

const pgp = {
  encode () {
    return '--encoded data--'
  }
}

self.addEventListener('message', function({ data }) {
  const { id, action, payload } = data

  try {
    postMessage({
      id,
      action,
      status: 'complete',
      payload: pgp[action](payload),
    })
  } catch (e) {
    postMessage({
      id,
      action,
      status: 'error',
      payload: e.message,
    })
  }
})

module.exports = pgp
