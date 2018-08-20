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
    selectedRecepients: [],
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
    const hitKey = e.key
    if (['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].indexOf(hitKey) !== -1) e.preventDefault()
    if (hitKey === 'ArrowUp') {
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
    } else if (hitKey === 'ArrowDown') {
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
    } else if (hitKey === 'Enter') {
      const selectedKey = results[selectedResultIndex]
      this.addRecepient(selectedKey)()
    } else if (hitKey === 'Escape') {
      this.clearSearch()
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

  clearSearch = () => {
    this.setState({
      search: '',
      results: [],
    })
  }

  addRecepient = (key) => {
    return () => {
      const { selectedRecepients } = this.state
      const newRecepient = key.id
      this.setState({
        selectedRecepients: selectedRecepients.concat(newRecepient),
      })
      this.clearSearch()
    }
  }

  render () {
    const { search, results, selectedResultIndex, selectedRecepients } = this.state
    const { keys } = this.props

    const hasPrivateKey = !!keys.find((key) => {
      return !!key.privateKey
    })

    return (
      <div className="content">
        <div className="recepients">
          <div className="current">
            { selectedRecepients.join('\r\n') }
          </div>
          <input onKeyDown={this.handleSearchIndex} onChange={this.handleSearchChange} value={search} />
          <div className="results">
            {
              results.slice(0, 10).map((key, i) => {
                return (
                  <span
                    onClick={this.addRecepient(key)}
                    className={selectedResultIndex === i ? 'selected' : ''}
                    key={i}>
                    {JSON.stringify(key.names[0])}
                  </span>
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
