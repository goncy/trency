import React, {Component} from 'react'

import {getPosition} from './selectors'

export default class Marker extends Component {
  state = {
    marker: null
  }

  componentDidMount () {
    const {google, map, options = {}} = this.props
    if (options.position) {
      this.setState({
        marker: new google.maps.Marker({
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
    const {marker} = this.state
    const {options} = this.props
    const {options: prevOptions} = prevProps

    if (options.position && options.position !== prevOptions.position) {
      marker.setPosition(getPosition(options.position))
    } else if (!options.position) {
      this.removeMarker()
    }
  }

  removeMarker () {
    const {marker} = this.state
    if (marker) {
      marker.setMap(null)
    }
  }

  render () {
    const {google, map} = this.props
    const {marker} = this.state

    return (
      <div>
        {marker && this.props.children && (
          React.Children.map(
            this.props.children,
            element => React.cloneElement(
              element,
              {
                marker: marker,
                google,
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
