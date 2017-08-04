import { translate } from "react-i18next";
import { connect } from "react-redux";
import Ink from "react-ink";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  MapComponent,
  Legend,
  FooterBar,
  SearchBar,
  ViewSwitchButton
} from "..";
import { showSnackBar, hideSnackBar, toggleLegend } from "../../actions";
import styles from "../styles/MapSearchView.css";
import { WIDTH, HEIGHT } from "../../tools/dimensions";
import { i18nDecorator, LEGEND_DATA } from "../../../stories/helpers";
import { VelocityComponent } from "velocity-react";

/* A MapSearchView shows searchresults on the map ****************************/

class MapSearchViewComponent extends Component {
  render() {
    const { searchResults, showLegend, toggleLegend } = this.props;
    return (
      <div
        id="MapSearchView"
        className={styles.MapSearchView}
        style={{ width: WIDTH, height: HEIGHT }}
      >
        <MapComponent searchResults={searchResults} />
        <SearchBar />
        <ViewSwitchButton viewIsMap />

        <Legend isOpen={showLegend} toggleLegend={toggleLegend} />

        <FooterBar>
          <div />
          <div onClick={toggleLegend}>
            <Ink />
            <i className="material-icons">list</i>
          </div>
        </FooterBar>
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
  return {
    getParcel: idx => state.parcels[idx],
    isFetching: state.search.isFetching,
    isFinishedSearching: !state.search.isFetching && state.search.results,
    searchResults: state.search.results,
    showLegend: state.ui.showLegend
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLegend: () => toggleLegend(dispatch),
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
