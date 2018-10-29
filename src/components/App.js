import React, { Component } from 'react'
import injectSheet from "react-jss"

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.global}>
        <header className={classes.header}>
          <h1>experiments</h1>
        </header>
      </main>
    );
  }
}

const style = {
  global: {
    fontFamily: "'Fira Mono', monospace",

    "& p": {
      fontWeight: "400"
    },

    "& h1, h2": {
      fontWeight: "700"
    }
  },
  header: {
    marginTop: 30,
    marginLeft: 30
  }
}

export default injectSheet(style)(App);
