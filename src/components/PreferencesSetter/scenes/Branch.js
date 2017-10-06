import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import { changeLine } from "../../../actions/preferences"

class Branch extends Component {
  static propTypes = {
    match: PropTypes.any.isRequired,
    preferences: PropTypes.any.isRequired,
    changeLine: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { match, changeLine } = this.props
    changeLine(match.params.line)
  }

  render() {
    const { preferences, match } = this.props
    const { line } = preferences
    return (
      line && (
        <section
          className={`hero is-info is-fullheight flex-column preferences`}
        >
          <div className="hero-body">
            <div className="container has-text-centered animated fadeIn">
              <h1 className="title">Ramal</h1>
              <h2 className="subtitle">
                {line.branches.map((branch, key) => (
                  <Link
                    key={key}
                    className="button is-info is-inverted is-outlined"
                    to={`${match.url}/${branch.slug}`}
                  >
                    {branch.name}
                  </Link>
                ))}
              </h2>
            </div>
          </div>
          <div className="hero-foot">
            <nav className="level">
              <p className="has-text-centered">
                <Link to="/">Volver atras</Link>
              </p>
            </nav>
          </div>
        </section>
      )
    )
  }
}

const mapStateToProps = ({ preferences }) => ({
  preferences
})

const mapDispatchToProps = {
  changeLine: changeLine.run
}

export default connect(mapStateToProps, mapDispatchToProps)(Branch)
