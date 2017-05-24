import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/DetailViewTable.css";

// A DetailViewTable component.

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
                <td className={styles.ColValue}>
                  {row.value}
                  {row.value.toLowerCase() === "yes"
                    ? <i className={`${styles.Yes} material-icons`}>check</i>
                    : ""}
                  {row.value.toLowerCase() === "no"
                    ? <i className={`${styles.No} material-icons`}>close</i>
                    : ""}
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
