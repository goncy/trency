import React from 'react'

import {getHorario} from './selectors'

import './RamalesHorarios.css'

const RamalesHorarios = ({horario, estacion, ramal}) => {
  return (
    <div className='RamalesHorarios animated fadeInUp'>
      {/* Primero */}
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Proximo tren <span className={`tag is-${ramal.destinos[0].color} is-small`}>destino {ramal.destinos[0].name}</span></p>
            <p className="title">{getHorario(horario.horarios[0].primero)}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Segundo tren <span className={`tag is-${ramal.destinos[0].color} is-small`}>destino {ramal.destinos[0].name}</span></p>
            <p className="title">{getHorario(horario.horarios[0].segundo)}</p>
          </div>
        </div>
      </nav>
      {/* Segundo */}
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Proximo tren <span className={`tag is-${ramal.destinos[1].color} is-small`}>destino {ramal.destinos[1].name}</span></p>
            <p className="title">{getHorario(horario.horarios[1].primero)}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Segundo tren <span className={`tag is-${ramal.destinos[1].color} is-small`}>destino {ramal.destinos[1].name}</span></p>
            <p className="title">{getHorario(horario.horarios[1].segundo)}</p>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default RamalesHorarios
