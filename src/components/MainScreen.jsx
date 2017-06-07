import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import RastersMap from "./RastersMap";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import TimeseriesGraph from "./TimeseriesGraph";
import SnackBar from "./SnackBar";
import ViewSwitchButton from "./ViewSwitchButton";

import styles from "./styles/MainScreen.css";

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    };
  }
  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      });
    });
  }
  render() {
    return (
      <div
        className={styles.MainScreen}
        style={{ height: this.state.viewportHeight }}
      >

        <div className={styles.MapView}>
          <RastersMap />
        </div>

        <SearchBar />

        <div
          style={{
            flex: 1,
            backgroundColor: "#fff"
          }}
        >
          <SearchResults />

        </div>
      </div>
    );
  }
}

export default MainScreen;
