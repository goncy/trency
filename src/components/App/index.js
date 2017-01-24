import React, { Component } from 'react'
import {connect} from 'react-redux'
import loadGoogleMapsAPI from 'load-google-maps-api'

import {preferencesSet} from '../../reducers/preferences'
import {trenesIsEmpty} from '../../reducers/trenes'

import App from './App'
import PreferencesSetter from '../PreferencesSetter'
import Spinner from '../Spinner'
import ErrorScreen from '../ErrorScreen'

import './App.css'

class AppContainer extends Component {
  state = {
    googleMapsLoaded: false,
    googleMapsLoadingError: null
  }

  componentDidMount () {
    this.loadGMaps()
  }

  loadGMaps () {
    return loadGoogleMapsAPI({libraries: 'geometry'})
      .then(() => {
        this.setState({
          googleMapsLoaded: true
        })
      })
      .catch(err => {
        return this.setState({
          googleMapsLoaded: false,
          googleMapsLoadingError: err
        })
      })
  }

  render () {
    const {preferencesSet, trenesIsEmpty, horariosIsEmpty, trenesError, horariosError} = this.props
    const {googleMapsLoaded, googleMapsLoadingError} = this.state

    return (
      <div className="App flex-column">
        <div className="App-intro flex-column">
          {!googleMapsLoaded && !googleMapsLoadingError && <Spinner>
            <p>Cargando libreria de Google Maps</p>
          </Spinner>}
          {!googleMapsLoaded && googleMapsLoadingError && <ErrorScreen>
            <div>
              Hubo un error cargando la libreria de Google Maps
              <div>
                <a
                  onClick={() => this.loadGMaps()}
                  className="button is-outlined is-inverted is-warning"
                  style={{marginTop: 10}}
                >
                  Volver a intentar
                </a>
              </div>
            </div>
          </ErrorScreen>}
          {googleMapsLoaded && !preferencesSet && <PreferencesSetter />}
          {googleMapsLoaded && preferencesSet && (trenesIsEmpty || horariosIsEmpty) && (trenesError || horariosError) &&
            <Spinner>
              <p>Cargando datos de ubicacion y horario de los trenes
              <br/>
              <span style={{fontSize: 'small'}}>(parece que el servidor esta tardando en responder)</span></p>
            </Spinner>
          }
          {googleMapsLoaded && preferencesSet && (trenesIsEmpty || horariosIsEmpty) && (!trenesError && !horariosError) &&
            <Spinner>
              <p>Cargando datos de ubicacion y horario de los trenes</p>
            </Spinner>
          }
          {googleMapsLoaded && preferencesSet && (!trenesIsEmpty && !horariosIsEmpty) && <App />}
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
