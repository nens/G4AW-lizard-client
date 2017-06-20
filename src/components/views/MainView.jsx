import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import MapSearchView from "./MapSearchView";
import ListSearchView from "./ListSearchView";
import DetailView from "./DetailView";
import PhotoView from "./PhotoView";

import { PHOTO_LIST } from "../../../stories/helpers";

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
    const { getPhotoForSelectedParcel } = this.props;
    switch (this.props.currentView) {
      case "MapSearchView":
        return (
          <MapSearchView
            width={this.state.viewportWidth}
            height={this.state.viewportHeight}
          />
        );
        break;
      case "ListSearchView":
        return (
          <ListSearchView
            width={this.state.viewportWidth}
            height={this.state.viewportHeight}
          />
        );
        break;
      case "DetailView":
        return (
          <DetailView
            width={this.state.viewportWidth}
            height={this.state.viewportHeight}
          />
        );
      case "PhotoView":
        return (
          <PhotoView
            width={this.state.viewportWidth}
            height={this.state.viewportHeight}
            photo={getPhotoForSelectedParcel()}
          />
        );
      case "SettingsView":
        console.log("[E] Should render component: SettingsView (WIP!)");
        return null;
      default:
        console.log(
          "[E] Cannot render unknown view '" + this.props.currentView + "'!"
        );
        return null;
    }
  }
}

/* react-redux bindings */

function mapStateToProps(state) {
  return {
    currentView: state.ui.currentView,
    sessionState: state.session,
    // TODO: Instead of getting the object from our test_data (PHOTO_LIST),
    // retrieve (=build) it from the readily available parcel data in the Redux
    // store.
    getPhotoForSelectedParcel: () => PHOTO_LIST[0]
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
