// @flow

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import loadGoogleMapsAPI from 'load-google-maps-api'

import {preferencesSet} from '../../selectors/preferences'
import {hasData, hasError, hasSucceeded} from '../../selectors/data'
import {gmapsLoaded, gmapsFailed} from './selectors'

import App from './App'
import PreferencesSetter from '../PreferencesSetter'
import LoadingGMaps from './scenes/LoadingGMaps'
import LoadingData from './scenes/LoadingData'

import type {GMaps, AppState} from '../../flowtypes/globals'
import {GOOGLE_MAPS_API_KEY} from '../../constants'
import {clearPreferences} from '../../actions/preferences'

import './App.css'

export type AppContainerState = {
  library: GMaps,
  error: boolean
}

export type AppContainerProps = {
  preferencesSet: boolean,
  hasData: boolean,
  hasError: boolean
}

class AppContainer extends Component {
  static propTypes = {
    preferencesSet: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired
  }

  state: AppContainerState = {
    error: false,
    library: null
  }

  componentDidMount () {
    this.loadGMaps()
  }

  loadGMaps () {
    return loadGoogleMapsAPI({
      libraries: 'geometry',
      key: GOOGLE_MAPS_API_KEY
    })
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
    const {hasData, hasError, hasSucceeded, clearPreferences} = this.props

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
          if (hasError && !hasData) {
            return <LoadingData.Retrying />
          } else {
            // Loading data scene
            if (!hasData && !hasSucceeded) {
              return <LoadingData.Loading />
            } else {
              if (!hasData && hasSucceeded) {
                // Empty response
                return <LoadingData.Empty goBack={clearPreferences} />
              } else {
                // Application scene
                return <App gmaps={this.state.library} />
              }
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

const mapStateToProps = ({preferences, data}: AppState): AppContainerProps => ({
  preferencesSet: preferencesSet(preferences),
  hasData: hasData(data),
  hasSucceeded: hasSucceeded(data),
  hasError: hasError(data)
})

const mapDispatchToProp = {
  clearPreferences: clearPreferences.run
}

export default connect(mapStateToProps, mapDispatchToProp)(AppContainer)
