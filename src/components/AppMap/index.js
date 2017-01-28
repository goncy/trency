import React from 'react'
import {connect} from 'react-redux'

import {getPositions} from '../../selectors/data'
import {getPositionMarkerOptions, getStationMarkerOptions, getStationInfoWindowContent} from './selectors'

import InfoWindow from '../InfoWindow'
import PolyLine from '../PolyLine'
import Map from '../Map'
import Marker from '../Marker'

const AppMap = props => {
  const {gmaps, preferences, positions} = props
  return (
    <Map gmaps={gmaps}>
      {/* Recorrido */}
      <PolyLine line={preferences.branch.path} />
      {/* Stations */}
      {preferences.branch.stations.map((station, index) => (
        <Marker
          key={index}
          options={getStationMarkerOptions(props, station)}
        >
          {/* InfoWindow Stations */}
          <InfoWindow content={getStationInfoWindowContent(props, station)} />
        </Marker>
      ))}
      {/* Trains */}
      {positions.map((position, index) => (
        <Marker
          key={index}
          options={getPositionMarkerOptions(props, position)}
        />
      ))}
    </Map>
  )
}

const mapStateToProps = ({data, preferences}) => ({
  positions: getPositions(data),
  preferences
})

export default connect(mapStateToProps)(AppMap)
