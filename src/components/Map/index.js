/* global google */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getOptions } from "./selectors";

import "./Map.css";

class Map extends Component {
  state = {
    map: null
  };

  static propTypes = {
    preferences: PropTypes.object.isRequired,
    className: PropTypes.string,
    children: PropTypes.node
  };

  componentDidMount() {
    this.setMap();
  }

  setMap() {
    const { preferences } = this.props;
    const { station } = preferences;

    this.setState({
      map: new google.maps.Map(this.mapElement, {
        ...getOptions(this.props),
        center: station.position
      })
    });
  }

  render() {
    const { map } = this.state;
    const { preferences, className, children } = this.props;

    return (
      <div
        ref={mapElement => (this.mapElement = mapElement)}
        className={className}
        id="map-canvas"
      >
        {map &&
          children &&
          React.Children.map(children, element =>
            React.cloneElement(element, {
              map,
              preferences,
              ...element.props
            })
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ preferences }) => ({
  preferences
});

export default connect(mapStateToProps)(Map);
