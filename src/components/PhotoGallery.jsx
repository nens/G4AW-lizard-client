import { translate } from "react-i18next";
import Ink from "react-ink";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/PhotoGallery.css";

// A PhotoGallery emphasizes important functions on in the app.

class PhotoGallery extends Component {
  constructor() {
    super();
    this.state = {
      isOver: false
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  componentDidMount() {}
  handleMouseOver() {
    this.setState({
      isOver: true
    });
  }
  handleMouseOut() {
    this.setState({
      isOver: false
    });
  }
  render() {
    const { t, images, disabled, handleOnClick } = this.props;
    const { isOver } = this.state;
    return (
      <div
        className={`${styles.PhotoGallery} ${disabled ? styles.disabled : ""} ${isOver ? styles.IsOver : ""}`}
        onClick={disabled ? "" : this.props.handleOnClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {images.map((image, i) => {
          return (
            <div key={i} className={styles.ThumbnailContainer}>
              {i}
            </div>
          );
        })}
      </div>
    );
  }
}

PhotoGallery.propTypes = {
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
  handleOnClick: PropTypes.func,
  iconClass: PropTypes.string
};

export default translate()(PhotoGallery);
