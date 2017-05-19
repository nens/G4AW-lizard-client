import { connect } from "react-redux";
import { translate } from "react-i18next";
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

import { getTimeseries } from "../actions/TimeseriesActions";

const PARCEL_ID = 123;

class TimeseriesGraphComponent extends Component {
  componentDidMount() {
    this.props.getTimeseries(123);
  }
  render() {
    const timeseriesData = this.props.timeseriesAllData[PARCEL_ID];
    let content;
    if (!timeseriesData) {
      return null;
    } else if (!timeseriesData.data && timeseriesData.isFetching) {
      content = "Data is being fetched...";
    } else {
      content = JSON.stringify(timeseriesData.data[0].events);
    }

    return (
      <div id="timeseries-graph">
        <b>Timeseries graph goes here..:&nbsp;</b>
        <span>{content}</span>
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

export default translate()(TimeseriesGraph);
