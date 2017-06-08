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
    this.state = {
      showComponent: true
    };
  }
  componentDidMount() {
    if (this.state.showComponent && this.props.autoHideDuration) {
      this.setAutoHideTimer();
    }
  }
  setAutoHideTimer() {
    clearTimeout(this.timerAutoHideId);
    this.timerAutoHideId = setTimeout(() => {
      if (this.props.open !== null && this.props.onRequestClose) {
        this.props.onRequestClose("timeout");
      } else {
        this.setState({ showComponent: false });
      }
    }, this.props.autoHideDuration);
  }
  render() {
    return (
      <VelocityComponent
        duration={250}
        animation={{
          translateX: "35%",
          opacity: this.state.showComponent ? 1 : 0
        }}
      >
        <SnackBarContent {...this.props} />
      </VelocityComponent>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking for main Component ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

SnackBar.propTypes = {
  action: PropTypes.string,
  autoHideDuration: PropTypes.number,
  message: PropTypes.string,
  subMessage: PropTypes.string,
  open: PropTypes.bool
};

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

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
    const { onActionTap, actionText, message, subMessage } = this.props;
    return (
      <div className={styles.SnackBar}>
        <div onClick={onActionTap} className={styles.ActionButton}>
          {actionText || "OK"}
        </div>
        {this.getMessage(message)}
        {this.getSubMessage(subMessage)}
      </div>
    );
  }
}

export default SnackBar;
