// reactjs/redux boilerplate imports:
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

// reactjs sub-components imports:
import RastersMap from "../RastersMap";
import SearchBar from "../SearchBar";
import ViewSwitchButton from "../ViewSwitchButton";
import SnackBar from "../SnackBar";

// imports for CSS:
import styles from "../styles/MainScreen.css";

export default class MapPageComponent extends Component {
  render() {
    return (
      <div className={styles.MainScreen} style={{ height: "1000px" }}>
        <SearchBar />
        <ViewSwitchButton />
        <div className={styles.MapView}>
          <RastersMap />
        </div>
        <SnackBar />
      </div>
    );
  }
}
