import React from "react";

import Spinner from "../../../Spinner";

const LoadingDataLoading = () => (
  <Spinner>
    <p className="LoadingData loading">
      Cargando datos de ubicación y horarios de los trenes
    </p>
  </Spinner>
);

export default LoadingDataLoading;
