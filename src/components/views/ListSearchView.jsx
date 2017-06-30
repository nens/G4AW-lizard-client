import { translate } from "react-i18next";
import { VelocityTransitionGroup } from "velocity-react";
import { VelocityComponent } from "velocity-react";
import "velocity-animate/velocity.ui";
import Ink from "react-ink";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import styles from "../styles/ListSearchView.css";

import {
  GeolocateButtonBig,
  HeaderBar,
  LoginLogoutButton,
  RaisedButton,
  SearchBar,
  SearchResultCardItem,
  SearchResultListItem,
  ViewSwitchButton
} from "..";

import {
  showSnackBar,
  hideSnackBar,
  getAttributesFromGeoserver,
  toggleSearchResultsListOrCardMode,
  performGeolocation
} from "../../actions/";

import { replaceUnderscores } from "../../tools/string-formatting";

import MDSpinner from "react-md-spinner";

class ListSearchViewComponent extends Component {
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
  parentState,
  searchResults,
  searchResultsAsList,
  toggleSearchResultsListOrCardMode
}) {
  return (
    <VelocityTransitionGroup
      runOnMount={true}
      enter={{ animation: "transition.slideUpIn" }}
    >
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
          ? <div
              className={styles.SearchResultsAsList}
              id="SearchResultsAsList"
            >
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
    </VelocityTransitionGroup>
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
