import { translate } from "react-i18next";
import { connect } from "react-redux";
import GeolocationAvailable from "../svg/GeolocationAvailable.svg";
import GeolocationUnavailable from "../svg/GeolocationUnavailable.svg";
import Ink from "react-ink";
import PropTypes from "prop-types";
import RaisedButton from "../RaisedButton";
import MapComponent from "../MapComponent";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "../SearchBar";
import ViewSwitchButton from "../ViewSwitchButton";
import styles from "../styles/MapSearchView.css";

///////////////////////////////////////////////////////////////////////////////
// A MapSearchView shows searchresults on the map /////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class MapSearchViewComponent extends Component {
  render() {
    const { width, height, searchResults } = this.props;

    return (
      <div
        className={styles.MapSearchView}
        style={{
          width,
          height
        }}
      >
        <MapComponent searchResults={searchResults} />
        <SearchBar />
        <ViewSwitchButton viewIsMap={true} />
      </div>
    );
  }
}

MapSearchViewComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

function mapStateToProps(state) {
  console.log(state);
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

const MapSearchView = connect(mapStateToProps, mapDispatchToProps)(
  MapSearchViewComponent
);

export default translate()(MapSearchView);
