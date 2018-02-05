import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'redux-zero/react'

import App from './components/App'
import Home from './components/Home'
import Friends from './components/Friends'
import AddFriend from './components/AddFriend'
import Encrypt from './components/Encrypt'
import Logger from './util/logger'
import store from './store'

Logger.info('loaded')

let root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render((
  <HashRouter>
    <Provider store={store}>
      <App>
        <Route path="/" exact component={Home} />
        <Route path="/friends" exact component={Friends} />
        <Route path="/addFriend" exact component={AddFriend} />
        <Route path="/encrypt" exact component={Encrypt} />
      </App>
    </Provider>
  </HashRouter>
), document.getElementById('root'))
