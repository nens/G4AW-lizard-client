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
    return (
      <div>
        <HeaderBar title="Select map layers" />
        <BaselayerChooser {...this.props} />
        <br />
        <ForegroundlayerChooser {...this.props} />
      </div>
    );
  }
}

/* local sub-components ******************************************************/

class BaselayerChooser extends Component {
  render() {
    const { baselayers } = this.props;
    return (
      <div>
        <div className={styles.SubHeaderContainer}>
          <h3 className={styles.SubHeaderText}>Background layers</h3>
        </div>
        <LayerSelection layers={baselayers} mode="baselayer" />
        <br />
      </div>
    );
  }
}

class ForegroundlayerChooser extends Component {
  render() {
    const { foregroundlayers } = this.props;
    return (
      <div>
        <div className={styles.SubHeaderContainer}>
          <h3 className={styles.SubHeaderText}>Foreground Layers</h3>
        </div>
        <LayerSelection layers={foregroundlayers} mode="foregroundlayer" />
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
