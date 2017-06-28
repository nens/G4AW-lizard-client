import { translate } from "react-i18next";
import { connect } from "react-redux";
import Ink from "react-ink";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import { MapComponent, SearchBar, ViewSwitchButton } from "..";
import { showSnackBar, hideSnackBar } from "../../actions";
import styles from "../styles/MapSearchView.css";
import { WIDTH, HEIGHT } from "../../tools/dimensions";

/* A MapSearchView shows searchresults on the map ****************************/

class MapSearchViewComponent extends Component {
  render() {
    const { searchResults } = this.props;
    return (
      <div
        className={styles.MapSearchView}
        style={{ width: WIDTH, height: HEIGHT }}
      >
        <MapComponent searchResults={searchResults} />
        <SearchBar />
        <ViewSwitchButton viewIsMap />
      </div>
    );
  }
}

/* type-checking *************************************************************/

MapSearchViewComponent.propTypes = {
  searchResults: PropTypes.array
};

/* react-redux coupling ******************************************************/

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
    hideSnackBar: () => hideSnackBar(dispatch),
    showSnackBar: options => showSnackBar(dispatch, options),
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
