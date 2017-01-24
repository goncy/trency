// @flow

import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getTrenes} from '../../reducers/trenes'
import {clearPreferences} from '../../actions/preferences'

import Map from '../Map'
import Marker from '../Marker'
import RamalesDescription from '../RamalesDescription'
import PreferencesSettings from '../PreferencesSettings'
import RamalesHorarios from '../RamalesHorarios'

class App extends Component {
  render () {
    const {trenes, preferences, horarios, clearPreferences} = this.props
    return (
      <div className='App-container flex-column'>
        <Map>
          {trenes.map((tren, index) => (
            <Marker
              key={index}
              position={tren.posicion}
              ramalId={tren.ramal}
            />
          ))}
        </Map>
        <RamalesDescription
          ramal={preferences.ramal}
        />
        <RamalesHorarios
          ramal={preferences.ramal}
          horario={horarios.activo}
          estacion={preferences.estacion}
        />
        <PreferencesSettings
          ramal={preferences.ramal}
          linea={preferences.linea}
          estacion={preferences.estacion}
          clearPreferences={clearPreferences}
        />
      </div>
    )
  }
}

const mapStateToProps = ({trenes, preferences, horarios}) => ({
  trenes: getTrenes(trenes),
  preferences,
  horarios
})

const mapDispatchToProps = {
  clearPreferences: clearPreferences.run
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
