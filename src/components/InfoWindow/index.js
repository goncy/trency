/* global google */
import { Component } from "react";
import PropTypes from "prop-types";

import { getInfoWindow } from "./selectors";

class InfoWindow extends Component {
  componentDidMount() {
    const { marker, map } = this.props;
    if (marker) {
      this.infoWindow = getInfoWindow(this.props);
      google.maps.event.addListener(marker, "click", () =>
        this.infoWindow.open(map, marker)
      );
    }
  }

  render() {
    return null;
  }
}

InfoWindow.propTypes = {
  marker: PropTypes.any,
  map: PropTypes.any
};

export default InfoWindow;
