import React, {Component} from 'react'
import {connect} from 'react-redux'

import './Map.css'

import {getOptions, getPath, buildEstaciones} from './selectors'

class Map extends Component {
  state = {
    map: null,
    path: {
      line: null,
      estaciones: []
    }
  }

  async componentDidMount () {
    await this.setMap()
    this.setPath()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.preferences !== this.props.preferences) {
      this.setPath()
    }
  }

  setMap () {
    const {preferences, google} = this.props
    const {estacion} = preferences

    this.setState({
      map: new google.maps.Map(
        this.refs.map,
        {
          ...getOptions(this.props),
          center: estacion.posicion
        }
      )
    })
  }

  setPath () {
    this.unsetPath()
    this.setState({
      path: {
        ...this.state.path,
        line: this.getLine(),
        estaciones: this.getEstaciones()
      }
    })
  }

  unsetPath () {
    const {path} = this.state

    if (path.line) {
      path.line.setMap(null)
      path.line.setPath(null)
    }

    path.estaciones.map(estacion =>
      estacion &&
      estacion.marker &&
      estacion.marker.setMap(null))
  }

  getLine () {
    const {preferences, google} = this.props
    const {ramal} = preferences
    const {map} = this.state

    return new google.maps.Polyline({
      map,
      path: getPath(ramal),
      strokeColor: '#00D1B2',
      strokeOpacity: 1,
      strokeWeight: 4
    })
  }

  getEstaciones () {
    const {map} = this.state
    const {preferences} = this.props
    const {ramal, estacion} = preferences

    return buildEstaciones(ramal, estacion, map)
  }

  render () {
    const {map} = this.state
    const {preferences, google} = this.props

    return (
      <div ref="map" className={this.props.className} id="map-canvas">
        {map && this.props.children && (
          React.Children.map(
            this.props.children,
            element => React.cloneElement(
              element,
              {
                google,
                map,
                preferences,
                ...element.props
              }
            )
          )
        )}
      </div>
    )
  }
}

const mapStateToProps = ({preferences}) => ({
  preferences
})

export default connect(mapStateToProps)(Map)
