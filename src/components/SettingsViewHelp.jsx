import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { HeaderBar, FlatButton } from ".";
import styles from "./styles/SettingsViewHelp.css";

class SettingsViewHelpComponent extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <HeaderBar title={t("Help")} />
        <div className={styles.SettingsViewHelpComponent} />
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
