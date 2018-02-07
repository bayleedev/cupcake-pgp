import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-zero/react'

import '../assets/css/App.css'
import Navigation from './Navigation'
import actions from '../actions'

const mapToProps = ({ loadKeys, saveKeys }) => ({ loadKeys, saveKeys })

class App extends React.Component {
  static propTypes = {
    loadKeys: PropTypes.func.isRequired,
    saveKeys: PropTypes.func.isRequired,
  }

  state = {
    loading: true,
    error: false,
  }

  loadKeys = () => {
    return this.props.loadKeys().then(() => {
      this.setState({
        loading: false,
      })
    })
  }

  saveKeys = () => {
    return this.props.saveKeys().then(() => {
      setTimeout(() => {
        this.saveKeys()
      }, 1000)
    })
  }

  componentWillMount () {
    this.loadKeys().then(() => {
      return this.saveKeys()
    }).catch((e) => {
      this.setState({
        loading: false,
        error: e.message,
      })
    })
  }

  render() {
    const { loading, error } = this.state

    return (
      <div id="app">
        <div className="navigation">
          <Navigation />
        </div>
        <div className="content">
          { loading ? (
            <p>Loading...</p>
          ) : (
            error ? (
              <p>{error}</p>
            ) : (
              this.props.children
            )
          ) }
        </div>
      </div>
    )
  }
}

export default connect(mapToProps, actions)(App)
