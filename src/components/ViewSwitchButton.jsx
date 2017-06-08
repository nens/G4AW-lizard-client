import React, { Component } from "react";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Ink from "react-ink";
import styles from "./styles/ViewSwitchButton.css";

///////////////////////////////////////////////////////////////////////////////
// A ViewSwitchButton switches between map and omnibox contexts. //////////////
///////////////////////////////////////////////////////////////////////////////

class ViewSwitchButton extends Component {
  render() {
    const { t, viewIsMap } = this.props;
    return (
      <div
        className={styles.ViewSwitchButton}
        onClick={this.props.handleOnClick}
      >
        {viewIsMap ? <SwitchToListButton t={t} /> : <SwitchToMapButton t={t} />}
        <Ink />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// Type-checking for main Component ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

ViewSwitchButton.propTypes = {
  viewIsMap: PropTypes.bool
};

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class SwitchToMapButton extends Component {
  render() {
    return (
      <div>
        <i className={`material-icons ${styles.Icon}`}>track_changes</i>
        <span className={styles.Message}>
          {this.props.t("Click here to explore the map")}
        </span>
      </div>
    );
  }
}

class SwitchToListButton extends Component {
  render() {
    return (
      <div>
        <i className={`material-icons ${styles.Icon}`}>apps</i>
        <span className={styles.Message}>
          {this.props.t("Click here to view the search results")}
        </span>
      </div>
    );
  }
}

export default translate()(ViewSwitchButton);
