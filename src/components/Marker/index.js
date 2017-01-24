import {Component} from 'react'

import {getPosition} from './selectors'
import {getRamalColor} from '../../selectors'

export default class Marker extends Component {
  componentDidMount () {
    const {map, preferences, tren, google} = this.props
    const {ramal} = preferences
    if (tren.posicion) {
      this.marker = new google.maps.Marker({
        map,
        position: getPosition(tren.posicion),
        icon: new google.maps.MarkerImage(
          `/tren-${getRamalColor(ramal, tren.ramal)}.svg`,
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
    const {tren} = this.props
    const {position: prevPosition} = prevProps

    if (tren.posicion && tren.posicion !== prevPosition) {
      this.marker.setPosition(getPosition(tren.posicion))
    } else if (!tren.posicion) {
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
