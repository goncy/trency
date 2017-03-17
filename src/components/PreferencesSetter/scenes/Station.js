import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {changeLine, changeBranch} from '../../../actions/preferences'

class Station extends Component {
  componentWillMount () {
    const {match, changeLine, changeBranch} = this.props
    changeLine(match.params.line)
    changeBranch(match.params.branch)
  }

  render () {
    const {preferences, match} = this.props
    const {branch, line} = preferences
    return (branch && line) && (
      <section className={`hero is-success is-fullheight flex-column preferences`}>
        <div className='hero-body'>
          <div className='container has-text-centered animated fadeIn'>
            <h1 className='title'>En la estacion</h1>
            <h2 className='subtitle'>
              {branch.stations.map((station, key) =>
                <Link
                  key={key}
                  className='button is-success is-inverted is-outlined'
                  to={`${match.url}/${station.id}`}
                >
                  {station.name}
                </Link>
              )}
            </h2>
          </div>
        </div>
        <div className='hero-foot'>
          <nav className="level">
            <p className="has-text-centered">
              <Link to={`/${match.params.line}`}>Volver atras</Link>
            </p>
          </nav>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({preferences}) => ({
  preferences
})

const mapDispatchToProps = {
  changeLine: changeLine.run,
  changeBranch: changeBranch.run
}

export default connect(mapStateToProps, mapDispatchToProps)(Station)
