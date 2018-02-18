/* global google */

import { Component } from "react";
import PropTypes from "prop-types";

import { getPath } from "./selectors";

export default class PolyLine extends Component {
  static propTypes = {
    map: PropTypes.any.isRequired,
    line: PropTypes.any.isRequired,
    color: PropTypes.string
  };

  componentDidMount() {
    const { line, map, color = "#00D1B2" } = this.props;
    this.polyLine = new google.maps.Polyline({
      map,
      path: getPath(line),
      strokeColor: color,
      strokeOpacity: 1,
      strokeWeight: 4
    });
  }

  componentWillUnmount() {
    this.removePolyLine();
  }

  removePolyLine() {
    if (this.polyLine) {
      this.polyLine.setMap(null);
    }
  }

  render() {
    return null;
  }
}
