import {Component} from 'react'

import {getMarkerAndInfoWindow} from './selectors'

class EstacionMarker extends Component {
  componentDidMount () {
    if (this.props.estacion.position) {
      const {marker, infoWindow} = getMarkerAndInfoWindow(this.props)
      this.marker = marker
      this.infoWindow = infoWindow
    }
  }

  componentDidUpdate (prevProps) {
    const {estacion} = this.props
    const {estacion: prevEstacion} = prevProps

    if (estacion.position && estacion.position !== prevEstacion) {
      this.marker.setPosition(estacion.position)
    } else if (!estacion.position) {
      this.removeMarker()
    }
  }

  componentWillUnmount () {
    this.removeMarker()
  }

  removeMarker () {
    if (this.marker) {
      this.marker.setMap(null)
    }

    if (this.infoWindow) {
      this.infoWindow.setMap(null)
    }
  }

  render () {
    return null
  }
}

export default EstacionMarker
