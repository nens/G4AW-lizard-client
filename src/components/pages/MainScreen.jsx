import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import MapSearchView from "./MapSearchView";
import ListSearchView from "./ListSearchView";
import DetailView from "./DetailView";

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
        return <MapSearchView />;
      case "ListSearchView":
        return <ListSearchView />;
      case "DetailView":
        return <DetailView />;
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
