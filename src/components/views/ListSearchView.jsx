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
import { performGeolocation } from "../../actions/GeolocationActions";

/*
ListSearchViewComponent: Shows/enables search-results in a list mode.
*/

class ListSearchViewComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const {
      getDetails, // via: mapDispatchToProps
      getParcel, // via: mapStateToProps
      getGeolocation, // via: mapDispatchToProps
      isFetching, // via: mapStateToProps
      isFinishedSearching, // via: mapStateToProps
      searchResults, // via: mapStateToProps
      geolocationData // via: mapStateToProps
    } = this.props;
    return (
      <div className={styles.ListSearchView} id="ListSearchView">
        <SearchBar />
        <ViewSwitchButton viewIsMap={false} />
        {isFinishedSearching
          ? <ListSearchResults
              searchResults={searchResults}
              getDetails={getDetails}
              getParcel={getParcel}
            />
          : <ListSearchLanding
              geolocationData={geolocationData}
              getGeolocation={getGeolocation}
            />}
      </div>
    );
  }
}

/* local sub-components */

function ListSearchLanding({ getGeolocation, geolocationData }) {
  return (
    <div className={styles.ListSearchLanding} id="ListSearchLanding">
      <h1 className={styles.Welcome}>Welcome</h1>
      <h5 className={styles.GetStarted}>Tap to see the field nearby</h5>
      <GeolocateButtonBig
        geolocationData={geolocationData}
        handleClick={() => getGeolocation()}
      />
      <RaisedButton buttonText="Login" />
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
    searchResults: state.search.results,
    geolocationData: state.geolocation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: id => {
      getAttributesFromGeoserver(dispatch, id);
      changeView(dispatch, "DetailView");
    },
    getGeolocation: () => {
      performGeolocation(dispatch);
    }
  };
}

const ListSearchView = connect(mapStateToProps, mapDispatchToProps)(
  ListSearchViewComponent
);

export default translate()(ListSearchView);
