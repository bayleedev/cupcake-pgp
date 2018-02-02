import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Logger from '../util/logger'

class AddFriend extends React.Component {
  static contextTypes = {
    keyRing: PropTypes.object.isRequired,
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  state = {
    key: '',
    hasError: false,
    isLoading: false,
  }

  handleSubmit = () => {
    this.setState({
      isLoading: true,
    })
    this.context.keyRing.addKey(this.state.key).then(() => {
      this.setState({
        key: '',
        isLoading: false,
      })
      this.props.history.push('/friends');
    }).catch((e) => {
      Logger.error('Failed to add friend', e)
      this.setState({
        key: '',
        isLoading: false,
        hasError: true,
        errorMessage: e.message,
      })
    })
  }

  handleKeyChange = (e) => {
    this.setState({
      key: e.target.value,
    })
  }

  render() {
    const { hasError, isLoading, errorMessage, key } = this.state
    return (
      <div>
        { isLoading && (
          <div className="loading">Loading...</div>
        ) }
        { hasError && (
          <div className="error">{errorMessage}</div>
        ) }
        <textarea onChange={this.handleKeyChange} value={this.state.key}>
        </textarea>
        <button
          disabled={isLoading}
          onClick={this.handleSubmit}>
          Add Friend!
        </button>
      </div>
    )
  }
}

export default withRouter(AddFriend)
