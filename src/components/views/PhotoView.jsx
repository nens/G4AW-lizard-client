import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import styles from "../styles/PhotoView.css";
import MDSpinner from "react-md-spinner";
import { changeView } from "../../actions/UiActions";

///////////////////////////////////////////////////////////////////////////////
// The main Component; the PhotoView component ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class PhotoViewComponent extends Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      imageStatus: "loading"
      // selected: this.props.defaultSelected ? true : false
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleNextPhoto = this.handleNextPhoto.bind(this);
    this.handlePrevPhoto = this.handlePrevPhoto.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  handleNextPhoto() {
    console.log("handleNextPhoto()");
  }
  handlePrevPhoto() {
    console.log("handlePrevPhoto()");
  }
  handleImageLoaded() {
    this.setState({
      imageStatus: "loaded"
    });
  }
  render() {
    const {
      images,
      handleBackButtonClick,
      handlePrevPhoto,
      handleNextPhoto
    } = this.props;
    const { width, height, imageStatus } = this.state;
    const currentPhotoIdx = this.props.currentPhotoIdx || 0;
    const photo = images[currentPhotoIdx];
    const datetime = new Date(photo.date).toString();

    return (
      <div>

        <div className={styles.DetailViewPhotoInner} style={{ height, width }}>
          <PhotoViewTopPanel
            idx={currentPhotoIdx}
            count={images.length}
            handleBackButtonClick={handleBackButtonClick}
          />
          <PhotoViewMidPanel
            url={photo.url}
            width={width}
            handleImageLoaded={this.handleImageLoaded}
          />
          <PhotoViewBottomPanel datetime={datetime} />
        </div>

        {imageStatus === "loading" ? <PhotoViewSpinner /> : null}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////
// type-checking: /////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

PhotoViewComponent.propTypes = {
  images: PropTypes.array,
  handleBackButtonClick: PropTypes.func
};

///////////////////////////////////////////////////////////////////////////////
// Local sub-components: //////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class PhotoViewPrevButton extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className={styles.PrevPhoto} onClick={handleClick}>
        <i className={`${styles.LeftArrowIcon} material-icons`}>
          keyboard_arrow_left
        </i>
      </div>
    );
  }
}

class PhotoViewNextButton extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <div className={styles.NextPhoto} onClick={handleClick}>
        <i className={`${styles.RightArrowIcon} material-icons`}>
          keyboard_arrow_right
        </i>
      </div>
    );
  }
}

class PhotoViewTopPanel extends Component {
  render() {
    const { handleBackButtonClick, idx, count } = this.props;
    return (
      <div className={styles.TopPanel}>
        <div onClick={handleBackButtonClick} className={styles.BackButton}>
          <i className="material-icons">arrow_back</i>
        </div>
        <div>{idx + 1}/{count}</div>
      </div>
    );
  }
}

class PhotoViewMidPanel extends Component {
  render() {
    const { url, width, handleImageLoaded } = this.props;
    return (
      <div className={styles.PhotoPanel}>
        <div className={styles.DetailViewPhoto}>
          <img src={url} width={width} onLoad={handleImageLoaded} />
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
