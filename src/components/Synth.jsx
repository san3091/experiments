import * as React from "react"
import injectSheet from "react-jss"
import Tone from "tone"

class Synth extends React.Component {
  state = {
    playing: false,
    synth: null,
    pattern: null,
    loop: null,
    pingPongDelay: null,
    filter: null
  }

  SCALE = ["C4", "D4", "F4", "G4", "A4", "C5", "D5", "F5", "G5", "A5"]
  step = 0

  componentDidMount() {
    const delay = new Tone.PingPongDelay(0.25, 0.7)
    delay.wet.value = 0.5
    const filter = new Tone.Filter(250, "lowpass")
    const vibrato = new Tone.Vibrato("32n")
    this.setState({
      pingPongDelay: delay,
      filter: filter,
      loop: new Tone.Loop(this.playArp, "16n").start(0),
      synth: new Tone.Synth({
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
      }).chain(vibrato, filter, delay, Tone.Master)
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={`${classes.wrapper} ${this.state.playing ? classes.wrapperParty : null}`}>
        <h1>This is the synthesizer</h1>
        <div className={classes.knobHub}>
          <div className={classes.knob}
            onClick={this.startLoop}>
            <p className={classes.knobLabel}>start</p>
          </div>
          <div className={classes.knob}
            onClick={this.stopLoop}>
            <p className={classes.knobLabel}>stop</p>
          </div>
        </div>
      </div>
    )
  }

  playArp = (time) => {
    console.log(time)
    this.state.synth.triggerAttackRelease(this.SCALE[this.step % 10], "16n")
    this.step++
  }

  startLoop = () => {
    this.setState({playing: true})
    Tone.Transport.start()
  }

  stopLoop = () => {
    this.setState({playing: false})
    Tone.Transport.stop()
  }
}

const styles = {
  "@keyframes colorchange": {
    "0%": {
      backgroundColor: "cyan"
    },
    "33%": {
      backgroundColor: "yellow"
    },
    "66%": {
      backgroundColor: "magenta"
    },
    "100%": {
      backgroundColor: "cyan"
    }
  },
  wrapper: {
    margin: "0 auto",
    paddingLeft: 30,
    paddingTop: 30,
    height: "100vh",
    minWidth: "400px",
  },
  wrapperParty: {
    backgroundColor: "cyan",
    animationName: "colorchange",
    animationDuration: "7s",

    "& h1": {
      color: "magenta"
    },
  },
  knob: {
    margin: 10,
    borderRadius: "100%",
    backgroundColor: "black",
    width: "70px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:first-child": {
      marginLeft: 0
    }
  },
  knobLabel: {
    color: "white",
  },
  knobHub: {
    width: 200,
    display: "flex",
    flexDirection: "row",
    justifyContent: "left"
  }
}

export default injectSheet(styles)(Synth)
