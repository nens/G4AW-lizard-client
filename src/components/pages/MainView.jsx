import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import MapSearchView from "./MapSearchView";
import ListSearchView from "./ListSearchView";
import DetailView from "./DetailView";

class MainViewComponent extends Component {
  constructor() {
    super();
    this.state = {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false);
  }
  handleResize() {
    this.setState({
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    });
  }
  render() {
    let component = null;
    switch (this.props.currentView) {
      case "MapSearchView":
        component = (
          <MapSearchView
            width={this.state.viewportWidth}
            height={this.state.viewportHeight}
          />
        );
        break;
      case "ListSearchView":
        component = (
          <ListSearchView
            width={this.state.viewportWidth}
            height={this.state.viewportHeight}
          />
        );
        break;
      case "DetailView":
        component = <DetailView />;
        break;
      case "PhotoView":
        console.log("[E] Should render component: PhotoView (WIP!)");
        break;
      case "SettingsView":
        console.log("[E] Should render component: SettingsView (WIP!)");
        break;
      default:
        console.log(
          "[E] Cannot render unknown view '" + this.props.currentView + "'!"
        );
        break;
    }
    return component;
  }
}

/* react-redux bindings */

function mapStateToProps(state) {
  return {
    currentView: state.ui.currentView
  };
}

const MainView = connect(mapStateToProps, null)(MainViewComponent);
export default translate()(MainView);
