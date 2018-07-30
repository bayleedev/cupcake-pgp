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
    results: [],
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

  handleSearchIndex = (e) => {
    const { selectedResultIndex, results } = this.state
    e.preventDefault()
    if (e.key === 'ArrowUp') {
      if (selectedResultIndex > 0) {
        const upOne = selectedResultIndex - 1
        this.setState({
          selectedResultIndex: upOne,
        })
      } else {
        const endOfResults = results.length - 1
        this.setState({
          selectedResultIndex: endOfResults,
        })
      }
    } else if (e.key === 'ArrowDown') {
      const downOne = selectedResultIndex + 1
      if (downOne >= results.length) {
        this.setState({
          selectedResultIndex: 0,
        })
      } else {
        this.setState({
          selectedResultIndex: downOne,
        })
      }
    } else if (e.key === 'Enter') {
      alert('select them!')
    } else if (e.key === 'Escape') {
      alert('get rid of that search box!')
    }
  }

  handleSearchChange = (e) => {
    const { keys } = this.props
    const search = e.target.value
    const results = keys.filter((key) => {
      return key.names.find((name) => {
        return name.match(search) && search.length > 0
      })
    })

    this.setState({
      search,
      results,
      selectedResultIndex: 0,
    })
  }

  encryptMessage = () => {
    alert('wat')
  }

  render () {
    const { search, results, selectedResultIndex } = this.state
    const { keys } = this.props

    const hasPrivateKey = !!keys.find((key) => {
      return !!key.privateKey
    })

    return (
      <div className="content">
        <div className="recepients">
          <input onKeyDown={this.handleSearchIndex} onChange={this.handleSearchChange} value={search} />
          <div className="results">
            {
              results.slice(0, 10).map((key, i) => {
                if (selectedResultIndex === i) {

                }
                return (
                  <span className={selectedResultIndex === i ? 'selected' : ''} key={i}>{JSON.stringify(key.names[0])}</span>
                )
              })
            }
          </div>
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
