import React, { Component } from 'react'
import {connect} from 'react-redux'
import loadGoogleMapsAPI from 'load-google-maps-api'

import {preferencesSet} from '../../reducers/preferences'
import {hasData, hasError} from '../../selectors/data'
import {gmapsLoaded, gmapsFailed} from './selectors'

import App from './App'
import PreferencesSetter from '../PreferencesSetter'
import LoadingGMaps from './scenes/LoadingGMaps'
import LoadingData from './scenes/LoadingData'

import './App.css'

export type gmapsState = {
  library: ?any,
  error: boolean
}

class AppContainer extends Component {
  state: gmapsState = {
    error: false,
    library: null
  }

  componentDidMount () {
    this.loadGMaps()
  }

  loadGMaps () {
    return loadGoogleMapsAPI({libraries: 'geometry'})
      .then(maps => this.setState({
        library: maps,
        error: false
      }))
      .catch(() => this.setState({
        library: null,
        error: true
      }))
  }

  getScene () {
    const {hasData, hasError} = this.props

    // Loading GMaps scene
    if (!gmapsLoaded(this.state)) {
      return <LoadingGMaps.Loading />
    } else {
      // Failed loading GMaps scene
      if (gmapsFailed(this.state)) {
        return <LoadingGMaps.Error retry={this.loadGMaps} />
      } else {
        // Set preferences scene
        if (!this.props.preferencesSet) {
          return <PreferencesSetter />
        } else {
          // Loading data failed scene
          if (hasError) {
            return <LoadingData>Parece que el servidor esta teniendo problemas, volviendo a intentar</LoadingData>
          } else {
            // Loading data scene
            if (!hasData) {
              return <LoadingData />
            } else {
              // Application scene
              return <App gmaps={this.state.library} />
            }
          }
        }
      }
    }
  }

  render () {
    return (
      <div className="App flex-column">
        <div className="App-intro flex-column">
          {this.getScene()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({preferences, data}) => ({
  preferencesSet: preferencesSet(preferences),
  hasData: hasData(data),
  hasError: hasError(data)
})

export default connect(mapStateToProps)(AppContainer)
