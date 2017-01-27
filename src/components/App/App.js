// @flow

import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getTrenes} from '../../reducers/trenes'

import Map from '../Map'
import TrenMarker from '../TrenMarker'
import EstacionMarker from '../EstacionMarker'
import PolyLine from '../PolyLine'
import Destinos from '../Destinos'
import Preferences from '../Preferences'
import Horarios from '../Horarios'

class App extends Component {
  render () {
    const {google, trenes, preferences} = this.props
    return (
      <div className='App-container flex-column'>
        {/* Destinos */}
        <Destinos />
        {/* Preferences */}
        <Preferences />
        {/* Mapa */}
        <Map google={google}>
          <PolyLine line={preferences.ramal.path} />
          {preferences.ramal.estaciones.map((estacion, index) => (
            <EstacionMarker
              key={index}
              estacion={estacion}
              isSelected={estacion.id === preferences.estacion.id}
            />
          ))}
          {trenes.map((tren, index) => (
            <TrenMarker
              key={index}
              tren={tren}
            />
          ))}
        </Map>
        {/* Horarios */}
        <Horarios />
      </div>
    )
  }
}

const mapStateToProps = ({trenes, preferences}) => ({
  trenes: getTrenes(trenes),
  preferences
})

export default connect(mapStateToProps)(App)
