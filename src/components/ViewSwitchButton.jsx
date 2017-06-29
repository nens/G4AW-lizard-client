import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Ink from "react-ink";

import styles from "./styles/ViewSwitchButton.css";

import { changeView } from "../actions";

/* A ViewSwitchButton switches between map and omnibox contexts. *************/

class ViewSwitchButtonComponent extends Component {
  render() {
    const { t, viewIsMap, changeView } = this.props;
    const handleClick = () =>
      changeView((viewIsMap ? "List" : "Map") + "SearchView");
    return (
      <div className={styles.ViewSwitchButton} onClick={handleClick}>
        {viewIsMap ? <SwitchToListButton t={t} /> : <SwitchToMapButton t={t} />}
        <Ink />
      </div>
    );
  }
}

ViewSwitchButtonComponent.propTypes = {
  viewIsMap: PropTypes.bool
};

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

/* react-redux bindings */

function mapDispatchToProps(dispatch) {
  return {
    changeView: newView => changeView(dispatch, newView)
  };
}

const ViewSwitchButton = connect(null, mapDispatchToProps)(
  ViewSwitchButtonComponent
);

export default translate()(ViewSwitchButton);
