import Tone from 'tone'

const SPAWN_RATE = [10, 30]
const MAX_GROWTH_TIME = 10
const PAN_RANGE = [-0.8, 0.8]

const compressor = new Tone.Compressor().toMaster()
const src = new Tone.Noise('white').start()

const SCALE = [
  'B3',
  'Db4',
  'Eb4',
  'F4',
  'G4',
  'A4',
  'B4',
  'Db5',
  'Eb5',
  'F5',
  'G5',
  'A5',
  'B5',
  'Db6'
]
const INTERVALS = [1, 2, 3, 6]

const MODES = [
  {
    color: { hue: 200, saturation: 90 },
    filterQ: 2000,
    gainRange: [0.1, 5],
    lengthRange: [10, 25],
    angleRange: [20, 25],
    maxLineLength: 10000,
    growthFactor: 5,
    lSystem: {
      axiom: [
        {
          symbol: 'X',
          terminalAge: 0
        }
      ],
      productions: {
        X: {
          terminalAge: [MAX_GROWTH_TIME / 3, MAX_GROWTH_TIME / 2],
          successors: [
            {
              p: 0.33,
              items: [
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                { symbol: '-', params: () => ({ a: randAngle(0) }) },
                { symbol: '[' },
                { symbol: '[' },
                { symbol: 'X' },
                { symbol: ']' },
                { symbol: '+', params: () => ({ a: randAngle(0) }) },
                { symbol: 'X' },
                { symbol: ']' },
                { symbol: '+', params: () => ({ a: randAngle(0) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                { symbol: '[' },
                { symbol: '+', params: () => ({ a: randAngle(0) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                { symbol: 'X' },
                { symbol: ']' },
                { symbol: '-', params: () => ({ a: randAngle(0) }) },
                { symbol: 'X' }
              ]
            },
            {
              p: 0.33,
              items: [
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                { symbol: '+', params: () => ({ a: randAngle(0) }) },
                { symbol: '[' },
                { symbol: '[' },
                { symbol: 'X' },
                { symbol: ']' },
                { symbol: '+', params: () => ({ a: randAngle(0) }) },
                { symbol: 'X' },
                { symbol: ']' },
                { symbol: '+', params: () => ({ a: randAngle(0) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                { symbol: '[' },
                { symbol: '-', params: () => ({ a: randAngle(0) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                { symbol: 'X' },
                { symbol: ']' }
              ]
            },
            {
              p: 0.34,
              items: [
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                { symbol: '-', params: () => ({ a: randAngle(0) }) },
                { symbol: '[' },
                { symbol: '[' },
                { symbol: 'X' },
                { symbol: ']' },
                { symbol: '-', params: () => ({ a: randAngle(0) }) },
                { symbol: 'X' },
                { symbol: ']' },
                { symbol: '-', params: () => ({ a: randAngle(0) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                { symbol: '[' },
                { symbol: '+', params: () => ({ a: randAngle(0) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                { symbol: 'X' },
                { symbol: ']' },
                { symbol: '+', params: () => ({ a: randAngle(0) }) },
                { symbol: '[' },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(0), lInit: 0 })
                },
                { symbol: 'X' },
                { symbol: ']' }
              ]
            }
          ]
        },
        F: {
          terminalAge: [MAX_GROWTH_TIME / 3, MAX_GROWTH_TIME / 2],
          successors: [
            {
              p: 0.5,
              items: [
                {
                  symbol: 'F',
                  params: ({ l, ageAcc }, prevAge) => ({
                    l,
                    lInit: 1,
                    ageAcc: prevAge + (ageAcc || 0)
                  })
                },
                {
                  symbol: 'F',
                  params: ({ ageAcc }, prevAge) => ({
                    l: randLength(0),
                    lInit: 0,
                    ageAcc: prevAge + (ageAcc || 0)
                  })
                }
              ]
            },
            {
              p: 0.5,
              items: [
                {
                  symbol: 'F',
                  params: ({ l, ageAcc }, prevAge) => ({
                    l,
                    lInit: 1,
                    ageAcc: prevAge + (ageAcc || 0)
                  })
                }
              ]
            }
          ]
        }
      }
    },
    audioChain: compressor
  },
  {
    color: { hue: 280, saturation: 100 },
    filterQ: 500,
    gainRange: [0.1, 4],
    lengthRange: [1, 25],
    angleRange: [11, 33],
    maxLineLength: 10000,
    growthFactor: 4,
    lSystem: {
      axiom: [
        {
          symbol: 'F',
          terminalAge: 0,
          params: { l: 0 }
        }
      ],
      productions: {
        F: {
          terminalAge: [MAX_GROWTH_TIME / 3, MAX_GROWTH_TIME / 2],
          successors: [
            {
              p: 1,
              items: [
                {
                  symbol: 'F',
                  params: ({ l, ageAcc }, prevAge) => ({
                    l,
                    lInit: 1,
                    ageAcc: prevAge + (ageAcc || 0)
                  })
                },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(2), lInit: 0 })
                },
                { symbol: '[' },
                { symbol: '-', params: () => ({ a: randAngle(2) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(2), lInit: 0 })
                },
                { symbol: '+', params: () => ({ a: randAngle(2) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(2), lInit: 0 })
                },
                { symbol: '+', params: () => ({ a: randAngle(2) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(2), lInit: 0 })
                },
                { symbol: ']' },
                { symbol: '[' },
                { symbol: '+', params: () => ({ a: randAngle(2) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(2), lInit: 0 })
                },
                { symbol: '-', params: () => ({ a: randAngle(2) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(2), lInit: 0 })
                },
                { symbol: '-', params: () => ({ a: randAngle(2) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(2), lInit: 0 })
                },
                { symbol: ']' }
              ]
            }
          ]
        }
      }
    },
    audioChain: new Tone.Tremolo({ frequency: 10, depth: 0.8, type: 'sine' })
      .connect(compressor)
      .start()
  },
  {
    color: { hue: 350, saturation: 54 },
    filterQ: 1000,
    gainRange: [0.1, 1],
    lengthRange: [10, 15],
    angleRange: [10, 35],
    maxLineLength: 10000,
    growthFactor: 4,
    lSystem: {
      axiom: [
        {
          symbol: 'F',
          terminalAge: 0,
          params: { l: 0 }
        }
      ],
      productions: {
        F: {
          terminalAge: [MAX_GROWTH_TIME / 4, MAX_GROWTH_TIME / 3.5],
          successors: [
            {
              p: 0.5,
              items: [
                {
                  symbol: 'F',
                  params: ({ l, ageAcc }, prevAge) => ({
                    l,
                    lInit: 1,
                    ageAcc: prevAge + (ageAcc || 0)
                  })
                },
                { symbol: '[' },
                { symbol: '+', params: () => ({ a: randAngle(1) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(1), lInit: 0 })
                },
                { symbol: ']' },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(1), lInit: 0 })
                },
                { symbol: '[' },
                { symbol: '-', params: () => ({ a: randAngle(1) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(1), lInit: 0 })
                },
                { symbol: ']' },
                { symbol: '[' },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(1), lInit: 0 })
                },
                { symbol: ']' }
              ]
            },
            {
              p: 0.5,
              items: [
                {
                  symbol: 'F',
                  params: ({ l, ageAcc }, prevAge) => ({
                    l,
                    lInit: 1,
                    ageAcc: prevAge + (ageAcc || 0)
                  })
                },
                { symbol: '[' },
                { symbol: '-', params: () => ({ a: randAngle(1) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(1), lInit: 0 })
                },
                { symbol: ']' },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(1), lInit: 0 })
                },
                { symbol: '[' },
                { symbol: '+', params: () => ({ a: randAngle(1) }) },
                {
                  symbol: 'F',
                  params: () => ({ l: randLength(1), lInit: 0 })
                },
                { symbol: ']' }
              ]
            }
          ]
        }
      }
    },
    audioChain: new Tone.Distortion({ distortion: 0.5, wet: 0.75 }).connect(
      compressor
    )
  }
]

function rand ([min, max]) {
  return min + Math.random() * (max - min)
}

function randItem (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function scale (value, [rangeMin, rangeMax]) {
  return rangeMin + (rangeMax - rangeMin) * value
}

function randLength (mode) {
  return rand(MODES[mode].lengthRange)
}

function randAngle (mode) {
  return rand(MODES[mode].angleRange)
}

function findProduction (productions, symbol) {
  if (productions.hasOwnProperty(symbol)) {
    const prod = productions[symbol]
    const rnd = Math.random()
    let totalP = 0
    for (const { p, items } of prod.successors) {
      totalP += p
      if (rnd <= totalP) {
        return { terminalAge: prod.terminalAge, items }
      }
    }
  }
  return null
}

function lExpand (lSystem, str, timeElapsed) {
  for (let i = str.length - 1; i >= 0; i--) {
    const chr = str[i]
    chr.age = timeElapsed - chr.birthTime
    if (chr.age >= chr.terminalAge) {
      const prod = findProduction(lSystem.productions, chr.symbol)
      if (prod) {
        const childBirthTime = chr.birthTime + chr.terminalAge
        const newItems = []
        for (const item of prod.items) {
          newItems.push({
            symbol: item.symbol,
            birthTime: childBirthTime,
            age: timeElapsed - childBirthTime,
            terminalAge: rand(prod.terminalAge),
            params: item.params && item.params(chr.params, chr.age)
          })
        }
        str.splice(i, 1, ...newItems)
      }
    }
  }
}

function turtleInterpret (str, translateTo, rotateBy, onF) {
  let state = {
    loc: new paper.Point(translateTo.x, translateTo.y),
    angle: rotateBy
  }
  const stateStack = []
  for (const chr of str) {
    switch (chr.symbol) {
      case 'F':
        const { l, lInit } = chr.params
        const ageCoef = Math.min(lInit + chr.age / chr.terminalAge, 1)
        const lineLength = l * ageCoef
        const newLoc = state.loc.add(
          new paper.Point(
            lineLength * Math.cos(state.angle / 180 * Math.PI),
            lineLength * Math.sin(state.angle / 180 * Math.PI)
          )
        )
        onF(chr, state.loc, newLoc)
        state.loc = newLoc
        break
      case '-':
        state.angle = state.angle - chr.params.a
        break
      case '+':
        state.angle = state.angle + chr.params.a
        break
      case '[':
        stateStack.push(Object.assign({}, state))
        break
      case ']':
        state = stateStack.pop()
        break
    }
  }
}

function getColorStr ({ hue, saturation }, noteIndex, alpha = 1) {
  const relNoteIndex = noteIndex / SCALE.length
  const lightness = scale(relNoteIndex, [30, 70])
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
}

function easeOutQuad (t) {
  return t * (2 - t)
}
function easeOutQuart (t) {
  return 1 - --t * t * t * t
}
function easeOutQuint (t) {
  return 1 + --t * t * t * t * t
}

function nextNoteIndex (current) {
  const interval = randItem(INTERVALS) * randItem([-1, 1])
  if (current + interval < SCALE.length && current + interval >= 0) {
    return current + interval
  } else {
    return current - interval
  }
}

// Init

const hint = document.querySelector('#hint')
const canvas = document.querySelector('#cnvs')
const ctx = canvas.getContext('2d')
paper.setup(cnvs)
const drawTool = new paper.Tool()

// State

let currentMode = MODES[0]
const paths = []
let currentNoteIndex = Math.floor(scale(Math.random(), [0, SCALE.length]))
let nextSpawn, distanceFromLastSpawn, path

// Mode selection

const buttons = MODES.map((mode, idx) => {
  const button = document.createElement('button')
  button.textContent = idx + 1
  button.style.backgroundColor =
    idx === 0
      ? getColorStr(mode.color, SCALE.length / 2, 1)
      : getColorStr(mode.color, SCALE.length / 2, 0.1)
  button.addEventListener('click', () => {
    currentMode = mode
    buttons.forEach((b, i) => {
      b.style.backgroundColor =
        b === button
          ? getColorStr(MODES[i].color, SCALE.length / 2, 1)
          : getColorStr(MODES[i].color, SCALE.length / 2, 0.1)
    })
  })
  document.querySelector('.modes').appendChild(button)
  return button
})

// Interaction: Create paths and offshoots

drawTool.onMouseDown = evt => {
  hint.classList.add('gone')
  nextSpawn = rand(SPAWN_RATE)
  distanceFromLastSpawn = 0
  path = {
    mode: currentMode,
    path: [{ lastPoint: evt.point, point: evt.point, addedAt: Date.now() }],
    offshoots: [],
    noteIndex: currentNoteIndex,
    lastActivityAt: Date.now()
  }
  paths.push(path)
  currentNoteIndex = nextNoteIndex(currentNoteIndex)
}
drawTool.onMouseDrag = evt => {
  path.path.push({
    lastPoint: evt.lastPoint,
    point: evt.point,
    addedAt: Date.now()
  })
  distanceFromLastSpawn += evt.delta.length
  if (distanceFromLastSpawn >= nextSpawn) {
    const growthCoefficient = Math.min(
      1,
      Math.max(0.2, path.mode.growthFactor / evt.delta.length)
    )
    path.offshoots.push({
      str: path.mode.lSystem.axiom.map(a => Object.assign({ birthTime: 0 }, a)),
      age: 0,
      point: evt.lastPoint,
      angle: evt.delta.angle,
      growthTime: MAX_GROWTH_TIME * growthCoefficient
    })
    path.lastActivityAt = Date.now()
    nextSpawn = rand(SPAWN_RATE)
    distanceFromLastSpawn = 0
  }
}

// Render loop: Develop offshoots, prune dead growths, draw.

paper.view.onFrame = evt => {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

  for (let i = paths.length - 1; i >= 0; i--) {
    const { path, mode, noteIndex, lastActivityAt, offshoots, player } = paths[i]

    if (lastActivityAt < Date.now() - MAX_GROWTH_TIME * 1000) {
      paths.splice(i, 1)
      player.filters.forEach(f => f.disconnect())
      player.panner.disconnect()
      player.gain.disconnect()
      continue
    }

    if (path.length > 0) {
      ctx.lineWidth = 2
      for (let i = path.length - 1; i >= 0; i--) {
        const { lastPoint, point, addedAt } = path[i]
        const alpha = 1 - (Date.now() - addedAt) / 1000
        if (alpha > 0) {
          ctx.strokeStyle = getColorStr(mode.color, noteIndex, alpha)
          ctx.beginPath()
          ctx.moveTo(lastPoint.x, lastPoint.y)
          ctx.lineTo(point.x, point.y)
          ctx.stroke()
        } else {
          path.splice(i, 1)
        }
      }
    }

    for (let i = offshoots.length - 1; i >= 0; i--) {
      const offshoot = offshoots[i]
      offshoot.age += evt.delta

      if (offshoot.age >= MAX_GROWTH_TIME) {
        offshoots.splice(i, 1)
        continue
      }

      if (offshoots[i].age < offshoots[i].growthTime) {
        const relAge = offshoot.age / offshoot.growthTime
        const easedRelAge = easeOutQuart(relAge)
        const easedAge = easedRelAge * offshoot.growthTime
        lExpand(mode.lSystem, offshoot.str, easedAge)
        offshoot.currentLines = {}
        turtleInterpret(
          offshoot.str,
          offshoot.point,
          offshoot.angle,
          (chr, from, to) => {
            const width = Math.ceil(
              (chr.age + (chr.params.ageAcc || 0)) / MAX_GROWTH_TIME * 10
            )
            if (!offshoot.currentLines.hasOwnProperty(width)) {
              offshoot.currentLines[width] = []
            }
            offshoot.currentLines[width].push({ from, to })
          }
        )
      }

      const hasBeenFadingFor = offshoot.age - MAX_GROWTH_TIME / 2
      offshoot.alpha = Math.min(1, 1 - hasBeenFadingFor / 5)

      ctx.strokeStyle = getColorStr(mode.color, noteIndex, offshoot.alpha)
      for (const width of Object.keys(offshoot.currentLines)) {
        ctx.beginPath()
        ctx.lineWidth = width / 5
        for (const { from, to } of offshoot.currentLines[width]) {
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(to.x, to.y)
        }
        ctx.stroke()
      }
    }
  }
}

// Audio control loop. Create/update audio nodes and parameters to match current growth

setInterval(() => {
  const totalX = 0
  const pointCount = 0
  for (const path of paths) {
    if (!path.player) {
      const gain = new Tone.Gain(path.mode.gainRange[0])
      const panner = new Tone.Panner()

      const freq = new Tone.Frequency(SCALE[path.noteIndex])
      const filters = [
        freq,
        freq.clone().transpose(-12),
        freq.clone().transpose(-24)
      ].map(freq => {
        const filter = new Tone.Filter({
          type: 'bandpass',
          frequency: freq.toFrequency(),
          Q: path.mode.filterQ
        })
        src.connect(filter)
        filter.connect(gain)
        return filter
      })

      gain.connect(panner)
      panner.connect(path.mode.audioChain)

      path.player = { filters, gain, panner }
    }

    let totalLength = 0
    let totalX = 0
    let ptCount = 0
    for (const offshoot of path.offshoots) {
      for (const key of Object.keys(offshoot.currentLines || {})) {
        for (const { from, to } of offshoot.currentLines[key]) {
          totalLength += to.getDistance(from) * offshoot.alpha

          totalX += to.x
          ptCount++
        }
      }
    }

    const lengthStrength =
      Math.min(totalLength, path.mode.maxLineLength) / path.mode.maxLineLength
    const gainFromLength = scale(lengthStrength, path.mode.gainRange)
    const nextGain = Math.max(gainFromLength, 0.0001)
    path.player.gain.gain.setTargetAtTime(nextGain, Tone.now(), 0.03)

    if (ptCount > 0) {
      const nextPan = totalX / ptCount / paper.view.size.width * 2 - 1
      path.player.panner.pan.setTargetAtTime(nextPan, Tone.now(), 0.03)
    }
  }
}, 200)

StartAudioContext(Tone.context, canvas)
