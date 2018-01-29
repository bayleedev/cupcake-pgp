import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import './pgp-client'

let root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render((
  <HashRouter>
    <App>
      <Route path="/" component={Home} />
    </App>
  </HashRouter>
), document.getElementById('root'))
