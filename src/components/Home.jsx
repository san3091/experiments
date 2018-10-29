import * as React from "react"
import injectSheet from "react-jss"
import { Link } from "react-router-dom"

const Home = ({ classes }) => (
  <header className={classes.header}>
    <h1>experiments</h1>
    <Link to="/arp-ambient">make music</Link>
  </header>
)

const styles = {
  header: {
    marginTop: 30,
    marginLeft: 30
  }
}

export default injectSheet(styles)(Home)
