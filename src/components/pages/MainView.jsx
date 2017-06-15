import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import MapSearchView from "./MapSearchView";
import ListSearchView from "./ListSearchView";
import DetailView from "./DetailView";

import { fetchBootstrap } from "../../actions/SessionActions";

class MainViewComponent extends Component {
  constructor() {
    super();
    this.state = {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount() {
    // Startup functions.
    this.props.fetchBootstrap(this.props.sessionState);
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
        component = <ListSearchView />;
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
    currentView: state.ui.currentView,
    sessionState: state.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBootstrap: sessionState => fetchBootstrap(dispatch, sessionState)
  };
}

const MainView = connect(mapStateToProps, mapDispatchToProps)(
  MainViewComponent
);
export default translate()(MainView);
