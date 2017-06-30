import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Ink from "react-ink";

import styles from "./styles/LoginLogoutButton.css";

class LoginLogoutButtonComponent extends Component {
  render() {
    const { t, bootstrap } = this.props;

    return (
      <div
        id="LoginLogoutButton"
        className={styles.LoginLogoutButton}
        onClick={
          bootstrap
            ? bootstrap.authenticated
              ? bootstrap.doLogout.bind(bootstrap)
              : bootstrap.doLogin.bind(bootstrap)
            : null
        }
      >
        <i className={`material-icons ${styles.Icon}`}>lock</i>
        &nbsp;
        {bootstrap ? (bootstrap.authenticated ? t("Logout") : t("Login")) : ""}
        <Ink />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bootstrap: state.session.bootstrap
  };
}

const LoginLogoutButton = connect(mapStateToProps, null)(
  LoginLogoutButtonComponent
);

export default translate()(LoginLogoutButton);
