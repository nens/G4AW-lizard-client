import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";

import DetailViewHeader from "../DetailViewHeader";
import DetailViewSection from "../DetailViewSection";
import DetailViewTable from "../DetailViewTable";
import DetailViewTableSection from "../DetailViewTableSection";
import DetailViewThumbnailsSection from "../DetailViewThumbnailsSection";

import { changeView } from "../../actions/UiActions";

import { THUMBNAIL_LIST, LOREM } from "../../../stories/helpers";

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

export class DetailViewComponent extends Component {
  formatTabularData(parcel) {
    const result = [];
    return TABULAR_DATA_KEYS.map(requiredKey => {
      return { key: requiredKey, value: parcel[requiredKey] || "..." };
    });
  }
  getLatLonZoom(coords) {
    let latSum = 0;
    let lonSum = 0;
    coords.forEach(function(coord) {
      latSum += coord[0];
      lonSum += coord[1];
    });
    const latAvg = latSum / coords.length;
    const lonAvg = lonSum / coords.length;
    return { lat: latAvg, lon: lonAvg, zoom: DEFAULT_ZOOM };
  }
  render() {
    const {
      parcel, // via: mapStateToProps
      changeView, // via: mapDispatchToProps
      handleThumbnailClick // via: mapDispatchToProps
    } = this.props;
    let tabularData, latlonzoom;
    if (!parcel || !parcel.hasGeoserverData) {
      return null;
    } else if (parcel.isFetchingGeoserver) {
      return <p>Spinner.</p>;
    } else {
      console.log("[dbg] parcel:", parcel);
      latlonzoom = this.getLatLonZoom(parcel.geometry.coordinates[0]);
      tabularData = this.formatTabularData(parcel);
    }
    return (
      <div>
        <DetailViewHeader
          title={parcel.Farmer}
          subTitle={parcel.FieldAdr}
          halfMode={false}
          latlonzoom={latlonzoom}
          handleBackButtonClick={changeView}
        />
        <p style={{ padding: "20px" }}>{LOREM}</p>
        <DetailViewTable data={tabularData} />
        <br />
        <DetailViewSection
          title="Rice Growth"
          subTitle="ving bhin data"
          isOpen
          colorCode={"#ff0000"}
        >
          <p style={{ padding: "20px" }}>{LOREM}</p>
        </DetailViewSection>
        <DetailViewSection
          title="Flood Risk"
          subTitle="ving bhin data"
          isOpen={false}
        >
          <p style={{ padding: "20px" }}>{LOREM}</p>
        </DetailViewSection>
        <DetailViewThumbnailsSection
          isOpen
          handleClick={handleThumbnailClick}
          thumbnails={THUMBNAIL_LIST}
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
    parcel: state.parcels && state.parcels[state.ui.selectedParcel]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleThumbnailClick: () => alert("WIP"),
    changeView: () => changeView(dispatch, "ListSearchView")
  };
}

const DetailView = connect(mapStateToProps, mapDispatchToProps)(
  DetailViewComponent
);

export default translate()(DetailView);
