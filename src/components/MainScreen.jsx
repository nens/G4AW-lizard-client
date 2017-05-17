import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import RastersMap from "./RastersMap";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
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
      console.log("resize detected; this.state =", this.state);
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
        <div className={styles.OmniboxView}>
          <div
            style={{
              flex: 1,
              backgroundColor: "#7F7F7F",
              padding: "5px 15px 10px 15px"
            }}
          >
            <div
              style={{
                color: "#fff",
                position: "relative"
              }}
            >
              <i
                style={{ position: "absolute", right: 0, top: 5 }}
                className="material-icons"
              >
                close
              </i>
            </div>
            <p
              style={{
                fontSize: "1.5em",
                color: "#fff",
                lineHeight: 0.7,
                fontWeight: 300
              }}
            >
              Trăm năm trong
            </p>
            <p
              style={{
                fontSize: "1em",
                color: "#fff",
                lineHeight: 0.5,
                fontWeight: 100
              }}
            >
              741, Tân Xuân, Tx. Đồng Xoài, Bình Phước
            </p>

          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "#fff",
              padding: 5
            }}
          >
            <SearchResults />
          </div>
        </div>
        <SnackBar
          action={"OK"}
          autoHideDuration={2000}
          message={"Do you copy?"}
        />
        <SearchBar />
      </div>
    );
  }
}

export default MainScreen;
