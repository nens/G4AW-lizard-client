import { translate } from "react-i18next";
import { VelocityTransitionGroup } from "velocity-react";
import { VelocityComponent } from "velocity-react";
import "velocity-animate/velocity.ui";
import Ink from "react-ink";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import LogoLocTroi from "../images/logo-loctroi-large-greyscale.png";
import styles from "../styles/ListSearchView.css";

import {
  GeolocateButtonBig,
  FlatButton,
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
  extractName(fullTitle) {
    const startOfSuffix = fullTitle.indexOf("(");
    return fullTitle.slice(0, startOfSuffix).replace("Farmer", "");
  }
  extractFarmId(fullTitle) {
    const fullTitleParts = fullTitle.split(" ");
    const lastPart = fullTitleParts[fullTitleParts.length - 1];
    const RE = /[\d\-]+/;
    return RE.exec(lastPart)[0];
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
      selectedParcel, // via: mapStateToProps,
      t // via: parent
    } = this.props;

    let component;

    if (isFinishedSearching) {
      component = (
        <ListSearchResults
          extractName={this.extractName}
          extractFarmId={this.extractFarmId}
          getDetails={getDetails}
          getParcel={getParcel}
          searchResults={searchResults}
          searchResultsAsList={searchResultsAsList}
          toggleSearchResultsListOrCardMode={toggleSearchResultsListOrCardMode}
          selectedParcel={selectedParcel}
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
  const msg = `${t("Welcome")}, ${username || t("Guest")}`;
  return (
    <div className={styles.ListSearchLanding} id="ListSearchLanding">
      <h1 className={styles.Welcome}>
        {msg}
      </h1>
      <img src={LogoLocTroi} />
      <GeolocateButtonBig t={t} />
      <LoginLogoutButton />
    </div>
  );
}

function ListSearchResults({
  extractName,
  extractFarmId,
  getDetails,
  getParcel,
  parentState,
  searchResults,
  searchResultsAsList,
  toggleSearchResultsListOrCardMode,
  selectedParcel
}) {
  console.log("selected parcel:", selectedParcel);
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
                const formattedName = replaceUnderscores(parcel.name);
                console.log("current parcel:", parcel);
                return (
                  <SearchResultListItem
                    handleClick={() => getDetails(result)}
                    key={result}
                    title={extractName(formattedName)}
                    subtitle={extractFarmId(formattedName)}
                    ripple={true}
                    indicatorColor={parcel.isAffiliated ? "#FEDF56" : "#D8D8D8"}
                    isSelected={selectedParcel === parcel.hydracoreId}
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
                const formattedName = replaceUnderscores(parcel.name);
                console.log("current parcel:", parcel);
                return (
                  <SearchResultCardItem
                    handleClick={() => getDetails(result)}
                    key={result}
                    title={extractName(formattedName)}
                    subtitle={extractFarmId(formattedName)}
                    ripple={true}
                    indicatorColor={parcel.isAffiliated ? "#FEDF56" : "#D8D8D8"}
                    isSelected={selectedParcel === parcel.hydracoreId}
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
    selectedParcel: state.ui.selectedParcel,
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
