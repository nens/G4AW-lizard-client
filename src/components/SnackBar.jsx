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
          animation={{ translateY: isOpen ? 0 : "100px" }}
        >
          <SnackBarContent {...this.props} />
        </VelocityComponent>
      </div>
    );
  }
}

SnackBar.propTypes = {
  negative: PropTypes.bool,
  action: PropTypes.string,
  autoHideDuration: PropTypes.number,
  message: PropTypes.string,
  subMessage: PropTypes.string,
  isOpen: PropTypes.bool
};

class SnackBarContent extends Component {
  getMessage(message) {
    return <p className={styles.Message}>{message || "..."}</p>;
  }
  getSubMessage(subMessage) {
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
      negative
    } = this.props;
    const actionButtonStyle = negative
      ? styles.ActionButtonNegative
      : styles.ActionButtonDefault;
    return (
      <div className={styles.SnackBar}>
        <div onClick={onActionTap} className={actionButtonStyle}>
          {actionText || "OK"}
        </div>
        {this.getMessage(message)}
        {this.getSubMessage(subMessage)}
      </div>
    );
  }
}

export default SnackBar;
