import '../assets/css/App.css'
import React, { Component } from 'react'
import Navigation from './navigation'

class App extends React.Component {
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
