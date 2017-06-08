import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/ListSearchView.css";

import GeolocationAvailable from "./svg/GeolocationAvailable.svg";
import GeolocationUnavailable from "./svg/GeolocationUnavailable.svg";

export default class GeolocateButtonBig extends Component {
  getChildren() {
    const {
      supportsGeolocate,
      hasCoords,
      placeName,
      errorMessage,
      handleClick
    } = this.props;
    if (supportsGeolocate) {
      return hasCoords ? <p>{placeName}</p> : <p>{errorMessage}</p>;
    } else {
      return (
        <div>
          <p>No geolocation support!</p>
          <p>{errorMessage}</p>
        </div>
      );
    }
  }
  render() {
    const { hasCoords, supportsGeolocate, handleClick } = this.props;
    const icon = hasCoords && supportsGeolocate
      ? GeolocationAvailable
      : GeolocationUnavailable;
    return (
      <div className={styles.Geolocate} onClick={handleClick}>
        <img src={icon} />
        {this.getChildren()}
      </div>
    );
  }
}
