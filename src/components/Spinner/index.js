import React from 'react'

import './Spinner.css'

const Spinner = props => (
  <div className='Spinner'>
    <div className='square'></div>
    {props.children}
  </div>
)

export default Spinner
