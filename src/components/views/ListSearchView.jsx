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
      {/* <h1 className={styles.Welcome}>
        {msg}
      </h1> */}
      <div 
      className={styles.Welcome}
      style={{
        fontSize: "1em",
         margin: "0px",
          paddingLeft: "4px",
           paddingRight: "4px",
            lineHeight: "10px",
      }}
      >
        <p style={{margin: "0px", lineHeight: "24px"}}>Dear visitor,</p>
        <br style={{margin: "0px", lineHeight: "16px"}}/>
        <p style={{margin: "0px", lineHeight: "24px"}}>The Sat4Rice information service is temporarily suspended.</p>
        <p style={{margin: "0px", lineHeight: "24px"}}>Sat4Rice Vietnam was successfully implemented in cooperation with Loc Troi Group, and the implementation project was completed on the 1st of January 2019. At this moment, Loc Troi Group is considering to continue providing the Sat4Rice information service in 2019 and after.</p>
        <br style={{margin: "0px", lineHeight: "16px"}}/>
        <p style={{margin: "0px", lineHeight: "24px"}}>With warm regards,</p>
        <p style={{margin: "0px", lineHeight: "24px"}}>The Sat4Rice Team</p> 
      </div>
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
  selectedParcel,
  t
}) {
  const headerTitle = t("Search results") + "(" + searchResults.length + ")";
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
          title={headerTitle}
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
                    title={parcel.farmerName}
                    subtitle={parcel.farmId}
                    ripple={true}
                    indicatorColor={parcel.isAffiliated ? "#00AA99" : "#D8D8D8"}
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
                return (
                  <SearchResultCardItem
                    handleClick={() => getDetails(result)}
                    key={result}
                    title={parcel.farmerName}
                    subtitle={parcel.farmId}
                    ripple={true}
                    indicatorColor={parcel.isAffiliated ? "#00AA99" : "#D8D8D8"}
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
          size="30"
          style={{
            position: "absolute",
            top: "200px",
            left: "calc(50% - 15px)"
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
