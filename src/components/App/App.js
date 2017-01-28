// @flow

import React from 'react'

import AppMap from '../AppMap'
import Directions from '../Directions'
import Preferences from '../Preferences'
import Arrivals from '../Arrivals'

import type {GMaps} from '../../flowtypes/globals'

const App = ({gmaps}: GMaps) => (
  <div className='App-container flex-column'>
    {/* Directions */}
    <Directions />
    {/* Preferences */}
    <Preferences />
    {/* Mapa */}
    <AppMap gmaps={gmaps} />
    {/* Arrivals */}
    <Arrivals />
  </div>
)

App.propTypes = {
  gmaps: React.PropTypes.object
}

export default App
