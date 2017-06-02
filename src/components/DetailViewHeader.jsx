import { Map, TileLayer, WMSTileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/DetailViewHeader.css";

///////////////////////////////////////////////////////////////////////////////
// The main Component: the DetailViewHeader ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class DetailViewHeader extends Component {
  getComponentClassName(halfMode) {
    const mode = halfMode ? styles.TitleOnlyMode : styles.FullMode;
    return `${styles.DetailViewHeader} ${mode}`;
  }
  render() {
    const {
      title,
      halfMode,
      subTitle,
      handleBackButtonClick,
      latlonzoom,
      headerImage
    } = this.props;

    return (
      <div className={this.getComponentClassName(halfMode)}>

        <DetailViewHeaderTitle
          halfMode={halfMode}
          title={title}
          subTitle={subTitle}
        />

        <DetailViewHeaderBackArrow handleClick={handleBackButtonClick} />

        {headerImage
          ? <DetailViewHeaderImg headerImage={headerImage} />
          : <DetailViewHeaderMap latlonzoom={latlonzoom} />}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking for props: ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

DetailViewHeader.propTypes = {
  fullMode: PropTypes.bool,
  handleBackButtonClick: PropTypes.func,
  headerImage: PropTypes.string,
  latlonzoom: PropTypes.any,
  subTitle: PropTypes.string,
  title: PropTypes.string
};

///////////////////////////////////////////////////////////////////////////////
// Local sub-components: //////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class DetailViewHeaderTitle extends Component {
  render() {
    const { halfMode, title, subTitle } = this.props;
    return (
      <div className={styles.Titles}>
        <p className={styles.Title}>{title}</p>
        {halfMode ? "" : <span className={styles.SubTitle}>{subTitle}</span>}
      </div>
    );
  }
}

class DetailViewHeaderBackArrow extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className={styles.ArrowBackIcon} onClick={handleClick}>
        <i className="material-icons">arrow_back</i>
      </div>
    );
  }
}

class DetailViewHeaderImg extends Component {
  render() {
    const { headerImage } = this.props;
    return (
      <div
        className={styles.DetailViewHeaderImg}
        style={{ backgroundImage: `url(${headerImage})` }}
      />
    );
  }
}

class DetailViewHeaderMap extends Component {
  render() {
    const { lat, lon, zoom } = this.props.latlonzoom;
    const mapboxUrl =
      "https://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png";
    return (
      <Map
        ref="mapElement"
        center={[lat, lon]}
        zoom={zoom}
        zoomControl={false}
        style={{ height: "100%", zIndex: -1 }}
      >
        <TileLayer url={mapboxUrl} />
      </Map>
    );
  }
}

export default DetailViewHeader;
