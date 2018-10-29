import * as React from "react"
import injectSheet from "react-jss"
import Tone from "tone"

class Synth extends React.Component {
  state = {
    playing: false,
    synth: null
  }

  componentDidMount() {
    this.setState({
      synth: new Tone.Synth({
        oscillator: {
          type: "pwm",
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
        <h1>This is where the synthesizer will live</h1>
        <div className={classes.knob}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}>
          <p className={classes.knobLabel}>knob</p>
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
}

const styles = {
  wrapper: {
    margin: "0 auto",
    marginLeft: 30,
    height: "100vh",
    minWidth: "400px"
  },
  knob: {
    borderRadius: "100%",
    backgroundColor: "black",
    width: "70px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  knobLabel: {
    color: "white",
  }
}

export default injectSheet(styles)(Synth)
