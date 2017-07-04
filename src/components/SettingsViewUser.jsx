import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import { HeaderBar } from ".";

class SettingsViewUserComponent extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <HeaderBar title={t("User menu")} />
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

const SettingsViewUser = connect(mapStateToProps, mapDispatchToProps)(
  SettingsViewUserComponent
);
export default translate()(SettingsViewUser);
