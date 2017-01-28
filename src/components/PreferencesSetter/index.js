// @flow

import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getLines} from '../../selectors/constants'
import {changeLine, changeBranch, changeStation} from '../../actions/preferences'

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
    const {preferences, changeLine, changeBranch, changeStation} = this.props
    const {line, branch} = preferences
    const {step} = this.state

    return (
      <section className={`hero is-${this.getStepColor()} is-fullheight flex-column PreferencesSetter`}>
        <div className='hero-body'>
          {/* Set line */}
          {step === 1 && (
            <div className='container has-text-centered animated fadeIn'>
              <h1 className='title'>Quiero tomarme la linea</h1>
              <h2 className='subtitle'>
                {getLines.map((line, key) =>
                  <a
                  key={key}
                    className={`button is-${this.getStepColor()} is-inverted is-outlined`}
                    onClick={() => {
                      changeLine(line.id)
                      this.setStep(2)
                    }}
                  >
                    {line.name}
                  </a>
                )}
              </h2>
            </div>
          )}

          {/* Set branch */}
          {step === 2 && (
            <div className='container has-text-centered animated fadeIn'>
              <h1 className='title'>Ramal</h1>
              <h2 className='subtitle'>
                {line.branches.map((branch, key) =>
                  <a
                  key={key}
                    className={`button is-${this.getStepColor()} is-inverted is-outlined`}
                    onClick={() => {
                      changeBranch(branch.id)
                      this.setStep(3)
                    }}
                  >
                    {branch.name}
                  </a>
                )}
              </h2>
            </div>
          )}

          {/* Set Station */}
          {step === 3 && (
            <div className='container has-text-centered animated fadeIn'>
              <h1 className='title'>En la estacion</h1>
              <h2 className='subtitle'>
                {branch.stations.map((station, key) =>
                  <a
                    key={key}
                    className={`button is-${this.getStepColor()} is-inverted is-outlined`}
                    onClick={() => {
                      changeStation(station.id)
                      this.setStep(0)
                    }}
                  >
                    {station.name}
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
  changeLine: changeLine.run,
  changeBranch: changeBranch.run,
  changeStation: changeStation.run
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesSetter)
