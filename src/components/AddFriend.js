import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

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
    this.context.keyRing.addFriend(this.state.key).then(() => {
      this.setState({
        isLoading: false,
        key: ''
      })
      this.props.history.push('/friends');
    }).catch((e) => {
      this.setState({
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