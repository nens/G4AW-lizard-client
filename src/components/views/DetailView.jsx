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
  DetailViewFooter,
  FlatButton
} from "..";

import { changeView } from "../../actions/UiActions";
import { updateMapBbox } from "../../actions/MapActions";
import { THUMBNAIL_LIST, LOREM } from "../../../stories/helpers";
import { WIDTH } from "../../tools/dimensions";
import {
  rgbaListToRgbaString,
  hexColorToRGB,
  rgbaListToHexColor
} from "../../tools/color-conversion";

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
  LeaffolderRisk: "Sâu cuốn lá rủi ro",
  LeaffolderPresent: "Sâu cuốn lá",
  BlastRisk: "Đạo ôn lá rủi ro",
  BlastPresent: "Đạo ôn lá",
  BrownPlantHopperRisk: "Rầy nâu rủi ro",
  BrownPlantHopperPresent: "Rầy nâu",
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
  formatTabularDataVI(parcel) {
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
  formatTabularDataEN(parcel) {
    return Object.keys(GEOSERVER_PARCEL_KEYS).map(enKey => {
      return {
        key: enKey,
        value: parcel[enKey] || NO_DATA
      };
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
  getHumanReadableRiceGrowth(parcel, t) {
    // TODO: think of solution that will return the message in vietnamese.
    const stage = parcel.GrowthStage.toUpperCase();
    const height = parcel.PlantHeightInCm;
    return `${t("The current growth stage is")} ${stage}
      ${t("and the plant height is")} ${height} cm.`;
  }
  getHumanReadablePestRisk(parcel, t) {
    let riskLevel = parcel.PestRisk;
    if (riskLevel === "High") {
      return t("There is increased risk on one or more pests.");
    } else {
      return t("There is a little risk on pest presence.");
    }
  }
  getFarmTitle(parcel) {
    return parcel.name.split(" ").slice(0, 2).join(" ");
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
      searchView, // via: mapStateToProps,
      riceGrowthLayer, // via: mapStateToProps
      t
    } = this.props;

    let latlonzoom;

    if (parcel && parcel.geometry) {
      latlonzoom = this.getLatLonZoom(parcel.geometry.coordinates[0]);
    } else {
      return null;
    }

    return (
      <div id="DetailView" className={styles.DetailView}>
        <DetailViewHeader
          title={this.getFarmTitle(parcel)}
          subTitle={parcel.FieldOfficer || "..."}
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
              <DetailViewTable data={this.formatTabularDataEN(parcel)} />
              <DetailViewSection isOpen title={t("Rice Growth")}>
                <div className={styles.ColoredSquaresContainer}>
                  <div className={styles.ColoredSquaresHeader}>
                    {parcel.GrowthStage.toUpperCase()}
                  </div>
                  {riceGrowthLayer.colormap.map((kv, i) => {
                    const label = Object.keys(kv)[0];
                    const color = Object.values(kv)[0];
                    return (
                      <ColoredSquare
                        key={i}
                        key_={i}
                        title={`${t("Growth stage")}: ${label}`}
                        backgroundColorHex={rgbaListToHexColor(color)}
                        active={label === parcel.GrowthStage}
                      />
                    );
                  })}
                  <div className={styles.SubMessage}>
                    {this.getHumanReadableRiceGrowth(parcel, t)}
                  </div>
                </div>
              </DetailViewSection>
              <DetailViewSection isOpen={false} title={t("Flood Risk")}>
                <div className={styles.ColoredSquaresContainer}>
                  <div className={styles.ColoredSquaresHeader}>
                    {parcel.FloodRisk.toUpperCase()}
                  </div>
                  <ColoredSquare
                    title={t("Low flood risk")}
                    backgroundColorHex="#FFFFFF"
                    active={parcel.FloodRisk === "Low"}
                  />
                  <ColoredSquare
                    title={t("Medium flood risk")}
                    backgroundColorHex="#697DB0"
                    active={parcel.FloodRisk === "Medium"}
                  />
                  <ColoredSquare
                    title={t("High flood risk")}
                    backgroundColorHex="#122476"
                    active={parcel.FloodRisk === "High"}
                  />
                  <div className={styles.SubMessage}>
                    {`The current flood risk is ${parcel.FloodRisk.toUpperCase()}`}
                  </div>
                </div>
              </DetailViewSection>
              <DetailViewSection isOpen={false} title={t("Pest Risk")}>
                <div className={styles.ColoredSquaresContainer}>
                  <div className={styles.ColoredSquaresHeader}>
                    {parcel.PestRisk.toUpperCase()}
                  </div>
                  <ColoredSquare
                    title={t("High blast risk")}
                    backgroundColorHex="#FFFFFF"
                    active={parcel.BlastRisk === "High"}
                  />
                  <ColoredSquare
                    title={t("High leaffolder risk")}
                    backgroundColorHex="#D7BA34"
                    active={parcel.LeaffolderRisk === "High"}
                  />
                  <ColoredSquare
                    title={t("High brown planthopper risk")}
                    backgroundColorHex="#703F1D"
                    active={parcel.BrownPlantHopperRisk === "High"}
                  />
                  <div className={styles.SubMessage}>
                    {this.getHumanReadablePestRisk(parcel, t)}
                  </div>
                </div>
              </DetailViewSection>
              <DetailViewPhotoSection
                isOpen={false}
                photo={photo}
                width={WIDTH}
                handleClick={changeToPhotoView}
              />
              <DetailViewFooter />
            </div>}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function ColoredSquare({ title, backgroundColorHex, active }) {
  const rgba = hexColorToRGB(backgroundColorHex);
  rgba.push(active ? 1 : 0.3);
  const backgroundColor = rgbaListToRgbaString(rgba);
  const border = `${active ? "3" : "1"}px solid ${active ? "#555" : "#D8D8D8"}`;
  return (
    <div
      className={styles.ColoredSquare}
      title={title}
      style={{ backgroundColor, border }}
    />
  );
}

class DetailViewSpinner extends Component {
  render() {
    return (
      <div>
        <MDSpinner
          singleColor="#03a9f4"
          style={{
            position: "absolute",
            top: "160px",
            left: "calc(50% - 20px)"
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
    updateMapBbox: bbox => updateMapBbox(dispatch, bbox)
  };
}

const DetailView = connect(mapStateToProps, mapDispatchToProps)(
  DetailViewComponent
);

export default translate()(DetailView);
