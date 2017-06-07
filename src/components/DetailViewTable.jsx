import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/DetailViewTable.css";
import YesIconSvg from "./svg/YesIcon.svg";
import NoIconSvg from "./svg/NoIcon.svg";

// A DetailViewTable component.

class YesIcon extends Component {
  render() {
    return (
      <div className={`${styles.Indicator} ${styles.IndicatorSuccess}`}>
        <img src={YesIconSvg} />
      </div>
    );
  }
}

class NoIcon extends Component {
  render() {
    return (
      <div className={`${styles.Indicator} ${styles.IndicatorFailure}`}>
        <img src={NoIconSvg} />
      </div>
    );
  }
}

class DetailViewTable extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { data } = this.props;
    return (
      <div className={styles.DetailViewTable}>
        <table className={styles.Table}>
          {data.map(row => {
            return (
              <tr className={styles.Row}>
                <td className={styles.ColKey}>
                  {row.key}
                </td>
                <td>{row.value}</td>
                <td className={styles.ColValue}>
                  {row.value.toLowerCase() === "yes" ? <YesIcon /> : ""}
                  {row.value.toLowerCase() === "no" ? <NoIcon /> : ""}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

DetailViewTable.propTypes = {
  data: PropTypes.object
};

export default DetailViewTable;
