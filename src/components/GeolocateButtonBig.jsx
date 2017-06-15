import GeolocationAvailable from "./svg/GeolocationAvailable.svg";
import GeolocationUnavailable from "./svg/GeolocationUnavailable.svg";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/ListSearchView.css";

export default class GeolocateButtonBig extends Component {
  render() {
    const {
      hasCoords,
      supportsGeolocate,
      handleClick,
      placeName,
      errorMessage
    } = this.props;
    const icon = hasCoords && supportsGeolocate
      ? GeolocationAvailable
      : GeolocationUnavailable;

    let geolocateButton;
    if (supportsGeolocate) {
      geolocateButton = hasCoords ? <p>{placeName}</p> : <p>{errorMessage}</p>;
    } else {
      geolocateButton = (
        <div>
          <p>No geolocation support!</p>
          <p>{errorMessage}</p>
        </div>
      );
    }
    return (
      <div className={styles.Geolocate} onClick={handleClick}>
        <div>
          <img src={icon} />
        </div>
        {geolocateButton}
      </div>
    );
  }
}
