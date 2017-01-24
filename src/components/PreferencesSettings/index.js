import React from 'react'

import EditIcon from './edit.svg'

import './PreferencesSettings.css'

const PreferencesSettings = ({ramal, linea, estacion, clearPreferences}) => {
  return (
    <div className='PreferencesSettings animated fadeInLeft'>
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
}

export default PreferencesSettings
