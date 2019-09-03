import Tone from 'tone'
import io from 'socket.io-client'

const socket = io('http://localhost:8200', {})

// create a new synth
const synth = new Tone.MembraneSynth().toMaster()

// create a new tone loop
new Tone.Loop(function (time) {
  // Run once per eighth note, 8n, & log the time
  console.log('Random1 : ', Math.random() * 8)
  // trigger synth note
  synth.triggerAttackRelease(`D${Math.random() * 5}`, '3n')
}, '2n').start(0)

// create a new synth
const synth2 = new Tone.MembraneSynth().toMaster()

// create a new tone loop
new Tone.Loop(function (time) {
  // Run once per eighth note, 8n, & log the time
  console.log(time)
  console.log('Random2 : ', Math.random() * 10)
  // trigger synth note
  synth2.triggerAttackRelease(`D${Math.random() * 7}`, '3n')
}, '3n').start(0)

// create a new tone loop
new Tone.Loop(function (time) {
  // Run once per eighth note, 8n, & log the time
  console.log(time)
  console.log('Random3 : ', Math.random() * 10)
  // trigger synth note
  synth2.triggerAttackRelease(`D${Math.random() * 2}`, '3n')
}, '1n').start(0)

socket.on('Data', index => {
  console.log(index)
})

// Start the transport which is the main timeline
window.addEventListener('keydown', event => {
  if (event.key === 'p') {
    Tone.Transport.start()
  }
  if (event.key === 's') {
    Tone.Transport.stop()
  }
})
