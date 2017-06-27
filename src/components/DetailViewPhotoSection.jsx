import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";

import { DetailViewSection, DetailViewPhoto } from ".";

import { PHOTO_LIST } from "../../stories/helpers";

class DetailViewPhotoSection extends Component {
  render() {
    const { isOpen, handleClick, t, photo } = this.props;
    return (
      <DetailViewSection title={t("Most recent image")} isOpen={isOpen}>
        <DetailViewPhoto photo={photo} handleClick={handleClick} />
      </DetailViewSection>
    );
  }
}

export default translate()(DetailViewPhotoSection);
