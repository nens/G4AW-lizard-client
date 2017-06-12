import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

// OLD:
// import RastersMap from "../RastersMap";
// import SearchBar from "../SearchBar";
// import SearchResults from "../SearchResults";
// import SnackBar from "../SnackBar";
// import ViewSwitchButton from "../ViewSwitchButton";
// import styles from "../styles/MainScreen.css";

// NEW:
import MapSearchView from "./MapSearchView";
import ListSearchView from "./ListSearchView";

class MainScreenComponent extends Component {
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
  getViewComponent(currentView) {
    switch (currentView) {
      case "MapSearchView":
        console.log("[dbg] About to render component: MapSearchView");
        return <MapSearchView />;
      case "ListSearchView":
        console.log("[dbg] About to render component: ListSearchView");
        return <ListSearchView />;
      case "DetailView":
        console.log("[dbg] About to render component: DetailView");
        return null;
      case "PhotoView":
        console.log("[E] Should render component: PhotoView (WIP!)");
        return null;
      case "SettingsView":
        console.log("[E] Should render component: SettingsView (WIP!)");
        return null;
      default:
        console.log("[E] Cannot render unknown view '" + currentView + "'!");
        return null;
    }
  }
  render() {
    return this.getViewComponent(this.props.currentView);
  }
}

///////////////////////////////////////////////////////////////////////////////
// react-redux bindings ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
  return {
    currentView: state.ui.currentView
  };
}

const MainScreen = connect(mapStateToProps, null)(MainScreenComponent);
export default translate()(MainScreen);
