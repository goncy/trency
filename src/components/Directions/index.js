// @flow
import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import type { AppState } from "../../flowtypes/globals"
import type { Branch } from "../../flowtypes/constants"

import "./Directions.css"

export type DirectionsProps = {
  branch: Branch
}

const Directions = ({ branch }: DirectionsProps) => (
  <div className="Directions">
    {branch.directions &&
      branch.directions.map((direction, index) => (
        <div key={index}>
          <span
            className={`tag is-hidden-mobile is-${direction.color} is-medium`}
          >
            Destino {direction.name}
          </span>
          <span className={`tag is-hidden-tablet is-${direction.color}`}>
            Destino {direction.name}
          </span>
        </div>
      ))}
    <span className={`tag is-hidden-mobile is-danger is-medium`}>
      Tren parado
    </span>
    <span className={`tag is-hidden-tablet is-danger`}>Tren parado</span>
  </div>
)

Directions.propTypes = {
  branch: PropTypes.object
}

const mapStateToProps = ({ preferences }: AppState) => ({
  branch: preferences.branch
})

export default connect(mapStateToProps)(Directions)
