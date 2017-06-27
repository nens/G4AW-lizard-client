import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import { DetailViewSection, DetailViewTable } from ".";

/*
DetailViewTableSection
----------------------
This is a non-generic section of the DetailView. It is used in
sections of the DetailView that show a table.
*/

export default class DetailViewTableSection extends Component {
  render() {
    const { isOpen, data } = this.props;
    return (
      <DetailViewSection title="Section for DetailView (table)" isOpen={isOpen}>
        <DetailViewTable data={data} />
      </DetailViewSection>
    );
  }
}

DetailViewTableSection.propTypes = {
  data: PropTypes.array,
  isOpen: PropTypes.bool
};
