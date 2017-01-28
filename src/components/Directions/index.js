import React from 'react'
import {connect} from 'react-redux'

import './Directions.css'

const Directions = ({branch}) => {
  return (
    <div className='Directions animated fadeInLeft'>
      {branch.directions && branch.directions.map((direction, index) => (
        <span key={index} className={`tag is-${direction.color} is-medium`}>Destino {direction.name}</span>
      ))}
    </div>
  )
}

const mapStateToProps = ({preferences}) => ({
  branch: preferences.branch
})

export default connect(mapStateToProps)(Directions)
