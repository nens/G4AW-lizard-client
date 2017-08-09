import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/DetailViewTable.css";
import YesIconSvg from "./svg/YesIcon.svg";
import NoIconSvg from "./svg/NoIcon.svg";

// DetailViewTable

export default class DetailViewTable extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.DetailViewTable}>
        <table className={styles.Table}>
          <tbody>
            {data.map((row, i) => {
              return <DetailViewTableRow key={i} passedKey={i} row={row} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

DetailViewTable.propTypes = {
  data: PropTypes.array
};

class DetailViewTableRow extends Component {
  getIcon(str) {
    let result;
    switch (str) {
      case "Vâng": // "Yes"
        result = <YesIcon />;
        break;
      case "Yes":
        result = <YesIcon />;
        break;
      case "Không": // "No"
        result = <NoIcon />;
        break;
      case "No":
        result = <NoIcon />;
        break;
      default:
        result = null;
    }
    return result;
  }
  formatValue(row) {
    if (row.value === null) {
      return "";
    } else {
      return row.value + (row.unit ? ` ${row.unit}` : "");
    }
  }
  render() {
    const { passedKey, row } = this.props;
    return (
      <tr key={passedKey} className={styles.Row}>
        <td className={styles.ColKey}>
          {row.key}
        </td>

        <td className={styles.ColValue}>
          {this.formatValue(row)}
        </td>
      </tr>
    );
  }
}

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
