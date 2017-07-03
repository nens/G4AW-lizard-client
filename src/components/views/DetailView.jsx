import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import bbox from "@turf/bbox";
import flip from "@turf/flip";
import { feature, featureCollection } from "@turf/helpers";
import { VelocityTransitionGroup } from "velocity-react";
import "velocity-animate/velocity.ui";
import MDSpinner from "react-md-spinner";
import styles from "../styles/DetailView.css";

import {
  DetailViewHeader,
  DetailViewSection,
  DetailViewTable,
  DetailViewTableSection,
  DetailViewPhotoSection,
  FlatButton
} from "..";

import { changeView } from "../../actions/UiActions";
import { updateMapLocationBbox } from "../../actions/MapActions";
import { THUMBNAIL_LIST, LOREM } from "../../../stories/helpers";
import { WIDTH } from "../../tools/dimensions";

const DEFAULT_ZOOM = 11; // Used for map in header of the page
const TABULAR_DATA_KEYS = [
  "name",
  "3CForce",
  "Farmer",
  "FieldAdr",
  "Hectare",
  "LocTroi"
];

///////////////////////////////////////////////////////////////////////////////
// The main Component; the View for displaying the details of a single parcel /
///////////////////////////////////////////////////////////////////////////////

class DetailViewComponent extends Component {
  constructor() {
    super();
    this.handleViewOnMapClick = this.handleViewOnMapClick.bind(this);
  }
  formatTabularData(parcel) {
    return TABULAR_DATA_KEYS.map(requiredKey => {
      return { key: requiredKey, value: parcel[requiredKey] || "..." };
    });
  }
  getLatLonZoom(coords) {
    let latSum = 0,
      lonSum = 0;
    coords.forEach(function(coord) {
      latSum += coord[0];
      lonSum += coord[1];
    });
    const latAvg = latSum / coords.length,
      lonAvg = lonSum / coords.length;
    return { lat: latAvg, lon: lonAvg, zoom: DEFAULT_ZOOM };
  }
  handleViewOnMapClick(parcel) {
    if (parcel && parcel.geometry) {
      const boundingBox = bbox(feature(parcel.geometry));
      this.props.updateMapLocationBbox({
        _northEast: {
          lat: boundingBox[0],
          lng: boundingBox[1]
        },
        _southWest: {
          lat: boundingBox[2],
          lng: boundingBox[3]
        }
      });
      this.props.changeToMapSearchView();
    }
  }
  render() {
    const {
      changeToListSearchView, // via: mapDispatchToProps
      changeToMapSearchView, // via: mapDispatchToProps
      changeToPhotoView, // via: mapDispatchToProps
      changeToSearchView, // via: mapDispatchToProps,
      changeView, // via: mapDispatchToProps
      parcel, // via: mapStateToProps
      photo, // via: parent
      searchView, // via: mapStateToProps
      t
    } = this.props;

    let tabularData, latlonzoom;
    if (parcel && parcel.hasGeoserverData) {
      latlonzoom = this.getLatLonZoom(parcel.geometry.coordinates[0]);
      tabularData = this.formatTabularData(parcel);
    } else {
      return null;
    }
    return (
      <VelocityTransitionGroup
        runOnMount={true}
        enter={{ animation: "transition.slideUpBigIn" }}
      >
        <div id="DetailView" className={styles.DetailView}>
          <DetailViewHeader
            title={parcel.Farmer}
            subTitle={parcel.FieldAdr}
            halfMode={false}
            latlonzoom={latlonzoom}
            handleBackButtonClick={() => changeToSearchView(searchView)}
          />
          {parcel.isFetchingGeoserver
            ? <DetailViewSpinner />
            : <div>
                <p style={{ padding: "20px" }}>
                  {LOREM}
                </p>
                <div className={styles.MapZoomToParcel}>
                  <FlatButton
                    buttonText="View on map"
                    handleOnClick={() => this.handleViewOnMapClick(parcel)}
                  />
                </div>
                <DetailViewTable data={tabularData} />
                <br />
                <DetailViewSection
                  isOpen
                  title={t("Rice Growth")}
                  subTitle={t("ving bhin data")}
                  colorCode={"#ff0000"}
                >
                  <p style={{ padding: "20px" }}>
                    {LOREM}
                  </p>
                </DetailViewSection>
                <DetailViewSection
                  isOpen={false}
                  title={t("Flood Risk")}
                  subTitle={t("ving bhin data")}
                >
                  <p style={{ padding: "20px" }}>
                    {LOREM}
                  </p>
                </DetailViewSection>
                <DetailViewPhotoSection
                  isOpen={false}
                  photo={photo}
                  width={WIDTH}
                  handleClick={changeToPhotoView}
                />
              </div>}
        </div>
      </VelocityTransitionGroup>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class DetailViewSpinner extends Component {
  render() {
    return (
      <div>
        <MDSpinner
          singleColor="#03a9f4"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%"
          }}
        />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// react-redux bindings ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function mapStateToProps(state) {
  return {
    currentView: state.ui.currentView,
    searchView: state.ui.searchView,
    parcel: state.parcels && state.parcels[state.ui.selectedParcel]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeToListSearchView: () => changeView(dispatch, "ListSearchView"),
    changeToMapSearchView: () => changeView(dispatch, "MapSearchView"),
    changeToPhotoView: () => changeView(dispatch, "PhotoView"),
    changeToSearchView: searchView => changeView(dispatch, searchView),
    updateMapLocationBbox: bbox => updateMapLocationBbox(dispatch, bbox)
  };
}

const DetailView = connect(mapStateToProps, mapDispatchToProps)(
  DetailViewComponent
);

export default translate()(DetailView);
