import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/Modal.css";
import FlatButton from "./FlatButton";
import { translate } from "react-i18next";

///////////////////////////////////////////////////////////////////////////////
// The main Component; non-generic buttons for the login modal: ///////////////
///////////////////////////////////////////////////////////////////////////////

class LoginModalButtons extends Component {
  render() {
    const { t } = this.props;
    // const { actionButtons } = this.props;
    // const { handleCancel handleLogin } = this.props;
    const btn1 = (
      <FlatButton
        buttonText={t("Cancel")}
        handleOnClick={this.props.handleCancel}
      />
    );
    const btn2 = (
      <FlatButton
        buttonText={t("Log in")}
        handleOnClick={this.props.handleLogin}
      />
    );
    const actionButtons = [btn1, btn2];
    return (
      <div className={styles.ActionButtons}>
        {actionButtons.map((button, i) => {
          return (
            <div key={i} className={styles.ButtonWrapper}>
              {button}
            </div>
          );
        })}
      </div>
    );
  }
}

export default translate()(LoginModalButtons);
