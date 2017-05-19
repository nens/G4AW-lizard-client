import React, { Component } from "react";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Ink from "react-ink";
import styles from "./styles/ViewSwitchButton.css";

import {
  VelocityTransitionGroup,
  VelocityComponent,
  velocityHelpers
} from "velocity-react";

// A ViewSwitchButton switches between map and omnibox contexts.

class ViewSwitchButton extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { t } = this.props;
    return (
      <div
        className={styles.ViewSwitchButton}
        onClick={this.props.handleOnClick}
      >
        <span>
          <i className={`material-icons ${styles.Icon}`}>track_changes</i>
          <span className={styles.Message}>
            {t("Click here to explore the map")}
          </span>
        </span>
        <Ink />
      </div>
    );
  }
}

ViewSwitchButton.propTypes = {
  open: PropTypes.bool
};

export default translate()(ViewSwitchButton);
