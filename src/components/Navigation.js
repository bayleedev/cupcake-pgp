import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
  render() {
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/encrypt">Encrypt</Link></li>
        <li><Link to="/friends">Friends</Link></li>
      </ul>
    )
  }
}

export default Navigation
