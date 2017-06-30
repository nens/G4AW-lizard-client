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
        <BackgroundLayerChooser {...this.props} />
      </div>
    );
  }
}

/* local sub-components ******************************************************/

class BackgroundLayerChooser extends Component {
  render() {
    const { baselayers } = this.props;
    return (
      <div>
        <div className={styles.SubHeaderContainer}>
          <h3 className={styles.SubHeaderText}>BACKGROUND LAYERS</h3>
        </div>
        <LayerSelection layers={baselayers} />
      </div>
    );
  }
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {
    baselayers: state.baselayer.layers
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const SettingsViewGeneral = connect(mapStateToProps, mapDispatchToProps)(
  SettingsViewGeneralComponent
);
export default translate()(SettingsViewGeneral);
