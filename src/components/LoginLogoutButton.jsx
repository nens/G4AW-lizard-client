import React, { Component } from "react";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/LoginLogoutButton.css";
import Ink from "react-ink";

class LoginLogoutButton extends Component {
  render() {
    return (
      <div
        className={styles.LoginLogoutButton}
        onClick={this.props.handleClick}
      >
        <i className={`material-icons ${styles.Icon}`}>lock</i>
        &nbsp;{this.props.text}
        <Ink />
      </div>
    );
  }
}

export default translate()(LoginLogoutButton);
