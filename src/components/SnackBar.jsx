import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/SnackBar.css";

import { VelocityComponent } from "velocity-react";

// A SnackBar component provides brief feedback about an operation through
// a message at the bottom of the screen.
// https://material.io/guidelines/components/snackbars-toasts.html

class SnackBar extends Component {
  constructor() {
    super();
  }
  render() {
    const { isOpen, t } = this.props;
    return (
      <div className={styles.SnackBarWrapper}>
        <VelocityComponent
          duration={250}
          animation={{ translateY: isOpen ? -10 : "100px" }}
        >
          <SnackBarContent {...this.props} />
        </VelocityComponent>
      </div>
    );
  }
}

SnackBar.propTypes = {
  message: PropTypes.string,
  isOpen: PropTypes.bool,
  actionText: PropTypes.string,
  autoHideDuration: PropTypes.number,
  isError: PropTypes.bool,
  subMessage: PropTypes.string
};

SnackBar.defaultProps = {
  actionText: "OK",
  isError: false,
  message: "..."
};

class SnackBarContent extends Component {
  getActionElem(onActionTap, actionText, isError) {
    const actionButtonStyle = isError
      ? styles.ActionButtonError
      : styles.ActionButtonDefault;
    <div onClick={onActionTap} className={actionButtonStyle}>
      {actionText}
    </div>;
  }
  getMessageElem(message) {
    return <p className={styles.Message}>{message}</p>;
  }
  getSubMessageElem(subMessage) {
    return subMessage
      ? <p className={styles.SubMessage}>{subMessage}</p>
      : null;
  }
  render() {
    const {
      onActionTap,
      actionText,
      message,
      subMessage,
      isError
    } = this.props;
    return (
      <div className={styles.SnackBar}>
        {this.getActionElem(onActionTap, actionText, isError)}
        {this.getMessageElem(message)}
        {this.getSubMessageElem(subMessage)}
      </div>
    );
  }
}

export default SnackBar;
