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
      <div>
        <Marker
          position={[lng, lat]}
          icon={L.divIcon({ className: styles.PulsatingMarker })}
        />
        <Marker
          position={[lng, lat]}
          icon={L.divIcon({ className: styles.PulsatingMarkerInner })}
        />
      </div>
    );
  }
}

PulsatingMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

export default PulsatingMarker;
