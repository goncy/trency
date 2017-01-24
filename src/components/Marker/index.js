/* global google */

import {Component} from 'react'

import {getPosition} from './selectors'
import {getRamalColor} from '../../selectors'

export default class Marker extends Component {
  componentDidMount () {
    const {position, map, preferences, ramalId} = this.props
    const {ramal} = preferences
    if (position) {
      this.marker = new google.maps.Marker({
        map,
        position: getPosition(position),
        icon: new google.maps.MarkerImage(
          `/tren-${getRamalColor(ramal, ramalId)}.svg`,
          null,
          null,
          new google.maps.Point(12, 12)
        ),
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
      console.log('Marker removed')
    }
  }

  render () {
    return null
  }
}
