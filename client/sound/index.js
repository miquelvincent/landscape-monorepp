import Tone from 'tone'
import { sample } from '../../utils/mock/insight_weater'
import { mapToRange } from '../../utils/dataProcessor'
import io from 'socket.io-client'

export default () => {
  const socket = io('http://localhost:5000', {})

  const startBtn = document.querySelector('.start')
  const stopBtn = document.querySelector('.stop')

  // Computes
  const averageTemp = Object.values(sample).filter(e => e.AT).map(e => e.AT.av)
  const averagePressure = Object.values(sample).filter(e => e.AT).map(e => e.PRE.av)
  const averageWindSpeed = Object.values(sample).filter(e => e.AT).map(e => e.HWS.av)

  function stop () {
    Tone.Transport.stop()
    socket.emit('stop')
    startBtn.classList.remove('active')
    stopBtn.classList.add('active')
  }
  function start () {
    startBtn.classList.add('active')
    stopBtn.classList.remove('active')
    counter = 0
    index = 0
    randomer = 12
    randomer2 = 6
    randomer3 = 6
    note1 = 300
    note2 = 400
    note3 = 200
    note4 = 35
    note5 = 25
    sustain = 1

    Tone.Transport.bpm.value = 60
    Tone.Transport.start()
    loopBeat.start(0)
  }

  startBtn.addEventListener('click', start)
  stopBtn.addEventListener('click', stop)
  let counter
  let index
  let note1, note2, note3, note4, note5
  let randomer, randomer2, randomer3
  let sustain

  const loopBeat = new Tone.Loop(song, '16n')
  const volume = new Tone.Volume(10).toMaster()

  var autoWah = new Tone.AutoWah(50, 6, -30).toMaster()

  var autoPanner = new Tone.AutoPanner({
    frequency: 0.1,
    type: 'sine',
    depth: 20
  }).connect(autoWah).toMaster()

  // Instruments
  const bassSynth = new Tone.MembraneSynth().connect(autoPanner)

  const amSynth = new Tone.AMSynth({
    harmonicity: 0.1,
    detune: 0,
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.01,
      decay: 0.01,
      sustain: sustain,
      release: 0.5
    },
    modulation: {
      type: 'square'
    },
    modulationEnvelope: {
      attack: 0.005,
      decay: 0,
      sustain: 1,
      release: 0.5
    }
  }).connect(autoPanner)

  const amSynth2 = new Tone.AMSynth({
    harmonicity: 0.1,
    detune: 0,
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 1,
      release: 0.5
    },
    modulation: {
      type: 'square'
    },
    modulationEnvelope: {
      attack: 0.005,
      decay: 0,
      sustain: 2,
      release: 0.5
    }
  }).chain(volume, autoPanner)

  function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  // Composition
  function song (time) {
    if (counter === 2 || counter === Math.round(randomer3)) {
      amSynth.triggerAttackRelease(note1, '16n', time, 1)
    } else if (counter === 4) {
      amSynth.triggerAttackRelease(note2, '16n', time, 1)
    } else if (counter % Math.round(randomer2) === 0) {
      amSynth.triggerAttackRelease(note3, '16n', time, 1)
    } else {
      amSynth2.triggerAttackRelease(note4, '32n', time, 1)
    }
    if (counter % Math.round(randomer) !== 1) {
      bassSynth.triggerAttackRelease(note5, '32n', time, 1)
    }
    if (counter === 15) {
      index = (index + 1) % 7
      const currTempVal = averageTemp[index]
      socket.emit('currTempVal', { currTempVal, averageTemp, index })
      note1 = mapToRange(currTempVal, averageTemp, 200, 300)
      note2 = mapToRange(currTempVal, averageTemp, 300, 400)
      note3 = mapToRange(currTempVal, averageTemp, 100, 200)
      note4 = mapToRange(currTempVal, averageTemp, 25, 35)
      note5 = mapToRange(currTempVal, averageTemp, 25, 50)
    }
    if (index === getRandomInt(6)) {
      const currHSVVal = averageWindSpeed[index]
      socket.emit('currHSVVal', { currHSVVal, index })
      randomer = mapToRange(currHSVVal, averageWindSpeed, 0, 12)
      randomer2 = mapToRange(currHSVVal, averageWindSpeed, 0, 6)
      randomer3 = mapToRange(currHSVVal, averageWindSpeed, 0, 6)
    }
    if (counter === getRandomInt(15)) {
      const currPressureVal = averagePressure[index]
      socket.emit('currPressureVal', { currPressureVal, index })
      sustain = mapToRange(currPressureVal, averagePressure, 0, 4)
      amSynth.envelope.sustain = sustain
    }
    counter = (counter + 1) % 16
    socket.emit('counter', { counter })
  }

  // start()
}
