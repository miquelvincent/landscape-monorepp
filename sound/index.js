import Tone from 'tone'
import io from 'socket.io-client'

const socket = io('http://localhost:8200', {})

const synth = new Tone.MembraneSynth().toMaster()
function playSynth () {
  synth.triggerAttackRelease('C2', '8n')
}

socket.on('Data', index => {
  playSynth()
})

// Start the transport which is the main timeline
window.addEventListener('keydown', event => {
  if (event.key === 'p') {
    playSynth()
  }
  if (event.key === 's') {
    Tone.Transport.stop()
  }
})
