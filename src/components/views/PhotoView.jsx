import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import styles from "../styles/PhotoView.css";
import MDSpinner from "react-md-spinner";
import { changeView } from "../../actions/UiActions";

import { WIDTH, HEIGHT } from "../../tools/dimensions";

///////////////////////////////////////////////////////////////////////////////
// The main Component; the PhotoView component ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class PhotoViewComponent extends Component {
  constructor() {
    super();
    this.state = {
      imageStatus: "loading",
      midPanelHeight: null
    };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }
  handleImageLoaded(imageElement) {
    const heightRatio = imageElement.naturalHeight / imageElement.naturalWidth;
    this.setState({
      midPanelHeight: Math.round(heightRatio * WIDTH),
      imageStatus: "loaded"
    });
  }
  render() {
    const { photo, handleBackButtonClick } = this.props;
    const { imageStatus } = this.state;
    const datetime = new Date(photo.date).toString();
    const dimensions = { width: WIDTH, height: HEIGHT };
    return (
      <div>
        <div className={styles.DetailViewPhotoInner} style={dimensions}>
          <PhotoViewTopPanel
            ref={component => (this.topPanelComponent = component)}
            handleBackButtonClick={handleBackButtonClick}
          />
          {imageStatus === "loading" ? <PhotoViewSpinner /> : null}
          <PhotoViewMidPanel
            ref={component => (this.midPanelComponent = component)}
            url={photo.url}
            height={this.state.midPanelHeight}
            handleImageLoaded={this.handleImageLoaded}
            imageIsLoaded={imageStatus === "loaded"}
          />
          <PhotoViewBottomPanel
            ref={component => (this.bottomPanelComponent = component)}
            datetime={datetime}
          />
        </div>
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking: /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

PhotoViewComponent.propTypes = {
  photo: PropTypes.object,
  handleBackButtonClick: PropTypes.func
};

///////////////////////////////////////////////////////////////////////////////
// Local sub-components: //////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class PhotoViewTopPanel extends Component {
  render() {
    const { handleBackButtonClick } = this.props;
    return (
      <div className={styles.TopPanel}>
        <div onClick={handleBackButtonClick} className={styles.BackButton}>
          <i className="material-icons">arrow_back</i>
        </div>
      </div>
    );
  }
}

class PhotoViewMidPanel extends Component {
  render() {
    const { url, height, handleImageLoaded, imageIsLoaded } = this.props;
    return (
      <div className={styles.PhotoPanel}>
        <div className={styles.DetailViewPhoto}>
          <img
            style={{ opacity: imageIsLoaded ? 1 : 0 }}
            id="theImage"
            src={url}
            width={WIDTH}
            height={height}
            onLoad={() => {
              handleImageLoaded(document.getElementById("theImage"));
            }}
          />
        </div>
      </div>
    );
  }
}

class PhotoViewBottomPanel extends Component {
  render() {
    const { datetime } = this.props;
    return (
      <div className={styles.PhotoPropertiesPanel}>
        <div className={styles.PhotoProperties}>
          <p className={styles.General}>General</p>
          <table className={styles.PropertiesTable}>
            <tbody>
              <tr>
                <td className={styles.PropertiesTableFirstColumn}>
                  Date taken
                </td>
                <td>{datetime}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class PhotoViewSpinner extends Component {
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

function mapDispatchToProps(dispatch) {
  return {
    handleBackButtonClick: () => changeView(dispatch, "DetailView")
  };
}

const PhotoView = connect(null, mapDispatchToProps)(PhotoViewComponent);

export default translate()(PhotoView);
