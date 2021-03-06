var app = require('express')()
var mapToRange = require('../utils/dataProcessor-es5')
var server = require('http').Server(app)
var io = require('socket.io')(server, {
  serveClient: false
})

server.listen(5000)

io.on('connection', function (socket) {
  ['currTempVal', 'currPressureVal', 'currHSVVal'].forEach(ev => {
    socket.on(ev, (data) => {
      socket.broadcast.emit('Light', data)
    })
  })
  socket.on('currTempVal', (data) => {
    const { currTempVal, averageTemp } = data
    const color = mapToRange(currTempVal, averageTemp, 0, 255)
    socket.broadcast.emit('currTempVal', color)
  })
  socket.on('counter', (data) => {
    socket.broadcast.emit('counter', data)
  })
  socket.on('stop', () => {
    socket.broadcast.emit('stop', {})
  })
})
