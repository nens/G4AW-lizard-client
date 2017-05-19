import React, { Component } from "react";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/LoginLogoutButton.css";
import Ink from "react-ink";

import {
  VelocityTransitionGroup,
  VelocityComponent,
  velocityHelpers
} from "velocity-react";

// A LoginLogoutButton switches between map and omnibox contexts.

class LoginLogoutButton extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { t } = this.props;
    return (
      <div
        className={styles.LoginLogoutButton}
        onClick={this.props.handleOnClick}
        style={{ position: "relative" }}
      >
        <i className={`material-icons ${styles.Icon}`}>lock</i>&nbsp;Login
        <Ink />
      </div>
    );
  }
}

LoginLogoutButton.propTypes = {
  open: PropTypes.bool
};

export default translate()(LoginLogoutButton);
