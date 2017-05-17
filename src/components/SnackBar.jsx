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
    return (
      <VelocityComponent
        animation={{
          translateX: "35%",
          // translateY: this.state.showComponent ? 0 : "100%",
          opacity: this.state.showComponent ? 1 : 0
        }}
        duration={250}
      >
        <div className={styles.SnackBar}>
          <div onClick={this.props.onActionTap} className={styles.ActionButton}>
            {this.props.action ? this.props.action : "OK"}
          </div>
          {this.props.message ? this.props.message : "..."}
        </div>
      </VelocityComponent>
    );
  }
}

SnackBar.propTypes = {
  action: PropTypes.string,
  autoHideDuration: PropTypes.number,
  message: PropTypes.string,
  open: PropTypes.bool
};

export default SnackBar;
