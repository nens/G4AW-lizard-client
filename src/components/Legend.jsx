import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { VelocityComponent } from "velocity-react";
import { VelocityTransitionGroup } from "velocity-react";
import "velocity-animate/velocity.ui";
import { Scrollbars } from "react-custom-scrollbars";
import styles from "./styles/Legend.css";

import {
  showNextForegroundlayer,
  showPreviousForegroundlayer
} from "../actions";

class LegendComponent extends Component {
  render() {
    const { data, activeLegendIdx, isOpen } = this.props;
    const currentLayer = data[activeLegendIdx];
    const layerTitle = currentLayer.title;
    const legendData = currentLayer.legend;

    return isOpen
      ? <VelocityTransitionGroup
          runOnMount={true}
          enter={{ animation: "transition.slideUpBigIn" }}
        >
          <div className={styles.LegendWrapper} id="Legend">
            <div className={styles.Legend}>
              <LegendTopBar layerTitle={layerTitle} {...this.props} />
              <LegendBody legendData={legendData} />
            </div>
          </div>
        </VelocityTransitionGroup>
      : null;
  }
}

class LegendTopBar extends Component {
  render() {
    const {
      layerTitle,
      handleToggleLegend,
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
  render() {
    return (
      <Scrollbars style={{ width: "100%", height: 240 }}>
        <div className={styles.LegendBody} id="LegendBody">
          <table className={styles.LegendTable} id="LegendTable">
            <tbody>
              {this.props.legendData.map((l, i) =>
                <tr key={i}>
                  <td>
                    <LegendColorLabel color={l.color} />
                  </td>
                  <td>
                    {l.label}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    showNextForegroundlayer: () => showNextForegroundlayer(dispatch),
    showPreviousForegroundlayer: () => showPreviousForegroundlayer(dispatch)
  };
}

const Legend = connect(mapStateToProps, mapDispatchToProps)(LegendComponent);

export default Legend;
