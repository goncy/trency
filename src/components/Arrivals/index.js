import React from 'react'
import {connect} from 'react-redux'

import {getBranches} from './selectors'

import './Arrivals.css'

const Arrivals = props => {
  const branches = getBranches(props)
  return (
    <div className='Arrivals animated fadeInUp'>
      {/* Primero */}
      {branches.map((branch, key) => (
        <nav className="level" key={key}>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Proximo tren <span className={`tag is-${branch.color} is-small`}>destino {branch.destino}</span></p>
              <p className="title">{branch.arrivals.primero}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Siguiente train <span className={`tag is-${branch.color} is-small`}>destino {branch.destino}</span></p>
              <p className="title">{branch.arrivals.segundo}</p>
            </div>
          </div>
        </nav>
      ))}
    </div>
  )
}

const mapStateToProps = ({preferences, data}) => ({
  arrival: data.arrivals,
  branch: preferences.branch,
  station: preferences.station
})

export default connect(mapStateToProps)(Arrivals)
