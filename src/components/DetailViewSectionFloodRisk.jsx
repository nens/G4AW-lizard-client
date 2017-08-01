import React, { Component } from "react";
import styles from "./styles/DetailView.css";
import { NO_DATA } from "../constants/detailview-attributes";
import { DetailViewSection } from ".";

export default class DetailViewSectionFloodRisk extends Component {
  render() {
    const { t, parcel, data, ColoredSquare } = this.props;
    return (
      <DetailViewSection isInitiallyOpen={false} title={t("Flood Risk")}>
        <div className={styles.SectionWrapper}>
          <div className={styles.ColoredSquaresHeader}>
            {parcel.FloodRisk ? parcel.FloodRisk.toUpperCase() : NO_DATA}
          </div>
          <div className={styles.SubMessage}>
            {`The current flood risk is ${parcel.FloodRisk
              ? parcel.FloodRisk.toUpperCase()
              : t("unknown")}`}
          </div>
          <div className={styles.ColoredSquaresContainer}>
            <ColoredSquare
              title={t("Low flood risk")}
              backgroundColor="#FFFFFF"
              active={parcel.FloodRisk === "Low"}
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
        </div>
      </DetailViewSection>
    );
  }
}
