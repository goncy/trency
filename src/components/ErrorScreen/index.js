import React from 'react'

import './ErrorScreen.css'

const ErrorScreen = ({children}) => (
  <div className='ErrorScreen'>
    {children || <p>Hubo un error, por favor, intenta de nuevo mas tarde, gracias!</p>}
  </div>
)

export default ErrorScreen
