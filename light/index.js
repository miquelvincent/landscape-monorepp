
const io = require('socket.io-client')
const pixel = require('node-pixel')
const five = require('johnny-five')

const socket = io('http://localhost:8200', {})

const opts = {}
opts.port = process.argv[2] || ''

const board = new five.Board(opts)
let strip = null

board.on('ready', function () {
  console.log('Board ready, lets add light')

  // setup the node-pixel strip.
  strip = new pixel.Strip({
    data: 6,
    length: 45, // number of pixels in the strip.
    board: this,
    controller: 'FIRMATA'
  })

  strip.on('ready', function () {
    socket.on('Data', index => {
      const data = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'white']
      strip.color(data[index])
      strip.show()
    })
  })
})
