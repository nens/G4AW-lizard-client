import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import { HeaderBar } from ".";

class SettingsViewHelpComponent extends Component {
  render() {
    return (
      <div>
        <HeaderBar title="Help menu" icon="filter_list" />
        <div>TODO...</div>
      </div>
    );
  }
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

const SettingsViewHelp = connect(mapStateToProps, mapDispatchToProps)(
  SettingsViewHelpComponent
);
export default translate()(SettingsViewHelp);
