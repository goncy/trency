// @flow

import React from 'react'
import {connect} from 'react-redux'

import type {AppState} from '../../flowtypes/globals'
import type {Branch} from '../../flowtypes/constants'

export type DirectionsProps = {
  branch: Branch
}

import './Directions.css'

const Directions = ({branch}: DirectionsProps) => (
  <div className='Directions'>
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

Directions.propTypes = {
  branch: React.PropTypes.object
}

const mapStateToProps = ({preferences}: AppState) => ({
  branch: preferences.branch
})

export default connect(mapStateToProps)(Directions)
