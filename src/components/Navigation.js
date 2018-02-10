import React from 'react'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
  render () {
    return (
      <ul className="navigation">
        <li className="home"><Link to="/">Home</Link></li>
        <li className="encrypt"><Link to="/encrypt">Encrypt</Link></li>
        <li className="friends"><Link to="/friends">Friends</Link></li>
      </ul>
    )
  }
}

export default Navigation
