import { translate } from "react-i18next";
import Ink from "react-ink";
import PropTypes from "prop-types";
import RaisedButton from "./RaisedButton";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import styles from "./styles/ListSearchView.css";

import GeolocateButtonBig from "./GeolocateButtonBig";

import {
  VelocityTransitionGroup,
  VelocityComponent,
  velocityHelpers
} from "velocity-react";

const geo_options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

// A ListSearchView shows searchresults in a list mode

class ListSearchView extends Component {
  constructor() {
    super();
    this.state = {
      geolocationSupport: false,
      errorMessage: undefined
    };
    this.performGeolocation = this.performGeolocation.bind(this);
  }
  componentWillMount() {
    if (navigator.geolocation) {
      this.setState({
        geolocationSupport: true
      });
    }
  }
  componentDidMount() {
    if (this.state.geolocationSupport) {
      this.performGeolocation();
    }
  }
  getMapboxUrl(coords) {
    return (
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      coords.longitude +
      "," +
      coords.latitude +
      ".json?access_token=pk.eyJ1IjoibmVsZW5zY2h1dXJtYW5zIiwiYSI6ImhkXzhTdXc" +
      "ifQ.3k2-KAxQdyl5bILh_FioCw"
    );
  }
  performGeolocation() {
    navigator.geolocation.getCurrentPosition(
      success => {
        fetch(this.getMapboxUrl(success.coords), { mode: "cors" })
          .then(response => response.json())
          .then(data => {
            this.setState({
              placeName: data.features[0].place_name,
              accuracy: success.coords.accuracy,
              altitude: success.coords.altitude,
              altitudeAccuracy: success.coords.altitudeAccuracy,
              heading: success.coords.heading,
              latitude: success.coords.latitude,
              longitude: success.coords.longitude,
              speed: success.coords.speed,
              timestamp: success.timestamp
            });
          });
      },
      error => {
        console.error(error);
        this.setState({
          errorMessage: error.message
        });
      },
      geo_options
    );
  }
  render() {
    const { performGeolocation } = this.props;
    const s = this.state;
    const handleClick = s.geolocationSupport && s.latitude && s.longitude
      ? this.performGeolocation
      : () => false;
    return (
      <div className={styles.ListSearchView}>
        <SearchBar />
        <h1 className={styles.Welcome}>Welcome</h1>
        <h5 className={styles.GetStarted}>
          {"Tap to see the field nearby"}
        </h5>
        <GeolocateButtonBig
          handleClick={handleClick}
          supportsGeolocate={this.state.geolocationSupport}
          hasCoords={this.state.latitude && this.state.longitude}
          placeName={this.state.placeName}
          errorMessage={this.state.errorMessage}
        />
        <RaisedButton buttonText={"Login"} iconClass="lock" />
      </div>
    );
  }
}

export default translate()(ListSearchView);
