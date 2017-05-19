import { translate } from "react-i18next";
import Ink from "react-ink";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/RaisedButton.css";

import {
  VelocityTransitionGroup,
  VelocityComponent,
  velocityHelpers
} from "velocity-react";

// A RaisedButton emphasizes important functions on in the app.

class RaisedButton extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { t, disabled, buttonText, iconClass } = this.props;
    return (
      <div
        className={`${styles.RaisedButton} ${disabled ? styles.disabled : ""}`}
        onClick={disabled ? "" : this.props.handleOnClick}
      >
        {iconClass
          ? <i className={`material-icons ${styles.Icon}`}>{iconClass}</i>
          : ""}
        &nbsp;<span>{buttonText}</span>
        <Ink />
      </div>
    );
  }
}

RaisedButton.propTypes = {
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
  handleOnClick: PropTypes.func,
  iconClass: PropTypes.string
};

export default translate()(RaisedButton);
