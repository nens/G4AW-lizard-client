import { translate } from "react-i18next";
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import styles from "./styles/SimpleLineChart.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class SimpleLineChart extends Component {
  componentDidMount() {}

  render() {
    const { data, showGrid, width, height, lineColor } = this.props;
    const nullFilteredData = data.filter(d => {
      if (d.value !== null) return d;
    });
    const events = nullFilteredData.map(event => {
      return {
        timestamp: event.timestamp,
        value: event.value
      };
    });

    return (
      <div className={styles.SimpleLineChart}>
        <LineChart width={width} height={height} data={events}>
          <XAxis
            tickFormatter={tick => {
              return moment(tick).format("DD/YY");
            }}
            dataKey="timestamp"
          />
          <YAxis
            tickFormatter={tick => {
              return parseInt(tick);
            }}
            dataKey="value"
          />
          {showGrid ? <CartesianGrid strokeDasharray="3 3" /> : ""}
          <Tooltip
            labelFormatter={label => {
              return moment(label).format("DD/YY");
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth="2"
            dot={false}
          />
        </LineChart>
      </div>
    );
  }
}

SimpleLineChart.propTypes = {
  data: PropTypes.any,
  showGrid: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  lineColor: PropTypes.string
};

export default SimpleLineChart;
