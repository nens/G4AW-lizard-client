import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import DetailViewSection from "./DetailViewSection";
import DetailViewThumbnails from "./DetailViewThumbnails";

///////////////////////////////////////////////////////////////////////////////
// The main Component: the DetailViewThumbnailsSection ////////////////////////
///////////////////////////////////////////////////////////////////////////////

class DetailViewThumbnailsSection extends Component {
  render() {
    const { isOpen, thumbnails, handleClick, t } = this.props;
    return (
      <DetailViewSection title={t("Images")} isOpen={isOpen}>
        <DetailViewThumbnails images={thumbnails} handleClick={handleClick} />
      </DetailViewSection>
    );
  }
}

export default translate()(DetailViewThumbnailsSection);
