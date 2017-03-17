import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Line from './components/PreferencesSetter/scenes/Line'
import Branch from './components/PreferencesSetter/scenes/Branch'
import Station from './components/PreferencesSetter/scenes/Station'

import App from './components/App'

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Line} />
      <Route exact path='/:line' component={Branch} />
      <Route exact path='/:line/:branch' component={Station} />
      <Route exact path='/:line/:branch/:station' component={App} />
    </Switch>
  </Router>
)

export default AppRouter
