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
  render() {
    const {
      getDetails, // via: mapDispatchToProps
      getParcel, // via: mapStateToProps
      getGeolocation, // via: mapDispatchToProps
      isFetching, // via: mapStateToProps
      isFinishedSearching, // via: mapStateToProps
      searchResults, // via: mapStateToProps
      geolocationData, // via: mapStateToProps
      t
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
              t={t}
            />
          : <ListSearchLanding
              geolocationData={geolocationData}
              getGeolocation={getGeolocation}
              t={t}
            />}
      </div>
    );
  }
}

/* local sub-components */

function ListSearchLanding({ getGeolocation, geolocationData, t }) {
  return (
    <div className={styles.ListSearchLanding} id="ListSearchLanding">
      <h1 className={styles.Welcome}>{t("Welcome")}</h1>
      <h5 className={styles.GetStarted}>{t("Tap to see the field nearby")}</h5>
      <GeolocateButtonBig
        geolocationData={geolocationData}
        handleClick={() => getGeolocation()}
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
      <HeaderBar
        icon="list"
        title={"Search results (" + searchResults.length + ")"}
      />
      {searchResults.map((result, i) => {
        const parcel = getParcel(result);
        return (
          <SearchResultCard
            handleClick={() => getDetails(result)}
            key={result}
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
