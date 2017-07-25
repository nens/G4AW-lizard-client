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
  getHumanReadablePestRisk(parcel, t) {
    let riskLevel = parcel.PestRisk;
    if (riskLevel === "High") {
      return t("There is increased risk on one or more pests");
    } else if (riskLevel === "Low") {
      return t("There is little risk on pest presence");
    } else {
      return t("The risk on pest presence is unknown");
    }
  }
  render() {
    const {
      t,
      parcel,
      formatTabularData,
      isInitiallyOpen,
      ColoredSquare
    } = this.props;
    const title = parcel.PestRisk ? parcel.PestRisk.toUpperCase() : NO_DATA;
    return (
      <DetailViewSection
        isInitiallyOpen={isInitiallyOpen}
        title={t("Pest Risk")}
      >
        <div className={styles.SectionWrapper}>
          <div className={styles.ColoredSquaresHeader}>
            {title}
          </div>
          <div className={styles.SubMessage}>
            {this.getHumanReadablePestRisk(parcel, t)}
          </div>
          <div className={styles.ColoredSquaresContainer}>
            <ColoredSquare
              title={t("High blast risk")}
              backgroundColor="#95786f"
              active={parcel.BlastRisk === "High"}
            />
            <ColoredSquare
              title={t("High leaffolder risk")}
              backgroundColor="#e5907d"
              active={parcel.LeaffolderRisk === "High"}
            />
            <ColoredSquare
              title={t("High brown planthopper risk")}
              backgroundColor="#bfc2bb"
              active={parcel.BrownPlantHopperRisk === "High"}
            />
          </div>
          <DetailViewTable
            data={formatTabularData(parcel, CATEGORIES.PestRisk)}
          />
        </div>
      </DetailViewSection>
    );
  }
}
