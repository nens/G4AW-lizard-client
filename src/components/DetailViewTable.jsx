import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/DetailViewTable.css";
import YesIconSvg from "./svg/YesIcon.svg";
import NoIconSvg from "./svg/NoIcon.svg";

///////////////////////////////////////////////////////////////////////////////
// The main Component: the DetailViewTable ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////
// type-checking for main Component ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

DetailViewTable.propTypes = {
  data: PropTypes.array
};

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class DetailViewTableRow extends Component {
  getIcon(str) {
    switch (str) {
      case "yes":
        return <YesIcon />;
      case "no":
        return <NoIcon />;
      default:
        return null;
    }
  }
  render() {
    const { passedKey, row } = this.props;
    return (
      <tr key={passedKey} className={styles.Row}>
        <td className={styles.ColKey}>{row.key}</td>
        <td>{row.value}</td>
        <td className={styles.ColValue}>
          {this.getIcon(row.value.toLowerCase())}
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
