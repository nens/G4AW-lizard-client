import { connect } from "react-redux";
import { translate } from "react-i18next";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import MDSpinner from "react-md-spinner";

import { performGeolocation, clearGeolocation } from "../actions";

import styles from "./styles/SearchBar.css";

class GeolocateButtonSmallComponent extends Component {
  render() {
    const {
      isGeolocationSupported, // via: mapStateToProps
      isFetchingGeolocation, // via: mapStateToProps
      isNotStartedFetchingGeolocation, // via: mapStateToProps
      hasGeolocationData, // via: mapStateToProps
      getGeolocation, // via: mapDispatchToProps
      clearGeolocation // via: mapDispatchToProps
    } = this.props;

    if (isFetchingGeolocation) {
      return (
        <div className={styles.GeoLocateButton}>
          <GeolocateSpinner />
        </div>
      );
    } else {
      let color, onClick;
      if (!isGeolocationSupported) {
        color = "#EEEEEE";
        onClick = () => false;
      } else if (hasGeolocationData) {
        color = "#00AA99";
        onClick = clearGeolocation;
      } else {
        color = "#CECECE";
        onClick = getGeolocation;
      }
      return (
        <div
          className={styles.GeoLocateButton}
          style={{ color }}
          onClick={onClick}
        >
          <i className={`${styles.GeoLocateIcon} material-icons`}>near_me</i>
        </div>
      );
    }
  }
}

/* local sub-components ******************************************************/

function GeolocateSpinner() {
  return (
    <div>
      <MDSpinner
        singleColor="#CECECE"
        style={{
          position: "relative",
          top: -4,
          left: 1
        }}
      />
    </div>
  );
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {
    isGeolocationSupported: state.geolocation.isGeolocationSupported,
    isFetchingGeolocation: state.geolocation.isFetching,
    isNotStartedFetchingGeolocation: !(state.geolocation.isFetching ||
      state.geolocation.data ||
      state.geolocation.error),
    hasGeolocationData: !state.geolocation.isFetching && state.geolocation.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGeolocation: () => performGeolocation(dispatch),
    clearGeolocation: () => clearGeolocation(dispatch)
  };
}

const GeolocateButtonSmall = connect(mapStateToProps, mapDispatchToProps)(
  GeolocateButtonSmallComponent
);

export default GeolocateButtonSmall;
