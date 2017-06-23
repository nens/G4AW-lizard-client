import { translate } from "react-i18next";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import styles from "./styles/ListSearchView.css";
/// SVG imports:
import GeolocationUnsupportedSVG from "./svg/GeolocationUnsupportedSVG.svg";
import GeolocationSupportedSVG from "./svg/GeolocationSupportedSVG.svg";
import GeolocationAvailableSVG from "./svg/GeolocationAvailableSVG.svg";

import MDSpinner from "react-md-spinner";

import {
  performGeolocation,
  clearGeolocation
} from "../actions/GeolocationActions";

/* The main component: a big button for toggling geolocation-awareness ********/

class GeolocateButtonBigComponent extends Component {
  constructor() {
    super();
    this.state = { isMounted: false, welcomeTextElem: null };
  }
  componentDidMount() {
    const welcomeTextElem = document.getElementById("welcomeText");
    this.setState({
      welcomeTextElem,
      isMounted: true,
      initialWelcomeText: welcomeTextElem.innerHTML
    });
  }
  handleReset(clearGeolocation) {
    clearGeolocation();
    this.state.welcomeTextElem.style.color = "#a0a0a0";
    this.state.welcomeTextElem.innerHTML = this.state.initialWelcomeText;
  }
  render() {
    const {
      t, // via: parent
      isGeolocationSupported,
      isNotStartedFetching,
      isFetching,
      hasData,
      hasError,
      geolocationData,
      getGeolocation, // via: mapDispatchToProps
      clearGeolocation // via: mapDispatchToProps
    } = this.props;

    if (!this.state.isMounted) return null;

    if (!isGeolocationSupported) {
      // if (true) {
      console.log("[dbg] Geolocation 1/4");
      // Case 1 of 4: Geolocate is not supported:
      this.state.welcomeTextElem.style.color = "red";
      this.state.welcomeTextElem.innerHTML = t(
        "Geolocation is not supported by your device"
      );
      return (
        <div className={styles.Geolocate} onClick={() => false}>
          <div>
            <img src={GeolocationUnsupportedSVG} />
          </div>
        </div>
      );
    } else if (isNotStartedFetching) {
      console.log("[dbg] Geolocation 2/4");
      // case 2 of 4: Geolocate is supported but not yet activated/"clicked":
      return (
        <div className={styles.Geolocate} onClick={getGeolocation}>
          <div>
            <img src={GeolocationSupportedSVG} />
          </div>
        </div>
      );
    } else if (isFetching) {
      console.log("[dbg] Geolocation 3/4");
      this.state.welcomeTextElem.innerHTML = t(
        "Location data is being fetched..."
      );
      // case 3 of 4: Geolocate is supported, activated/"clicked" but the
      // resulting data is not yet available in the client:
      return (
        <div className={styles.Geolocate} onClick={() => false}>
          <div>
            <GeolocateSpinner />
          </div>
        </div>
      );
    } else if (hasData) {
      console.log(
        "[dbg] Geolocation 4/4; arg 'geolocationData' =",
        geolocationData
      );
      this.state.welcomeTextElem.style.color = "black";
      this.state.welcomeTextElem.innerHTML = this.props.geolocationData.placeName;
      return (
        <div
          className={styles.Geolocate}
          onClick={() => this.handleReset(clearGeolocation)}
        >
          <div>
            <img src={GeolocationAvailableSVG} />
          </div>
        </div>
      );
    }
  }
}

/* local sub-components ******************************************************/

class GeolocateSpinner extends Component {
  render() {
    return (
      <div>
        <MDSpinner
          singleColor="#00AA99"
          style={{
            position: "absolute",
            top: "370px",
            left: "47%"
          }}
        />
      </div>
    );
  }
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {
    isGeolocationSupported: state.geolocation.isGeolocationAvailable,
    isFetching: state.geolocation.isFetching,
    isNotStartedFetching: !(state.geolocation.isFetching ||
      state.geolocation.data ||
      state.geolocation.error),
    // isFinishedFetching: !state.geolocation.isFetching
    //   && (state.geolocation.data || state.geolocation.error),
    hasData: !state.geolocation.isFetching && state.geolocation.data,
    hasError: !state.geolocation.isFetching && state.geolocation.error,
    geolocationData: state.geolocation.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGeolocation: () => {
      performGeolocation(dispatch);
    },
    clearGeolocation: () => {
      clearGeolocation(dispatch);
    }
  };
}

const GeolocateButtonBig = connect(mapStateToProps, mapDispatchToProps)(
  GeolocateButtonBigComponent
);

export default translate()(GeolocateButtonBig);
