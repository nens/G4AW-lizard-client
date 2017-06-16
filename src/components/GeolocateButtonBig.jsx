import GeolocationAvailable from "./svg/GeolocationAvailable.svg";
import GeolocationUnavailable from "./svg/GeolocationUnavailable.svg";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/ListSearchView.css";

export default class GeolocateButtonBig extends Component {
  constructor() {
    super();
    this.state = {
      geolocationSupport: undefined
    };
  }
  componentWillMount() {
    if (navigator.geolocation) {
      this.setState({
        geolocationSupport: true
      });
    }
  }
  render() {
    const {
      hasCoords,
      supportsGeolocate,
      handleClick,
      errorMessage,
      geolocationData
    } = this.props;

    if (geolocationData.data === null) {
      return (
        <div className={styles.Geolocate} onClick={handleClick}>
          <div>
            <img src={GeolocationUnavailable} />
          </div>
        </div>
      );
    } else {
      if (this.props.geolocationData.result) {
        const { placeName } = this.props.geolocationData.result;
        return (
          <div className={styles.Geolocate} onClick={handleClick}>
            <div>
              <img src={GeolocationAvailable} />
            </div>
            {placeName}
          </div>
        );
      } else {
        return (
          <div className={styles.Geolocate} onClick={handleClick}>
            <div>
              <img src={GeolocationUnavailable} />
            </div>
            <p>Waiting</p>
          </div>
        );
      }
    }
  }
}
