import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {clearPreferences} from '../../actions/preferences'

import './Preferences.css'

const Preferences = ({branch, line, station, clearPreferences}) => (
  <div className='Preferences'>
    <div className='preferences'>
      <p>{`Esperando a la linea ${line.name}`}</p>
      <p>{`Ramal ${branch.name}`}</p>
      <p>{`En la estacion ${station.name}`}</p>
      <Link
        to='/'
        className='button edit-btn'
      >
        Volver atras
      </Link>
    </div>
  </div>
)

const mapStateToProps = ({preferences}) => ({
  branch: preferences.branch,
  line: preferences.line,
  station: preferences.station
})

const mapDispatchToProps = {
  clearPreferences: clearPreferences.run
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)
