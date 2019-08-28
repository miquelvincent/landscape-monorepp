/* eslint-disable no-path-concat */
'use strict'

const express = require('express')
const app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.use('/', express.static('./dist'))

app.get('/test', function (req, res) {
  res.send('Hello World!')
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(8200, function () {
  console.log('listening on *:8200')
})
