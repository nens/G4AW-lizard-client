import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Map, TileLayer, WMSTileLayer } from "react-leaflet";
import ReactDOM from "react-dom";

import { VIEWPORT_PADDING } from "./Constants";
import { getRaster } from "../actions/RasterActions";

const hoogteUuid = "e9ed5725-d94a-4bcb-9dde-5d655da0070e";

class RastersMapComponent extends React.Component {
  componentDidMount() {
    // this.props.getRaster(hoogteUuid);
  }

  getWidth() {
    return (this.props.width || window.innerWidth) - VIEWPORT_PADDING + "px";
  }

  getHeight() {
    return (this.props.height || window.innerHeight) - VIEWPORT_PADDING + "px";
  }

  render() {
    const { visibleRasters } = this.props;

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <Map
          center={[13.0474, 107.7429]}
          zoom={7}
          zoomControl={false}
          style={{ height: "100%" }}
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

const RastersMap = connect(mapStateToProps, mapDispatchToProps)(
  RastersMapComponent
);

export default RastersMap;
