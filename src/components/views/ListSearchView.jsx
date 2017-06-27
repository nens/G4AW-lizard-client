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
import { showSnackBar, hideSnackBar } from "../../actions/UiActions";

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
    this.state = {};
  }
  componentDidMount() {
    this.props.showSnackBar({
      message: "List view",
      subMessage: "This is the list view",
      autoHideDuration: 4000
    });
  }
  render() {
    const {
      getDetails, // via: mapDispatchToProps
      getParcel, // via: mapStateToProps
      getGeolocation, // via: mapDispatchToProps
      isFetching, // via: mapStateToProps
      isFinishedSearching, // via: mapStateToProps
      searchResults, // via: mapStateToProps
      geolocationData, // via: mapStateToProps,
      t // via: parent
    } = this.props;

    let component;

    if (isFinishedSearching) {
      component = (
        <ListSearchResults
          searchResults={searchResults}
          getDetails={getDetails}
          getParcel={getParcel}
          t={t}
        />
      );
    } else if (isFetching) {
      component = <ListSearchViewSpinner />;
    } else {
      component = <ListSearchLanding t={t} />;
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

function ListSearchLanding({ t }) {
  return (
    <div className={styles.ListSearchLanding} id="ListSearchLanding">
      <h1 className={styles.Welcome}>{t("Welcome")}</h1>
      <GeolocateButtonBig t={t} />
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
      <div className={styles.SearchResultsList}>
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
    isFetching: state.search.isFetching,
    isFinishedSearching: !state.search.isFetching && state.search.results,
    searchResults: state.search.results,
    geolocationData: state.geolocation
  };
}

function mapDispatchToProps(dispatch) {
  return {
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
