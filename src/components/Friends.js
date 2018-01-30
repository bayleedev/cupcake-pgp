import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Friends extends React.Component {
  render() {
    return (
      <div className="content">
        friends list...
        <br />
        <Link to="/addFriend">Add Friend</Link>
      </div>
    )
  }
}

export default Friends
