// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { hasData, hasError, hasSucceeded } from "../../selectors/data";
import App from "./App";
import LoadingData from "./scenes/LoadingData";

import type { AppState } from "../../flowtypes/globals";
import {
  changeBranch,
  changeLine,
  changeStation
} from "../../actions/preferences";

import "./App.css";

export type AppContainerProps = {
  hasData: boolean,
  hasError: boolean
};

class AppContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    hasData: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    changeLine: PropTypes.func.isRequired,
    changeBranch: PropTypes.func.isRequired,
    changeStation: PropTypes.func.isRequired,
    hasSucceeded: PropTypes.bool.isRequired
  };

  componentWillMount() {
    const { match, changeLine, changeBranch, changeStation } = this.props;
    changeLine(match.params.line);
    changeBranch(match.params.branch);
    changeStation(match.params.station);
  }

  getScene() {
    const { hasData, hasError, hasSucceeded } = this.props;

    // Loading data failed scene
    if (hasError && !hasData) {
      return <LoadingData.Retrying />;
    } else {
      // Loading data scene
      if (!hasData && !hasSucceeded) {
        return <LoadingData.Loading />;
      } else {
        // Empty response
        if (!hasData && hasSucceeded) {
          return <LoadingData.Empty />;
        } else {
          // Application scene
          return <App />;
        }
      }
    }
  }

  render() {
    return (
      <div className="App flex-column">
        <div className="App-intro flex-column">{this.getScene()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ data }: AppState): AppContainerProps => ({
  hasData: hasData(data),
  hasSucceeded: hasSucceeded(data),
  hasError: hasError(data)
});

const mapDispatchToProp = {
  changeLine: changeLine.run,
  changeBranch: changeBranch.run,
  changeStation: changeStation.run
};

export default connect(mapStateToProps, mapDispatchToProp)(AppContainer);
