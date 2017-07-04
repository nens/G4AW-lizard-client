import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { translate } from "react-i18next";
import { DetailViewSection, DetailViewTable } from ".";

/*
DetailViewTableSection
----------------------
This is a non-generic section of the DetailView. It is used in
sections of the DetailView that show a table.
*/

class DetailViewTableSection extends Component {
  render() {
    const { isOpen, data, t } = this.props;
    return (
      <DetailViewSection
        title={t("Section for DetailView (table)")}
        isOpen={isOpen}
      >
        <DetailViewTable data={data} />
      </DetailViewSection>
    );
  }
}

DetailViewTableSection.propTypes = {
  data: PropTypes.array,
  isOpen: PropTypes.bool
};

export default translate()(DetailViewTableSection);
