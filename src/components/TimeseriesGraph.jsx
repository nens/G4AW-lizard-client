import { connect } from "react-redux";
import { translate } from "react-i18next";
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { getTimeseries } from "../actions/TimeseriesActions";

// import { LineChart, Line } from 'recharts';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { size, first, last } from "lodash";

const PARCEL_ID = 123;

// class GraphInfo {
//   constructor (events) {
//     this.events = events;
//     this.count = size(events);
//     console.log("[C] GraphInfo.count:", this.count);
//     console.log("[*] MAPPING...");
//     rawData.map((event) => {
//       console.log("*** event:", event);
//     })
//   }
// }

const formatTimestamp = timestamp => {
  const d = new Date(timestamp).toString();
  const wantedStrLen = d.indexOf("GMT");
  return d.slice(0, wantedStrLen);
};

class TimeseriesGraphComponent extends Component {
  getTicks(events) {
    console.log("[F] getTicks");
    const firstTick = formatTimestamp(events[0].timestamp);
    const lastTick = "+1 week";
    // return [firstTick, lastTick];
    return ["foo", "bar"];
  }
  componentDidMount() {
    this.props.getTimeseries(123);
  }
  render() {
    // Assign the 'connected' timeseriesAllData for a single parcelId
    // to a local variable:
    const timeseriesData = this.props.timeseriesAllData[PARCEL_ID];

    // Check whether we already can assign the ts events to a lcoal variable,
    // else assign a message about the ts data still being fetched:
    if (!timeseriesData || !timeseriesData.data) {
      return null;
    }
    let events = timeseriesData.data[0].events.map(event => {
      return {
        // timestamp: (new Date(event.timestamp)).toString(),
        timestamp: formatTimestamp(event.timestamp),
        value: event.max
      };
    });

    // return the actual Reactjs component:
    return (
      <div id="timeseries-graph">
        <LineChart width={350} height={250} data={events}>
          <XAxis
            dataKey="timestamp"
            ticks={this.getTicks(events)}
            tickCount={2}
            label="time"
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth="2"
            dot={false}
          />
        </LineChart>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    timeseriesAllData: state.timeseries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTimeseries: parcelId => getTimeseries(parcelId, dispatch)
  };
}

const TimeseriesGraph = connect(mapStateToProps, mapDispatchToProps)(
  TimeseriesGraphComponent
);

export default TimeseriesGraph;
