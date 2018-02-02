import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Encrypt extends React.Component {
  static contextTypes = {
    keyRing: PropTypes.object.isRequired,
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
    const { keyRing } = this.context

    return (
      <div className="content">
        <div className="recepients">
        </div>
        <div className="message">
          <textarea onChange={this.handleKeyChange} value={this.state.message}>
          </textarea>
        </div>
        { keyRing.hasPrivateKey() && (
          <div className="signMessage">
            <input
              onChange={this.handleSignMessageChange}
              id="signMessage"
              type="checkbox" />
            <label htmlFor="signMessage">
              Sign Message? {String(this.state.signMessage)}
            </label>
          </div>
        ) }
        <button onClick={this.encryptMessage}>Encrypt</button>
      </div>
    )
  }
}

export default Encrypt
