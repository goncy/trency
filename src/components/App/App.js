// @flow

import React from 'react'

import AppMap from '../AppMap'
import Destinos from '../Destinos'
import Preferences from '../Preferences'
import Horarios from '../Horarios'

const App = ({google}: any) => (
  <div className='App-container flex-column'>
    {/* Destinos */}
    <Destinos />
    {/* Preferences */}
    <Preferences />
    {/* Mapa */}
    <AppMap google={google} />
    {/* Horarios */}
    <Horarios />
  </div>
)

export default App
