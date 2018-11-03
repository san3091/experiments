import * as React from "react"
import injectSheet from "react-jss"
import LeadSynth from "../models/synths/lead"
import BassSynth from "../models/synths/bass"
import Tone from "tone"

class Synth extends React.Component {
  state = {
    leadPlaying: false,
    bassPlaying: false,
    synth: null,
    bass: null,
  }

  SCALE = ["C4", "D4", "F4", "G4", "A4", "C5", "D5", "F5", "G5", "A5"]
  step = 0

  componentDidMount() {
    this.setState({
      lead: new LeadSynth(),
      bass: new BassSynth()
    })
    Tone.Transport.start()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={`${classes.wrapper} ${this.anyPlaying() ? classes.wrapperParty : null}`}>
        <h1>landscapes</h1>
        <div className={classes.knobHub}>
          <div className={`${classes.knob} ${this.state.leadPlaying ? classes.knobParty : null}`}
            onClick={this.toggleLead}>
            <p className={classes.knobLabel}>{this.state.leadPlaying ? "stop" : "play"}</p>
          </div>
          <div className={`${classes.knob} ${this.state.bassPlaying ? classes.knobParty : null}`}
            onClick={this.toggleBass}>
            <p className={classes.knobLabel}>{this.state.bassPlaying ? "stop" : "play"}</p>
          </div>
         </div>
      </div>
    )
  }

  componentWillUnmount() {
    Tone.Transport.stop()
  }

  toggleLead = () => {
    const { leadPlaying, lead} = this.state
    leadPlaying ? lead.stop() : lead.start()
    this.setState({ leadPlaying: !leadPlaying })
  }

  toggleBass = () => {
    const { bassPlaying, bass } = this.state
    bassPlaying ? bass.stop() : bass.start()
    this.setState({ bassPlaying: !bassPlaying })
  }

  anyPlaying = () => this.state.leadPlaying || this.state.bassPlaying
}

const styles = {
  "@keyframes colorchange": {
    "0%": {
      backgroundColor: "rgb(0, 255, 255)",
    },
    "33%": {
      backgroundColor: "rgb(255, 255, 0)"
    },
    "66%": {
      backgroundColor: "rgb(255, 0, 255)"
    },
    "100%": {
      backgroundColor: "rgb(0, 255, 255)"
    }
  },
  "@keyframes textColorchange": {
    "0%": {
      color: "rgb(255, 255, 0)",
      textShadow: "rgb(255, 255, 0)"
    },
    "33%": {
      color: "rgb(255, 0, 255)",
      textShadow: "rgb(255, 255, 0)"
    },
    "66%": {
      color: "rgb(0, 255, 255)",
      textShadow: "rgb(255, 0, 255)"
    },
    "100%": {
      color: "rgb(255, 255, 0)",
      textShadow: "rgb(0, 255, 255)"
    }
  },
  "@keyframes shadowColorchange": {
    "0%": {
      boxShadow: "10px 10px rgb(255, 0, 255)"
    },
    "33%": {
      boxShadow: "10px 10px rgb(0, 255, 255)"
    },
    "66%": {
      boxShadow: "10px 10px rgb(255, 255, 0)"
    },
    "100%": {
      boxShadow: "10px 10px rgb(255, 0, 255)"
    }
  },
  wrapper: {
    margin: "0 auto",
    paddingLeft: 30,
    paddingTop: 30,
    height: "100vh",
    minWidth: "400px",
    transition: "text-shadow 0.5s ease-in-out",
  },
  wrapperParty: {
    backgroundColor: "cyan",
    animation: "colorchange 10s infinite",
    textShadow: "10px 10px yellow",
    animationDelay: "0.5s",

    "& h1": {
      color: "magenta",
      animation: "textColorchange 10s infinite",
      animationDelay: "0.5s"
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
    transition: "box-shadow 0.5s ease-in-out",

    "&:first-child": {
      marginLeft: 0
    }
  },
  knobParty: {
    boxShadow: "13px 13px magenta",
    animation: "shadowColorchange 10s infinite",
    animationDelay: "0.5s",
  },
  knobLabel: {
    color: "white",
  },
  knobHub: {
    width: 500,
    display: "flex",
    flexDirection: "row",
    justifyContent: "left"
  }
}

export default injectSheet(styles)(Synth)
