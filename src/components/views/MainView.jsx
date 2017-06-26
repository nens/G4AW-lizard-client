import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import SnackBar from "../SnackBar";
import MapSearchView from "./MapSearchView";
import ListSearchView from "./ListSearchView";
import DetailView from "./DetailView";
import PhotoView from "./PhotoView";
import { PHOTO_LIST } from "../../../stories/helpers";
import { fetchBootstrap } from "../../actions/SessionActions";
import { setGeolocationAvailability } from "../../actions/GeolocationActions";
import { showSnackBar, hideSnackBar } from "../../actions/UiActions";
import { updateDimensions } from "../../tools/dimensions";

class MainViewComponent extends Component {
  componentWillMount() {
    // Startup functions.
    this.props.fetchBootstrap(this.props.sessionState);
    this.props.setGeolocationAvailability();
    window.addEventListener("resize", updateDimensions);
  }
  render() {
    const { snackBarOpen, snackBarOptions, hideSnackBar } = this.props;
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
          "[E] Cannot render unknown view '" + this.props.currentView + "'!"
        );
        return null;
    }
    return (
      <div>
        {component}
        <SnackBar
          isOpen={snackBarOpen}
          message={snackBarOptions.message}
          subMessage={snackBarOptions.subMessage}
          actionText="OK"
          negative={snackBarOptions.negative}
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
    snackBarOpen: state.ui.showSnackBar,
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
    hideSnackBar: () => hideSnackBar(dispatch),
    showSnackBar: options => showSnackBar(dispatch, options),
    fetchBootstrap: sessionState => fetchBootstrap(dispatch, sessionState)
  };
}

const MainView = connect(mapStateToProps, mapDispatchToProps)(
  MainViewComponent
);

export default translate()(MainView);
