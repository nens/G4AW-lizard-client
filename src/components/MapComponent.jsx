import { connect } from "react-redux";
import L from "leaflet";
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
  getAttributesFromGeoserver,
  receiveResultsSuccess,
  updateMapBbox,
  getParcelByLatLng
} from "../actions";

import find from "lodash/find";

const hoogteUuid = "e9ed5725-d94a-4bcb-9dde-5d655da0070e";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.handlePanOrZoomEnd = this.handlePanOrZoomEnd.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }
  componentDidMount() {
    const leaflet = this.refs.mapElement.leafletElement;
    leaflet.on("zoomend", e => this.handlePanOrZoomEnd(e));
    leaflet.on("dragend", e => this.handlePanOrZoomEnd(e));
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
  handleMapClick(e) {
    const { getParcelByLatLng } = this.props;
    L.DomEvent.stopPropagation(e);
    const { lat, lng } = e.latlng;
    getParcelByLatLng(lng, lat);
  }
  render() {
    const {
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
              stroke={
                selectedParcel &&
                selectedParcel.hydracoreId === parcel.hydracoreId
                  ? true
                  : false
              }
              weight={2}
              dashArray="5, 5"
              key={i}
              positions={flip(parcel.geometry).coordinates}
              onClick={e => {
                L.DomEvent.stopPropagation(e);
                getDetails(r);
              }}
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
          onClick={this.handleMapClick}
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
    getDetails: id => {
      getAttributesFromGeoserver(dispatch, id);
    },
    receiveResults: results => receiveResultsSuccess(dispatch, results),
    updateMapBbox: bbox => updateMapBbox(dispatch, bbox),
    getParcelByLatLng: (lat, lng) => {
      getParcelByLatLng(dispatch, lng, lat);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
