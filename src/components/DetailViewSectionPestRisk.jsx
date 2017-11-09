import React, { Component } from "react";
import styles from "./styles/DetailView.css";
import {
  NO_DATA,
  CATEGORIES,
  GEOSERVER_PARCEL_KEYS,
  GEOSERVER_PARCEL_VALUES
} from "../constants/detailview-attributes";

import { DetailViewSection, DetailViewTable } from ".";

export default class DetailViewSectionPestRisk extends Component {
  render() {
    const { t, parcel, data, isInitiallyOpen, ColoredSquare } = this.props;
    const title = parcel.PestRisk ? parcel.PestRisk.toUpperCase() : NO_DATA;
    console.log(data);
    return (
      <DetailViewSection
        isInitiallyOpen={isInitiallyOpen}
        title={t("Pest Risk")}
      >
        <div className={styles.SectionWrapper}>
          <DetailViewTable data={data} />
        </div>
      </DetailViewSection>
    );
  }
}
