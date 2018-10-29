import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import injectSheet from "react-jss"
import Home from './Home';

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <Router>
        <main className={classes.global}>
          <Route path="/" exact component={Home} />
        </main>
      </Router>
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
  }
}

export default injectSheet(style)(App);
