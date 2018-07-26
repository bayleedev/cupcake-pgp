import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'

import actions from '../actions'

const mapToProps = ({ keys }) => ({ keys })

class Encrypt extends React.Component {
  static propTypes = {
    keys: PropTypes.array.isRequired,
  }

  state = {
    search: '',
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

  handleSearchChange = (e) => {
    this.setState({
      search: e.target.value,
    })
  }

  encryptMessage = () => {
    alert('wat')
  }

  render () {
    const { search } = this.state
    const { keys } = this.props

    const hasPrivateKey = !!keys.find((key) => {
      return !!key.privateKey
    })

    return (
      <div className="content">
        <div className="recepients">
          <input onChange={this.handleSearchChange} value={search} />
          {
            keys.filter((key) => {
              return key.names.find((name) => {
                return name.match(search) && search.length > 0
              })
            }).slice(0, 10).map((key, i) => {
              return (
                <span key={i}>Found one! {JSON.stringify(key.names)}</span>
              )
            })
          }
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
