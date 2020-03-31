var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server, {
  serveClient: false
})

server.listen(5000)

io.on('connection', function (socket) {
  ['currTempVal', 'currPressureVal', 'currHSVVal'].forEach(ev => {
    socket.on(ev, (data) => {
      socket.broadcast.emit('Light', { data })
    })
  })
  socket.on('stop', () => {
    socket.broadcast.emit('stop', {})
  })
})
