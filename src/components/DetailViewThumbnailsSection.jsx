import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import DetailViewSection from "./DetailViewSection";
import DetailViewThumbnails from "./DetailViewThumbnails";

///////////////////////////////////////////////////////////////////////////////
// The main Component: the DetailViewThumbnailsSection ////////////////////////
// ------------------------------------------------------------------------- //
// Update 20-06-17: It has been decided that, for our first production       //
// release, we will only show a single photo in the DetailView (a.o.t. the   //
// collection of thumbnails originally planned). Later on we will use this   //
// component again, that is: after 09-2017.                                  //
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
