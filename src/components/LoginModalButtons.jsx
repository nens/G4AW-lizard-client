import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/Modal.css";
import FlatButton from "./FlatButton";

///////////////////////////////////////////////////////////////////////////////
// The main Component; non-generic buttons for the login modal: ///////////////
///////////////////////////////////////////////////////////////////////////////

export default class LoginModalButtons extends Component {
  render() {
    // const { actionButtons } = this.props;
    // const { handleCancel handleLogin } = this.props;
    const btn1 = (
      <FlatButton buttonText="Cancel" handleOnClick={this.props.handleCancel} />
    );
    const btn2 = (
      <FlatButton buttonText="Log in" handleOnClick={this.props.handleLogin} />
    );
    const actionButtons = [btn1, btn2];
    return (
      <div className={styles.ActionButtons}>
        {actionButtons.map((button, i) => {
          return <div key={i} className={styles.ButtonWrapper}>{button}</div>;
        })}
      </div>
    );
  }
}
