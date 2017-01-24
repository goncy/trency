import React from 'react'
import {connect} from 'react-redux'

import {getRamales} from './selectors'

import './Horarios.css'

const Horarios = props => {
  const ramales = getRamales(props)
  return (
    <div className='Horarios animated fadeInUp'>
      {/* Primero */}
      {ramales.map((ramal, key) => (
        <nav className="level" key={key}>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Proximo tren <span className={`tag is-${ramal.color} is-small`}>destino {ramal.destino}</span></p>
              <p className="title">{ramal.horarios.primero}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Segundo tren <span className={`tag is-${ramal.color} is-small`}>destino {ramal.destino}</span></p>
              <p className="title">{ramal.horarios.segundo}</p>
            </div>
          </div>
        </nav>
      ))}
    </div>
  )
}

const mapStateToProps = ({preferences, horarios}) => ({
  horario: horarios.activo,
  ramal: preferences.ramal,
  estacion: preferences.estacion
})

export default connect(mapStateToProps)(Horarios)
