// @flow

import React from "react";
import { connect } from "react-redux";
import { List } from "immutable";

import { getBranches } from "./selectors";

import "./Arrivals.css";

import type { Arrival } from "../../flowtypes/data";
import type { Station, Branch } from "../../flowtypes/constants";

export type ArrivalsProps = {
  arrivals: List<Arrival>,
  branch: Branch,
  station: Station
};

const Arrivals = (props: ArrivalsProps) => {
  const branches = getBranches(props);
  return (
    <div className="Arrivals">
      {/* Desktop */}
      <div className="is-hidden-mobile">
        {branches.map((branch, key) => (
          <nav className="level" key={key}>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">
                  Primer tren{" "}
                  <span className={`tag is-${branch.color} is-small`}>
                    destino {branch.destino}
                  </span>
                </p>
                <p className="title">{branch.arrivals.primero}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">
                  Segundo tren{" "}
                  <span className={`tag is-${branch.color} is-small`}>
                    destino {branch.destino}
                  </span>
                </p>
                <p className="title">{branch.arrivals.segundo}</p>
              </div>
            </div>
          </nav>
        ))}
      </div>
      {/* Mobile */}
      <div className="is-hidden-tablet">
        {branches.map((branch, key) => (
          <nav className="level" key={key}>
            <div className="level-item has-text-centered">
              <div className="arrival flex-column">
                <p className="heading">
                  <span className={`tag is-${branch.color} is-small`}>
                    destino {branch.destino}
                  </span>
                </p>
                <div className="columns is-mobile is-gapless">
                  <div className="column">
                    <p className="subtitle">
                      <span className={`tag is-small`}>1</span>{" "}
                      {branch.arrivals.primero}
                    </p>
                  </div>
                  <div className="column">
                    <p className="subtitle">
                      <span className={`tag is-small`}>2</span>{" "}
                      {branch.arrivals.segundo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ preferences, data }): ArrivalsProps => ({
  arrivals: data.arrivals,
  branch: preferences.branch,
  station: preferences.station
});

export default connect(mapStateToProps)(Arrivals);
