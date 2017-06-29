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
      currentSettingsTab,
      changeSettingsTab,
      changeToListSearchView
    } = this.props;
    return (
      <div className={styles.TabWrapper}>
        <div className={styles.TabBar}>
          <SettingsViewBackArrow handleClick={changeToListSearchView} />
          <Tab title="Settings" {...this.props} />
          <Tab title="User" {...this.props} />
          <Tab title="Help" {...this.props} />
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
            ${this.props.currentSettingsTab === this.props.title ? styles.Active : null}`;
  }
  render() {
    const { title, currentSettingsTab, changeSettingsTab } = this.props;
    return (
      <div
        onClick={() => changeSettingsTab(title)}
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
    currentSettingsTab: state.ui.currentSettingsTab
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSettingsTab: newTab => changeSettingsTab(dispatch, newTab),
    changeToListSearchView: () => changeView(dispatch, "ListSearchView")
  };
}

const TabBar = connect(mapStateToProps, mapDispatchToProps)(TabBarComponent);
export default translate()(TabBar);
