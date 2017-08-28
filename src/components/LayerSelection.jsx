import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Ink from "react-ink";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import styles from "./styles/LayerSelection.css";

import { changeBaselayer, changeForegroundlayer } from "../actions";

const NUM_PER_PAGE = 3;

///////////////////////////////////////////////////////////////////////////////
// A LayerSelection component. ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class LayerSelectionComponent extends Component {
  render() {
    return (
      <div className={styles.LayerSelection}>
        <LayerDivs {...this.props} />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking //////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

LayerSelectionComponent.propTypes = {
  layers: PropTypes.array
};

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class LayerDivs extends Component {
  render() {
    const { layers, mode } = this.props;

    const handleLayerSelect =
      mode === "baselayer"
        ? this.props.handleBaselayerSelect
        : this.props.handleForegroundlayerSelect;

    const layerDivs = layers.map((layer, i) =>
      getTransitionGroup(i, layer, () => handleLayerSelect(i))
    );
    return (
      <div className={styles.Wrapper}>
        {layerDivs}
      </div>
    );
  }
}

function getTransitionGroup(i, layer, handleLayerSelect) {
  return (
    <CSSTransitionGroup
      key={i}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
      transitionAppearTimeout={300}
      transitionAppear={true}
      transitionEnter={true}
      transitionLeave={true}
      transitionName={{
        enter: styles.Enter,
        enterActive: styles.EnterActive,
        leave: styles.Leave,
        leaveActive: styles.LeaveActive,
        appear: styles.Appear,
        appearActive: styles.AppearActive
      }}
    >
      <div
        onClick={handleLayerSelect}
        className={`${styles.Layer} ${layer.active ? styles.Active : ""}`}
        style={{
          backgroundImage: `url(${layer.mapThumb || ""})`
        }}
      >
        <div className={styles.TitleWrapper}>
          <span className={styles.Title}>
            {layer.getTitle()}
          </span>
        </div>
        <Ink />
      </div>
    </CSSTransitionGroup>
  );
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    handleBaselayerSelect: i => changeBaselayer(dispatch, i),
    handleForegroundlayerSelect: i => changeForegroundlayer(dispatch, i)
  };
}

const LayerSelection = connect(mapStateToProps, mapDispatchToProps)(
  LayerSelectionComponent
);

export default translate()(LayerSelection);
