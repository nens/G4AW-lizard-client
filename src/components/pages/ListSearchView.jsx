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

import { replaceUnderscores } from "../../tools/string-formatting";
import { falsum } from "../../tools/generic";
import { getAttributesFromGeoserver } from "../../actions/ParcelActions";
import { changeView } from "../../actions/UiActions";
import { performGeolocation } from "../../tools/geolocate";

///////////////////////////////////////////////////////////////////////////////
// Main Component: Shows/enables search-results in a list mode. ///////////////
///////////////////////////////////////////////////////////////////////////////

class ListSearchViewComponent extends Component {
  constructor() {
    super();
    this.state = {
      geolocationSupport: false,
      errorMessage: undefined
    };
    this.getGeoClickHandler = this.getGeoClickHandler.bind(this);
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
      performGeolocation(result => this.setState(result));
    }
  }
  getGeoClickHandler() {
    const condition =
      this.state.geolocationSupport &&
      this.state.latitude &&
      this.state.longitude;
    return condition
      ? () => performGeolocation(result => this.setState(result))
      : falsum;
  }
  render() {
    const {
      currentView, // via: mapStateToProps
      isFetching, // via: mapStateToProps
      isFinishedSearching, // via: mapStateToProps
      searchResults, // via: mapStateToProps
      getDetails // via: mapDispatchToProps
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
            />
          : <ListSearchLanding
              handleGeoClick={this.getGeoClickHandler()}
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

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class ListSearchLanding extends Component {
  render() {
    const {
      handleGeoClick,
      parentState,
      geolocationSupport,
      latitude,
      longitude,
      placeName,
      errorMessage
    } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <h1 className={styles.Welcome}>Welcome</h1>
        <h5 className={styles.GetStarted}>Tap to see the field nearby</h5>
        <GeolocateButtonBig
          handleClick={handleGeoClick}
          supportsGeolocate={geolocationSupport}
          hasCoords={latitude && longitude}
          placeName={placeName}
          errorMessage={errorMessage}
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
    currentView: state.ui.currentView,
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
