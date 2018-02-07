import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'

import Logger from '../util/logger'
import actions from '../actions'

const mapToProps = ({ addKey }) => ({ addKey })

class AddFriend extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    addKey: PropTypes.func.isRequired,
  }

  state = {
    key: '',
    hasError: false,
    isLoading: false,
  }

  handleSubmit = () => {
    const { addKey, history } = this.props

    this.setState({
      isLoading: true,
    })
    addKey(this.state.key).then(() => {
      this.setState({
        key: '',
        isLoading: false,
      })
      history.push('/friends')
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

  render () {
    const { hasError, isLoading, errorMessage, key } = this.state
    return (
      <div>
        { isLoading && (
          <div className="loading">Loading...</div>
        ) }
        { hasError && (
          <div className="error">{errorMessage}</div>
        ) }
        <textarea onChange={this.handleKeyChange} value={key}>
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

export default connect(mapToProps, actions)(AddFriend)
