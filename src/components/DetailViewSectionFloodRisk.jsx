import React, { Component } from "react";
import styles from "./styles/DetailView.css";
import { SECTIONS, NO_DATA } from "../constants/detailview-attributes";
import { DetailViewSection, DetailViewTable } from ".";

export default class DetailViewSectionFloodRisk extends Component {
  getTranslatedRisk(t, parcel) {
    console.log("*** parcel =", parcel);
    if (parcel.floodRisk === undefined) {
      return t("unknown");
    }
    switch (parcel.floodRisk.toUpperCase()) {
      case "NO RISK":
        return t("NO RISK");
      case "MEDIUM RISK":
        return t("MEDIUM RISK");
      case "HIGH RISK":
        return t("HIGH RISK");
      default:
        return t("unknown");
    }
  }
  getSubTitleText(t, parcel, translatedRisk) {
    const floodLevelValue =
      parcel.FloodLevel !== undefined ? parcel.FloodLevel : t("unknown");
    return [
      t("The current flood risk is"),
      translatedRisk,
      t("and the flood level is"),
      floodLevelValue,
      SECTIONS.FloodRisk.sectionAttrs[1].getTranslatedUnit()
    ].join(" ");
  }
  render() {
    const { t, parcel, data, ColoredSquare } = this.props;
    const translatedRisk = this.getTranslatedRisk(t, parcel);
    return (
      <DetailViewSection isInitiallyOpen={false} title={t("Flood Risk")}>
        <div className={styles.SectionWrapper}>
          <div className={styles.ColoredSquaresHeader}>
            {translatedRisk}
          </div>
          <div className={styles.SubMessage}>
            {this.getSubTitleText(t, parcel, translatedRisk)}

            {/*`The current flood risk is
              ${parcel.FloodRisk
                ? parcel.FloodRisk.toUpperCase()
                : t("unknown")}
              and the flood level is ${data[1].value} ${data[1].unit}`*/}
          </div>
          <div className={styles.ColoredSquaresContainer}>
            <ColoredSquare
              title={t("Low flood risk")}
              backgroundColor="#FFFFFF"
              active={parcel.FloodRisk === "No Risk"}
            />
            <ColoredSquare
              title={t("Medium flood risk")}
              backgroundColor="#697DB0"
              active={parcel.FloodRisk === "Medium"}
            />
            <ColoredSquare
              title={t("High flood risk")}
              backgroundColor="#122476"
              active={parcel.FloodRisk === "High"}
            />
          </div>
          <DetailViewTable data={data} />
        </div>
      </DetailViewSection>
    );
  }
}
