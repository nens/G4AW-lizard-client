import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { VelocityComponent, VelocityTransitionGroup } from "velocity-react";
import "velocity-animate/velocity.ui";
import { Scrollbars } from "react-custom-scrollbars";
import styles from "./styles/Legend.css";

import { translate } from "react-i18next";

import {
  showNextForegroundlayer,
  showPreviousForegroundlayer,
  getActiveForegroundlayer,
  getActiveForegroundlayerIdx
} from "../actions";

class LegendComponent extends Component {
  render() {
    const {
      isOpen,
      getActiveForegroundlayer,
      getActiveForegroundlayerIdx,
      t
    } = this.props;
    const activeLegendIdx = getActiveForegroundlayerIdx();
    const currentLayer = getActiveForegroundlayer();
    const layerTitle = currentLayer.title;

    return isOpen
      ? <VelocityTransitionGroup
          runOnMount={true}
          enter={{ animation: "transition.slideUpBigIn" }}
        >
          <div className={styles.LegendWrapper} id="Legend">
            <div className={styles.Legend}>
              <LegendTopBar layerTitle={layerTitle} {...this.props} />
              <LegendBody colormap={currentLayer.colormap} t={t} />
            </div>
          </div>
        </VelocityTransitionGroup>
      : null;
  }
}

/* local sub-components **************************************/

class LegendTopBar extends Component {
  render() {
    const {
      layerTitle,
      isOpen,
      showPreviousForegroundlayer,
      showNextForegroundlayer
    } = this.props;

    return (
      <div className={styles.LegendTopBar}>
        <PrevLayerButton handleClick={showPreviousForegroundlayer} />
        <div>
          {layerTitle}
        </div>
        <NextLayerButton handleClick={showNextForegroundlayer} />
      </div>
    );
  }
}

class PrevLayerButton extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div onClick={handleClick} className={styles.LayerSwitchButton}>
        <i className="material-icons">keyboard_arrow_left</i>
      </div>
    );
  }
}

class NextLayerButton extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div onClick={handleClick} className={styles.LayerSwitchButton}>
        <i className="material-icons">keyboard_arrow_right</i>
      </div>
    );
  }
}

class ToggleLegendButton extends Component {
  render() {
    const { isOpen, handleClick } = this.props;
    return (
      <div onClick={handleClick} className={styles.OpenCloseButton}>
        <i className="material-icons">
          {isOpen ? "keyboard_arrow_down" : "keyboard_arrow_up"}
        </i>
      </div>
    );
  }
}

class LegendBody extends Component {
  getTbody(colormap) {
    return (
      <table className={styles.LegendTable} id="LegendTable">
        <tbody>
          {colormap.map((pair, i) =>
            <tr key={i}>
              <td>
                <LegendColorLabel color={Object.values(pair)[0]} />
              </td>
              <td>
                {Object.keys(pair)[0]}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  render() {
    const { colormap, t } = this.props;
    const msg = t("No legend to show for this layer");
    return (
      <Scrollbars style={{ width: "100%", height: 260 }}>
        <div className={styles.LegendBody} id="LegendBody">
          {colormap.length > 0
            ? this.getTbody(colormap)
            : <div className={styles.PlaceholderText}>
                {msg}
              </div>}
        </div>
      </Scrollbars>
    );
  }
}

class LegendColorLabel extends Component {
  render() {
    return (
      <div
        className={styles.LegendColor}
        style={{ backgroundColor: this.props.color }}
      />
    );
  }
}

LegendComponent.propTypes = {
  data: PropTypes.any,
  handleToggleLegend: PropTypes.func,
  isOpen: PropTypes.bool
};

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {
    getActiveForegroundlayer: () => getActiveForegroundlayer(),
    getActiveForegroundlayerIdx: () => getActiveForegroundlayerIdx()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showNextForegroundlayer: () => showNextForegroundlayer(dispatch),
    showPreviousForegroundlayer: () => showPreviousForegroundlayer(dispatch)
  };
}

const Legend = connect(mapStateToProps, mapDispatchToProps)(LegendComponent);

export default translate()(Legend);
