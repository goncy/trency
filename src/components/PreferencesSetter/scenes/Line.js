import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getLines } from "../../../selectors/constants";
import { clearPreferences } from "../../../actions/preferences";

class Line extends Component {
  static propTypes = {
    clearPreferences: PropTypes.func
  };

  componentWillMount() {
    const { clearPreferences } = this.props;
    clearPreferences();
  }

  render() {
    return (
      <section
        className={`hero is-primary is-fullheight flex-column preferences`}
      >
        <div className="hero-body">
          <div className="container has-text-centered animated fadeIn">
            <h1 className="title">Quiero tomarme la linea</h1>
            <h2 className="subtitle">
              {getLines.map((line, key) => (
                <Link
                  key={key}
                  className="button is-primary is-inverted is-outlined"
                  to={line.id}
                >
                  {line.name}
                </Link>
              ))}
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  clearPreferences: clearPreferences.run
};

export default connect(undefined, mapDispatchToProps)(Line);
