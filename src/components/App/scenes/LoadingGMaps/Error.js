import React from 'react'

import ErrorScreen from '../../../ErrorScreen'

const Loading = retry => <ErrorScreen>
  <div>
    Hubo un error cargando la libreria de Google Maps
    <div>
      <a
        onClick={() => retry()}
        className="button is-outlined is-inverted is-warning"
        style={{marginTop: 10}}
      >
        Volver a intentar
      </a>
    </div>
  </div>
</ErrorScreen>

export default Loading
