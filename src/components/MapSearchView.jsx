import { translate } from "react-i18next";
import GeolocationAvailable from "./svg/GeolocationAvailable.svg";
import GeolocationUnavailable from "./svg/GeolocationUnavailable.svg";
import Ink from "react-ink";
import PropTypes from "prop-types";
import RaisedButton from "./RaisedButton";
import RastersMap from "./RastersMap";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/MapSearchView.css";

import {
  VelocityTransitionGroup,
  VelocityComponent,
  velocityHelpers
} from "velocity-react";

// A MapSearchView shows searchresults in a list mode

class MapSearchView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { t } = this.props;
    if (this.props.match && this.props.match.params) {
      console.log(
        "x/y/z:",
        this.props.match.params.x,
        this.props.match.params.y,
        this.props.match.params.z
      );
    }
    return (
      <div className={styles.MapSearchView}>
        <RastersMap />
      </div>
    );
  }
}

MapSearchView.propTypes = {};

export default translate()(MapSearchView);
