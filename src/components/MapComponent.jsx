import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import bbox from "@turf/bbox";
import flip from "@turf/flip";
import { feature, featureCollection } from "@turf/helpers";
import { PulsatingMarker } from ".";
import {
  Map,
  TileLayer,
  GeoJSON,
  Popup,
  Polygon,
  WMSTileLayer
} from "react-leaflet";

import styles from "./styles/MapComponent.css";

import {
  getRaster,
  getAttributesFromGeoserver,
  updateMapLocation
} from "../actions";

import find from "lodash/find";

const hoogteUuid = "e9ed5725-d94a-4bcb-9dde-5d655da0070e";

class MapComponent extends Component {
  constructor() {
    super();
    this.handlePanOrZoomEnd = this.handlePanOrZoomEnd.bind(this);
  }
  handlePanOrZoomEnd(e) {
    const leaflet = this.refs.mapElement.leafletElement;
    const { _northEast, _southWest } = leaflet.getBounds();
    const { lat, lng } = leaflet.getCenter();
    const zoom = leaflet.getZoom();
    this.props.updateMapLocation({
      bbox: {
        _northEast,
        _southWest
      },
      lat,
      lng,
      zoom
    });
  }
  render() {
    const {
      visibleRasters,
      getParcel,
      searchResults,
      getDetails,
      getBaselayerUrl,
      foregroundlayerUrl,
      getActiveForegroundlayer,
      currentBoundingBox,
      geolocation
    } = this.props;

    const searchResultsAsPolygons = searchResults
      ? searchResults.map((r, i) => {
          const parcel = getParcel(r);
          return (
            <Polygon
              color="#3DB249"
              stroke={true}
              weight={2}
              dashArray="5, 5"
              key={i}
              positions={flip(parcel.geometry).coordinates}
              onClick={() => getDetails(r)}
            />
          );
        })
      : [];

    const parcels = searchResults
      ? searchResults.map((r, i) => {
          const parcel = getParcel(r);
          return feature(parcel.geometry);
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
    } else if (parcels.length === 0 && currentBoundingBox) {
      // If no parcels to be shown but the user moved the map before, show
      // that area.
      const boundingBox = currentBoundingBox;
      const corner1 = L.latLng(
        boundingBox._northEast.lat,
        boundingBox._northEast.lng
      );
      const corner2 = L.latLng(
        boundingBox._southWest.lat,
        boundingBox._southWest.lng
      );
      bounds = L.latLngBounds(corner1, corner2);
    } else {
      // Otherwise, set the bounds of the Map to the bounding box of Vietnam.
      // This is only on first load.
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
            url={getBaselayerUrl()}
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <WMSTileLayer
            url={foregroundlayerUrl}
            layers={getActiveForegroundlayer().slug}
            transparent="True"
            format="image/png"
          />
          {geolocation.data
            ? <PulsatingMarker
                lat={geolocation.data.lat}
                lng={geolocation.data.lng}
              />
            : null}
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
      .map(raster => raster.data),
    currentBoundingBox: state.map.settings.bbox,
    getBaselayerUrl: () => {
      const activeBaselayer = find(state.baselayer.layers, { active: true });
      return activeBaselayer.url;
    },
    geolocation: state.geolocation,
    foregroundlayerUrl: state.foregroundlayer.url,
    getActiveForegroundlayer: () => {
      return find(state.foregroundlayer.layers, { active: true });
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRaster: uuid => getRaster(uuid, dispatch),
    getDetails: id => getAttributesFromGeoserver(dispatch, id),
    updateMapLocation: settings => updateMapLocation(dispatch, settings)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
