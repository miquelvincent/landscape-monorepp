/* eslint-disable camelcase */
const pixel = require('node-pixel')
const io = require('socket.io-client')
const five = require('johnny-five')
var opts = {}
opts.port = process.argv[2] || ''

var board = new five.Board(opts)
var strip = null

const socket = io('http://localhost:5000', {})

board.on('ready', function () {
  console.log('Board ready, lets add light')

  strip = new pixel.Strip({
    data: 6,
    length: 45,
    color_order: pixel.COLOR_ORDER.GRB,
    board: this,
    controller: 'FIRMATA'
  })

  strip.on('ready', function () {
    console.log("Strip ready, let's go")
    const data = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'white']
    socket.on('Light', e => {
      console.log(e)
      strip.color(data[Math.floor(Math.random() * data.length)])
      strip.show()
    })
    socket.on('stop', e => {
      strip.off()
    })
  })
})
