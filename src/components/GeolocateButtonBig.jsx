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
    this.state.welcomeTextElem.innerHTML = this.state.initialWelcomeText;
  }
  render() {
    if (!this.state.isMounted) return null;

    const {
      t, // via: parent
      isGeolocationSupported, // via: mapStateToProps
      isNotStartedFetching, // via: mapStateToProps
      isFetching, // via: mapStateToProps
      hasData, // via: mapStateToProps
      hasError, // via: mapStateToProps
      geolocationData, // via: mapStateToProps
      getGeolocation, // via: mapDispatchToProps
      clearGeolocation // via: mapDispatchToProps
    } = this.props;

    let welcomeText, child, onClick = () => false;

    if (!isGeolocationSupported) {
      welcomeText = t("Geolocation is not supported by your device");
      child = <img src={GeolocationUnsupportedSVG} />;
    } else if (isNotStartedFetching || hasError) {
      welcomeText = this.state.initialWelcomeText;
      child = <img src={GeolocationSupportedSVG} />;
      onClick = getGeolocation;
    } else if (isFetching) {
      welcomeText = t("Location data is being fetched...");
      child = <GeolocateSpinner />;
    } else if (hasData) {
      welcomeText = this.props.geolocationData.placeName;
      child = <img src={GeolocationAvailableSVG} />;
      onClick = () => this.handleReset(clearGeolocation);
    } else if (hasError) {
      welcomeText = t("Geolocation is not supported by your device");
      child = <img src={GeolocationUnsupportedSVG} />;
    }

    this.state.welcomeTextElem.innerHTML = welcomeText;
    return <GeolocateButtonContent {...{ onClick, child }} />;
  }
}

/* local sub-components ******************************************************/

function GeolocateButtonContent({ onClick, child }) {
  return (
    <div className={styles.Geolocate} onClick={onClick}>
      <div>
        {child}
      </div>
    </div>
  );
}

function GeolocateSpinner() {
  return (
    <div>
      <MDSpinner
        singleColor="#CECECE"
        style={{
          position: "absolute",
          top: "370px",
          left: "47%"
        }}
      />
    </div>
  );
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {
    isGeolocationSupported: state.geolocation.isGeolocationAvailable,
    isFetching: state.geolocation.isFetching,
    isNotStartedFetching: !(state.geolocation.isFetching ||
      state.geolocation.data ||
      state.geolocation.error),
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
