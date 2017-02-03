// @flow

import React, {PropTypes} from 'react'

import ErrorScreen from '../../../ErrorScreen'

export type LoadingDataEmptyProps = {
  goBack: () => void
}

const LoadingDataEmpty = ({goBack}: LoadingDataEmptyProps) => <ErrorScreen>
  <div className='LoadingData empty'>
    El servidor respondio correctamente, pero sin resultados, es muy posible que no se encuentren formaciones circulando en este horario, intente de nuevo mas tarde
    <div>
      <a
        onClick={() => goBack()}
        className="button is-outlined is-inverted is-warning"
        style={{marginTop: 10}}
      >
        Volver atras
      </a>
    </div>
  </div>
</ErrorScreen>

LoadingDataEmpty.propTypes = {
  goBack: PropTypes.func
}

export default LoadingDataEmpty
