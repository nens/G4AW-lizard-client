import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import DetailViewSection from "./DetailViewSection";
import DetailViewThumbnails from "./DetailViewThumbnails";

///////////////////////////////////////////////////////////////////////////////
// The main Component: the DetailViewThumbnailsSection ////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default class DetailViewThumbnailsSection extends Component {
  render() {
    const { isOpen, thumbnails } = this.props;
    return (
      <DetailViewSection
        title="Section for DetailView (thumbnails)"
        isOpen={isOpen}
      >
        <DetailViewThumbnails images={thumbnails} />
      </DetailViewSection>
    );
  }
}
