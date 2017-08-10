import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { HeaderBar, FlatButton } from ".";
import styles from "./styles/SettingsViewHelp.css";

class SettingsViewDatacollectionComponent extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <HeaderBar title={t("Data Collection Forms")} />
        <div className={styles.SettingsViewDatacollection}>
          <ul>
            <li>
              <a
                href="https://ee.kobotoolbox.org/x/#YZnR"
                target="_blank"
                className={styles.KoboLink}
              >
                {t("Weekly form")}
              </a>
            </li>
            <li>
              <a
                href="https://ee.kobotoolbox.org/x/#YZnu"
                target="_blank"
                className={styles.KoboLink}
              >
                {t("Once form")}
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

const SettingsViewDatacollection = connect(mapStateToProps, mapDispatchToProps)(
  SettingsViewDatacollectionComponent
);
export default translate()(SettingsViewDatacollection);
