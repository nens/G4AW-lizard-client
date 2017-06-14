import { translate } from "react-i18next";
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

class MapSearchView extends Component {
  render() {
    const { width, height } = this.props;

    return (
      <div
        className={styles.MapSearchView}
        style={{
          width,
          height
        }}
      >
        <MapComponent />
        <SearchBar />
        <ViewSwitchButton viewIsMap={true} />
      </div>
    );
  }
}

MapSearchView.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default translate()(MapSearchView);
