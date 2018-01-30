import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/friends">Friends</Link>
      </div>
    )
  }
}

export default Navigation
