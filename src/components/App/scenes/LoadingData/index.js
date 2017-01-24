import React from 'react'

import Spinner from '../../../Spinner'

const Loading = ({message}) => <Spinner>
  <p>Cargando datos de ubicacion y horario de los trenes
    {message && <span style={{fontSize: 'small'}}>
      <br/>
      {message}
    </span>}
  </p>
</Spinner>

export default Loading
