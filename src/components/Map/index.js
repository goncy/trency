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
    const {preferences, gmaps} = this.props
    const {station} = preferences

    this.setState({
      map: new gmaps.Map(
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
    const {preferences, gmaps} = this.props

    return (
      <div ref="map" className={this.props.className} id="map-canvas">
        {map && this.props.children && (
          React.Children.map(
            this.props.children,
            element => React.cloneElement(
              element,
              {
                gmaps,
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
