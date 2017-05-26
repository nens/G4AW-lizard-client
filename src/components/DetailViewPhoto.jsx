import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./styles/DetailViewPhoto.css";
import MDSpinner from "react-md-spinner";

// A DetailViewPhoto component.

class DetailViewPhoto extends Component {
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
      currentPhoto,
      images,
      handleBackButtonClick,
      handlePrevPhoto,
      handleNextPhoto
    } = this.props;
    const { width, height, imageStatus } = this.state;
    const currentPhotoIdx = currentPhoto ? currentPhoto : 0;
    const photo = images[currentPhotoIdx];

    // Replace this with moment.js after my PR is merged.
    const a = new Date(photo.date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = `${date} ${month} ${year} ${hour}:${min}`;

    return (
      <div>
        {currentPhotoIdx > 0
          ? <div className={styles.PrevPhoto} onClick={this.handlePrevPhoto}>
              <i className={`${styles.LeftArrowIcon} material-icons`}>
                keyboard_arrow_left
              </i>
            </div>
          : ""}
        {currentPhotoIdx < images.length - 1
          ? <div className={styles.NextPhoto} onClick={this.handleNextPhoto}>
              <i className={`${styles.RightArrowIcon} material-icons`}>
                keyboard_arrow_right
              </i>
            </div>
          : ""}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height,
            width
          }}
        >
          <div className={styles.TopPanel}>
            <div onClick={handleBackButtonClick} className={styles.BackButton}>
              <i className="material-icons">arrow_back</i>
            </div>
            <div>{currentPhotoIdx + 1}/{images.length}</div>
          </div>
          <div className={styles.PhotoPanel}>
            <div className={styles.DetailViewPhoto}>
              <img
                src={photo.url}
                width={width}
                onLoad={this.handleImageLoaded}
              />
            </div>
          </div>
          <div className={styles.PhotoPropertiesPanel}>
            <div className={styles.PhotoProperties}>
              <p className={styles.General}>General</p>
              <table className={styles.PropertiesTable}>
                <tr>
                  <td className={styles.PropertiesTableFirstColumn}>
                    Date taken
                  </td>
                  <td>{time}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        {imageStatus === "loading"
          ? <div>
              <MDSpinner
                singleColor="#03a9f4"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%"
                }}
              />
            </div>
          : ""}
      </div>
    );
  }
}

DetailViewPhoto.propTypes = {
  images: PropTypes.array,
  handleBackButtonClick: PropTypes.func
};

export default DetailViewPhoto;
