import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import { HeaderBar, LayerSelection } from ".";

import { DEMO_LAYERS } from "../../stories/helpers";

import styles from "./styles/SettingsView.css";

class SettingsViewGeneralComponent extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <HeaderBar title={t("Select map layers")} />
        <BaselayerChooser {...this.props} />
      </div>
    );
  }
}

/* local sub-components ******************************************************/

class BaselayerChooser extends Component {
  render() {
    const { baselayers, t } = this.props;
    return (
      <div>
        <div className={styles.SubHeaderContainer}>
          <h3 className={styles.SubHeaderText}>
            {t("Background layers")}
          </h3>
        </div>
        <LayerSelection layers={baselayers} mode="baselayer" />
        <br />
      </div>
    );
  }
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {
    baselayers: state.baselayer.layers,
    foregroundlayers: state.foregroundlayer.layers
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const SettingsViewGeneral = connect(mapStateToProps, mapDispatchToProps)(
  SettingsViewGeneralComponent
);
export default translate()(SettingsViewGeneral);
