import { Map, TileLayer, WMSTileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/DetailViewHeader.css";

// A DetailViewHeader component.

class DetailViewHeader extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const {
      title,
      halfMode,
      subTitle,
      handleBackButtonClick,
      latlonzoom,
      headerImage
    } = this.props;
    const { lat, lon, zoom } = latlonzoom ? latlonzoom : {};
    console.log("halfMode", halfMode);
    return (
      <div
        className={`${styles.DetailViewHeader} ${halfMode ? styles.TitleOnlyMode : styles.FullMode}`}
      >
        <div className={styles.Titles}>
          <p className={styles.Title}>{title}</p>
          {halfMode ? "" : <span className={styles.SubTitle}>{subTitle}</span>}
        </div>
        <div className={styles.ArrowBackIcon} onClick={handleBackButtonClick}>
          <i className="material-icons">arrow_back</i>
        </div>
        {headerImage
          ? <div
              style={{
                width: "100%",
                height: "100%",
                backdropFilter: "blur(5px)",
                backgroundSize: "cover",
                backgroundImage: `url(${headerImage})`
              }}
            />
          : ""}
        {latlonzoom
          ? <Map
              ref="mapElement"
              center={[lat, lon]}
              zoom={zoom}
              onMoveend={this._handlePanOrZoomEnd}
              zoomControl={false}
              style={{ height: "100%", zIndex: -1 }}
            >
              <TileLayer url="https://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png" />
            </Map>
          : ""}
      </div>
    );
  }
}

DetailViewHeader.propTypes = {
  fullMode: PropTypes.bool,
  handleBackButtonClick: PropTypes.func,
  headerImage: PropTypes.string,
  latlonzoom: PropTypes.object,
  subTitle: PropTypes.string,
  title: PropTypes.string
};

export default DetailViewHeader;
