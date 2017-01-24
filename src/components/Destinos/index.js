import React from 'react'
import {connect} from 'react-redux'

import './Destinos.css'

const Destinos = ({ramal}) => {
  return (
    <div className='Destinos animated fadeInLeft'>
      {ramal.destinos && ramal.destinos.map((destino, index) => (
        <span key={index} className={`tag is-${destino.color} is-medium`}>Destino {destino.name}</span>
      ))}
    </div>
  )
}

const mapStateToProps = ({preferences}) => ({
  ramal: preferences.ramal
})

export default connect(mapStateToProps)(Destinos)
