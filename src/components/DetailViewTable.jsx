import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/DetailViewTable.css";

// A DetailViewTable component.

class YesIcon extends Component {
  render() {
    return (
      <div className={`${styles.Indicator} ${styles.IndicatorSuccess}`}>
        <svg
          className={styles.SVGIcon}
          height="16"
          version="1.1"
          viewBox="0 0 12 16"
          width="12"
        >
          <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z" />
        </svg>
      </div>
    );
  }
}

class NoIcon extends Component {
  render() {
    return (
      <div className={`${styles.Indicator} ${styles.IndicatorFailure}`}>
        <svg
          className={styles.SVGIcon}
          height="16"
          version="1.1"
          viewBox="0 0 12 16"
          width="12"
        >
          <path
            fillRule="evenodd"
            d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"
          />
        </svg>
      </div>
    );
  }
}

class DetailViewTable extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.DetailViewTable}>
        <table className={styles.Table}>
          <tbody>
            {data.map((row, i) => {
              return (
                <tr key={i} className={styles.Row}>
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
          </tbody>
        </table>
      </div>
    );
  }
}

DetailViewTable.propTypes = {
  data: PropTypes.array
};

export default DetailViewTable;
