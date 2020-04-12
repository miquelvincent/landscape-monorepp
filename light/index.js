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
    let currentColor
    let pixelCount
    let red = 0
    let green = 0

    socket.on('currTempVal', color => {
      red = Math.floor(color)
      green = Math.floor(Math.random() * 255) + 1
    })

    socket.on('counter', ({ counter }) => {
      currentColor = counter * 17
      pixelCount = counter === 0 ? 45 : counter * 3
      for (var i = 0; i < pixelCount; i++) {
        strip.pixel(i).color(`rgb(${red}, 0, ${currentColor})`)
      }
      strip.show()
    })

    socket.on('Light', color => {
      strip.off()
      green = Math.floor(Math.random() * 255) + 1
      strip.color(`rgb(${green}, 0, ${green})`)
      strip.show()
    })

    socket.on('stop', e => {
      strip.off()
    })
  })
})
