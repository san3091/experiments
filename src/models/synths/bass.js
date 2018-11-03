import Tone from "tone"

class BassSynth {

  SCALE = ["C2", "C2", "A1", "A1"]
  step = 0

  constructor() {
    this.synth = new Tone.MonoSynth({
      oscillator: {
        type: "fatsawtooth",
        count: 3,
        spread: 40
      },
      envelope: {
        attack: 0.05,
        decay: 0,
        susatain: 1,
        release: 0.5
      },
      portamento: 0.2,
      volume: -4
    })
    this.delay = new Tone.PingPongDelay(0.25, 0.7)
    this.filter = new Tone.Filter(150, "lowpass")
    this.loop = new Tone.Loop(this.playArp, "1n")

    this.synth.chain(this.filter, Tone.Master)
  }

  start = () => this.loop.start()

  stop = () => this.loop.stop()

  playArp = () => {
    this.synth.triggerAttackRelease(this.SCALE[this.step % 4], "1n")
    this.step++
  }
}

export default BassSynth


