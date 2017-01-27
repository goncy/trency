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
    const {preferences, google} = this.props
    const {estacion} = preferences

    this.setState({
      map: new google.maps.Map(
        this.refs.map,
        {
          ...getOptions(this.props),
          center: estacion.position
        }
      )
    })
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
