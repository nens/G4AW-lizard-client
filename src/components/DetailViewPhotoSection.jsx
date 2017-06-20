import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import DetailViewSection from "./DetailViewSection";
import DetailViewPhoto from "./DetailViewPhoto";

import { PHOTO_LIST } from "../../stories/helpers";

class DetailViewPhotoSection extends Component {
  render() {
    const { width, isOpen, handleClick, t } = this.props;
    return (
      <DetailViewSection title={t("Most recent image")} isOpen={isOpen}>
        <DetailViewPhoto
          width={width}
          photo={PHOTO_LIST[0]}
          handleClick={handleClick}
        />
      </DetailViewSection>
    );
  }
}

export default translate()(DetailViewPhotoSection);
