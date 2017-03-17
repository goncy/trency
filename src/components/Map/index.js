/* global google */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import './Map.css'

import {getOptions} from './selectors'

class Map extends Component {
  state = {
    map: null
  }

  componentDidMount () {
    this.setMap()
  }

  setMap () {
    const {preferences} = this.props
    const {station} = preferences

    this.setState({
      map: new google.maps.Map(
        this.refs.map,
        {
          ...getOptions(this.props),
          center: station.position
        }
      )
    })
  }

  render () {
    const {map} = this.state
    const {preferences, className, children} = this.props

    return (
      <div ref="map" className={className} id="map-canvas">
        {map && children && (
          React.Children.map(
            children,
            element => React.cloneElement(
              element,
              {
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
