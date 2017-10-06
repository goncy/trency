import React from "react"
import PropTypes from "prop-types"

import "./ErrorScreen.css"

const ErrorScreen = ({ children }) => (
  <div className="ErrorScreen">
    {children || (
      <p>Hubo un error, por favor, intenta de nuevo mas tarde, gracias!</p>
    )}
  </div>
)

ErrorScreen.propTypes = {
  children: PropTypes.node
}

export default ErrorScreen
