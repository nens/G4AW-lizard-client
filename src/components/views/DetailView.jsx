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

const NO_DATA = "...";

const GEOSERVER_PARCEL_KEYS = {
  FarmID: "Mã số ruộng",
  FieldOfficer: "Tên người thu thập",
  Visit: "Ngày thăm ruộng",
  SpecialSituation: "Vui lòng ghi ra những tình huống đặc biệt",
  GrowthStage: "Giai đoạn",
  CropCondition: "Tình trạng cây lúa",
  SowDate: "Ngày gieo sạ (nếu sạ)",
  HarvestDate: "Nếu đã thu hoạch, ngày thu hoạch",
  "Yield(Kg/Ha)": "Năng suất (kg / ha)",
  "Price(₫/Kg)": "Giá / kg gạo (VND)",
  "HarvestedWeightInKg(wet)":
    "Trọng lượng của lúa tươi được thu hoạch (kg) là bao nhiêu?",
  "HarvestedWeightInKg(dry)": "Trọng lượng của gạo sấy được thu hoạch (kg)?",
  MoistureContent: "Độ ẩm",
  PestRisk: "Nguy cơ sâu bệnh",
  BrownPlantHopperPresent: "Rầy nâu",
  LeaffolderPresent: "Sâu cuốn lá",
  BlastPresent: "Đạo ôn lá",
  BlastRisk: "Đạo ôn lá rủi ro",
  BrownPlantHopperRisk: "Rầy nâu rủi ro",
  LeaffolderRisk: "Sâu cuốn lá rủi ro",
  FloodRisk: "Nguy cơ lũ lụt",
  PlantHeightInCm: "Chiều cao cây lúa (cm)",
  "NumberOfStemsPerM²": "Trường hợp SẠ - Số nhánh lúa trên mét vuông",
  FieldSizeInHa: "Kích thước đồng ruộng trong ha",
  Variety: "Giống lúa"
};

const GEOSERVER_PARCEL_VALUES = {
  Flowering: "Trổ",
  "Rove beetle (Paederus fuscipes)": "Kiến 3 khoang",
  Inundated: "Ngập nước",
  No: "Không",
  "Self-pumping": "Tự bơm",
  "Irrigation system": "Hệ thống thủy lợi",
  Tillering: "Đẻ nhánh",
  Yes: "Vâng",
  "Drough damage": "Thiệt hại do khô hạn",
  "Less then 1 % of thefield": "< 1%",
  "More than 50% of the field": "> 50%",
  Age2: "tuổi 2",
  "Between 1% and 5% of field": "> 1 - 5%",
  "Pest/disease damage": "Thiệt hại do sâu bệnh",
  "Green mirrid bug (Cyrtorhinus Lividipennis)": "Bọ xít mù xanh",
  Age1: "tuổi 1",
  Harvesting: "Thu hoạch",
  Adult: "trưởng thành",
  Booting: "Làm đòng",
  Ripening: "Chín",
  "Flood damage": "Thiệt hại do lũ",
  "Salinity damage": "Thiệt hại do nhiễm mặn",
  Milking: "Ngậm sữa",
  Age5: "tuổi 5",
  Age4: "tuổi 4",
  "Between 25% and 50% of the field": "> 25 - 50%",
  Dry: "Khô",
  Age3: "tuổi 3",
  "Acid soil damage": "Thiệt hại do nhiễm phèn",
  Other: "Khác",
  Seedling: "Sạ",
  "River water": "Nước sông",
  "Between 5% and 25% of the field": "> 5 - 25%",
  Wet: "Ướt",
  "Rain water": "Nước mưa",
  Good: "Bình thường",
  Spider: "Nhện",
  High: "Cao",
  Medium: " Trung bình",
  Low: "Thấp",
  True: "Thật",
  False: "Sai",
  "Needs attention": "Cần sự chú ý"
};

///////////////////////////////////////////////////////////////////////////////
// The main Component; the View for displaying the details of a single parcel /
///////////////////////////////////////////////////////////////////////////////

class DetailViewComponent extends Component {
  constructor() {
    super();
    this.handleViewOnMapClick = this.handleViewOnMapClick.bind(this);
  }
  formatTabularData(parcel) {
    let result = [],
      vnKey,
      enValue,
      vnValue;
    Object.keys(GEOSERVER_PARCEL_KEYS).forEach(enKey => {
      vnKey = GEOSERVER_PARCEL_KEYS[enKey];
      enValue = parcel[enKey];
      if (enValue) {
        if (GEOSERVER_PARCEL_VALUES.hasOwnProperty(enValue)) {
          vnValue = GEOSERVER_PARCEL_VALUES[enValue];
        } else {
          vnValue = enValue;
        }
      } else {
        vnValue = NO_DATA;
      }
      result.push({ key: vnKey, value: vnValue });
    });
    return result;
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
