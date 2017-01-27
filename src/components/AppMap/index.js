import React from 'react'
import {connect} from 'react-redux'

import {getTrenes} from '../../reducers/trenes'
import {getTrenMarkerOptions, getEstacionMarkerOptions, getEstacionInfoWindowContent} from './selectors'

import InfoWindow from '../InfoWindow'
import PolyLine from '../PolyLine'
import Map from '../Map'
import Marker from '../Marker'

const AppMap = props => {
  const {google, preferences, trenes} = props
  return (
    <Map google={google}>
      {/* Recorrido */}
      <PolyLine line={preferences.ramal.path} />
      {/* Estaciones */}
      {preferences.ramal.estaciones.map((estacion, index) => (
        <Marker
          key={index}
          options={getEstacionMarkerOptions(props, estacion)}
        >
          {/* InfoWindow Estaciones */}
          <InfoWindow content={getEstacionInfoWindowContent(props, estacion)} />
        </Marker>
      ))}
      {/* Trenes */}
      {trenes.map((tren, index) => (
        <Marker
          key={index}
          options={getTrenMarkerOptions(props, tren)}
        />
      ))}
    </Map>
  )
}

const mapStateToProps = ({trenes, preferences}) => ({
  trenes: getTrenes(trenes),
  preferences
})

export default connect(mapStateToProps)(AppMap)
