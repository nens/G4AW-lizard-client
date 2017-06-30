import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";

import {
  TabBar,
  SettingsViewGeneral,
  SettingsViewHelp,
  SettingsViewUser
} from "..";

class SettingsViewComponent extends Component {
  getContent(currentSettingsTab) {
    switch (currentSettingsTab) {
      case "Settings":
        return <SettingsViewGeneral />;
      case "User":
        return <SettingsViewUser />;
      case "Help":
        return <SettingsViewHelp />;
      default:
        console.error("Unknown case: ", currentSettingsTab);
        return null;
    }
  }
  render() {
    const { currentSettingsTab } = this.props;
    if (!currentSettingsTab) return null;
    const component = this.getContent(currentSettingsTab);
    return (
      <div>
        <TabBar />
        {component}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSettingsTab: state.ui.currentSettingsTab
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const SettingsView = connect(mapStateToProps, mapDispatchToProps)(
  SettingsViewComponent
);

export default translate()(SettingsView);
