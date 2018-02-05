import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'

import actions from '../actions'

const mapToProps = ({ keys, removeKey }) => ({ keys, removeKey })

class Encrypt extends React.Component {
  static propTypes = {
    keys: PropTypes.array.isRequired,
  }

  state = {
    message: '',
    signMessage: false,
  }

  handleSignMessageChange = (data) => {
    this.setState({
      signMessage: data.target.checked,
    })
  }

  handleKeyChange = (e) => {
    this.setState({
      message: e.target.value,
    })
  }

  encryptMessage = () => {
    alert('wat')
  }

  render() {
    const { keys } = this.props

    const hasPrivateKey = !!keys.find((key) => {
      return !!key.privateKey
    })

    return (
      <div className="content">
        <div className="recepients">
        </div>
        <div className="message">
          <textarea onChange={this.handleKeyChange} value={this.state.message}>
          </textarea>
        </div>
        { hasPrivateKey && (
          <div className="signMessage">
            <input
              onChange={this.handleSignMessageChange}
              id="signMessage"
              type="checkbox" />
            <label htmlFor="signMessage">
              Sign Message?
            </label>
          </div>
        ) }
        <button onClick={this.encryptMessage}>Encrypt</button>
      </div>
    )
  }
}

export default connect(mapToProps, actions)(Encrypt)
