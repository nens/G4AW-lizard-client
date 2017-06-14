import { connect } from "react-redux";
import { Map, TileLayer, WMSTileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/MapComponent.css";

import { VIEWPORT_PADDING } from "./Constants";
import { getRaster } from "../actions/RasterActions";

const hoogteUuid = "e9ed5725-d94a-4bcb-9dde-5d655da0070e";

class MapComponent extends Component {
  constructor() {
    super();
    this.handlePanOrZoomEnd = this.handlePanOrZoomEnd.bind(this);
  }
  handlePanOrZoomEnd(e) {
    const leaflet = this.refs.mapElement.leafletElement;
    const { lat, lng } = leaflet.getCenter();
    const zoom = leaflet.getZoom();
  }
  render() {
    const { visibleRasters } = this.props;
    return (
      <div className={styles.MapComponent} id="MapComponent">
        <Map
          ref="mapElement"
          id="mapElement"
          center={[13.0474, 107.7429]}
          zoom={7}
          onMoveend={this.handlePanOrZoomEnd}
          zoomControl={false}
          className={styles.MapElement}
        >
          <TileLayer
            url="https://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {visibleRasters.map(raster => (
            <WMSTileLayer
              url={raster.wms_info.endpoint}
              key={raster.uuid}
              layers={raster.wms_info.layer}
              styles={raster.options.styles}
            />
          ))}
        </Map>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    visibleRasters: Object.values(state.rasters)
      .filter(raster => !!raster.data)
      .map(raster => raster.data)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRaster: uuid => getRaster(uuid, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
