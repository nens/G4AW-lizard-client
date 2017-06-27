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
import SearchResultCardItem from "../SearchResultCardItem";
import SearchResultListItem from "../SearchResultListItem";
import {
  showSnackBar,
  hideSnackBar,
  toggleSearchResultsListOrCardMode
} from "../../actions/UiActions";
import { replaceUnderscores } from "../../tools/string-formatting";
import { getAttributesFromGeoserver } from "../../actions/ParcelActions";
import { performGeolocation } from "../../actions/GeolocationActions";

import MDSpinner from "react-md-spinner";

///////////////////////////////////////////////////////////////////////////////
// ListSearchViewComponent: Shows/enables search-results in a list mode.     //
///////////////////////////////////////////////////////////////////////////////

class ListSearchViewComponent extends Component {
  constructor() {
    super();
    this.state = {
      isListView: false
    };
  }
  render() {
    const {
      geolocationData, // via: mapStateToProps,
      getDetails, // via: mapDispatchToProps
      getGeolocation, // via: mapDispatchToProps
      getParcel, // via: mapStateToProps
      isFetching, // via: mapStateToProps
      isFinishedSearching, // via: mapStateToProps
      searchResults, // via: mapStateToProps
      searchResultsAsList, // via: mapStateToProps
      toggleSearchResultsListOrCardMode, // via: mapDispatchToProps
      username, // via: mapStateToProps,
      t // via: parent
    } = this.props;

    let component;

    if (isFinishedSearching) {
      component = (
        <ListSearchResults
          getDetails={getDetails}
          getParcel={getParcel}
          isListView={this.state.isListView}
          searchResults={searchResults}
          searchResultsAsList={searchResultsAsList}
          toggleSearchResultsListOrCardMode={toggleSearchResultsListOrCardMode}
          t={t}
        />
      );
    } else if (isFetching) {
      component = <ListSearchViewSpinner />;
    } else {
      component = <ListSearchLanding t={t} username={username} />;
    }

    return (
      <div className={styles.ListSearchView} id="ListSearchView">
        <SearchBar />
        <ViewSwitchButton viewIsMap={false} />
        {component}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// Local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function ListSearchLanding({ t, username }) {
  return (
    <div className={styles.ListSearchLanding} id="ListSearchLanding">
      <h1 className={styles.Welcome}>
        {t(`Welcome, ${username || "Guest"}`)}
      </h1>
      <GeolocateButtonBig t={t} />
      <LoginLogoutButton />
    </div>
  );
}

function ListSearchResults({
  getDetails,
  getParcel,
  isListView,
  parentState,
  searchResults,
  searchResultsAsList,
  toggleSearchResultsListOrCardMode
}) {
  return (
    <div
      id="SearchResultCardContainer"
      className={styles.SearchResultCardContainer}
    >
      <HeaderBar
        icon={searchResultsAsList ? "view_module" : "list"}
        handleClick={toggleSearchResultsListOrCardMode}
        title={`Search results (${searchResults.length})`}
      />
      {searchResultsAsList
        ? <div className={styles.SearchResultsAsList} id="SearchResultsAsList">
            {searchResults.map((result, i) => {
              const parcel = getParcel(result);
              return (
                <SearchResultListItem
                  handleClick={() => getDetails(result)}
                  key={result}
                  title={replaceUnderscores(parcel.name)}
                  ripple={true}
                  indicatorColor="#FEDF56"
                />
              );
            })}
          </div>
        : <div
            className={styles.SearchResultsAsCards}
            id="SearchResultsAsCards"
          >
            {searchResults.map((result, i) => {
              const parcel = getParcel(result);
              return (
                <SearchResultCardItem
                  handleClick={() => getDetails(result)}
                  key={result}
                  title={replaceUnderscores(parcel.name)}
                  ripple={true}
                  indicatorColor="#FEDF56"
                />
              );
            })}
          </div>}
    </div>
  );
}

class ListSearchViewSpinner extends Component {
  render() {
    return (
      <div>
        <MDSpinner
          singleColor="#03a9f4"
          style={{
            position: "absolute",
            top: "200px",
            left: "50%"
          }}
        />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// react-redux coupling ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
  return {
    getParcel: idx => state.parcels[idx],
    searchResultsAsList: state.ui.searchResultsAsList,
    isFetching: state.search.isFetching,
    isFinishedSearching: !state.search.isFetching && state.search.results,
    searchResults: state.search.results,
    geolocationData: state.geolocation,
    username: state.session.hasBootstrap
      ? state.session.bootstrap.first_name || state.session.bootstrap.username
      : "Guest"
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSearchResultsListOrCardMode: () =>
      toggleSearchResultsListOrCardMode(dispatch),
    hideSnackBar: () => hideSnackBar(dispatch),
    showSnackBar: options => showSnackBar(dispatch, options),
    getDetails: id => getAttributesFromGeoserver(dispatch, id),
    getGeolocation: () => performGeolocation(dispatch)
  };
}

const ListSearchView = connect(mapStateToProps, mapDispatchToProps)(
  ListSearchViewComponent
);

export default translate()(ListSearchView);
