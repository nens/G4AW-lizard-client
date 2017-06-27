import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import MDSpinner from "react-md-spinner";

import styles from "../styles/DetailView.css";
import DetailViewHeader from "../DetailViewHeader";
import DetailViewSection from "../DetailViewSection";
import DetailViewTable from "../DetailViewTable";
import DetailViewTableSection from "../DetailViewTableSection";
import DetailViewPhotoSection from "../DetailViewPhotoSection";

import { changeView } from "../../actions/UiActions";

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

export class DetailViewComponent extends Component {
  formatTabularData(parcel) {
    return TABULAR_DATA_KEYS.map(requiredKey => {
      return { key: requiredKey, value: parcel[requiredKey] || "..." };
    });
  }
  getLatLonZoom(coords) {
    let latSum = 0, lonSum = 0;
    coords.forEach(function(coord) {
      latSum += coord[0];
      lonSum += coord[1];
    });
    const latAvg = latSum / coords.length, lonAvg = lonSum / coords.length;
    return { lat: latAvg, lon: lonAvg, zoom: DEFAULT_ZOOM };
  }
  render() {
    const {
      parcel, // via: mapStateToProps
      changeView, // via: mapDispatchToProps
      changeToPhotoView, // via: mapDispatchToProps,
      changeToListSearchView, // via: mapDispatchToProps,
      photo, // via: parent
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
      <div id="DetailView" className={styles.DetailView}>
        <DetailViewHeader
          title={parcel.Farmer}
          subTitle={parcel.FieldAdr}
          halfMode={false}
          latlonzoom={latlonzoom}
          handleBackButtonClick={changeToListSearchView}
        />
        {parcel.isFetchingGeoserver
          ? <DetailViewSpinner />
          : <div>
              <p style={{ padding: "20px" }}>{LOREM}</p>
              <DetailViewTable data={tabularData} />
              <br />
              <DetailViewSection
                isOpen
                title={t("Rice Growth")}
                subTitle={t("ving bhin data")}
                colorCode={"#ff0000"}
              >
                <p style={{ padding: "20px" }}>{LOREM}</p>
              </DetailViewSection>
              <DetailViewSection
                isOpen={false}
                title={t("Flood Risk")}
                subTitle={t("ving bhin data")}
              >
                <p style={{ padding: "20px" }}>{LOREM}</p>
              </DetailViewSection>
              <DetailViewPhotoSection
                isOpen={false}
                photo={photo}
                width={WIDTH}
                handleClick={changeToPhotoView}
              />
            </div>}
      </div>
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
    parcel: state.parcels && state.parcels[state.ui.selectedParcel]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeToPhotoView: () => changeView(dispatch, "PhotoView"),
    changeToListSearchView: () => changeView(dispatch, "ListSearchView")
  };
}

const DetailView = connect(mapStateToProps, mapDispatchToProps)(
  DetailViewComponent
);

export default translate()(DetailView);
