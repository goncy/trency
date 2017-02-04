import React from 'react'
import {connect} from 'react-redux'

import './Directions.css'

const Directions = ({branch}) => {
  return (
    <div className='Directions animated fadeInLeft'>
      {branch.directions && branch.directions.map((direction, index) => (
        <div key={index}>
          <span className={`tag is-hidden-mobile is-${direction.color} is-medium`}>Destino {direction.name}</span>
          <span className={`tag is-hidden-tablet is-${direction.color}`}>Destino {direction.name}</span>
        </div>
      ))}
      <span className={`tag is-hidden-mobile is-danger is-medium`}>Tren parado</span>
      <span className={`tag is-hidden-tablet is-danger`}>Tren parado</span>
    </div>
  )
}

const mapStateToProps = ({preferences}) => ({
  branch: preferences.branch
})

export default connect(mapStateToProps)(Directions)
