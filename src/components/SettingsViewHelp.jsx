import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import KoboLogo from "./svg/Kobo.svg";
import { HeaderBar, FlatButton } from ".";
import styles from "./styles/SettingsViewHelp.css";

class SettingsViewHelpComponent extends Component {
  render() {
    return (
      <div>
        <HeaderBar title="Data Collection Forms" />
        <div className={styles.SettingsViewHelpComponent}>
          <div>
            <img width="100" src={KoboLogo} />
          </div>
          <ul>
            <li>
              <a href="https://ee.kobotoolbox.org/x/#YZnR" target="_blank">
                Weekly form
              </a>
            </li>
            <li>
              <a href="https://ee.kobotoolbox.org/x/#YZnu" target="_blank">
                Once form
              </a>
            </li>
          </ul>
        </div>
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
