import React from 'react'
import {connect} from 'react-redux'

import {clearPreferences} from '../../actions/preferences'

import EditIcon from './edit.svg'

import './Preferences.css'

const Preferences = ({ramal, linea, estacion, clearPreferences}) => (
  <div className='Preferences animated fadeInLeft'>
    <div className='preferences'>
      <p>{`Esperando a la linea ${linea.name}`}</p>
      <p>{`Ramal ${ramal.name}`}</p>
      <p>{`En la estacion ${estacion.name}`}</p>
      <button
        className='edit-btn'
        onClick={() => clearPreferences()}
      >
        <span className='edit-text'>
          EDITAR
        </span>
        <img
          width='14px'
          height='14px'
          className='edit-img'
          alt='edit'
          src={EditIcon}
        />
      </button>
    </div>
  </div>
)

const mapStateToProps = ({preferences}) => ({
  ramal: preferences.ramal,
  linea: preferences.linea,
  estacion: preferences.estacion
})

const mapDispatchToProps = {
  clearPreferences: clearPreferences.run
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
