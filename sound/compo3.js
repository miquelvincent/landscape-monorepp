import Tone from 'tone'

// var filter = new Tone.Filter({
//   type: 'bandpass',
//   Q: 24
// }).toMaster()

// // schedule a series of frequency changes
// filter.frequency.setValueAtTime('B5', 1)
// filter.frequency.setValueAtTime('E5', 0.5)
// filter.frequency.setValueAtTime('G5', 1)
// filter.frequency.setValueAtTime('B5', 1.5)
// filter.frequency.setValueAtTime('C6', 2)
// filter.frequency.linearRampToValueAtTime('F1', 3)

// var noise = new Tone.Noise('white').connect(filter).start().triggerAttackRelease('2n')

var synth = new Tone.AMSynth().toMaster()

// schedule a series of notes to play as soon as the page loads
synth.triggerAttackRelease('C4', '4n', '8n')
synth.triggerAttackRelease('E4', '8n', Tone.Time('4n') + Tone.Time('8n'))
synth.triggerAttackRelease('G4', '16n', '2n')
synth.triggerAttackRelease('B4', '16n', Tone.Time('2n') + Tone.Time('8t'))
synth.triggerAttackRelease('G4', '16', Tone.Time('2n') + Tone.Time('8t') * 2)
synth.triggerAttackRelease('E4', '2n', '0:3')
