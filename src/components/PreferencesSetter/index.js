// @flow

import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getLineas} from '../../selectors'
import {changeLinea, changeRamal, changeEstacion} from '../../actions/preferences'

import './PreferencesSetter.css'

class PreferencesSetter extends Component {
  state = {
    step: 1
  }

  setStep (step) {
    this.setState({step})
  }

  getStepColor () {
    switch (this.state.step) {
      case 1:
        return 'primary'
      case 2:
        return 'info'
      case 3:
        return 'success'
      default:
        return 'light'
    }
  }

  render () {
    const {preferences, changeLinea, changeRamal, changeEstacion} = this.props
    const {linea, ramal} = preferences
    const {step} = this.state

    return (
      <section className={`hero is-${this.getStepColor()} is-fullheight flex-column PreferencesSetter`}>
        <div className='hero-body'>
          {/* Set linea */}
          {step === 1 && (
            <div className='container has-text-centered animated fadeIn'>
              <h1 className='title'>Quiero tomarme la linea</h1>
              <h2 className='subtitle'>
                {getLineas.map((linea, key) =>
                  <a
                  key={key}
                    className={`button is-${this.getStepColor()} is-inverted is-outlined`}
                    onClick={() => {
                      changeLinea(linea.id)
                      this.setStep(2)
                    }}
                  >
                    {linea.name}
                  </a>
                )}
              </h2>
            </div>
          )}

          {/* Set ramal */}
          {step === 2 && (
            <div className='container has-text-centered animated fadeIn'>
              <h1 className='title'>Ramal</h1>
              <h2 className='subtitle'>
                {linea.ramales.map((ramal, key) =>
                  <a
                  key={key}
                    className={`button is-${this.getStepColor()} is-inverted is-outlined`}
                    onClick={() => {
                      changeRamal(ramal.id)
                      this.setStep(3)
                    }}
                  >
                    {ramal.name}
                  </a>
                )}
              </h2>
            </div>
          )}

          {/* Set Estacion */}
          {step === 3 && (
            <div className='container has-text-centered animated fadeIn'>
              <h1 className='title'>En la estacion</h1>
              <h2 className='subtitle'>
                {ramal.estaciones.map((estacion, key) =>
                  <a
                    key={key}
                    className={`button is-${this.getStepColor()} is-inverted is-outlined`}
                    onClick={() => {
                      changeEstacion(estacion.id)
                      this.setStep(0)
                    }}
                  >
                    {estacion.name}
                  </a>
                )}
              </h2>
            </div>
          )}
        </div>

        {/* Volver atras */}
        {step > 1 && step <= 3 && (
          <div className='hero-foot'>
            <nav className="level">
              <p className="has-text-centered">
                <a onClick={() => this.setStep(step - 1)} className="button is-link">Volver atras</a>
              </p>
            </nav>
          </div>
        )}
      </section>
    )
  }
}

const mapStateToProps = ({preferences}) => ({
  preferences
})

const mapDispatchToProps = {
  changeLinea: changeLinea.run,
  changeRamal: changeRamal.run,
  changeEstacion: changeEstacion.run
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesSetter)
