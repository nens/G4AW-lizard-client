import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Marker } from "react-leaflet";
import ReactDOM from "react-dom";

import styles from "./styles/PulsatingMarker.css";

// A PulsatingMarker

class PulsatingMarker extends PureComponent {
  render() {
    const { lat, lng } = this.props;
    return (
      <Marker
        position={[lng, lat]}
        icon={L.divIcon({ className: styles.PulsatingMarker })}
      />
    );
  }
}

PulsatingMarker.propTypes = {
  lat: PropTypes.number.required,
  lng: PropTypes.number.required
};

export default PulsatingMarker;
