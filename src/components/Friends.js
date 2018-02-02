import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Friend from './Friend'

class Friends extends React.Component {
  static contextTypes = {
    keyRing: PropTypes.object.isRequired,
  }

  handleDelete = (id) => {
    this.context.keyRing.removeFriend(id)
  }

  render() {
    const { keyRing } = this.context

    return (
      <div className="content">
        <ul>
          { keyRing.keys.map(({ id, names }) => (
            <li>
              <Friend
                id={id}
                names={names}
                handleDelete={this.handleDelete} />
            </li>
          )) }
        </ul>
        <Link to="/addFriend">Add Friend</Link>
      </div>
    )
  }
}

export default Friends
