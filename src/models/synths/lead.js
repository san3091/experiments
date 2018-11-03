import Tone from "tone"

class LeadSynth {

  SCALE = ["C4", "D4", "F4", "G4", "A4", "C5", "D5", "F5", "G5", "A5"]
  step = 0

  constructor() {
    this.synth = new Tone.Synth({
      oscillator: {
        type: "sawtooth",
      },
      envelope: {
        attack: 0.1,
        decay: 0.1,
        sustain: 0.2,
        release: 0.9
      },
      volume: -4
    })

    this.delay = new Tone.PingPongDelay(0.25, 0.7)
    this.vibrato = new Tone.Vibrato("32n")
    this.filter = new Tone.Filter(250, "lowpass")
    this.loop = new Tone.Loop(this.playArp, "16n")

    this.synth.chain(this.vibrato, this.filter, this.delay, Tone.Master)
  }

  set bpm(number) {
    Tone.Transport.bpm.value = number
  }

  start = () => this.loop.start(0)

  stop = () => this.loop.stop()

  playArp = () => {
    this.synth.triggerAttackRelease(this.SCALE[this.step % 10], "16n")
    this.step++
  }
}

export default LeadSynth
