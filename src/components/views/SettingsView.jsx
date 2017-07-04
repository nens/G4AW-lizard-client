import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { VelocityTransitionGroup } from "velocity-react";
import "velocity-animate/velocity.ui";

import {
  TabBar,
  SettingsViewGeneral,
  SettingsViewHelp,
  SettingsViewUser
} from "..";

class SettingsViewComponent extends Component {
  getContent(currentSettingsTabIdx) {
    switch (currentSettingsTabIdx) {
      case 0:
        return <SettingsViewGeneral />;
      case 1:
        return <SettingsViewUser />;
      case 2:
        return <SettingsViewHelp />;
      default:
        console.error("Unknown case: ", currentSettingsTabIdx);
        return null;
    }
  }
  render() {
    const { currentSettingsTabIdx } = this.props;
    if (currentSettingsTabIdx === undefined) return null;
    const component = this.getContent(currentSettingsTabIdx);
    return (
      <VelocityTransitionGroup
        runOnMount={true}
        enter={{ animation: "transition.slideDownIn" }}
      >
        <div>
          <TabBar />
          {component}
        </div>
      </VelocityTransitionGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSettingsTabIdx: state.ui.currentSettingsTabIdx
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const SettingsView = connect(mapStateToProps, mapDispatchToProps)(
  SettingsViewComponent
);

export default translate()(SettingsView);
