import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { translate, t } from "react-i18next";
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
  DetailViewSectionGrowthStage,
  DetailViewSectionPestRisk,
  DetailViewSectionFloodRisk,
  DetailViewTable,
  DetailViewTableSection,
  DetailViewPhotoSection,
  DetailViewFooter,
  FlatButton
} from "..";

import { changeView } from "../../actions/UiActions";
import { updateMapBbox } from "../../actions/MapActions";
import { getActiveForegroundlayerIdx } from "../../actions/ForegroundlayerActions";
import { THUMBNAIL_LIST, LOREM } from "../../../stories/helpers";
import { WIDTH } from "../../tools/dimensions";
import { SECTIONS, NO_DATA } from "../../constants/detailview-attributes";
import { getRGBAstring } from "../../tools/color-conversion";

const DEFAULT_ZOOM = 11; // Used for map in header of the page

///////////////////////////////////////////////////////////////////////////////
// The main Component; the View for displaying the details of a single parcel /
///////////////////////////////////////////////////////////////////////////////

class DetailViewComponent extends Component {
  constructor() {
    super();
    this.handleViewOnMapClick = this.handleViewOnMapClick.bind(this);
  }
  formatData(parcel, sectionName) {
    // console.log("[F] formatData; sectionName = '" + sectionName + "'");
    const attributes = SECTIONS[sectionName];
    // console.log("*** attributes:", attributes);
    return attributes.sectionAttrs.map(sectionAttr => {
      // console.log("****** sectionAttr:", sectionAttr);
      const result = {
        key: sectionAttr.attrTranslate,
        value: parcel[sectionAttr.attr],
        unit: sectionAttr.unit || ""
      };
      // console.log("****** result:", result);
      return result;
    });
  }
  getLatLonZoom(coords) {
    let latSum = 0,
      lonSum = 0;
    coords.forEach(function(coord) {
      latSum += coord[1];
      lonSum += coord[0];
    });
    const latAvg = latSum / coords.length,
      lonAvg = lonSum / coords.length;
    return { lat: latAvg, lon: lonAvg, zoom: DEFAULT_ZOOM };
  }
  handleViewOnMapClick(parcel) {
    if (parcel && parcel.geometry) {
      const boundingBox = bbox(feature(parcel.geometry));
      this.props.updateMapBbox([
        boundingBox[1],
        boundingBox[0],
        boundingBox[3],
        boundingBox[2]
      ]);
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
      getActiveForegroundlayerIdx,
      parcel, // via: mapStateToProps
      photo, // via: parent
      searchView, // via: mapStateToProps,
      riceGrowthLayer, // via: mapStateToProps
      t
    } = this.props;

    let tabularData, latlonzoom;
    if (parcel && parcel.geometry) {
      latlonzoom = this.getLatLonZoom(parcel.geometry.coordinates[0]);
    } else {
      return null;
    }

    let openSection;
    switch (getActiveForegroundlayerIdx()) {
      case 1:
        openSection = "RiceGrowth";
        break;
      case 2:
        openSection = "PestRisk";
    }

    return (
      <div id="DetailView" className={styles.DetailView}>
        <DetailViewHeader
          title={`${t("Farmer")} ${parcel.FarmID || NO_DATA}`}
          subTitle={parcel.FieldOfficer}
          halfMode={false}
          latlonzoom={latlonzoom}
          handleBackButtonClick={() => changeToSearchView(searchView)}
        />
        {parcel.isFetchingGeoserver
          ? <DetailViewSpinner />
          : <div>
              <div className={styles.MapZoomToParcel}>
                <FlatButton
                  buttonText={t("View on map")}
                  handleOnClick={() => this.handleViewOnMapClick(parcel)}
                />
              </div>
              <DetailViewTable data={this.formatData(parcel, "FieldInfo")} />
              <br />
              <DetailViewSectionGrowthStage
                data={this.formatData(parcel, "RiceGrowth")}
                isInitiallyOpen={openSection === "RiceGrowth"}
                ColoredSquare={ColoredSquare}
                {...this.props}
              />
              <DetailViewSectionPestRisk
                data={this.formatData(parcel, "PestRisk")}
                isInitiallyOpen={openSection === "PestRisk"}
                ColoredSquare={ColoredSquare}
                {...this.props}
              />
              <DetailViewSectionFloodRisk
                data={this.formatData(parcel, "FloodRisk")}
                ColoredSquare={ColoredSquare}
                {...this.props}
              />
              <DetailViewPhotoSection
                isInitiallyOpen={false}
                photo={photo}
                width={WIDTH}
                handleClick={changeToPhotoView}
              />
            </div>}
        <DetailViewFooter />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function ColoredSquare({ title, backgroundColor, active }) {
  const opacity = active ? 1 : 0.3;
  backgroundColor = getRGBAstring(backgroundColor, opacity);
  const border = `2px solid ${active ? "#555" : "#CECECE"}`;
  return (
    <div
      className={styles.ColoredSquare}
      title={title}
      style={{ backgroundColor, border, opacity }}
    />
  );
}

class DetailViewSpinner extends Component {
  render() {
    return (
      <div className={styles.DetailViewSpinner}>
        <MDSpinner
          singleColor="#03a9f4"
          style={{
            position: "absolute",
            top: "165px",
            left: "45%"
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
    parcel: state.parcels && state.parcels[state.ui.selectedParcel],
    riceGrowthLayer: state.foregroundlayer.layers[1]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeToListSearchView: () => changeView(dispatch, "ListSearchView"),
    changeToMapSearchView: () => changeView(dispatch, "MapSearchView"),
    changeToPhotoView: () => changeView(dispatch, "PhotoView"),
    changeToSearchView: searchView => changeView(dispatch, searchView),
    updateMapBbox: bbox => updateMapBbox(dispatch, bbox),
    getActiveForegroundlayerIdx
  };
}

const DetailView = connect(mapStateToProps, mapDispatchToProps)(
  DetailViewComponent
);

export default translate()(DetailView);
