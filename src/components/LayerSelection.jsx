import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Ink from "react-ink";
import styles from "./styles/LayerSelection.css";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

// A LayerSelection component.

const NUM_PER_PAGE = 3;

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
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page - 1
      });
    }
  }
  handleNextClick() {
    const { layers } = this.props;
    const numLayers = layers.length;
    const numPages = Math.ceil(numLayers / NUM_PER_PAGE);
    if (this.state.page <= numPages - 1) {
      this.setState({
        page: this.state.page + 1
      });
    }
  }

  render() {
    const { layers, handleLayerSelect } = this.props;
    const numLayers = layers.length;
    const numPages = Math.ceil(numLayers / NUM_PER_PAGE);
    const layerdivs = layers
      .slice(this.state.page - 1, this.state.page + 2)
      .map((layer, i) => {
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
                backgroundImage: `url(${layer.mapThumb ? layer.mapThumb : ""})`
              }}
            >
              <div className={styles.TitleWrapper}>
                <span className={styles.Title}>{layer.title}</span>
              </div>
              <Ink />
            </div>
          </CSSTransitionGroup>
        );
      });
    return (
      <div className={styles.LayerSelection}>
        <div className={styles.PrevNext}>
          <div className={styles.Prev} onClick={this.handlePrevClick}>
            <i className={`${styles.LeftArrowIcon} material-icons`}>
              keyboard_arrow_left
            </i>
          </div>
          <div className={styles.Next} onClick={this.handleNextClick}>
            <i className={`${styles.RightArrowIcon} material-icons`}>
              keyboard_arrow_right
            </i>
          </div>
        </div>
        <div className={styles.Wrapper}>
          {layerdivs}
        </div>
      </div>
    );
  }
}

LayerSelection.propTypes = {
  layers: PropTypes.array,
  handleLayerSelect: PropTypes.func
};

export default LayerSelection;
