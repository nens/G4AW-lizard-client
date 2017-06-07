import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/SnackBar.css";

import {
  VelocityTransitionGroup,
  VelocityComponent,
  velocityHelpers
} from "velocity-react";

// A SnackBar component provides brief feedback about an operation through
// a message at the bottom of the screen.
// https://material.io/guidelines/components/snackbars-toasts.html

class SnackBar extends Component {
  constructor() {
    super();
    this.state = {
      showComponent: true
    };
    this.setAutoHideTimer = this.setAutoHideTimer.bind(this);
  }
  componentDidMount() {
    if (this.state.showComponent) {
      this.setAutoHideTimer();
    }
  }
  setAutoHideTimer() {
    const autoHideDuration = this.props.autoHideDuration;

    if (autoHideDuration > 0) {
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(() => {
        if (this.props.open !== null && this.props.onRequestClose) {
          this.props.onRequestClose("timeout");
        } else {
          this.setState({ showComponent: false });
        }
      }, autoHideDuration);
    }
  }
  render() {
    const { message, subMessage, onActionTap, action } = this.props;
    const { showComponent } = this.state;
    return (
      <VelocityComponent
        animation={{
          translateX: "35%",
          // translateY: showComponent ? 0 : "100%",
          opacity: showComponent ? 1 : 0
        }}
        duration={250}
      >
        <div className={styles.SnackBar}>
          <div onClick={onActionTap} className={styles.ActionButton}>
            {action ? action : "OK"}
          </div>
          <p className={styles.Message}>{message ? message : "..."}</p>
          {subMessage ? <p className={styles.SubMessage}>{subMessage}</p> : ""}
        </div>
      </VelocityComponent>
    );
  }
}

SnackBar.propTypes = {
  action: PropTypes.string,
  autoHideDuration: PropTypes.number,
  message: PropTypes.string,
  subMessage: PropTypes.string,
  open: PropTypes.bool
};

export default SnackBar;
