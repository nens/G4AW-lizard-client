import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { HeaderBar, FlatButton } from ".";
import styles from "./styles/SettingsViewDatacollection.css";

class SettingsViewDatacollectionComponent extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <HeaderBar title={t("Data Collection Forms")} />

        <div className={styles.Wrapper}>
          <div
            onClick={() =>
              window.open("https://ee.kobotoolbox.org/x/#YZnR", "_newtab")}
            className={styles.DatacollectionFormButton}
          >
            <div className={styles.Acronym}>W</div>
            <div className={styles.TitleWrapper}>
              <span className={styles.Title}>
                {t("Weekly form")}
              </span>
            </div>
            <Ink />
          </div>

          <div
            onClick={() =>
              window.open("https://ee.kobotoolbox.org/x/#YZnu", "_newtab")}
            className={styles.DatacollectionFormButton}
          >
            <div className={styles.Acronym}>O</div>
            <div className={styles.TitleWrapper}>
              <span className={styles.Title}>
                {t("Once form")}
              </span>
            </div>
            <Ink />
          </div>
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
