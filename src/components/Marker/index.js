import {Component} from 'react'

import {getPosition} from './selectors'

export default class Marker extends Component {
  componentDidMount () {
    const {google, map, position} = this.props
    if (position) {
      this.marker = new google.maps.Marker({
        map,
        position: getPosition(position),
        zIndex: 999
      })
    }
  }

  componentWillUnmount () {
    this.removeMarker()
  }

  componentDidUpdate (prevProps) {
    const {position} = this.props
    const {position: prevPosition} = prevProps

    if (position && position !== prevPosition) {
      this.marker.setPosition(getPosition(position))
    } else if (!position) {
      this.removeMarker()
    }
  }

  removeMarker () {
    if (this.marker) {
      this.marker.setMap(null)
    }
  }

  render () {
    return null
  }
}
