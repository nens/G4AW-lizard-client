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
import { setGeolocationAvailability } from "../../actions/GeolocationActions";

import { updateDimensions } from "../../tools/dimensions";

class MainViewComponent extends Component {
  componentWillMount() {
    // Startup functions.
    this.props.fetchBootstrap(this.props.sessionState);
    this.props.setGeolocationAvailability();
    window.addEventListener("resize", updateDimensions);
  }
  render() {
    const photo = this.props.getPhotoForSelectedParcel();
    switch (this.props.currentView) {
      case "MapSearchView":
        return <MapSearchView />;
      case "ListSearchView":
        return <ListSearchView />;
      case "DetailView":
        return <DetailView photo={photo} />;
      case "PhotoView":
        return <PhotoView photo={photo} />;
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
    getPhotoForSelectedParcel: () => PHOTO_LIST[0]
    // TODO: Instead of getting the object from our test_data (PHOTO_LIST),
    // retrieve (=build) it from the readily available parcel data in the Redux
    // store.
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setGeolocationAvailability: () => setGeolocationAvailability(dispatch),
    fetchBootstrap: sessionState => fetchBootstrap(dispatch, sessionState)
  };
}

const MainView = connect(mapStateToProps, mapDispatchToProps)(
  MainViewComponent
);

export default translate()(MainView);
