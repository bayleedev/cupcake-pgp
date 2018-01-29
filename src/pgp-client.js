var myWorker = new Worker('/pgp-sw.js')
myWorker.postMessage({ data: 'one' })
