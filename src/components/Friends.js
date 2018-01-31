import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import KeyRing from '../model/KeyRing'

class Friends extends React.Component {
  render() {
    return (
      <div className="content">
        <ul>
          { KeyRing.friends.map(({ id }) => {
            return <li key={id}>{id}</li>
          }) }
        </ul>
        <br />
        <Link to="/addFriend">Add Friend</Link>
      </div>
    )
  }
}

export default Friends
