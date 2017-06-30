import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import SnackBar from "../SnackBar";
import { MapSearchView, ListSearchView, DetailView, PhotoView } from ".";

import { PHOTO_LIST } from "../../../stories/helpers";

import { updateDimensions } from "../../tools/dimensions";

import {
  fetchBootstrap,
  setGeolocationSupport,
  showSnackBar,
  hideSnackBar
} from "../../actions/";

class MainViewComponent extends Component {
  componentDidMount() {
    // Startup functions.
    this.props.fetchBootstrap(this.props.sessionState);
    this.props.setGeolocationSupport();
    window.addEventListener("resize", updateDimensions);
  }
  render() {
    const { snackBarIsOpen, snackBarOptions, hideSnackBar } = this.props;
    const photo = this.props.getPhotoForSelectedParcel();
    let component = null;
    switch (this.props.currentView) {
      case "MapSearchView":
        component = <MapSearchView />;
        break;
      case "ListSearchView":
        component = <ListSearchView />;
        break;
      case "DetailView":
        component = <DetailView photo={photo} />;
        break;
      case "PhotoView":
        component = <PhotoView photo={photo} />;
        break;
      case "SettingsView":
        console.log("[E] Should render component: SettingsView (WIP!)");
        return null;
      default:
        console.log(
          `[E] Cannot render unknown view "${this.props.currentView}"!`
        );
        return null;
    }
    return (
      <div>
        {component}
        <SnackBar
          isOpen={snackBarIsOpen}
          message={snackBarOptions.message}
          subMessage={snackBarOptions.subMessage}
          actionText="OK"
          isError={snackBarOptions.isError}
          onActionTap={hideSnackBar}
        />
      </div>
    );
  }
}

/* react-redux bindings */

function mapStateToProps(state) {
  return {
    snackBarOptions: state.ui.snackBarOptions,
    snackBarIsOpen: state.ui.showSnackBar,
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
    setGeolocationSupport: () => setGeolocationSupport(dispatch),
    hideSnackBar: () => hideSnackBar(dispatch),
    showSnackBar: options => showSnackBar(dispatch, options),
    fetchBootstrap: sessionState => fetchBootstrap(dispatch, sessionState)
  };
}

const MainView = connect(mapStateToProps, mapDispatchToProps)(
  MainViewComponent
);

export default translate()(MainView);
