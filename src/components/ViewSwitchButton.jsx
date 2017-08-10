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
    const {
      t,
      viewIsMap,
      changeView,
      searchResultCount,
      isFetching
    } = this.props;
    const handleClick = () =>
      changeView((viewIsMap ? "List" : "Map") + "SearchView");
    return (
      <div className={styles.ViewSwitchButton} onClick={handleClick}>
        {viewIsMap
          ? <SwitchToListButton
              t={t}
              count={searchResultCount}
              isFetching={isFetching}
            />
          : <SwitchToMapButton
              t={t}
              count={searchResultCount}
              isFetching={isFetching}
            />}
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
    const { t, count, isFetching } = this.props;
    return (
      <div>
        <i className={`material-icons ${styles.Icon}`}>track_changes</i>
        <span className={styles.Message}>
          {isFetching
            ? `${t("Searching")}...`
            : t("Click here to explore the map")}
        </span>
      </div>
    );
  }
}

class SwitchToListButton extends Component {
  getMessage(t, count) {
    switch (count) {
      case 0:
        return t("View new search results as list");
      case 1:
        return t("View one search result as list");
      default:
        return `${t("View")} ${count} ${t("search results as list")}`;
    }
  }
  render() {
    const { t, count, isFetching } = this.props;
    return (
      <div>
        <i className={`material-icons ${styles.Icon}`}>apps</i>
        <span className={styles.Message}>
          {isFetching
            ? `t${"Searching"}...`
            : this.getMessage(t, count, isFetching)}
        </span>
      </div>
    );
  }
}

/* react-redux bindings */

function mapStateToProps(state) {
  return {
    isFetching: state.search.isFetching,
    searchResultCount: state.search.results ? state.search.results.length : 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeView: newView => changeView(dispatch, newView)
  };
}

const ViewSwitchButton = connect(mapStateToProps, mapDispatchToProps)(
  ViewSwitchButtonComponent
);

export default translate()(ViewSwitchButton);
