/* eslint-disable no-path-concat */

const express = require('express')
const app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.use('/', express.static('./dist'))

function sendData (data, pos) {
  io.emit('Data', data[pos])
}

const dataReader = (delay, data, pos = -1) => {
  const delayReader = setInterval(() => {
    pos = pos + 1
    if (pos >= data.length) {
      // clearInterval(delayReader)
      pos = 0
      sendData(data, pos)
    } else {
      sendData(data, pos)
    }
  }, delay)
  return delayReader
}

const data = [1, 3, 6, 9]

http.listen(8200, () => {
  dataReader(1000, data)
  console.log('http://localhost:8200')
})
