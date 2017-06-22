import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { changeView } from "../actions/UiActions";
import styles from "./styles/DetailViewPhoto.css";
import { WIDTH } from "../tools/dimensions";

///////////////////////////////////////////////////////////////////////////////
// The main Component: used for displaying a single image (not full-screen)  //
// to be used in the DetailView ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export class DetailViewPhoto extends Component {
  render() {
    const { photo, handleClick } = this.props;
    return (
      <div className={styles.Container}>
        <img src={photo.url} onClick={handleClick} width={WIDTH} />
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
