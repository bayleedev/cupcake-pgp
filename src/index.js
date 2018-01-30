import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import Friends from './components/Friends'
import AddFriend from './components/AddFriend'

let root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render((
  <HashRouter>
    <App>
      <Route path="/" exact component={Home} />
      <Route path="/friends" exact component={Friends} />
      <Route path="/addFriend" exact component={AddFriend} />
    </App>
  </HashRouter>
), document.getElementById('root'))
