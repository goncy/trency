// @flow
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List } from "immutable";

import { getPositions } from "../../selectors/data";
import {
  getPositionMarkerOptions,
  getStationMarkerOptions,
  getPositionInfoWindowContent,
  getStationInfoWindowContent
} from "./selectors";

import InfoWindow from "../InfoWindow";
import PolyLine from "../PolyLine";
import Map from "../Map";
import Marker from "../Marker";

import type { AppState } from "../../flowtypes/globals";
import type { PreferencesState } from "../../flowtypes/preferences";
import type { Branch, Station } from "../../flowtypes/constants";
import type { Position } from "../../flowtypes/data";

export type AppMapProps = {
  preferences: PreferencesState,
  branch: Branch,
  station: Station,
  positions: List<Position>
};

const AppMap = (props: AppMapProps) => {
  const { branch, positions } = props;
  return (
    <Map className="animated fadeIn">
      {/* Recorrido */}
      <PolyLine line={branch.path} />
      {/* Stations */}
      {branch.stations.map((station, index) => (
        <Marker key={index} options={getStationMarkerOptions(props, station)}>
          {/* InfoWindow Stations */}
          <InfoWindow content={getStationInfoWindowContent(props, station)} />
        </Marker>
      ))}
      {/* Trains */}
      {positions.map((position, index) => (
        <Marker key={index} options={getPositionMarkerOptions(position)}>
          {/* InfoWindow Positions */}
          <InfoWindow content={getPositionInfoWindowContent(position)} />
        </Marker>
      ))}
    </Map>
  );
};

AppMap.propTypes = {
  positions: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired,
  station: PropTypes.object.isRequired
};

const mapStateToProps = ({ data, preferences }: AppState) => ({
  positions: getPositions(data),
  branch: preferences.branch,
  station: preferences.station
});

export default connect(mapStateToProps)(AppMap);
