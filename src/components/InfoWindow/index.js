import {Component} from 'react'

import {getInfoWindow} from './selectors'

class InfoWindow extends Component {
  componentDidMount () {
    const {marker, google, map} = this.props
    if (marker) {
      this.infoWindow = getInfoWindow(this.props)
      google.maps.event.addListener(marker, 'click', () => this.infoWindow.open(map, marker))
    }
  }

  render () {
    return null
  }
}

export default InfoWindow
