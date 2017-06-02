import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
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
      open,
      data,
      handleToggleLegend,
      handlePreviousLayer,
      handleNextLayer
    } = this.props;
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
            <div>Rice growth</div>
            <div onClick={handleNextLayer} className={styles.LayerSwitchButton}>
              <i className="material-icons">keyboard_arrow_right</i>
            </div>
            <div
              onClick={handleToggleLegend}
              className={styles.OpenCloseButton}
            >
              <i className="material-icons">
                {open ? "keyboard_arrow_down" : "keyboard_arrow_up"}
              </i>
            </div>
          </div>
          <div className={styles.LegendBody}>
            <table className={styles.LegendTable}>
              <tbody>
                <tr>
                  <td><LegendColor color="#E84506" /></td>
                  <td>Harvest</td>
                </tr>
                <tr>
                  <td><LegendColor color="#FF7813" /></td>
                  <td>Ripening</td>
                </tr>
                <tr>
                  <td><LegendColor color="#FFC306" /></td>
                  <td>Milking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Legend.propTypes = {
  data: PropTypes.any,
  open: PropTypes.bool
};

export default Legend;
