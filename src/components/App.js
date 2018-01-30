import '../assets/css/App.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from './Navigation'
import KeyRing from '../model/KeyRing'

class App extends React.Component {
  static childContextTypes = {
    keyRing: PropTypes.object,
  }

  getChildContext() {
    return {
      keyRing: KeyRing,
    }
  }

  render() {
    return (
      <div id="app">
        <div className="navigation">
          <Navigation />
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
