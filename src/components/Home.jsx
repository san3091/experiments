import * as React from "react"
import injectSheet from "react-jss"

const Home = ({ classes }) => (
  <header className={classes.header}>
    <h1>experiments</h1>
  </header>
)

const styles = {
  header: {
    marginTop: 30,
    marginLeft: 30
  }
}

export default injectSheet(styles)(Home)
