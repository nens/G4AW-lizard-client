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
  updateMapBbox
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
    this.props.updateMapBbox([
      _northEast.lat,
      _northEast.lng,
      _southWest.lat,
      _southWest.lng
    ]);
  }
  componentDidMount() {
    const leaflet = this.refs.mapElement.leafletElement;
    leaflet.on("zoomend", e => this.handlePanOrZoomEnd(e));
    leaflet.on("dragend", e => this.handlePanOrZoomEnd(e));
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
      currentBbox,
      geolocation,
      selectedParcel
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

    const bounds = L.latLngBounds(
      L.latLng(currentBbox[0], currentBbox[1]),
      L.latLng(currentBbox[2], currentBbox[3])
    );

    return (
      <div className={styles.MapComponent} id="MapComponent">
        <Map
          ref="mapElement"
          id="mapElement"
          bounds={bounds}
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
    selectedParcel: state.parcels && state.parcels[state.ui.selectedParcel],
    geolocation: state.geolocation,
    foregroundlayerUrl: state.foregroundlayer.url,
    currentBbox: state.map.bbox,
    getParcel: idx => state.parcels[idx],
    getBaselayerUrl: () => {
      const activeBaselayer = find(state.baselayer.layers, { active: true });
      return activeBaselayer.url;
    },
    getActiveForegroundlayer: () => {
      return find(state.foregroundlayer.layers, { active: true });
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRaster: uuid => getRaster(uuid, dispatch),
    getDetails: id => getAttributesFromGeoserver(dispatch, id),
    updateMapBbox: bbox => updateMapBbox(dispatch, bbox)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
