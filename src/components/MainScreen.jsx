import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import RastersMap from "./RastersMap";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

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
      <div>
        <RastersMap
          width={this.state.viewportWidth}
          height={this.state.viewportHeight}
        />
        <SearchBar />
        <SearchResults />
      </div>
    );
  }
}

export default MainScreen;
