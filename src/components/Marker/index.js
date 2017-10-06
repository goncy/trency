/* global google */
import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Marker extends Component {
  static propTypes = {
    map: PropTypes.any.isRequired,
    options: PropTypes.object,
    children: PropTypes.node
  }

  state = {
    marker: null
  }

  componentDidMount() {
    this.placeMarker()
  }

  placeMarker() {
    const { map, options = {} } = this.props
    if (options.position) {
      this.setState({
        marker: new google.maps.Marker({
          map,
          ...options
        })
      })
    }
  }

  componentWillUnmount() {
    this.removeMarker()
  }

  componentDidUpdate(prevProps) {
    const { options } = this.props
    const { options: prevOptions } = prevProps

    if (options) {
      // Position changed
      if (options.position !== prevOptions.position)
        this.setPosition(options.position)
      // Icon changed
      if (options.icon.url !== prevOptions.icon.url) this.setIcon(options.icon)
      // No position, remove marker
      if (!options.position) this.removeMarker()
    }
  }

  setIcon(icon) {
    const { marker } = this.state
    marker.setIcon(icon)
  }

  setPosition(position) {
    const { marker } = this.state
    marker.setPosition(position)
  }

  removeMarker() {
    const { marker } = this.state
    if (marker) marker.setMap(null)
  }

  render() {
    const { map, children } = this.props
    const { marker } = this.state

    return (
      <div>
        {marker &&
          children &&
          React.Children.map(children, element =>
            React.cloneElement(element, {
              marker,
              map,
              ...element.props
            })
          )}
      </div>
    )
  }
}
