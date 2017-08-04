import { translate } from "react-i18next";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import MDSpinner from "react-md-spinner";

import styles from "./styles/ListSearchView.css";

import GeolocationUnsupportedSVG from "./svg/GeolocationUnsupportedSVG.svg";
import GeolocationSupportedSVG from "./svg/GeolocationSupportedSVG.svg";
import GeolocationAvailableSVG from "./svg/GeolocationAvailableSVG.svg";

import { performGeolocation, clearGeolocation } from "../actions";

/* The main component: a big button for toggling geolocation-awareness ********/

class GeolocateButtonBigComponent extends Component {
  render() {
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

    let welcomeText,
      child,
      onClick = () => false;

    if (!isGeolocationSupported) {
      welcomeText = t("Geolocation is not supported by your device");
      child = <img src={GeolocationUnsupportedSVG} />;
    } else if (isNotStartedFetching || hasError) {
      welcomeText = t("Tap to see the field nearby");
      child = <img src={GeolocationSupportedSVG} />;
      onClick = getGeolocation;
    } else if (isFetching) {
      welcomeText = t("Location data is being fetched...");
      child = <GeolocateSpinner />;
    } else if (hasData) {
      welcomeText = this.props.geolocationData.placeName;
      child = <img src={GeolocationAvailableSVG} />;
      onClick = clearGeolocation;
    }
    return (
      <div>
        <h5 id="welcomeText" className={styles.GetStarted}>
          {welcomeText}
        </h5>
        <GeolocateButtonContent {...{ onClick, child }} />
      </div>
    );
  }
}

/* local sub-components ******************************************************/

function GeolocateButtonContent({ onClick, child }) {
  return (
    <div className={styles.Geolocate}>
      <div onClick={onClick}>
        {child}
      </div>
    </div>
  );
}

function GeolocateSpinner() {
  return (
    <div>
      <MDSpinner
        size="30"
        singleColor="#03a9f4"
        style={{
          position: "relative",
          top: "40px"
        }}
      />
    </div>
  );
}

/* react-redux coupling ******************************************************/

function mapStateToProps(state) {
  return {
    isGeolocationSupported: state.geolocation.isGeolocationSupported,
    isFetching: state.geolocation.isFetching,
    isNotStartedFetching: !(
      state.geolocation.isFetching ||
      state.geolocation.data ||
      state.geolocation.error
    ),
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
