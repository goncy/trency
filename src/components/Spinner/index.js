import React from "react";
import PropTypes from "prop-types";

import "./Spinner.css";

const Spinner = ({ children }) => (
  <div className="Spinner">
    <div className="square" />
    {children}
  </div>
);

Spinner.propTypes = {
  children: PropTypes.node
};

export default Spinner;
