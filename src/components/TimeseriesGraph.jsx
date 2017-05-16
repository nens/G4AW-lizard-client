import { connect } from "react-redux";
import { translate } from "react-i18next";
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

import { getTimeseries } from "../actions/TimeseriesActions";

class TimeseriesGraphComponent extends Component {
  componentDidMount() {
    this.props.getTimeseries(123);
  }
  render() {
    const { timeseriesAllData } = this.props.timeseriesAllData;

    return (
      <div id="timeseries-graph">
        <b>Timeseries graph goes here.. props:</b>
        <br />
        <div>{timeseriesAllData}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("[F] mapStateToProps; arg 'state' =", state);
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

export default translate()(TimeseriesGraph);
