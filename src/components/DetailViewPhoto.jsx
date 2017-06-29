import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import MDSpinner from "react-md-spinner";
import { translate } from "react-i18next";

import { changeView } from "../actions";
import styles from "./styles/DetailViewPhoto.css";
import {
  WIDTH,
  DETAIL_VIEW_PHOTO_MARGIN,
  updateDimensions
} from "../tools/dimensions";

///////////////////////////////////////////////////////////////////////////////
// The main Component: used for displaying a single image (not full-screen)  //
// to be used in the DetailView ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class DetailViewPhoto extends Component {
  constructor() {
    super();
    this.state = {
      imageIsLoaded: false,
      imageWidth: null
    };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }
  componentDidMount() {
    updateDimensions();
    this.setState({ imageWidth: WIDTH - DETAIL_VIEW_PHOTO_MARGIN });
  }
  handleImageLoaded() {
    this.setState({ imageIsLoaded: true });
  }
  render() {
    const { photo, handleClick } = this.props;
    const { imageWidth, imageIsLoaded } = this.state;
    return (
      <div className={styles.Container}>
        {imageIsLoaded ? null : <PhotoViewSpinner />}
        <img
          onLoad={this.handleImageLoaded}
          style={{ opacity: imageIsLoaded ? 1 : 0 }}
          src={photo.url}
          onClick={handleClick}
          width={imageWidth}
        />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// Local sub-components ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class PhotoViewSpinner extends Component {
  render() {
    return (
      <div>
        <MDSpinner
          singleColor="#03a9f4"
          style={{
            position: "relative",
            top: "50%",
            left: "50%"
          }}
        />
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking: /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

DetailViewPhoto.propTypes = {
  photo: PropTypes.object,
  handleClick: PropTypes.func
};

export default translate()(DetailViewPhoto);
