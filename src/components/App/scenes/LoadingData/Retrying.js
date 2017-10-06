import React from "react"

import Spinner from "../../../Spinner"

const LoadingDataRetrying = () => (
  <Spinner>
    <p className="LoadingData retrying">
      Cargando datos de ubicacion y horarios de los trenes
      <br />
      <span>
        Parece que el servidor esta teniendo problemas, volviendo a intentar
      </span>
    </p>
  </Spinner>
)

export default LoadingDataRetrying
