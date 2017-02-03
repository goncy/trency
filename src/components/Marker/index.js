import React, {Component} from 'react'

export default class Marker extends Component {
  state = {
    marker: null
  }

  componentDidMount () {
    this.placeMarker()
  }

  placeMarker () {
    const {gmaps, map, options = {}} = this.props
    if (options.position) {
      this.setState({
        marker: new gmaps.Marker({
          map,
          ...options
        })
      })
    }
  }

  componentWillUnmount () {
    this.removeMarker()
  }

  componentDidUpdate (prevProps) {
    const {options} = this.props
    const {options: prevOptions} = prevProps

    if (options) {
      // Position changed
      if (options.position !== prevOptions.position) this.setPosition(options.position)
      // Icon changed
      if (options.icon.url !== prevOptions.icon.url) this.setIcon(options.icon)
      // No position, remove marker
      if (!options.position) this.removeMarker()
    }
  }

  setIcon (icon) {
    const {marker} = this.state
    marker.setIcon(icon)
  }

  setPosition (position) {
    const {marker} = this.state
    marker.setPosition(position)
  }

  removeMarker () {
    const {marker} = this.state
    if (marker) marker.setMap(null)
  }

  render () {
    const {gmaps, map} = this.props
    const {marker} = this.state

    return (
      <div>
        {marker && this.props.children && (
          React.Children.map(
            this.props.children,
            element => React.cloneElement(
              element,
              {
                marker,
                gmaps,
                map,
                ...element.props
              }
            )
          )
        )}
      </div>
    )
  }
}
