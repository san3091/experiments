import Tone from "tone"

class LeadSynth {

  SCALE = ["C4", "D4", "F4", "G4", "A4", "C5", "D5", "F5", "G5", "A5"]
  step = 0

  constructor() {
    this.synth = new Tone.Synth({
      oscillator: {
        type: "sawtooth",
        modulationFrequency: 0.2
      },
      envelope: {
        attack: 0.1,
        decay: 0.1,
        sustain: 0.2,
        release: 0.9
      }
    })

    this.delay = new Tone.PingPongDelay(0.25, 0.7)
    this.vibrato = new Tone.Vibrato("32n")
    this.filter = new Tone.Filter(250, "lowpass")
    this.loop = new Tone.Loop(this.playArp, "16n").start(0)

    this.synth.chain(this.vibrato, this.filter, this.delay, Tone.Master)
  }

  set bpm(number) {
    Tone.Transport.bpm.value = number
  }

  start = () => Tone.Transport.start()

  stop = () => Tone.Transport.stop()

  playArp = () => {
    this.synth.triggerAttackRelease(this.SCALE[this.step % 10], "16n")
    this.step++
  }
}

export default LeadSynth
