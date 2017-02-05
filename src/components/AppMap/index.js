// @flow

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {List} from 'immutable'

import {getPositions} from '../../selectors/data'
import {getPositionMarkerOptions, getStationMarkerOptions, getPositionInfoWindowContent, getStationInfoWindowContent} from './selectors'

import InfoWindow from '../InfoWindow'
import PolyLine from '../PolyLine'
import Map from '../Map'
import Marker from '../Marker'

import type {GMaps, AppState} from '../../flowtypes/globals'
import type {PreferencesState} from '../../flowtypes/preferences'
import type {Branch, Station} from '../../flowtypes/constants'
import type {Position} from '../../flowtypes/data'

export type AppMapProps = {
  gmaps: GMaps,
  preferences: PreferencesState,
  branch: Branch,
  station: Station,
  positions: List<Position>
}

const AppMap = (props: AppMapProps) => {
  const {gmaps, branch, positions} = props
  return (
    <Map className='animated fadeIn' gmaps={gmaps}>
      {/* Recorrido */}
      <PolyLine line={branch.path} />
      {/* Stations */}
      {branch.stations.map((station, index) => (
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
        >
          {/* InfoWindow Positions */}
          <InfoWindow content={getPositionInfoWindowContent(position)} />
        </Marker>
      ))}
    </Map>
  )
}

AppMap.propTypes = {
  positions: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired,
  station: PropTypes.object.isRequired,
  gmaps: PropTypes.object.isRequired
}

const mapStateToProps = ({data, preferences}: AppState) => ({
  positions: getPositions(data),
  branch: preferences.branch,
  station: preferences.station
})

export default connect(mapStateToProps)(AppMap)
