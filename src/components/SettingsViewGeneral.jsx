import Ink from "react-ink";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import { HeaderBar, LayerSelection, LanguageChooser } from ".";

import { DEMO_LAYERS } from "../../stories/helpers";

import styles from "./styles/SettingsView.css";

class SettingsViewGeneralComponent extends Component {
  render() {
    return (
      <div>
        <HeaderBar title={this.props.t("Select map layers/language")} />
        <BaselayerChooser {...this.props} />
        <LanguageChooser {...this.props} />
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
      </div>
    );
  }
}

// class LanguageChooser extends Component {
//   render() {
//     const { t, handleLanguageSelect } = this.props;
//     return (
//       <div>
//         <div className={styles.SubHeaderContainer}>
//           <h3 className={styles.SubHeaderText}>
//             {t("Language")}
//           </h3>
//         </div>
//         <div className={styles.LanguageChooser}>

//           <div
//             onClick={handleLanguageSelect}
//             className={lsStyles.Layer}
//           >
//             <div className={lsStyles.TitleWrapper}>
//               <span className={lsStyles.Title}>
//                 Vietnamese
//               </span>
//             </div>
//             <Ink />
//           </div>

//           <div
//             onClick={handleLanguageSelect}
//             className={lsStyles.Layer}
//           >
//             <div className={lsStyles.TitleWrapper}>
//               <span className={lsStyles.Title}>
//                 English
//               </span>
//             </div>
//             <Ink />
//           </div>

//         </div>
//       </div>
//     );
//   }
// }

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
