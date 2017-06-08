import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Scrollbars } from "react-custom-scrollbars";
import styles from "./styles/Legend.css";

class LegendColor extends Component {
  render() {
    const { color } = this.props;
    return (
      <div
        className={styles.LegendColor}
        style={{
          backgroundColor: color
        }}
      />
    );
  }
}

// A Legend component.

class Legend extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const {
      isOpen,
      data,
      activeLegendIdx,
      handleToggleLegend,
      handlePreviousLayer,
      handleNextLayer
    } = this.props;
    if (!isOpen) {
      return null;
    }

    const currentLayer = data[activeLegendIdx];
    const layerTitle = currentLayer.title;
    const legend = currentLayer.legend;

    return (
      <div className={styles.LegendWrapper}>
        <div className={styles.Legend}>
          <div className={styles.LegendTopBar}>
            <div
              onClick={handlePreviousLayer}
              className={styles.LayerSwitchButton}
            >
              <i className="material-icons">keyboard_arrow_left</i>
            </div>
            <div>{layerTitle}</div>
            <div onClick={handleNextLayer} className={styles.LayerSwitchButton}>
              <i className="material-icons">keyboard_arrow_right</i>
            </div>
            <div
              onClick={handleToggleLegend}
              className={styles.OpenCloseButton}
            >
              <i className="material-icons">
                {isOpen ? "keyboard_arrow_down" : "keyboard_arrow_up"}
              </i>
            </div>
          </div>
          <Scrollbars style={{ width: "100%", height: 140 }}>
            <div className={styles.LegendBody}>
              <table className={styles.LegendTable}>
                <tbody>
                  {legend.map((l, i) => {
                    return (
                      <tr key={i}>
                        <td><LegendColor color={l.color} /></td>
                        <td>{l.label}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  data: PropTypes.any,
  handleToggleLegend: PropTypes.func,
  isOpen: PropTypes.bool
};

export default Legend;
