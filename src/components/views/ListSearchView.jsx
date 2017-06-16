import { translate } from "react-i18next";
import Ink from "react-ink";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import styles from "../styles/ListSearchView.css";

import LoginLogoutButton from "../LoginLogoutButton";
import RaisedButton from "../RaisedButton";
import SearchBar from "../SearchBar";
import GeolocateButtonBig from "../GeolocateButtonBig";
import ViewSwitchButton from "../ViewSwitchButton";
import HeaderBar from "../HeaderBar";
import SearchResultCard from "../SearchResultCard";

import { replaceUnderscores } from "../../tools/string-formatting";
import { getAttributesFromGeoserver } from "../../actions/ParcelActions";
import { changeView } from "../../actions/UiActions";
import { performGeolocation } from "../../tools/geolocate";

/*
ListSearchViewComponent: Shows/enables search-results in a list mode.
*/

class ListSearchViewComponent extends Component {
  constructor() {
    super();
    this.state = {
      geolocationSupport: false,
      errorMessage: undefined
    };
    this.setState = this.setState.bind(this);
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
      isFetching, // via: mapStateToProps
      isFinishedSearching, // via: mapStateToProps
      searchResults, // via: mapStateToProps
      getDetails, // via: mapDispatchToProps
      getParcel // via: mapStateToProps
    } = this.props;
    const {
      geolocationSupport,
      latitude,
      longitude,
      placeName,
      errorMessage
    } = this.state;
    return (
      <div className={styles.ListSearchView}>
        <SearchBar />
        <ViewSwitchButton viewIsMap={false} />
        {isFinishedSearching
          ? <ListSearchResults
              searchResults={searchResults}
              getDetails={getDetails}
              getParcel={getParcel}
            />
          : <ListSearchLanding
              handleGeoClick={() => performGeolocation(this.setState)}
              geolocationSupport={geolocationSupport}
              latitude={latitude}
              longitude={longitude}
              placeName={placeName}
              errorMessage={errorMessage}
            />}
      </div>
    );
  }
}

/* local sub-components */

function ListSearchLanding({
  handleGeoClick,
  geolocationSupport,
  latitude,
  longitude,
  placeName,
  errorMessage
}) {
  return (
    <div className={styles.ListSearchLanding}>
      <h1 className={styles.Welcome}>Welcome</h1>
      <h5 className={styles.GetStarted}>Tap to see the field nearby</h5>
      <GeolocateButtonBig
        handleClick={handleGeoClick}
        supportsGeolocate={geolocationSupport}
        hasCoords={latitude && longitude}
        placeName={placeName}
        errorMessage={errorMessage}
      />
      <LoginLogoutButton />
    </div>
  );
}

function ListSearchResults({
  parentState,
  searchResults,
  getParcel,
  getDetails
}) {
  return (
    <div
      id="SearchResultCardContainer"
      className={styles.SearchResultCardContainer}
    >
      <HeaderBar title={"Search results (" + searchResults.length + ")"} />
      {searchResults.map((r, i) => {
        const parcel = getParcel(r);
        return (
          <SearchResultCard
            handleClick={() => getDetails(r)}
            key={r}
            title={replaceUnderscores(parcel.name)}
            ripple={true}
            indicatorColor="#FEDF56"
          />
        );
      })}
    </div>
  );
}

/* react-redux coupling */

function mapStateToProps(state) {
  return {
    getParcel: idx => state.parcels[idx],
    isFetching: state.search.isFetching,
    isFinishedSearching: !state.search.isFetching && state.search.results,
    searchResults: state.search.results
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: id => {
      getAttributesFromGeoserver(dispatch, id);
      changeView(dispatch, "DetailView");
    }
  };
}

const ListSearchView = connect(mapStateToProps, mapDispatchToProps)(
  ListSearchViewComponent
);

export default translate()(ListSearchView);
