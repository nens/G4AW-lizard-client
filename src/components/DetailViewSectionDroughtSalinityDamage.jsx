import React, { Component } from "react";
import styles from "./styles/DetailView.css";
import { SECTIONS, NO_DATA } from "../constants/detailview-attributes";
import { DetailViewSection, DetailViewTable } from ".";

export default class DetailViewSectionDroughtSalinityDamage extends Component {
  // getTranslatedRisk(t, parcel) {
  //   if (parcel.FloodRisk === undefined) {
  //     return t("unknown");
  //   } else {
  //     return parcel.FloodRisk.toUpperCase();
  //   }
  // }
  // getSubTitleText(t, parcel, translatedRisk) {
  //   const floodLevelValue =
  //     parcel.FloodLevel !== undefined ? parcel.FloodLevel : t("unknown");
  //   return [
  //     t("The current flood risk is"),
  //     translatedRisk,
  //     t("and the flood level is"),
  //     floodLevelValue,
  //     SECTIONS.FloodRisk.sectionAttrs[1].getTranslatedUnit()
  //   ].join(" ");
  // }
  render() {
    const { t, parcel, data } = this.props;
    // const translatedRisk = this.getTranslatedRisk(t, parcel);
    return (
      <DetailViewSection
        isInitiallyOpen={false}
        title={"DroughtAndSalinityDamage"}
      >
        <div className={styles.SectionWrapper}>
          <DetailViewTable data={data} />
        </div>
      </DetailViewSection>
    );
  }
}
