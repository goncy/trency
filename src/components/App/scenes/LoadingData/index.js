import React from 'react'

import Spinner from '../../../Spinner'

import './LoadingData.css'

const LoadingData = ({children}) => <Spinner>
  <p className='LoadingData'>
    Cargando datos de ubicacion y horario de los trenes
    <span>{children}</span>
  </p>
</Spinner>

export default LoadingData
