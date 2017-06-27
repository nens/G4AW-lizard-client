import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Ink from "react-ink";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import styles from "./styles/LayerSelection";

const NUM_PER_PAGE = 3;

///////////////////////////////////////////////////////////////////////////////
// A LayerSelection component. ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class LayerSelection extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      duration: 500
    };
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }
  componentDidMount() {}
  handlePrevClick() {
    this.setState({ page: Math.max(1, this.state.page - 1) });
  }
  handleNextClick() {
    const numPages = Math.ceil(this.props.layers.length / NUM_PER_PAGE);
    this.setState({ page: Math.min(numPages, this.state.page + 1) });
  }
  render() {
    const _props = { ...this.props, page: this.state.page };
    return (
      <div className={styles.LayerSelection}>
        <div className={styles.PrevNext}>
          <PrevButton handleClick={this.handlePrevClick} />
          <NextButton handleClick={this.handleNextClick} />
        </div>
        <LayerDivs {..._props} />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking //////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

LayerSelection.propTypes = {
  layers: PropTypes.array,
  handleLayerSelect: PropTypes.func
};

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class LayerDivs extends Component {
  render() {
    const { layers, handleLayerSelect, page } = this.props;
    const numLayers = layers.length;
    const numPages = Math.ceil(numLayers / NUM_PER_PAGE);
    const layerdivs = layers
      .slice(page - 1, page + 2)
      .map((layer, i) => getTransitionGroup(i, layer, handleLayerSelect));
    return (
      <div className={styles.Wrapper}>
        {layerdivs}
      </div>
    );
  }
}

class PrevButton extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className={styles.Prev} onClick={handleClick}>
        <i className={`${styles.LeftArrowIcon} material-icons`}>
          keyboard_arrow_left
        </i>
      </div>
    );
  }
}

class NextButton extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className={styles.Next} onClick={handleClick}>
        <i className={`${styles.RightArrowIcon} material-icons`}>
          keyboard_arrow_right
        </i>
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
          <span className={styles.Title}>{layer.title}</span>
        </div>
        <Ink />
      </div>
    </CSSTransitionGroup>
  );
}

export default LayerSelection;
