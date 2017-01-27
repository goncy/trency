import {Component} from 'react'

import {getMarker} from './selectors'

class TrenMarker extends Component {
  componentDidMount () {
    if (this.props.tren.position) {
      this.marker = getMarker(this.props)
    }
  }

  componentDidUpdate (prevProps) {
    const {tren} = this.props
    const {tren: prevTren} = prevProps

    if (tren.position && tren.position !== prevTren) {
      this.marker.setPosition(tren.position)
    } else if (!tren.position) {
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
  }

  render () {
    return null
  }
}

export default TrenMarker
