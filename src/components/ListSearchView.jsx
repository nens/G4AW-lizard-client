import React, { Component } from "react";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import RaisedButton from "./RaisedButton";
import Ink from "react-ink";
import styles from "./styles/ListSearchView.css";
import GeolocationAvailable from "./svg/GeolocationAvailable.svg";
import GeolocationUnavailable from "./svg/GeolocationUnavailable.svg";

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
      geolocationSupport: false
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
  performGeolocation() {
    navigator.geolocation.getCurrentPosition(
      success => {
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${success.coords.longitude},${success.coords.latitude}.json?access_token=pk.eyJ1IjoibmVsZW5zY2h1dXJtYW5zIiwiYSI6ImhkXzhTdXcifQ.3k2-KAxQdyl5bILh_FioCw`,
          {
            mode: "cors"
          }
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log("data", data);
            this.setState({
              place_name: data.features[0].place_name,
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
      },
      geo_options
    );
  }
  render() {
    const { t, performGeolocation } = this.props;
    let geolocateButton;
    if (this.state.geolocationSupport) {
      if (this.state.latitude && this.state.longitude) {
        geolocateButton = (
          <div className={styles.Geolocate} onClick={this.performGeolocation}>
            <img src={GeolocationAvailable} />
            <p>{this.state.place_name}</p>
          </div>
        );
      } else {
        geolocateButton = (
          <div className={styles.Geolocate}>
            <img src={GeolocationUnavailable} />
          </div>
        );
      }
    } else {
      geolocateButton = (
        <div className={styles.Geolocate}>
          <img src={GeolocationUnavailable} />
          <p>{t("No geolocation support")}</p>
        </div>
      );
    }
    return (
      <div className={styles.ListSearchView}>
        <h1 className={styles.Welcome}>{t("Welcome")}</h1>
        <h5 className={styles.GetStarted}>
          {t("Tap here or start searching to get started")}
        </h5>
        {geolocateButton}
        <RaisedButton buttonText={t("Login")} iconClass="lock" />
      </div>
    );
  }
}

ListSearchView.propTypes = {};

export default translate()(ListSearchView);
