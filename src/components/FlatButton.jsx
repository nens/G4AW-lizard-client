import { translate } from "react-i18next";
import Ink from "react-ink";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/FlatButton.css";

import {
  VelocityTransitionGroup,
  VelocityComponent,
  velocityHelpers
} from "velocity-react";

// A FlatButton emphasizes important functions on in the app.

class FlatButton extends Component {
  constructor() {
    super();
    this.state = {
      isOver: false
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  componentDidMount() {}
  handleMouseOver() {
    this.setState({
      isOver: true
    });
  }
  handleMouseOut() {
    this.setState({
      isOver: false
    });
  }
  render() {
    const { t, disabled, buttonText, iconClass } = this.props;
    const { isOver } = this.state;
    return (
      <div
        className={`${styles.FlatButton} ${disabled ? styles.disabled : ""} ${isOver ? styles.IsOver : ""}`}
        onClick={disabled ? "" : this.props.handleOnClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {iconClass
          ? <i className={`material-icons ${styles.Icon}`}>{iconClass}</i>
          : ""}
        &nbsp;<span>{buttonText}</span>
        <Ink />
      </div>
    );
  }
}

FlatButton.propTypes = {
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
  handleOnClick: PropTypes.func,
  iconClass: PropTypes.string
};

export default translate()(FlatButton);
