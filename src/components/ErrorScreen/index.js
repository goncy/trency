import React from 'react'

import './ErrorScreen.css'

const ErrorScreen = props => (
  <div className='ErrorScreen'>
    {props.children || <p>Hubo un error, por favor, intenta de nuevo mas tarde, gracias!</p>}
  </div>
)

export default ErrorScreen
