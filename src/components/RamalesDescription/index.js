import React from 'react'

import './RamalesDescription.css'

const RamalesDescription = ({ramal}) => {
  return (
    <div className='RamalesDescription animated fadeInLeft'>
      {ramal.destinos && ramal.destinos.map((destino, index) => (
        <span key={index} className={`tag is-${destino.color} is-medium`}>Destino {destino.name}</span>
      ))}
    </div>
  )
}

export default RamalesDescription
