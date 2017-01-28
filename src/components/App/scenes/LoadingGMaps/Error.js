// @flow

import React, {PropTypes} from 'react'

import ErrorScreen from '../../../ErrorScreen'

export type GMapsErrorProps = {
  retry: () => void
}

const GMapsError = ({retry}: GMapsErrorProps) => <ErrorScreen>
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

GMapsError.propTypes = {
  retry: PropTypes.func
}

export default GMapsError
