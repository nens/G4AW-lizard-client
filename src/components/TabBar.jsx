import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import {
  VelocityTransitionGroup,
  VelocityComponent,
  velocityHelpers
} from "velocity-react";

import styles from "./styles/TabBar.css";

import { changeSettingsTab, changeView } from "../actions";

import { HeaderBar } from ".";

/* The main component: a tabbar where the user can switch between the three
   different settings tabs: "Settings", "User" and "Help" ********************/

class TabBarComponent extends Component {
  render() {
    const {
      currentSettingsTabIdx,
      changeSettingsTab,
      searchView,
      changeToSearchView,
      t
    } = this.props;
    return (
      <div className={styles.TabWrapper}>
        <div className={styles.TabBar}>
          <SettingsViewBackArrow
            handleClick={() => changeToSearchView(searchView)}
          />
          <Tab idx={0} title={t("Settings")} {...this.props} />
          <Tab idx={1} title={t("Data forms")} {...this.props} />
          <Tab idx={2} title={t("Help")} {...this.props} />
        </div>
      </div>
    );
  }
}

/* Local sub-components ******************************************************/

class SettingsViewBackArrow extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className={styles.ArrowBackIcon} onClick={handleClick}>
        <i className="material-icons">arrow_back</i>
      </div>
    );
  }
}

class Tab extends Component {
  getClassName() {
    return `${styles.Tab}
            ${this.props.currentSettingsTabIdx === this.props.idx
              ? styles.Active
              : null}`;
  }
  render() {
    const { title, changeSettingsTab, idx } = this.props;
    return (
      <div
        onClick={() => changeSettingsTab(idx)}
        className={this.getClassName()}
      >
        {title}
        <Ink />
      </div>
    );
  }
}

/* React-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {
    searchView: state.ui.searchView,
    currentSettingsTabIdx: state.ui.currentSettingsTabIdx
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSettingsTab: newTab => changeSettingsTab(dispatch, newTab),
    changeToSearchView: searchView => changeView(dispatch, searchView)
  };
}

const TabBar = connect(mapStateToProps, mapDispatchToProps)(TabBarComponent);
export default translate()(TabBar);
