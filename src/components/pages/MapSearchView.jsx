import { translate } from "react-i18next";
import GeolocationAvailable from "../svg/GeolocationAvailable.svg";
import GeolocationUnavailable from "../svg/GeolocationUnavailable.svg";
import Ink from "react-ink";
import PropTypes from "prop-types";
import RaisedButton from "../RaisedButton";
import RastersMap from "../RastersMap";
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
    if (this.props.match && this.props.match.params) {
      console.log(
        "x/y/z:",
        this.props.match.params.x,
        this.props.match.params.y,
        this.props.match.params.z
      );
    }
    return (
      <div className={styles.MapSearchView}>
        <SearchBar />
        <ViewSwitchButton viewIsMap={true} />
        <RastersMap />
      </div>
    );
  }
}

MapSearchView.propTypes = {};

export default translate()(MapSearchView);
