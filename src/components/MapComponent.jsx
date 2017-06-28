import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import bbox from "@turf/bbox";
import flip from "@turf/flip";
import { feature, featureCollection } from "@turf/helpers";
import {
  Map,
  TileLayer,
  Marker,
  GeoJSON,
  Popup,
  Polygon,
  WMSTileLayer
} from "react-leaflet";

import styles from "./styles/MapComponent";

import { getRaster, getAttributesFromGeoserver } from "../actions";

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
    const { visibleRasters, getParcel, searchResults, getDetails } = this.props;

    const searchResultsAsPolygons = searchResults
      ? searchResults.map((r, i) => {
          const parcel = getParcel(r);
          return (
            <Polygon
              color="#ff0000"
              stroke="1"
              key={i}
              positions={parcel.geometry.coordinates}
              onClick={() => getDetails(r)}
            />
          );
        })
      : [];

    const parcels = searchResults
      ? searchResults.map((r, i) => {
          const parcel = getParcel(r);
          return flip(feature(parcel.geometry));
        })
      : [];

    let bounds;

    if (parcels.length > 0) {
      // If there are parcels to be shown, set the bounds of the Map to the
      // bounding box of resultset
      const boundingBox = bbox(featureCollection(parcels));
      const corner1 = L.latLng(boundingBox[1], boundingBox[0]);
      const corner2 = L.latLng(boundingBox[3], boundingBox[2]);
      bounds = L.latLngBounds(corner1, corner2);
    } else {
      // otherwise, set the bounds of the Map to the bounding box of Vietnam
      // TODO: Read this default bbox from lizard/bootstrap or something
      // instead of hardcoding...
      bounds = L.latLngBounds(
        L.latLng(22.5658, 101.9275),
        L.latLng(9.2078, 110.6612)
      );
    }

    return (
      <div className={styles.MapComponent} id="MapComponent">
        <Map
          ref="mapElement"
          id="mapElement"
          bounds={bounds}
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
          {searchResultsAsPolygons}
        </Map>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getParcel: idx => state.parcels[idx],
    visibleRasters: Object.values(state.rasters)
      .filter(raster => !!raster.data)
      .map(raster => raster.data)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRaster: uuid => getRaster(uuid, dispatch),
    getDetails: id => getAttributesFromGeoserver(dispatch, id)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
