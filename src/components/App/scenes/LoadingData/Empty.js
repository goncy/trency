// @flow

import React from "react"
import { Link } from "react-router-dom"

import ErrorScreen from "../../../ErrorScreen"

const LoadingDataEmpty = () => (
  <ErrorScreen>
    <div className="LoadingData empty">
      El servidor respondio correctamente, pero sin resultados, es muy posible
      que no se encuentren formaciones circulando en este horario, intente de
      nuevo mas tarde
      <div>
        <Link
          to="/"
          className="button is-outlined is-inverted is-warning"
          style={{ marginTop: 10 }}
        >
          Volver atras
        </Link>
      </div>
    </div>
  </ErrorScreen>
)

export default LoadingDataEmpty
