import React, { Component } from 'react'
import {connect} from 'react-redux'
import loadGoogleMapsAPI from 'load-google-maps-api'

import {preferencesSet} from '../../reducers/preferences'
import {trenesIsEmpty} from '../../reducers/trenes'
import {gmapsLoaded, gmapsFailed, dataLoaded, dataFailed} from './selectors'

import App from './App'
import PreferencesSetter from '../PreferencesSetter'
import LoadingGMaps from './scenes/LoadingGMaps'
import LoadingData from './scenes/LoadingData'

import './App.css'

class AppContainer extends Component {
  state = {
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
          if (dataFailed(this.props)) {
            return <LoadingData>Cargando datos de ubicacion y horario de los trenes</LoadingData>
          } else {
            // Loading data scene
            if (!dataLoaded(this.props)) {
              return <LoadingData />
            } else {
              // Application scene
              return <App google={{maps: this.state.library}} />
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

const mapStateToProps = ({preferences, trenes, horarios}) => ({
  preferencesSet: preferencesSet(preferences),
  trenesIsEmpty: trenesIsEmpty(trenes),
  horariosIsEmpty: !horarios.activo,
  horariosError: horarios.error,
  trenesError: trenes.error
})

export default connect(mapStateToProps)(AppContainer)
