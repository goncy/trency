// @flow

import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getTrenes} from '../../reducers/trenes'

import Map from '../Map'
import Marker from '../Marker'
import Destinos from '../Destinos'
import Preferences from '../Preferences'
import Horarios from '../Horarios'

class App extends Component {
  render () {
    const {trenes, google} = this.props
    return (
      <div className='App-container flex-column'>
        {/* Destinos */}
        <Destinos />
        {/* Preferences */}
        <Preferences />
        {/* Mapa */}
        <Map google={google}>
          {trenes.map((tren, index) => (
            <Marker
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

const mapStateToProps = ({trenes}) => ({
  trenes: getTrenes(trenes)
})

export default connect(mapStateToProps)(App)
