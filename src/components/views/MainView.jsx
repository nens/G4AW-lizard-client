import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import SnackBar from "../SnackBar";
import MapSearchView from "./MapSearchView";
import ListSearchView from "./ListSearchView";
import DetailView from "./DetailView";

import { fetchBootstrap } from "../../actions/SessionActions";
import { showSnackBar, hideSnackBar } from "../../actions/UiActions";

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
    const { snackBarOpen, snackBarOptions, hideSnackBar } = this.props;
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
    return (
      <div>
        {component}
        <SnackBar
          isOpen={snackBarOpen}
          message={snackBarOptions.message}
          subMessage={snackBarOptions.subMessage}
          actionText={"OK"}
          onActionTap={() => hideSnackBar()}
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
    sessionState: state.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideSnackBar: () => hideSnackBar(dispatch),
    showSnackBar: options => showSnackBar(dispatch, options),
    fetchBootstrap: sessionState => fetchBootstrap(dispatch, sessionState)
  };
}

const MainView = connect(mapStateToProps, mapDispatchToProps)(
  MainViewComponent
);
export default translate()(MainView);
