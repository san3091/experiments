import * as React from "react"
import injectSheet from "react-jss"
import Tone from "tone"

class Synth extends React.Component {
  state = {
    playing: false,
    synth: null,
    pattern: null,
    loop: null
  }

  SCALE = ["C4", "D4", "F4", "G4", "A4", "C5", "D5", "F5", "G5", "A5"]
  step = 0

  componentDidMount() {
    this.setState({
      // pattern: new Tone.Pattern(this.playArp, this.SCALE),
      loop: new Tone.Loop(this.playArp, "16n").start(0),
      synth: new Tone.Synth({
        oscillator: {
          type: "sine",
          modulationFrequency: 0.2
        },
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.2,
          release: 0.9
        }
      }).toMaster()
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.wrapper}>
        <h1>This is the synthesizer</h1>
        <div className={classes.knobHub}>
          <div className={classes.knob}
            onClick={this.startLoop}
            >
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

  handleMouseDown = () => {
    this.state.synth.triggerAttack("C2")
  }

  handleMouseUp = () => {
    this.state.synth.triggerRelease()
  }

  playArp = (time) => {
    console.log(time)
    this.state.synth.triggerAttackRelease(this.SCALE[this.step % 10], "16n")
    this.step++
  }

  startLoop = () => {
    Tone.Transport.start()
  }

  stopLoop = () => {
    Tone.Transport.stop()
  }
}

const styles = {
  wrapper: {
    margin: "0 auto",
    marginLeft: 30,
    height: "100vh",
    minWidth: "400px",
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
