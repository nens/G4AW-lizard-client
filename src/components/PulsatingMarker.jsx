import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Marker } from "react-leaflet";
import ReactDOM from "react-dom";

import styles from "./styles/PulsatingMarker.css";

// A PulsatingMarker

class PulsatingMarker extends PureComponent {
  render() {
    return (
      <Marker
        position={[13.0474, 107.7429]}
        icon={L.divIcon({ className: styles.PulsatingMarker })}
      />
    );
  }
}

PulsatingMarker.propTypes = {};

export default PulsatingMarker;
