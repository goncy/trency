import {Component} from 'react'

import {getPath} from './selectors'

export default class PolyLine extends Component {
  componentDidMount () {
    const {gmaps, line, map, color = '#00D1B2'} = this.props
    this.polyLine = new gmaps.Polyline({
      map,
      path: getPath(gmaps, line),
      strokeColor: color,
      strokeOpacity: 1,
      strokeWeight: 4
    })
  }

  componentWillUnmount () {
    this.removePolyLine()
  }

  removePolyLine () {
    if (this.polyLine) {
      this.polyLine.setMap(null)
    }
  }

  render () {
    return null
  }
}
