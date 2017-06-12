import { translate } from "react-i18next";
import Ink from "react-ink";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import styles from "../styles/ListSearchView.css";

import RaisedButton from "../RaisedButton";
import SearchBar from "../SearchBar";
import GeolocateButtonBig from "../GeolocateButtonBig";
import ViewSwitchButton from "../ViewSwitchButton";
import HeaderBar from "../HeaderBar";
import SearchResultCard from "../SearchResultCard";

import { replaceUnderscores } from "./string-formatting";

import { getAttributesFromGeoserver } from "../../actions/ParcelActions";

const GEO_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

// A ListSearchView shows searchresults in a list mode

class ListSearchViewComponent extends Component {
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
      GEO_OPTIONS
    );
  }
  render() {
    const {
      isFetching, // via: mapStateToProps
      isFinishedSearching, // via: mapStateToProps
      searchResults, // via: mapStateToProps
      getDetails // via: mapDispatchToProps
    } = this.props;
    const s = this.state;
    const handleGeoClick = s.geolocationSupport && s.latitude && s.longitude
      ? this.performGeolocation
      : () => false;
    return (
      <div className={styles.ListSearchView}>
        <SearchBar />
        {isFinishedSearching
          ? <ListSearchResults
              searchResults={searchResults}
              getDetails={getDetails}
            />
          : <ListSearchLanding
              handleGeoClick={handleGeoClick}
              parentState={s}
            />}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class ListSearchLanding extends Component {
  render() {
    const { handleGeoClick, parentState } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <ViewSwitchButton viewIsMap={false} />
        <h1 className={styles.Welcome}>Welcome</h1>
        <h5 className={styles.GetStarted}>Tap to see the field nearby</h5>
        <GeolocateButtonBig
          handleClick={handleGeoClick}
          supportsGeolocate={parentState.geolocationSupport}
          hasCoords={parentState.latitude && parentState.longitude}
          placeName={parentState.placeName}
          errorMessage={parentState.errorMessage}
        />
        <RaisedButton buttonText="Login" iconClass="lock" />
      </div>
    );
  }
}

class ListSearchResults extends Component {
  getTitleBarText(searchResults) {
    const count = searchResults.length;
    return "SEARCH RESULTS (" + count + ")";
  }
  render() {
    const { parentState, searchResults, getDetails } = this.props;
    return (
      <div className={styles.SearchResultCardContainer}>
        <HeaderBar title={this.getTitleBarText(searchResults)} />
        {searchResults.map((r, i) => {
          return (
            <SearchResultCard
              handleClick={() => getDetails(r.id)}
              key={i}
              title={replaceUnderscores(r.name)}
              subtitle={replaceUnderscores(r.code)}
              ripple={true}
              indicatorColor="#FEDF56"
            />
          );
        })}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// react-redux coupling ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
  return {
    isFetching: state.search.isFetching,
    isFinishedSearching: !state.search.isFetching && state.search.results,
    searchResults: state.search.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: id => getAttributesFromGeoserver(dispatch, id)
  };
}

const ListSearchView = connect(mapStateToProps, mapDispatchToProps)(
  ListSearchViewComponent
);

export default translate()(ListSearchView);
